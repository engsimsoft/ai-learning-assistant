/**
 * Token estimation utilities
 * Provides client-side token estimation and cost calculation
 */

/**
 * Estimate token count from text
 * Uses approximation: 1 token ≈ 4 characters for English text
 *
 * @param {string} text - Text to estimate
 * @returns {number} Estimated token count
 */
export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Format token count with thousands separators
 *
 * @param {number} tokens - Token count
 * @returns {string} Formatted token count (e.g., "1,234")
 */
export function formatTokenCount(tokens) {
  return tokens.toLocaleString('en-US');
}

/**
 * Format token count with K suffix for large numbers
 *
 * @param {number} tokens - Token count
 * @returns {string} Formatted token count (e.g., "12.5K")
 */
export function formatTokenCountShort(tokens) {
  if (tokens < 1000) return tokens.toString();
  return `${(tokens / 1000).toFixed(1)}K`;
}

/**
 * Calculate estimated cost based on token count
 * Uses Gemini Flash 2.5 Preview pricing as default
 *
 * @param {number} tokens - Token count
 * @param {Object} pricing - Pricing object with input_cost_per_1m and output_cost_per_1m
 * @returns {Object} Object with input and output costs in USD
 */
export function calculateCost(tokens, pricing = null) {
  // Default pricing: Gemini Flash 2.5 Preview
  const defaultPricing = {
    input_cost_per_1m: 0.075,
    output_cost_per_1m: 0.30
  };

  const { input_cost_per_1m, output_cost_per_1m } = pricing || defaultPricing;

  const inputCost = (tokens / 1_000_000) * input_cost_per_1m;
  const outputCost = (tokens / 1_000_000) * output_cost_per_1m;

  return {
    input: inputCost,
    output: outputCost,
    total: inputCost + outputCost
  };
}

/**
 * Format cost in USD
 *
 * @param {number} cost - Cost in USD
 * @returns {string} Formatted cost (e.g., "$0.15")
 */
export function formatCost(cost) {
  if (cost < 0.01) return '<$0.01';
  return `$${cost.toFixed(2)}`;
}

/**
 * Format cost in USD with more precision for small amounts
 *
 * @param {number} cost - Cost in USD
 * @returns {string} Formatted cost (e.g., "$0.0075")
 */
export function formatCostPrecise(cost) {
  if (cost < 0.0001) return '<$0.0001';
  if (cost < 0.01) return `$${cost.toFixed(4)}`;
  return `$${cost.toFixed(2)}`;
}
