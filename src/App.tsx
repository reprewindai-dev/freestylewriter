import React, { useRef, useState } from 'react';
import axios from 'axios';

interface SongResponse {
  song: string;
}

export default function App() {
  const [recording, setRecording] = useState(false);
  const [mode, setMode] = useState<'more_like_me' | 'more_polished'>('more_like_me');
  const [song, setSong] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const handleRecord = async () => {
    if (!recording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        recordedChunksRef.current = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };
        mediaRecorder.onstop = handleStop;
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setStatus('Recording...');
        setRecording(true);
      } catch (err) {
        console.error(err);
        alert('Error accessing microphone');
      }
    } else {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setStatus('Processing...');
      setRecording(false);
    }
  };

  const handleStop = async () => {
    // Build blob
    const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
    try {
      // Upload the recording (use relative URL for both dev and production)
      const uploadRes = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const fileId = uploadRes.data.fileId;

      // Transcribe
      const transRes = await axios.post('/api/transcribe', { fileId });
      const transcript: string = transRes.data.transcript;

      // Build lyrics
      const buildRes = await axios.post<SongResponse>('/api/build-lyrics', {
        transcript,
        mode,
      });
      setSong(buildRes.data.song);
      setStatus('Done');
    } catch (err) {
      console.error(err);
      setStatus('Error processing recording');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Freestyle Writer</h1>
      <div className="mb-4">
        <button
          className={`px-6 py-3 rounded text-white ${recording ? 'bg-red-500' : 'bg-blue-600'}`}
          onClick={handleRecord}
        >
          {recording ? 'Stop' : 'Record'}
        </button>
        <span className="ml-4 text-gray-700">{status}</span>
      </div>
      <div className="mb-4">
        <label className="mr-2 font-medium">Rewrite Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'more_like_me' | 'more_polished')}
          className="p-2 border rounded"
        >
          <option value="more_like_me">More like me</option>
          <option value="more_polished">More polished</option>
        </select>
      </div>
      {song && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Generated Song</h2>
          <pre className="whitespace-pre-wrap p-4 bg-white border rounded shadow">
            {song}
          </pre>
        </div>
      )}
    </div>
  );
}
