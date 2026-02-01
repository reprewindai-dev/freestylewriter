# Freestyle Writer

## Overview

Freestyle Writer is a simple proof‑of‑concept application designed to turn your freestyles into polished song lyrics automatically.  
It consists of a Node/Express backend that handles file uploads, speech‑to‑text transcription via the OpenAI API, and lyric generation using GPT‑4.  
The frontend is a React/Tailwind web application built with Vite that records audio in the browser, uploads it to the backend and displays the generated song sheet.

> **Note**: In this starter project the web client records audio while the page stays in the foreground.  
> Background recording (switching apps on mobile) requires a native wrapper such as Capacitor and isn’t implemented here.

### Features

* One‑tap record/stop in the browser
* Uploads your recording to the backend
* Transcribes the freestyle to text using OpenAI’s Whisper
* Generates a polished, structured song sheet (Intro/Verse/Hook/etc.)
* Two rewrite modes: **More like me** (light edit) and **More polished** (heavier rewrite)

### Running the application

This project is split into two packages: `server` and `client`.  Each has its own `package.json`.

1. **Install dependencies**

   ```sh
   cd freestyle-writer
   # install backend deps
   cd server && npm install && cd ..
   # install frontend deps
   cd client && npm install
   ```

2. **Set up environment variables**

   Create a `.env` file in `server` based off `.env.example` and set your `OPENAI_API_KEY`.

3. **Run the backend**

   ```sh
   cd freestyle-writer/server
   npm start
   ```

   The API will be available on `http://localhost:3000`.

4. **Run the frontend**

   In another terminal:

   ```sh
   cd freestyle-writer/client
   npm run dev
   ```

   Vite will serve the React app at `http://localhost:5173` by default.

### Future improvements

* Background recording support via a native wrapper (e.g. Capacitor for iOS)
* Additional endpoints for generating alternative hooks, shortening verses and exporting PDF/TXT song sheets
* User authentication and file persistence (currently uploads are stored on disk in the `uploads/` folder)
* UI polish and responsive design
