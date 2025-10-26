# Deployment Guide - Railway

## Prerequisites

- GitHub account
- Railway account ([railway.app](https://railway.app))
- OpenRouter API key
- Project pushed to GitHub

## 1. Prepare GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: AI Learning Agent"
git branch -M main
git remote add origin https://github.com/yourusername/ai-learning-agent.git
git push -u origin main
```

## 2. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Choose your `ai-learning-agent` repository
5. Railway will detect both backend and frontend

## 3. Backend Service Configuration

### 3.1 Service Settings

**Root Directory:** `backend`

**Build Command:**
```bash
pip install -r requirements.txt
```

**Start Command:**
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 3.2 Environment Variables

Add these in Railway dashboard (Settings → Variables):

```env
OPENROUTER_API_KEY=your_actual_openrouter_key
DEFAULT_MODEL=anthropic/claude-3.5-sonnet
FALLBACK_MODEL=google/gemini-pro
FRONTEND_URL=https://your-frontend.up.railway.app
PORT=8000
```

**Important:**
- Replace `OPENROUTER_API_KEY` with your actual key from [openrouter.ai](https://openrouter.ai)
- Update `FRONTEND_URL` after frontend is deployed (see step 4.3)

### 3.3 Verify Backend Deployment

1. Railway will provide a URL like: `https://ai-learning-agent-backend-production.up.railway.app`
2. Open it in browser
3. You should see JSON response with API info
4. Test health endpoint: `https://your-backend-url.up.railway.app/health`

## 4. Frontend Service Configuration

### 4.1 Service Settings

**Root Directory:** `frontend`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm run preview -- --host 0.0.0.0 --port $PORT
```

### 4.2 Environment Variables

Add in Railway dashboard:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

**Important:** Use the actual backend URL from step 3.3!

### 4.3 Update Backend CORS

After frontend deploys, Railway gives you a URL like:
`https://ai-learning-agent-frontend-production.up.railway.app`

Go back to **Backend Service** → Variables and update:
```env
FRONTEND_URL=https://your-actual-frontend-url.up.railway.app
```

Railway will automatically redeploy backend with new CORS settings.

## 5. Verify Production

### 5.1 Test Backend

```bash
# Health check
curl https://your-backend-url.up.railway.app/health

# Get lessons
curl https://your-backend-url.up.railway.app/lessons

# Get models
curl https://your-backend-url.up.railway.app/models
```

### 5.2 Test Frontend

1. Open frontend URL in browser
2. You should see the chat interface
3. Select a model (or use default)
4. Ask a question: "What is REST API?"
5. Verify you get an AI response

### 5.3 Common Issues

**CORS Error:**
- Check that `FRONTEND_URL` in backend matches actual frontend URL
- Redeploy backend after changing CORS settings

**Backend 500 Error:**
- Check logs in Railway dashboard
- Verify `OPENROUTER_API_KEY` is valid
- Check that lessons were included in deployment

**Frontend Can't Connect:**
- Verify `VITE_API_URL` points to correct backend
- Check backend is running (visit its URL)
- Check browser console for errors

## 6. Monitoring

### Railway Dashboard Features:

**Deployment Logs:**
- View build and runtime logs
- Debug errors
- Monitor requests

**Metrics:**
- CPU usage
- Memory usage
- Request volume
- Response times

**Resource Usage:**
- Track costs
- Set usage limits
- Get billing alerts

### Estimated Costs:

**Backend:**
- ~$5-10/month (depends on usage)
- Includes compute and memory

**Frontend:**
- ~$5/month
- Static file serving

**Alternative:** Deploy frontend to Vercel (free tier) and only pay for backend on Railway.

## 7. Custom Domain (Optional)

### 7.1 Add Domain to Railway

1. Go to Service Settings
2. Click **Domains**
3. Add your custom domain
4. Configure DNS records as shown

### 7.2 Update Environment Variables

Update both backend and frontend `.env` with new domain:

**Backend:**
```env
FRONTEND_URL=https://yourdomain.com
```

**Frontend:**
```env
VITE_API_URL=https://api.yourdomain.com
```

## 8. Continuous Deployment

Railway automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Add new feature"
git push
```

Railway will:
1. Detect changes
2. Build both services
3. Deploy automatically
4. Zero-downtime deployment

## 9. Rollback

If deployment fails:

1. Go to Railway dashboard
2. Select service
3. Click **Deployments**
4. Choose previous working deployment
5. Click **Redeploy**

## 10. Environment-Specific Configuration

### Production Best Practices:

**Backend `.env`:**
```env
# Use production-grade model
DEFAULT_MODEL=anthropic/claude-3.5-sonnet

# Set appropriate fallback
FALLBACK_MODEL=openai/gpt-4-turbo

# Production frontend URL
FRONTEND_URL=https://yourdomain.com
```

**Frontend `.env`:**
```env
# Production backend URL
VITE_API_URL=https://api.yourdomain.com
```

### Development vs Production:

| Setting | Development | Production |
|---------|------------|------------|
| Backend URL | localhost:8000 | Railway URL |
| Frontend URL | localhost:5173 | Railway/Vercel URL |
| CORS | Permissive | Strict |
| Logging | Verbose | Errors only |
| Caching | Disabled | Enabled |

## Troubleshooting

See [troubleshooting.md](troubleshooting.md) for detailed solutions to common deployment issues.

## Alternative Platforms

**Backend Alternatives:**
- Render.com (similar to Railway)
- Fly.io (global deployment)
- Heroku (classic PaaS)
- AWS ECS/Fargate (enterprise)

**Frontend Alternatives:**
- Vercel (recommended for Next.js/React)
- Netlify (static hosting)
- Cloudflare Pages (fast CDN)
- AWS S3 + CloudFront (custom setup)
