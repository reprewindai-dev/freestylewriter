# Deploying Freestyle Writer to Vercel

This guide will walk you through deploying the Freestyle Writer application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/cli) installed (optional, for command-line deployment)
3. An OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository (`freestylewriter`)
   - Vercel will automatically detect the configuration

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variable:
     - `OPENAI_API_KEY`: Your OpenAI API key
   - Apply to: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a URL like `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   ```
   Enter your OpenAI API key when prompted.

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Project Structure

The application is configured with:

- **Frontend**: React + Vite app in `/client`
  - Builds to `/client/dist`
  - Served as static files
  
- **Backend**: Express server in `/server`
  - Deployed as serverless functions
  - API routes at `/api/*`

## Configuration Files

### vercel.json
The root `vercel.json` configures:
- Build command for the client
- Serverless function for the backend
- Routing rules for API and static files

### Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key for Whisper & GPT-4 | `sk-...` |

## Post-Deployment

1. **Test your deployment**
   - Visit your Vercel URL
   - Try recording a freestyle
   - Check that transcription and lyrics generation work

2. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Monitor Logs**
   - Go to your project dashboard
   - Click "Functions" to see serverless function logs
   - Monitor API calls and errors

## Troubleshooting

### Build Fails

- Check that all dependencies are listed in `package.json`
- Verify the build command in `vercel.json`
- Check build logs in Vercel dashboard

### API Routes Not Working

- Ensure `OPENAI_API_KEY` is set in environment variables
- Check serverless function logs in Vercel dashboard
- Verify API routes match the format `/api/*`

### Frontend Can't Connect to Backend

- Check that proxy configuration in `vite.config.ts` is correct for development
- In production, API calls should use relative paths `/api/*`
- Verify CORS is configured correctly in `server/index.js`

## Cost Considerations

- **Vercel**: Free tier includes:
  - 100 GB bandwidth
  - Serverless function execution
  - Automatic HTTPS

- **OpenAI API**: Charges per usage:
  - Whisper: ~$0.006 per minute of audio
  - GPT-4: Varies by model and tokens used

## Security Notes

1. **Never commit `.env` files** - Use Vercel environment variables
2. **API Key Protection** - OpenAI key is only accessible server-side
3. **Rate Limiting** - Consider adding rate limiting for production use

## Support

For issues with:
- **Vercel deployment**: [Vercel Documentation](https://vercel.com/docs)
- **OpenAI API**: [OpenAI Documentation](https://platform.openai.com/docs)
- **This project**: Open an issue on GitHub

---

**Ready to deploy?** Follow Method 1 above to get started!
