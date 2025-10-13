# Detailed Setup Guide

## Prerequisites

**Required Software:**
- Python 3.11 or higher
- Node.js 18 or higher
- Git
- OpenRouter API key (get at [openrouter.ai](https://openrouter.ai))

**Version Check:**
```bash
python --version  # Should be 3.11+
node --version    # Should be 18+
npm --version     # Should be 9+
```

## 1. Clone the Project

```bash
git clone https://github.com/yourusername/ai-learning-agent.git
cd ai-learning-agent
```

## 2. Backend Setup

### 2.1 Create Virtual Environment

```bash
cd backend
python -m venv venv

# Activate (Linux/Mac):
source venv/bin/activate

# Activate (Windows):
venv\Scripts\activate
```

### 2.2 Install Dependencies

```bash
pip install -r requirements.txt
```

### 2.3 Configure Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
DEFAULT_MODEL=anthropic/claude-3.5-sonnet
FALLBACK_MODEL=google/gemini-pro
FRONTEND_URL=http://localhost:5173
PORT=8000
```

**Get OpenRouter API Key:**
1. Go to [https://openrouter.ai](https://openrouter.ai)
2. Create an account
3. Navigate to Keys section
4. Generate a new API key
5. Copy and paste into `.env`

**Available Models:**
- `anthropic/claude-3.5-sonnet` (recommended - best reasoning)
- `openai/gpt-4-turbo` (good all-rounder)
- `google/gemini-pro` (large context window)
- `meta-llama/llama-3-70b` (open source, cost-effective)
- Full list: [https://openrouter.ai/models](https://openrouter.ai/models)

### 2.4 Verify Lessons

Lessons should already be in `backend/data/lessons/`. Verify:
```bash
ls data/lessons/
```

You should see folders with lesson files (`.md` and `.txt` files).

### 2.5 Start Backend

```bash
uvicorn main:app --reload
```

**Verification:**
- Open [http://localhost:8000](http://localhost:8000)
- You should see JSON: `{"message": "AI Learning Agent API", ...}`
- Open [http://localhost:8000/health](http://localhost:8000/health)
- You should see: `{"status": "healthy", "lessons_loaded": 72}`
- Open [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API docs

## 3. Frontend Setup

### 3.1 Install Dependencies

```bash
cd frontend
npm install
```

### 3.2 Configure Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000
```

### 3.3 Start Frontend

```bash
npm run dev
```

**Verification:**
- Open [http://localhost:5173](http://localhost:5173)
- You should see the chat interface

## 4. Final Testing

1. Backend running on `:8000` ✅
2. Frontend running on `:5173` ✅
3. Send a test question in the chat
4. Receive AI response ✅

**Test Questions:**
- "What is REST API?"
- "Explain client-server architecture"
- "How does React work?"

## Troubleshooting

**If something doesn't work:**
See [troubleshooting.md](troubleshooting.md) for common issues and solutions.

**Backend Issues:**
- Check if `.env` file exists and has valid `OPENROUTER_API_KEY`
- Check logs in terminal for error messages
- Verify Python version is 3.11+

**Frontend Issues:**
- Check if backend is running first
- Verify `VITE_API_URL` in `.env`
- Check browser console (F12) for errors
- Clear browser cache if needed

**CORS Issues:**
- Ensure backend CORS middleware includes frontend URL
- Check that `FRONTEND_URL` in backend `.env` matches frontend URL

## Development Tips

**Backend Development:**
- Use `--reload` flag for auto-restart on code changes
- Check logs for debugging
- API docs available at `/docs` endpoint

**Frontend Development:**
- Vite provides hot module replacement (HMR)
- React DevTools extension recommended
- Use browser console for debugging

**Environment Variables:**
- Never commit `.env` files to Git
- Keep `.env.example` updated as template
- Use different values for development vs production
