# Model Settings Documentation

This file documents the settings for each AI model. Actual configuration is in `backend/config.py`.

## Gemini 2.5 Flash Preview

- **Model ID:** `google/gemini-2.5-flash-preview-09-2025`
- **Temperature:** 0.7 (balanced creativity/precision)
- **Max Tokens:** 4000
- **Top P:** 1.0
- **Context Length:** 1,000,000 tokens
- **Best for:** General questions, fast responses, cost-effective
- **Characteristics:** Good balance of speed and quality

## Grok 4 Fast

- **Model ID:** `x-ai/grok-4-fast`
- **Temperature:** 0.7 (balanced)
- **Max Tokens:** 4000
- **Top P:** 1.0
- **Context Length:** 2,000,000 tokens
- **Pricing:** $0.05 input / $0.15 output per 1M tokens
- **Best for:** Long context, auto-caching, affordable pricing
- **Characteristics:** Largest context window, good for loading many lessons

## GPT-4.1 Mini

- **Model ID:** `openai/gpt-4.1-mini`
- **Temperature:** 0.6 (slightly more focused)
- **Max Tokens:** 3000
- **Top P:** 0.95
- **Context Length:** 1,000,000 tokens
- **Best for:** Balanced performance, concise answers
- **Characteristics:** Reliable, good reasoning

## Claude Sonnet 4.5

- **Model ID:** `anthropic/claude-sonnet-4.5`
- **Temperature:** 0.5 (more focused for code)
- **Max Tokens:** 8000 (higher for detailed code explanations)
- **Top P:** 0.95
- **Context Length:** 200,000 tokens
- **Best for:** Code quality, complex reasoning, detailed explanations
- **Characteristics:** Best for programming questions, thoughtful responses

---

## Temperature Guide

- **0.5:** More focused, deterministic (good for code, technical answers)
- **0.7:** Balanced creativity and precision (general use)
- **1.0:** More creative, varied responses

## Max Tokens Guide

- **3000:** Concise answers
- **4000:** Standard detailed answers
- **8000:** Very detailed explanations (code examples, architecture)

## Top P Guide

- **0.95:** Slightly filtered token sampling (more coherent)
- **1.0:** Full sampling (more creative)

---

## How to Change Settings

Edit `backend/config.py` → `AVAILABLE_MODELS` array:

```python
{
    "id": "model-id",
    "temperature": 0.7,  # Change here
    "max_tokens": 4000,  # Change here
    "top_p": 1.0         # Change here
}
```

Restart backend for changes to take effect.
