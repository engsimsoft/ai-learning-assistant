"""
OpenRouter Service - Handles communication with OpenRouter API for LLM access
"""
import httpx
import logging
from typing import List, Dict, Optional, Any
from .prompt_loader import PromptLoader

logger = logging.getLogger(__name__)


class OpenRouterService:
    """Service for interacting with OpenRouter API"""

    def __init__(
        self,
        api_key: str,
        api_base: str,
        default_model: str,
        fallback_model: str,
        prompt_loader: PromptLoader,
        model_configs: List[Dict]
    ):
        """
        Initialize OpenRouter service

        Args:
            api_key: OpenRouter API key
            api_base: OpenRouter API base URL
            default_model: Default model to use
            fallback_model: Fallback model if default fails
            prompt_loader: PromptLoader instance for loading prompts
            model_configs: List of model configurations from config
        """
        self.api_key = api_key
        self.api_base = api_base
        self.default_model = default_model
        self.fallback_model = fallback_model
        self.prompt_loader = prompt_loader
        self.model_configs = {m["id"]: m for m in model_configs}

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
        model: Optional[str] = None,
        images: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Send chat request to OpenRouter

        Args:
            message: User's question
            context: Context from lessons
            history: Previous conversation messages
            model: Model to use (None = use default)
            images: List of base64 encoded images

        Returns:
            Dictionary with response, model_used, and token info
        """
        if history is None:
            history = []
        if images is None:
            images = []

        # Use specified model or default
        selected_model = model or self.default_model

        # Try primary model first
        try:
            result = await self._send_request(message, context, history, selected_model, images)
            return result
        except Exception as e:
            logger.warning(f"Primary model {selected_model} failed: {e}")

            # Try fallback model
            if selected_model != self.fallback_model:
                logger.info(f"Attempting fallback to {self.fallback_model}")
                try:
                    result = await self._send_request(message, context, history, self.fallback_model, images)
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
        model: str,
        images: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Send request to OpenRouter API

        Args:
            message: User message
            context: Context string
            history: Conversation history
            model: Model identifier
            images: List of base64 encoded images

        Returns:
            Response dictionary
        """
        if images is None:
            images = []

        # Build system prompt with context
        system_prompt = self._build_system_prompt(context)

        # Build messages array
        messages = [{"role": "system", "content": system_prompt}]

        # Add conversation history
        for msg in history:
            msg_content = msg.get("content", "")
            msg_images = msg.get("images", [])

            # If message has images, format as multimodal content
            if msg_images:
                content_parts = [{"type": "text", "text": msg_content}]
                for img in msg_images:
                    content_parts.append({
                        "type": "image_url",
                        "image_url": {"url": img}
                    })
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": content_parts
                })
            else:
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg_content
                })

        # Add current user message (with images if present)
        if images:
            content_parts = [{"type": "text", "text": message}]
            for img in images:
                content_parts.append({
                    "type": "image_url",
                    "image_url": {"url": img}
                })
            messages.append({"role": "user", "content": content_parts})
        else:
            messages.append({"role": "user", "content": message})

        # Get model configuration
        model_config = self._get_model_config(model)

        # Prepare request payload with model-specific settings
        payload = {
            "model": model,
            "messages": messages,
            "temperature": model_config.get("temperature", 0.7),
            "max_tokens": model_config.get("max_tokens", 4000),
            "top_p": model_config.get("top_p", 1.0)
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
            usage = data.get("usage", {})

            # Extract token usage
            input_tokens = usage.get("prompt_tokens", 0)
            output_tokens = usage.get("completion_tokens", 0)
            total_tokens = usage.get("total_tokens", input_tokens + output_tokens)

            # Calculate cost
            model_config = self.model_configs.get(model, {})
            input_cost_per_1m = model_config.get("input_cost_per_1m", 0)
            output_cost_per_1m = model_config.get("output_cost_per_1m", 0)

            cost_usd = (
                (input_tokens / 1_000_000) * input_cost_per_1m +
                (output_tokens / 1_000_000) * output_cost_per_1m
            )
            cost_rub = cost_usd * 90  # 1 USD = 90 RUB

            logger.info(f"Received response, tokens: {total_tokens} (in: {input_tokens}, out: {output_tokens}), cost: ${cost_usd:.6f}")

            return {
                "response": ai_response,
                "model_used": model,
                "tokens_used": {
                    "input": input_tokens,
                    "output": output_tokens,
                    "total": total_tokens
                },
                "cost": {
                    "usd": cost_usd,
                    "rub": cost_rub
                },
                "context_length": len(context)
            }

        except (KeyError, IndexError) as e:
            logger.error(f"Unexpected response format: {data}")
            raise Exception(f"Unexpected response format from OpenRouter: {e}")

    def _build_system_prompt(self, context: str) -> str:
        """
        Build system prompt using PromptLoader

        Args:
            context: Lessons context

        Returns:
            Formatted system prompt
        """
        return self.prompt_loader.build_full_prompt(context)

    def _get_model_config(self, model_id: str) -> Dict:
        """
        Get configuration for specific model

        Args:
            model_id: Model identifier

        Returns:
            Model configuration dictionary
        """
        return self.model_configs.get(model_id, {})
