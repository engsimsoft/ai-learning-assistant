# Troubleshooting Guide

## Common Issues and Solutions

### CORS Errors

**Problem:**
```
Access to fetch at 'http://localhost:8000/chat' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Solutions:**

1. **Check CORS Configuration**
   - Open `backend/main.py`
   - Verify `allow_origins` includes your frontend URL
   - Should include `http://localhost:5173` for development

2. **Check Frontend URL in Backend `.env`**
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

3. **Restart Backend**
   ```bash
   cd backend
   # Kill the server (Ctrl+C)
   uvicorn main:app --reload
   ```

4. **Production CORS**
   - Add production frontend URL to `ALLOWED_ORIGINS` in `config.py`
   - Or set `FRONTEND_URL` environment variable in Railway

---

### OpenRouter API Errors

**Problem 1: Invalid API Key**
```
401 Unauthorized: API key not valid
```

**Solutions:**
1. Check `.env` file exists in `backend/` directory
2. Verify `OPENROUTER_API_KEY` is correct (no extra spaces)
3. File should be named `.env`, not `.env.txt`
4. Restart backend to reload environment variables
5. Get new key at [https://openrouter.ai](https://openrouter.ai) → Dashboard → Keys

---

**Problem 2: Model Not Found**
```
404 Not Found: Model not found: invalid-model-name
```

**Solutions:**
1. Check model name format in `.env`:
   - ✅ Correct: `anthropic/claude-3.5-sonnet`
   - ❌ Wrong: `claude-3.5-sonnet`

2. Verify model exists at [https://openrouter.ai/models](https://openrouter.ai/models)

3. Check spelling carefully (case-sensitive)

---

**Problem 3: Rate Limit**
```
429 Too Many Requests: Rate limit exceeded
```

**Solutions:**
1. Wait a few minutes before retrying
2. Check OpenRouter dashboard for usage limits
3. Add credits to your OpenRouter account
4. Use a different model (fallback should handle this)

---

**Problem 4: Model Unavailable**
```
503 Service Unavailable: Model is currently unavailable
```

**Solutions:**
1. This triggers automatic fallback to `FALLBACK_MODEL`
2. If fallback also fails, wait a few minutes
3. Try a different model manually
4. Check OpenRouter status page

---

### Lessons Not Loading

**Problem:**
```
Lessons directory not found: backend/data/lessons
```

**Solutions:**

1. **Verify Directory Exists**
   ```bash
   ls backend/data/lessons/
   ```

2. **Check Files Are Present**
   ```bash
   find backend/data/lessons -name "*.md" -o -name "*.txt"
   ```

3. **Check File Permissions**
   ```bash
   chmod -R 755 backend/data/lessons
   ```

4. **Copy Lessons Manually**
   ```bash
   cp -r lessons_AI/* backend/data/lessons/
   ```

---

### Frontend Connection Issues

**Problem 1: Cannot Connect to Backend**

**Solutions:**

1. **Verify Backend is Running**
   ```bash
   curl http://localhost:8000/health
   ```
   Should return: `{"status": "healthy", ...}`

2. **Check `.env` in Frontend**
   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. **Restart Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Check Browser Console** (F12)
   - Look for network errors
   - Check request URL is correct
   - Verify CORS headers

---

**Problem 2: Environment Variables Not Loading**

**Solutions:**

1. **Vite requires restart** after changing `.env`:
   ```bash
   # Kill frontend (Ctrl+C)
   npm run dev
   ```

2. **Variable must start with `VITE_`**:
   - ✅ Correct: `VITE_API_URL`
   - ❌ Wrong: `API_URL`

3. **No quotes in `.env` file**:
   - ✅ Correct: `VITE_API_URL=http://localhost:8000`
   - ❌ Wrong: `VITE_API_URL="http://localhost:8000"`

---

### Deployment Issues

**Problem 1: Railway Build Failed**

**Solutions:**

1. **Check Build Logs** in Railway dashboard

2. **Verify File Paths**
   - Root Directory setting must match project structure
   - Backend: `backend`
   - Frontend: `frontend`

3. **Check Dependencies**
   - `requirements.txt` (backend)
   - `package.json` (frontend)

4. **Verify Python/Node Versions**
   - Railway uses latest by default
   - Specify version in `runtime.txt` or `.nvmrc` if needed

---

**Problem 2: Backend Starts But Crashes**

**Solutions:**

1. **Check Environment Variables** are set in Railway

2. **Review Runtime Logs** for error messages

3. **Verify OpenRouter API Key** is valid

4. **Check Port Configuration**:
   ```python
   # Should use Railway's $PORT
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

---

**Problem 3: Frontend Shows Blank Page**

**Solutions:**

1. **Check Build Command**:
   ```bash
   npm install && npm run build
   ```

2. **Check Start Command**:
   ```bash
   npm run preview -- --host 0.0.0.0 --port $PORT
   ```

3. **Verify `VITE_API_URL`** points to backend Railway URL

4. **Check Browser Console** for JavaScript errors

---

### Performance Issues

**Problem: Slow Responses**

**Solutions:**

1. **Reduce Context Size**
   - Select specific lessons instead of "All"
   - Only include relevant modules

2. **Choose Faster Model**
   - Gemini Pro is faster than Claude
   - GPT-4 Turbo faster than GPT-4

3. **Check Token Usage**
   - Large contexts = more tokens = slower
   - Optimize lesson content if needed

4. **Network Issues**
   - Check internet connection
   - Try different network
   - Check Railway status

---

### Python/Node Version Issues

**Problem: Python version mismatch**

**Solutions:**

1. **Check Version**:
   ```bash
   python --version  # Should be 3.11+
   ```

2. **Use pyenv** to manage versions:
   ```bash
   pyenv install 3.11
   pyenv local 3.11
   ```

3. **Update venv**:
   ```bash
   rm -rf venv
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

---

**Problem: Node version issues**

**Solutions:**

1. **Check Version**:
   ```bash
   node --version  # Should be 18+
   ```

2. **Use nvm** to manage versions:
   ```bash
   nvm install 18
   nvm use 18
   ```

3. **Clear npm cache**:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Getting More Help

1. **Check Logs:**
   - Backend: Terminal output
   - Frontend: Browser console (F12)
   - Railway: Deployment logs

2. **Enable Debug Mode:**
   - Backend: Set logging level to DEBUG
   - Frontend: Check Network tab in DevTools

3. **Test Endpoints Directly:**
   ```bash
   # Health check
   curl http://localhost:8000/health

   # Get lessons
   curl http://localhost:8000/lessons

   # Get models
   curl http://localhost:8000/models
   ```

4. **Common Commands:**
   ```bash
   # Backend
   cd backend
   source venv/bin/activate
   python main.py

   # Frontend
   cd frontend
   npm run dev

   # Check processes
   ps aux | grep python
   ps aux | grep node

   # Kill stuck processes
   pkill -f "uvicorn main:app"
   pkill -f "vite"
   ```

5. **Resources:**
   - FastAPI docs: [https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)
   - React docs: [https://react.dev](https://react.dev)
   - OpenRouter docs: [https://openrouter.ai/docs](https://openrouter.ai/docs)
   - Railway docs: [https://docs.railway.app](https://docs.railway.app)
