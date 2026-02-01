# Vercel Deployment Checklist ✅

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment Checklist

### 1. Code & Configuration ✅
- [x] `vercel.json` configured for monorepo with client/server
- [x] Client build command set (`vercel-build` script)
- [x] Server configured as serverless function
- [x] API routes use relative URLs (`/api/*`)
- [x] Vite proxy configured for local development
- [x] Server exports app for Vercel serverless
- [x] `.gitignore` includes `.vercel` and `.env`

### 2. Environment Variables 🔑
Before deploying, ensure these are set in Vercel:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key from platform.openai.com |

**How to set:**
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add `OPENAI_API_KEY` with your key
4. Apply to: Production, Preview, Development

### 3. Dependencies ✅
- [x] Client dependencies in `client/package.json`
  - react, react-dom, axios, vite, tailwindcss
- [x] Server dependencies in `server/package.json`
  - express, cors, multer, openai, dotenv

### 4. File Structure ✅
```
freestylewriter/
├── client/              # React frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/              # Express backend
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── vercel.json          # Vercel configuration
├── package.json         # Root package.json
└── README.md
```

### 5. Testing Locally 🧪
Before deploying, test locally:

```bash
# Terminal 1: Start server
cd server
npm install
cp .env.example .env
# Edit .env with your OPENAI_API_KEY
npm start

# Terminal 2: Start client
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` and test:
- [ ] Record button works (grants microphone permission)
- [ ] Can record audio
- [ ] Stops recording successfully
- [ ] Transcription processes
- [ ] Lyrics generate correctly
- [ ] Both modes work: "More like me" and "More polished"

## Deployment Steps

### Quick Deploy
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# Deploy via Vercel Dashboard
# 1. Go to vercel.com
# 2. Import repository
# 3. Add OPENAI_API_KEY environment variable
# 4. Deploy!
```

### Post-Deployment Verification ✅

After deployment, test on your Vercel URL:

- [ ] Homepage loads correctly
- [ ] Can click Record button
- [ ] Microphone permission requested
- [ ] Recording works
- [ ] API calls succeed (check Network tab)
- [ ] Transcription returns results
- [ ] Lyrics generate properly
- [ ] No console errors

### Common Issues & Solutions

#### ❌ Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json files
- Ensure `vercel-build` script exists in client/package.json

#### ❌ API Routes Return 404
- Verify `vercel.json` routes configuration
- Check that API calls use `/api/*` paths
- Ensure server/index.js exports the Express app

#### ❌ Server Errors
- Check Function Logs in Vercel dashboard
- Verify `OPENAI_API_KEY` is set in environment variables
- Check OpenAI API key is valid and has credits

#### ❌ CORS Errors
- Verify `cors()` is enabled in server/index.js
- Check that API routes are configured correctly

## Performance Monitoring

After deployment, monitor:

1. **Function Execution Time**
   - Vercel Dashboard → Functions
   - Should be < 10 seconds for most requests

2. **API Usage**
   - OpenAI Dashboard → Usage
   - Monitor Whisper & GPT-4 costs

3. **Error Rates**
   - Vercel Dashboard → Logs
   - Check for 500 errors

## Production Ready? ✅

If all items are checked, you're ready to deploy!

**Deploy command:**
```bash
vercel --prod
```

Or use the Vercel Dashboard for GUI deployment.

---

Need help? Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
