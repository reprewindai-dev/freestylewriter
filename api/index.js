// Vercel Serverless Function
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { OpenAI } = require('openai');
const path = require('path');

// Configure upload destination in /tmp for serverless
const upload = multer({ dest: '/tmp/uploads' });

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
if (!fs.existsSync('/tmp/uploads')) {
  fs.mkdirSync('/tmp/uploads', { recursive: true });
}

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Handle file upload – returns a fileId
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    const fileId = req.file.filename;
    res.json({ fileId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Transcribe a recorded file
app.post('/api/transcribe', async (req, res) => {
  const { fileId } = req.body;
  if (!fileId) return res.status(400).json({ error: 'fileId required' });
  const filePath = path.join('/tmp/uploads', fileId);
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1'
    });
    res.json({ transcript: transcription.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Transcription error' });
  }
});

// Build lyrics from transcript
app.post('/api/build-lyrics', async (req, res) => {
  const { transcript, mode } = req.body;
  if (!transcript) return res.status(400).json({ error: 'transcript required' });
  const rewriteMode = mode === 'more_polished' ? 'More polished' : 'More like me';

  const systemPrompt =
    'You are a songwriting editor for trap/pain-rap. Output must be a polished song written FROM the freestyle transcript, not a verbatim transcript. Preserve the artist's voice and meaning while tightening phrasing, removing filler, fixing clarity, and improving flow. Do not add corny lines. Avoid overly poetic language. Keep it street and conversational.';

  const userPrompt = `Mode: ${rewriteMode}\n` +
    `Task:\n` +
    `Using the transcript below, write a fully structured song with this exact format and bar counts:\n` +
    `INTRO (4)\nVERSE 1 (16)\nHOOK (8)\nVERSE 2 (8–12)\nOUTRO (4)\n\n` +
    `Rules:\n` +
    `- Each bar is one line.\n` +
    `- Keep rhyme/cadence natural.\n` +
    `- Reuse the transcript's best ideas/lines; rewrite weak lines.\n` +
    `- Identify a strong central theme and make the hook summarize it.\n` +
    `- If transcript lacks a hook, create one by reworking repeated ideas.\n` +
    `- Output ONLY the song sheet in the template below. No commentary.\n\n` +
    `Template:\n` +
    `TITLE: (short, 2–4 words)\n` +
    `MODE: (More like me OR More polished)\n\n` +
    `INTRO (4)\n1)\n2)\n3)\n4)\n\n` +
    `VERSE 1 (16)\n1)\n...\n16)\n\n` +
    `HOOK (8)\n1)\n...\n8)\n\n` +
    `VERSE 2 (8–12)\n1)\n...\nN)\n\n` +
    `OUTRO (4)\n1)\n2)\n3)\n4)\n\n` +
    `Transcript:\n<<<${transcript}>>>`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1024,
      temperature: 0.7
    });
    const song = completion.choices?.[0]?.message?.content || '';
    res.json({ song });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lyric generation error' });
  }
});

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
