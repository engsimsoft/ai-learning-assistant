"""
OpenRouter Service - Handles communication with OpenRouter API for LLM access
"""
import httpx
import logging
from typing import List, Dict, Optional, Any

logger = logging.getLogger(__name__)


class OpenRouterService:
    """Service for interacting with OpenRouter API"""

    def __init__(self, api_key: str, api_base: str, default_model: str, fallback_model: str):
        """
        Initialize OpenRouter service

        Args:
            api_key: OpenRouter API key
            api_base: OpenRouter API base URL
            default_model: Default model to use
            fallback_model: Fallback model if default fails
        """
        self.api_key = api_key
        self.api_base = api_base
        self.default_model = default_model
        self.fallback_model = fallback_model

        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/ai-learning-agent",
            "X-Title": "AI Learning Agent"
        }

    async def chat(
        self,
        message: str,
        context: str,
        history: List[Dict] = None,
        model: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send chat request to OpenRouter

        Args:
            message: User's question
            context: Context from lessons
            history: Previous conversation messages
            model: Model to use (None = use default)

        Returns:
            Dictionary with response, model_used, and token info
        """
        if history is None:
            history = []

        # Use specified model or default
        selected_model = model or self.default_model

        # Try primary model first
        try:
            result = await self._send_request(message, context, history, selected_model)
            return result
        except Exception as e:
            logger.warning(f"Primary model {selected_model} failed: {e}")

            # Try fallback model
            if selected_model != self.fallback_model:
                logger.info(f"Attempting fallback to {self.fallback_model}")
                try:
                    result = await self._send_request(message, context, history, self.fallback_model)
                    return result
                except Exception as fallback_error:
                    logger.error(f"Fallback model also failed: {fallback_error}")
                    raise Exception(
                        f"Both primary ({selected_model}) and fallback ({self.fallback_model}) "
                        f"models failed. Please try again later."
                    )
            else:
                raise

    async def _send_request(
        self,
        message: str,
        context: str,
        history: List[Dict],
        model: str
    ) -> Dict[str, Any]:
        """
        Send request to OpenRouter API

        Args:
            message: User message
            context: Context string
            history: Conversation history
            model: Model identifier

        Returns:
            Response dictionary
        """
        # Build system prompt with context
        system_prompt = self._build_system_prompt(context)

        # Build messages array
        messages = [{"role": "system", "content": system_prompt}]

        # Add conversation history
        for msg in history:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })

        # Add current user message
        messages.append({"role": "user", "content": message})

        # Prepare request payload
        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 4000
        }

        logger.info(f"Sending request to OpenRouter with model: {model}")
        logger.debug(f"Context length: {len(context)} characters")
        logger.debug(f"Total messages: {len(messages)}")

        # Send request
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.api_base}/chat/completions",
                headers=self.headers,
                json=payload
            )

            if response.status_code != 200:
                error_text = response.text
                logger.error(f"OpenRouter API error {response.status_code}: {error_text}")
                raise Exception(f"OpenRouter API error: {error_text}")

            data = response.json()

        # Extract response
        try:
            ai_response = data["choices"][0]["message"]["content"]
            tokens_used = data.get("usage", {}).get("total_tokens")

            logger.info(f"Received response, tokens used: {tokens_used}")

            return {
                "response": ai_response,
                "model_used": model,
                "tokens_used": tokens_used,
                "context_length": len(context)
            }

        except (KeyError, IndexError) as e:
            logger.error(f"Unexpected response format: {data}")
            raise Exception(f"Unexpected response format from OpenRouter: {e}")

    def _build_system_prompt(self, context: str) -> str:
        """
        Build system prompt with context

        Args:
            context: Lessons context

        Returns:
            Formatted system prompt
        """
        return f"""You are an AI tutor for web development with access to course materials.
Your role is to help students learn by answering their questions using the provided lessons.

**Guidelines:**
1. Answer questions based on the lessons provided below
2. Explain concepts in simple, clear language
3. Use analogies and examples when helpful
4. If information is not in the lessons, say so honestly
5. Encourage students to ask follow-up questions
6. Be patient and supportive
7. When appropriate, reference specific lessons by title

**COURSE MATERIALS:**

{context}

---

Now, please answer the student's question based on these materials."""
