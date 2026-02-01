# Freestyle Writer Components

This repository contains two separate freestyle writing applications:

## 1. Simple Text Editor (Root Level)

A lightweight, distraction-free writing application with no dependencies.

### Location
- `index.html` - Main page
- `styles.css` - Styling
- `script.js` - Functionality

### Features
- Real-time word and character count
- Auto-save to browser localStorage
- Download as .txt file
- Copy to clipboard
- Clean, modern dark theme
- No build process required

### Access
When deployed to Vercel, this is accessible at the root URL:
```
https://your-app.vercel.app/
```

### Local Development
Simply open `index.html` in a browser - no server required.

---

## 2. Full-Stack Freestyle-to-Lyrics App (Client/Server)

A complete application that records audio, transcribes it using OpenAI Whisper, and generates polished lyrics using GPT-4.

### Location
- `client/` - React/Vite frontend
- `server/` - Node/Express backend
- `api/` - Serverless API endpoint for Vercel

### Features
- Browser-based audio recording
- Speech-to-text transcription (OpenAI Whisper)
- AI-powered lyric generation (GPT-4)
- Two rewrite modes: "More like me" and "More polished"
- Structured song format (Intro/Verse/Hook/etc.)

### Access
When deployed, the React app needs to be accessed through the client build:
- The React app is built and served from `/client/dist`
- API endpoints are available at `/api/*`

### Local Development
See the main [README.md](README.md) for setup instructions.

---

## Deployment Configuration

The `vercel.json` file is currently configured for the simple static site. To deploy the full-stack application instead, you would need to update `vercel.json` to:

1. Build the React client: `cd client && npm install && npm run build`
2. Set output directory to: `client/dist`
3. Configure API routes to the serverless functions in `/api`

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full-stack app deployment guide.

---

## Which Component to Use?

- **Use the simple text editor** if you want:
  - Quick, distraction-free writing
  - No backend or API setup
  - Fast, lightweight deployment
  - Works offline after first load

- **Use the full-stack app** if you want:
  - Audio recording capabilities
  - AI-powered transcription and lyric generation
  - Structured song formatting
  - Advanced features

Both components can coexist in the repository and be deployed together.
