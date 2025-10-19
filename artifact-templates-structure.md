# AI Learning Agent - Artifact Templates & Demo Structure

**Document Version:** 1.0  
**Date:** 2025-10-18  
**For:** Claude Code Implementation  
**Project:** AI Learning Agent - Templates & Demo Course (Phase C)  
**Prerequisites:** Layout Redesign (Roadmap A), Artifact System (Roadmap B)

---

## Executive Summary

This document describes the **template library and demonstration course structure** for the AI Learning Agent platform.

**Goal:** Create a separate, organized system for:
- Reusable artifact templates (JSON configs)
- Demonstration lessons (showcase platform capabilities)
- Testing playground (sandbox for experiments)
- Template library (building blocks for future courses)

**Why Separate?**
- Current platform is a **testing ground** for future production use
- Need to keep real lessons clean and separate from demos
- Templates should be reusable across different courses (programming now, engines later)
- Easy to remove/hide demos when launching production

---

## Table of Contents

1. [Directory Structure](#1-directory-structure)
2. [Template Library](#2-template-library)
3. [Demo Course](#3-demo-course)
4. [Template Creation Guide](#4-template-creation-guide)
5. [Integration with Main App](#5-integration-with-main-app)
6. [Migration to Production](#6-migration-to-production)
7. [Implementation Plan](#7-implementation-plan)

---

## 1. Directory Structure

### Overview

```
backend/data/
├── lessons/                          # Real courses (existing)
│   ├── ai-web-learning/
│   ├── project-setup-guide/
│   └── web-design-fundamentals/
│
├── artifact-templates/               # NEW: Template library
│   ├── README.md                     # Template documentation
│   ├── plots/                        # Plot templates (Plotly)
│   │   ├── line-chart.json
│   │   ├── scatter-plot.json
│   │   ├── bar-chart.json
│   │   ├── multi-line.json
│   │   └── pv-diagram.json          # For future (engines)
│   │
│   ├── calculators/                  # Calculator templates (Math.js)
│   │   ├── generic-formula.json
│   │   ├── unit-converter.json
│   │   ├── equation-solver.json
│   │   └── compression-ratio.json   # For future (engines)
│   │
│   └── examples/                     # Pre-built demo artifacts
│       ├── sine-wave-plot.json
│       ├── physics-calculator.json
│       └── data-visualization.json
│
└── artifact-demos/                   # NEW: Demo course
    ├── course.json                   # Course metadata
    └── demos/
        ├── 01-introduction.md
        ├── 02-plot-examples.md
        ├── 03-calculator-examples.md
        ├── 04-advanced-features.md
        └── 05-template-gallery.md
```

---

## 2. Template Library

### 2.1 Template Categories

#### Plots (Plotly.js)

**Basic Templates:**
1. **line-chart.json** - Simple line chart
2. **scatter-plot.json** - Scatter plot for correlations
3. **bar-chart.json** - Bar chart for comparisons
4. **multi-line.json** - Multiple data series

**Engineering Templates (Future):**
5. **pv-diagram.json** - Pressure-Volume diagram (thermodynamics)
6. **ts-diagram.json** - Temperature-Entropy diagram
7. **efficiency-curve.json** - Efficiency vs parameter

#### Calculators (Math.js)

**Generic Templates:**
1. **generic-formula.json** - Single formula calculator
2. **unit-converter.json** - Convert between units
3. **equation-solver.json** - Solve equations

**Engineering Templates (Future):**
4. **compression-ratio.json** - Engine compression ratio
5. **otto-efficiency.json** - Otto cycle efficiency
6. **power-calculator.json** - Engine power calculation

---

### 2.2 Template File Format

#### Plot Template Example

**File:** `artifact-templates/plots/line-chart.json`

```json
{
  "id": "line-chart",
  "name": "Line Chart",
  "version": "1.0",
  "type": "plot",
  "category": "basic",
  "description": "Simple line chart with customizable data points",
  "tags": ["chart", "line", "basic", "visualization"],
  "author": "System",
  "created": "2025-10-18",
  
  "config": {
    "plotType": "scatter",
    "mode": "lines+markers",
    
    "data": [
      {
        "x": [0, 1, 2, 3, 4, 5],
        "y": [0, 1, 4, 9, 16, 25],
        "type": "scatter",
        "mode": "lines+markers",
        "name": "y = x²",
        "line": {
          "color": "#667eea",
          "width": 3
        },
        "marker": {
          "color": "#667eea",
          "size": 8
        }
      }
    ],
    
    "layout": {
      "title": "Line Chart Example",
      "xaxis": {
        "title": "X Axis",
        "showgrid": true,
        "zeroline": true
      },
      "yaxis": {
        "title": "Y Axis",
        "showgrid": true,
        "zeroline": true
      },
      "plot_bgcolor": "#ffffff",
      "paper_bgcolor": "#ffffff",
      "font": {
        "family": "Inter, system-ui, sans-serif",
        "size": 14
      }
    },
    
    "options": {
      "responsive": true,
      "displayModeBar": true,
      "displaylogo": false,
      "modeBarButtonsToRemove": ["lasso2d", "select2d"]
    }
  },
  
  "customization": {
    "allowDataEdit": true,
    "allowLayoutEdit": true,
    "parameters": [
      {
        "name": "pointCount",
        "label": "Number of points",
        "type": "slider",
        "min": 3,
        "max": 20,
        "default": 6
      }
    ]
  }
}
```

---

#### Calculator Template Example

**File:** `artifact-templates/calculators/generic-formula.json`

```json
{
  "id": "generic-formula",
  "name": "Formula Calculator",
  "version": "1.0",
  "type": "calculator",
  "category": "basic",
  "description": "Calculate result from a mathematical formula",
  "tags": ["calculator", "formula", "math", "basic"],
  "author": "System",
  "created": "2025-10-18",
  
  "config": {
    "title": "Formula Calculator",
    "description": "Enter values and calculate the result",
    
    "inputs": [
      {
        "name": "a",
        "label": "Value A",
        "type": "number",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 10,
        "unit": "",
        "description": "First input value"
      },
      {
        "name": "b",
        "label": "Value B",
        "type": "number",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 20,
        "unit": "",
        "description": "Second input value"
      },
      {
        "name": "operation",
        "label": "Operation",
        "type": "select",
        "options": [
          { "value": "add", "label": "Addition (+)" },
          { "value": "subtract", "label": "Subtraction (-)" },
          { "value": "multiply", "label": "Multiplication (×)" },
          { "value": "divide", "label": "Division (÷)" }
        ],
        "default": "add"
      }
    ],
    
    "formulas": [
      {
        "name": "result",
        "label": "Result",
        "expression": {
          "add": "a + b",
          "subtract": "a - b",
          "multiply": "a * b",
          "divide": "a / b"
        },
        "unit": "",
        "precision": 2,
        "description": "Calculated result"
      }
    ],
    
    "display": {
      "showFormula": true,
      "showSteps": false,
      "highlightResult": true
    }
  }
}
```

---

### 2.3 Template README

**File:** `artifact-templates/README.md`

```markdown
# Artifact Templates Library

This directory contains reusable templates for creating artifacts in the AI Learning Agent platform.

## Directory Structure

```
artifact-templates/
├── plots/              # Plotly.js chart templates
├── calculators/        # Math.js calculator templates
└── examples/           # Pre-built demo artifacts
```

## Template Categories

### Plots
- **line-chart** - Basic line chart
- **scatter-plot** - Scatter plot
- **bar-chart** - Bar chart
- **multi-line** - Multiple series

### Calculators
- **generic-formula** - Formula calculator
- **unit-converter** - Unit conversion
- **equation-solver** - Solve equations

## Using Templates

### In Lessons (Markdown)
```markdown
[📊 Open Line Chart](artifact:template:line-chart)
[🧮 Open Calculator](artifact:template:generic-formula)
```

### In Code
```javascript
import { loadTemplate } from '@/utils/artifactTemplates';

const config = loadTemplate('line-chart');
```

## Creating New Templates

1. Create JSON file in appropriate directory
2. Follow the template format (see examples)
3. Add to template registry
4. Test in demo course

## Template Format

See existing templates for format reference. All templates must include:
- `id` - unique identifier
- `name` - display name
- `type` - "plot" or "calculator"
- `config` - artifact configuration
```

---

## 3. Demo Course

### 3.1 Course Structure

**File:** `artifact-demos/course.json`

```json
{
  "id": "artifact-demos",
  "title": "🔬 Artifact Demos",
  "description": "Demonstration of artifact system capabilities - Testing playground",
  "version": "1.0",
  "author": "System",
  "icon": "🔬",
  "category": "demo",
  "visibility": "always",
  "order": 999,
  "modules": [
    {
      "id": "demos",
      "title": "Demonstrations",
      "description": "Examples and templates showcase",
      "order": 1,
      "lessons": [
        {
          "id": "01-introduction",
          "title": "Introduction to Artifacts",
          "file": "01-introduction.md",
          "order": 1
        },
        {
          "id": "02-plot-examples",
          "title": "Plot Examples",
          "file": "02-plot-examples.md",
          "order": 2
        },
        {
          "id": "03-calculator-examples",
          "title": "Calculator Examples",
          "file": "03-calculator-examples.md",
          "order": 3
        },
        {
          "id": "04-advanced-features",
          "title": "Advanced Features",
          "file": "04-advanced-features.md",
          "order": 4
        },
        {
          "id": "05-template-gallery",
          "title": "Template Gallery",
          "file": "05-template-gallery.md",
          "order": 5
        }
      ]
    }
  ]
}
```

---

### 3.2 Demo Lessons

#### Lesson 1: Introduction

**File:** `artifact-demos/demos/01-introduction.md`

```markdown
# Introduction to Artifacts

Welcome to the Artifact Demos course! This is a **testing playground** for the artifact system.

## What are Artifacts?

Artifacts are interactive components that enhance learning through:

- 📊 **Interactive Charts** - Visualize data with Plotly.js
- 🧮 **Calculators** - Perform calculations with Math.js
- 💻 **Code Demos** - Live HTML/CSS/JS examples
- 🖼️ **Images** - Visual content galleries

## How to Use This Course

This course demonstrates the platform's capabilities:

1. Click artifact links to open interactive components
2. Experiment with parameters and settings
3. See examples of different artifact types
4. Learn how artifacts enhance education

## Note

🚧 This is a **demonstration course** - not production content.  
Real courses will have educational content instead of technical demos.

## Next Steps

Continue to the next lesson to see plot examples!

[Next: Plot Examples →](lesson:02-plot-examples)
```

---

#### Lesson 2: Plot Examples

**File:** `artifact-demos/demos/02-plot-examples.md`

```markdown
# Plot Examples

Interactive charts and graphs using Plotly.js.

## Basic Charts

### Line Chart

Simple line chart with data points:

[📊 Open Line Chart](artifact:template:line-chart)

**Use cases:** Time series, trends, continuous data

---

### Scatter Plot

Scatter plot for showing correlations:

[📊 Open Scatter Plot](artifact:template:scatter-plot)

**Use cases:** Correlations, data distributions, patterns

---

### Bar Chart

Bar chart for comparisons:

[📊 Open Bar Chart](artifact:template:bar-chart)

**Use cases:** Comparisons, categories, discrete data

---

## Advanced Charts

### Multi-Line Chart

Multiple data series on one chart:

[📊 Open Multi-Line Chart](artifact:template:multi-line)

**Use cases:** Comparing trends, multiple variables

---

## Engineering Charts (Future)

### P-V Diagram

Thermodynamic cycle visualization:

[📊 Open P-V Diagram](artifact:template:pv-diagram)

**Use cases:** Engine cycles, thermodynamics, compression

*(Template ready for future use - requires engine course content)*

---

## What You Can Do

With plot artifacts, you can:

- ✅ Zoom and pan to explore data
- ✅ Hover over points for details
- ✅ Export charts as images
- ✅ Toggle data series on/off
- ✅ Customize appearance

## Next Steps

Continue to calculator examples!

[Next: Calculator Examples →](lesson:03-calculator-examples)
```

---

#### Lesson 3: Calculator Examples

**File:** `artifact-demos/demos/03-calculator-examples.md`

```markdown
# Calculator Examples

Interactive calculators using Math.js for live calculations.

## Basic Calculators

### Formula Calculator

Generic calculator for any formula:

[🧮 Open Formula Calculator](artifact:template:generic-formula)

**Use cases:** Quick calculations, formula evaluation

---

### Unit Converter

Convert between different units:

[🧮 Open Unit Converter](artifact:template:unit-converter)

**Use cases:** Unit conversion, standardization

---

### Equation Solver

Solve mathematical equations:

[🧮 Open Equation Solver](artifact:template:equation-solver)

**Use cases:** Finding solutions, solving for variables

---

## Engineering Calculators (Future)

### Compression Ratio Calculator

Calculate engine compression ratio:

[🧮 Open Compression Ratio Calculator](artifact:template:compression-ratio)

**Inputs:**
- Bore diameter (mm)
- Stroke length (mm)
- Combustion chamber volume (cm³)

**Outputs:**
- Displacement per cylinder (cm³)
- Compression ratio (:1)

*(Template ready for future use - requires engine course content)*

---

### Otto Cycle Efficiency

Calculate theoretical efficiency:

[🧮 Open Otto Efficiency Calculator](artifact:template:otto-efficiency)

**Inputs:**
- Compression ratio
- Specific heat ratio (γ)

**Outputs:**
- Theoretical efficiency (%)
- Practical efficiency estimate (%)

*(Template ready for future use - requires engine course content)*

---

## What You Can Do

With calculator artifacts, you can:

- ✅ Adjust inputs with sliders
- ✅ See live calculation results
- ✅ View formulas used
- ✅ Change units dynamically
- ✅ Save calculations

## Next Steps

Continue to advanced features!

[Next: Advanced Features →](lesson:04-advanced-features)
```

---

#### Lesson 4: Advanced Features

**File:** `artifact-demos/demos/04-advanced-features.md`

```markdown
# Advanced Features

Advanced artifact capabilities and combinations.

## Combining Artifacts

### Plot + Calculator Combo

Change calculator inputs and see plot update:

[🧮 Quadratic Function Calculator](artifact:template:quadratic-calc)

This calculator also generates a plot of the function!

---

## Custom Artifacts

### Interactive Simulation

Coming soon: Real-time simulations

### 3D Visualizations

Coming soon: Three.js 3D models

---

## AI Integration

### AI-Generated Artifacts

Ask the AI to create charts or calculators for you:

**Example prompts:**
- "Create a line chart showing temperature over 24 hours"
- "Make a calculator for area of a circle"
- "Show a bar chart comparing sales data"

The AI will generate artifact config and open it automatically!

---

## Saving & Sharing

### Save Your Work

Modify any artifact and save it:

1. Open artifact from template
2. Modify parameters/data
3. Click "Save Artifact"
4. Get unique ID for future reference

### Link to Saved Artifacts

After saving, you can link to it in lessons:

```markdown
[📊 My Saved Chart](artifact:saved:20251018123456-abc123)
```

---

## Next Steps

Browse the complete template gallery!

[Next: Template Gallery →](lesson:05-template-gallery)
```

---

#### Lesson 5: Template Gallery

**File:** `artifact-demos/demos/05-template-gallery.md`

```markdown
# Template Gallery

Complete collection of available templates.

## 📊 Plot Templates

### Basic Charts
- [Line Chart](artifact:template:line-chart) - Simple line chart
- [Scatter Plot](artifact:template:scatter-plot) - Data points scatter
- [Bar Chart](artifact:template:bar-chart) - Comparative bars
- [Multi-Line](artifact:template:multi-line) - Multiple series

### Engineering (Future)
- [P-V Diagram](artifact:template:pv-diagram) - Pressure-Volume
- [T-S Diagram](artifact:template:ts-diagram) - Temperature-Entropy
- [Efficiency Curve](artifact:template:efficiency-curve) - Performance

---

## 🧮 Calculator Templates

### Generic
- [Formula Calculator](artifact:template:generic-formula) - Any formula
- [Unit Converter](artifact:template:unit-converter) - Convert units
- [Equation Solver](artifact:template:equation-solver) - Solve equations

### Engineering (Future)
- [Compression Ratio](artifact:template:compression-ratio) - Engine CR
- [Otto Efficiency](artifact:template:otto-efficiency) - Cycle efficiency
- [Power Calculator](artifact:template:power-calculator) - Engine power

---

## 💻 Code Templates

### Web Development
- [HTML/CSS Demo](artifact:template:html-demo) - Basic webpage
- [JavaScript Demo](artifact:template:js-demo) - Interactive JS
- [CSS Animation](artifact:template:css-animation) - Animations

---

## 🖼️ Image Templates

### Galleries
- [Image Gallery](artifact:template:image-gallery) - Multiple images
- [Comparison View](artifact:template:image-compare) - Before/after

---

## Creating Your Own

Want to create a new template?

1. Start from existing template
2. Modify configuration
3. Save as new template
4. Add to template library

**Template creation guide:** Coming soon

---

## Questions?

This is a testing playground. Experiment freely!

Real courses will use these templates for educational content.
```

---

## 4. Template Creation Guide

### 4.1 Creating a New Plot Template

**Step-by-step:**

1. **Copy existing template** as starting point:
   ```bash
   cp artifact-templates/plots/line-chart.json \
      artifact-templates/plots/my-template.json
   ```

2. **Edit template config:**
   - Change `id` to unique value
   - Update `name` and `description`
   - Modify `data` array for your plot
   - Adjust `layout` settings
   - Add custom `parameters` if needed

3. **Test template:**
   - Add link in demo lesson
   - Open in artifact viewer
   - Verify rendering
   - Test customization options

4. **Register template:**
   - Add to template registry (see Integration section)
   - Document in README

---

### 4.2 Creating a New Calculator Template

**Step-by-step:**

1. **Copy existing template**:
   ```bash
   cp artifact-templates/calculators/generic-formula.json \
      artifact-templates/calculators/my-calculator.json
   ```

2. **Define inputs:**
   - List all input parameters
   - Set types (number, slider, select)
   - Define min/max/default values
   - Add units and descriptions

3. **Write formulas:**
   - Use Math.js syntax
   - Reference input names
   - Add units to results
   - Set precision (decimal places)

4. **Test calculations:**
   - Try edge cases (min, max, zero)
   - Verify formula correctness
   - Check unit conversions
   - Test error handling

5. **Register and document**

---

### 4.3 Template Naming Conventions

**IDs:** kebab-case
- ✅ `line-chart`
- ✅ `compression-ratio`
- ❌ `LineChart`
- ❌ `compression_ratio`

**Files:** match ID + extension
- `line-chart.json`
- `compression-ratio.json`

**Names:** Title Case
- "Line Chart"
- "Compression Ratio Calculator"

---

## 5. Integration with Main App

### 5.1 Backend Loading

**File:** `backend/services/template_service.py` (create new)

```python
import json
import os
from pathlib import Path
from typing import Dict, List, Optional

TEMPLATES_DIR = Path(__file__).parent.parent / "data" / "artifact-templates"

class TemplateService:
    def __init__(self):
        self.templates: Dict[str, dict] = {}
        self.load_all_templates()
    
    def load_all_templates(self):
        """Load all templates from directories"""
        for category in ["plots", "calculators", "examples"]:
            category_dir = TEMPLATES_DIR / category
            if not category_dir.exists():
                continue
            
            for file in category_dir.glob("*.json"):
                with open(file, 'r', encoding='utf-8') as f:
                    template = json.load(f)
                    self.templates[template['id']] = template
    
    def get_template(self, template_id: str) -> Optional[dict]:
        """Get template by ID"""
        return self.templates.get(template_id)
    
    def list_templates(self, category: Optional[str] = None) -> List[dict]:
        """List all templates, optionally filtered by category"""
        templates = list(self.templates.values())
        if category:
            templates = [t for t in templates if t.get('category') == category]
        return templates

# Global instance
template_service = TemplateService()
```

---

### 5.2 Backend API Endpoints

**File:** `backend/main.py` (add new endpoints)

```python
from services.template_service import template_service

@app.get("/artifacts/templates", tags=["Artifacts"])
async def list_templates(category: Optional[str] = None):
    """
    List all available artifact templates
    
    Query params:
    - category: Filter by category (optional)
    """
    templates = template_service.list_templates(category)
    return {"templates": templates}

@app.get("/artifacts/templates/{template_id}", tags=["Artifacts"])
async def get_template(template_id: str):
    """
    Get artifact template by ID
    """
    template = template_service.get_template(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@app.post("/artifacts/from-template", tags=["Artifacts"])
async def create_from_template(template_id: str, customizations: Optional[dict] = None):
    """
    Create artifact instance from template
    
    Body:
    - template_id: Template identifier
    - customizations: Optional config overrides
    """
    template = template_service.get_template(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Merge customizations with template config
    config = {**template['config']}
    if customizations:
        config.update(customizations)
    
    # Create artifact instance
    artifact = Artifact(
        id=_generate_artifact_id(),
        title=template['name'],
        type=template['type'],
        config=config,
        source='template',
        tags=template.get('tags', []),
        created_at=datetime.utcnow().isoformat() + "Z",
        updated_at=datetime.utcnow().isoformat() + "Z"
    )
    
    return artifact
```

---

### 5.3 Frontend Template Registry

**File:** `frontend/src/utils/artifactTemplates.js`

```javascript
// Template loader
export async function loadTemplate(templateId) {
  try {
    const response = await fetch(`/api/artifacts/templates/${templateId}`);
    if (!response.ok) {
      throw new Error(`Template not found: ${templateId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load template:', error);
    throw error;
  }
}

// List all templates
export async function listTemplates(category = null) {
  const url = category 
    ? `/api/artifacts/templates?category=${category}`
    : '/api/artifacts/templates';
  
  const response = await fetch(url);
  const data = await response.json();
  return data.templates;
}

// Create artifact from template
export async function createFromTemplate(templateId, customizations = null) {
  const response = await fetch('/api/artifacts/from-template', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ template_id: templateId, customizations })
  });
  
  if (!response.ok) {
    throw new Error('Failed to create artifact from template');
  }
  
  return await response.json();
}
```

---

### 5.4 Demo Course in LEFT Sidebar

**Update:** `backend/services/context_service.py`

```python
# Add demo course to lessons list
def get_all_lessons(self):
    lessons = []
    
    # Load regular courses
    lessons.extend(self._load_regular_courses())
    
    # Load demo course
    demo_course = self._load_demo_course()
    if demo_course:
        lessons.append(demo_course)
    
    return lessons

def _load_demo_course(self):
    """Load artifact demo course"""
    demo_dir = self.lessons_dir.parent / "artifact-demos"
    if not demo_dir.exists():
        return None
    
    course_file = demo_dir / "course.json"
    if not course_file.exists():
        return None
    
    with open(course_file, 'r', encoding='utf-8') as f:
        course_data = json.load(f)
    
    return course_data
```

**Result in LEFT sidebar:**
```
Courses:
├── AI Web Learning
├── Project Setup Guide
├── Web Design Fundamentals
└── 🔬 Artifact Demos          ← NEW
    └── Demonstrations
        ├── Introduction
        ├── Plot Examples
        ├── Calculator Examples
        ├── Advanced Features
        └── Template Gallery
```

---

## 6. Migration to Production

### 6.1 Removing Demo Course

When launching production (e.g., engine school):

**Option 1: Hide in UI**
```python
# In context_service.py
def _load_demo_course(self):
    if os.getenv('SHOW_DEMOS', 'false') == 'true':
        # Load demo course
    else:
        return None  # Hide in production
```

**Option 2: Delete directory**
```bash
# Simply remove demo course directory
rm -rf backend/data/artifact-demos/
```

**Option 3: Keep but mark hidden**
```json
// In course.json
{
  "visibility": "hidden",  // Don't show in course tree
  ...
}
```

---

### 6.2 Reusing Templates

Templates are **independent** and reusable:

1. Keep `artifact-templates/` directory
2. Create new templates for production content:
   - Engine diagrams
   - Thermodynamic calculators
   - Performance charts
3. Update template names/descriptions
4. Remove unused templates

**Example transformation:**
```
Before (testing):
artifact-templates/plots/line-chart.json

After (production):
artifact-templates/plots/torque-curve.json
artifact-templates/plots/pv-diagram-otto.json
artifact-templates/calculators/compression-ratio.json
```

---

## 7. Implementation Plan

### Phase 1: Create Directory Structure

**Goal:** Set up folders and README

**Tasks:**
1. Create `backend/data/artifact-templates/` directory
2. Create subdirectories: `plots/`, `calculators/`, `examples/`
3. Create `artifact-templates/README.md`
4. Create `backend/data/artifact-demos/` directory
5. Create `artifact-demos/course.json`

**Success Criteria:**
- [ ] All directories exist
- [ ] README documents structure
- [ ] Course metadata file created

---

### Phase 2: Create Basic Templates

**Goal:** Populate template library with examples

**Tasks:**
1. Create `plots/line-chart.json`
2. Create `plots/scatter-plot.json`
3. Create `plots/bar-chart.json`
4. Create `calculators/generic-formula.json`
5. Create `calculators/unit-converter.json`
6. Validate JSON syntax

**Success Criteria:**
- [ ] 5 templates created
- [ ] All templates are valid JSON
- [ ] Templates follow format spec

---

### Phase 3: Create Demo Lessons

**Goal:** Write demonstration lessons

**Tasks:**
1. Create `01-introduction.md`
2. Create `02-plot-examples.md`
3. Create `03-calculator-examples.md`
4. Create `04-advanced-features.md`
5. Create `05-template-gallery.md`
6. Add artifact links in lessons

**Success Criteria:**
- [ ] 5 lessons created
- [ ] Lessons include artifact links
- [ ] Links reference existing templates
- [ ] Markdown formatting correct

---

### Phase 4: Backend Integration

**Goal:** Load templates and demo course

**Tasks:**
1. Create `backend/services/template_service.py`
2. Add template loading logic
3. Add API endpoints for templates
4. Update context service to load demo course
5. Test API endpoints

**Success Criteria:**
- [ ] Templates load on startup
- [ ] API endpoints work
- [ ] Demo course appears in course list
- [ ] No errors in logs

---

### Phase 5: Frontend Integration

**Goal:** Display demo course and handle template links

**Tasks:**
1. Create `frontend/src/utils/artifactTemplates.js`
2. Update LessonViewer to parse template links
3. Test template loading in UI
4. Verify demo course appears in LEFT sidebar
5. Test clicking template links

**Success Criteria:**
- [ ] Demo course visible in course tree
- [ ] Can navigate to demo lessons
- [ ] Template links render correctly
- [ ] Clicking link loads template
- [ ] Artifact opens in CENTER

---

### Phase 6: Testing & Documentation

**Goal:** Verify everything works

**Tasks:**
1. Test all templates render correctly
2. Test all demo lessons load
3. Test template links in lessons
4. Update main README with demo info
5. Document template creation process

**Success Criteria:**
- [ ] All templates work
- [ ] All lessons render
- [ ] Links open artifacts correctly
- [ ] Documentation complete

---

## 8. Implementation Checklist

### Setup ✅
- [ ] Create `artifact-templates/` directory structure
- [ ] Create `artifact-demos/` directory structure
- [ ] Write README for templates
- [ ] Create course.json for demos

### Templates ✅
- [ ] Create 3 plot templates (line, scatter, bar)
- [ ] Create 2 calculator templates (formula, converter)
- [ ] Validate all template JSON
- [ ] Document template format

### Demo Lessons ✅
- [ ] Write introduction lesson
- [ ] Write plot examples lesson
- [ ] Write calculator examples lesson
- [ ] Write advanced features lesson
- [ ] Write template gallery lesson
- [ ] Add artifact links to lessons

### Backend ✅
- [ ] Create template service
- [ ] Implement template loading
- [ ] Add API endpoints
- [ ] Update context service for demo course
- [ ] Test API responses

### Frontend ✅
- [ ] Create template utility functions
- [ ] Parse template links in Markdown
- [ ] Display demo course in sidebar
- [ ] Test template loading
- [ ] Test artifact opening from links

### Testing ✅
- [ ] Test all templates render
- [ ] Test all demo lessons
- [ ] Test template links
- [ ] Test error handling
- [ ] Test on different screen sizes

---

## 9. Future Enhancements

### Template Manager UI

**Create admin interface for templates:**
- Browse template library
- Preview templates
- Edit template configs
- Create new templates from UI
- Duplicate/customize existing templates

### Template Marketplace

**Share templates between courses:**
- Export templates as files
- Import templates from files
- Template versioning
- Community templates (future)

### Advanced Templates

**More sophisticated templates:**
- Multi-step calculators (wizards)
- Animated plots (time-based)
- Interactive 3D visualizations
- Compound artifacts (plot + calculator)

---

## Document End

**Prerequisites:**
1. Layout Redesign (Roadmap A) - MUST be done first
2. Artifact System (Roadmap B) - MUST be done second

**This Roadmap (C) should be implemented:**
- After Roadmap B Phase 1-4 (libraries and types are ready)
- Before Roadmap B Phase 5-6 (templates needed for testing)

**Suggested Order:**
1. Roadmap A (Layout) - Implement fully
2. Roadmap B Phase 1-4 (Artifact types and components)
3. **Roadmap C (This document)** - Set up templates and demos
4. Roadmap B Phase 5-7 (Complete artifact features)

**Questions?** Review documentation and ask before implementation!

---

**Prepared by:** Claude AI (Sonnet 4.5)  
**For:** Claude Code Agent  
**Project:** AI Learning Agent - Templates & Demos  
**Depends on:** Layout Redesign + Artifact System basics