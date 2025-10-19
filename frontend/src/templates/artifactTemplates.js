/**
 * Artifact Templates Registry
 * Central registry for all plot and calculator templates
 *
 * Usage:
 *   import { getTemplate, getAllTemplates, getTemplatesByCategory } from './artifactTemplates';
 *
 *   const template = getTemplate('line-chart');
 *   const allTemplates = getAllTemplates();
 *   const plotTemplates = getTemplatesByCategory('plots');
 */

// Import plot templates
import lineChart from './plots/line-chart.js';
import scatterPlot from './plots/scatter-plot.js';
import barChart from './plots/bar-chart.js';
import multiLine from './plots/multi-line.js';
import areaChart from './plots/area-chart.js';

// Import calculator templates
import genericCalculator from './calculators/generic-calculator.js';
import unitConverter from './calculators/unit-converter.js';
import formulaCalculator from './calculators/formula-calculator.js';

/**
 * Registry of all available templates
 * Structure: { templateId: templateObject }
 */
const TEMPLATES = {
  // Plot templates
  'line-chart': lineChart,
  'scatter-plot': scatterPlot,
  'bar-chart': barChart,
  'multi-line': multiLine,
  'area-chart': areaChart,

  // Calculator templates
  'generic-calculator': genericCalculator,
  'unit-converter': unitConverter,
  'formula-calculator': formulaCalculator
};

/**
 * Get a specific template by ID
 * @param {string} id - Template ID (e.g., 'line-chart', 'generic-calculator')
 * @returns {object|null} Template object or null if not found
 */
export function getTemplate(id) {
  return TEMPLATES[id] || null;
}

/**
 * Get all available templates
 * @returns {Array} Array of all template objects
 */
export function getAllTemplates() {
  return Object.values(TEMPLATES);
}

/**
 * Get templates by category
 * @param {string} category - Category name ('plots' or 'calculators')
 * @returns {Array} Array of templates in the specified category
 */
export function getTemplatesByCategory(category) {
  return Object.values(TEMPLATES).filter(t => t.category === category);
}

/**
 * Get template names grouped by category
 * @returns {object} Object with categories as keys and arrays of template names as values
 */
export function getTemplatesByCategories() {
  const grouped = {};
  Object.values(TEMPLATES).forEach(template => {
    if (!grouped[template.category]) {
      grouped[template.category] = [];
    }
    grouped[template.category].push({
      id: template.id,
      name: template.name,
      description: template.description
    });
  });
  return grouped;
}

/**
 * Check if a template exists
 * @param {string} id - Template ID
 * @returns {boolean} True if template exists
 */
export function hasTemplate(id) {
  return id in TEMPLATES;
}

/**
 * Get template configuration (without examples and instructions)
 * Useful for loading default config into Canvas
 * @param {string} id - Template ID
 * @returns {object|null} Template config or null if not found
 */
export function getTemplateConfig(id) {
  const template = getTemplate(id);
  return template ? template.config : null;
}

/**
 * Get template example by name
 * @param {string} templateId - Template ID
 * @param {string} exampleName - Example name (e.g., 'temperature', 'growth')
 * @returns {object|null} Example config or null if not found
 */
export function getTemplateExample(templateId, exampleName) {
  const template = getTemplate(templateId);
  if (!template || !template.examples) return null;
  return template.examples[exampleName] || null;
}

/**
 * Get all example names for a template
 * @param {string} templateId - Template ID
 * @returns {Array} Array of example names
 */
export function getTemplateExampleNames(templateId) {
  const template = getTemplate(templateId);
  if (!template || !template.examples) return [];
  return Object.keys(template.examples);
}

// Export the registry itself (for debugging/inspection)
export { TEMPLATES };

// Default export
export default {
  getTemplate,
  getAllTemplates,
  getTemplatesByCategory,
  getTemplatesByCategories,
  hasTemplate,
  getTemplateConfig,
  getTemplateExample,
  getTemplateExampleNames,
  TEMPLATES
};
