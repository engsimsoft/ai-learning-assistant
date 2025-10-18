# AI Learning Agent - Artifact System Roadmap

**Document Version:** 1.0  
**Date:** 2025-10-18  
**For:** Claude Code Implementation  
**Project:** AI Learning Agent - Artifact System (Phase B)  
**Prerequisites:** Layout Redesign (Roadmap A) must be completed first

---

## Executive Summary

This document describes the implementation of a **powerful, universal Artifact system** for the AI Learning Agent platform.

**Goal:** Create a flexible artifact framework that supports:
- Interactive diagrams and charts (Plotly.js)
- Mathematical calculators (Math.js)
- 3D visualizations (Three.js) - future
- Reusable templates for different subjects

**Current Status:** MVP artifacts exist (Markdown, Code, Images) but lack visualization libraries and advanced interactivity.

**Target Use Cases:**
- Programming education (current testing)
- Engineering education (future: internal combustion engines, thermodynamics)
- Any subject requiring interactive visualizations

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Required Libraries](#2-required-libraries)
3. [Artifact Type Architecture](#3-artifact-type-architecture)
4. [Implementation Phases](#4-implementation-phases)
5. [Artifact Templates](#5-artifact-templates)
6. [Markdown Link Integration](#6-markdown-link-integration)
7. [Backend Integration](#7-backend-integration)
8. [Testing Strategy](#8-testing-strategy)
9. [Future Enhancements](#9-future-enhancements)

---

## 1. Current State Analysis

### What Exists (MVP)

**Artifact Types:**
- ✅ **Markdown** - text editor + preview
- ✅ **Code** - HTML/CSS/JS editors + iframe sandbox
- ✅ **Images** - upload/paste, base64 storage

**Current Problems:**
- ❌ No visualization libraries installed
- ❌ No interactive charts/graphs capability
- ❌ No mathematical calculation support
- ❌ Limited to basic demos (HTML/CSS/JS only)
- ❌ No artifact links in lessons

**Files:**
- `frontend/src/components/rightSidebar/ArtifactCanvas.jsx` (364 lines)
- `frontend/src/components/rightSidebar/ArtifactCanvas.css` (279 lines)
- `backend/main.py` - Artifacts API (lines 403-563)
- `backend/models.py` - Artifact models (lines 133-189)

---

## 2. Required Libraries

### Phase 0: Install Dependencies

**Priority: HIGH - Install FIRST before any artifact work**

```bash
# Navigate to frontend directory
cd frontend

# Install visualization libraries
npm install plotly.js-dist-min      # Interactive charts/graphs (3.5MB minified)
npm install mathjs                   # Mathematical calculations (500KB)
npm install three                    # 3D visualizations (600KB) - optional for now

# For better UI controls (if not already installed)
npm install @radix-ui/react-slider   # For parameter sliders
npm install @radix-ui/react-select   # For dropdowns
```

**Verification:**
After installation, check `frontend/package.json`:
```json
{
  "dependencies": {
    "plotly.js-dist-min": "^2.x.x",
    "mathjs": "^12.x.x",
    "three": "^0.160.x"
  }
}
```

---

### Library Overview

#### Plotly.js
**Purpose:** Interactive charts, graphs, diagrams

**Use Cases:**
- Line charts, scatter plots, bar charts
- P-V diagrams (Pressure-Volume for engines)
- Temperature graphs, phase diagrams
- 2D/3D surface plots

**Why Plotly:**
- ✅ Built-in interactivity (zoom, pan, hover)
- ✅ Professional quality output
- ✅ Easy to use API
- ✅ Works great with React
- ✅ Perfect for engineering/scientific visualizations

**Example:**
```javascript
import Plotly from 'plotly.js-dist-min';

const data = [{
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  type: 'scatter'
}];

Plotly.newPlot('myDiv', data);
```

---

#### Math.js
**Purpose:** Mathematical calculations, unit conversions

**Use Cases:**
- Solve equations
- Matrix operations
- Unit conversions (kPa → atm, L → m³)
- Complex calculations
- Formula evaluation

**Why Math.js:**
- ✅ Comprehensive math library
- ✅ Unit system built-in
- ✅ Expression parser
- ✅ Symbolic math support
- ✅ Perfect for calculators

**Example:**
```javascript
import * as math from 'mathjs';

// Solve equation
const result = math.evaluate('1.2 * (2 + 4.5)');  // 7.8

// Unit conversion
const pressure = math.unit('10 atm').to('kPa');  // 1013.25 kPa

// Compression ratio calculation
const compressionRatio = (Vd + Vc) / Vc;
const efficiency = 1 - (1 / Math.pow(compressionRatio, gamma - 1));
```

---

#### Three.js (Optional - Future)
**Purpose:** 3D visualizations and animations

**Use Cases:**
- 3D engine models
- Animated mechanisms
- Interactive 3D diagrams
- Spatial visualizations

**Status:** Install now but implement later (Phase 7+)

---

## 3. Artifact Type Architecture

### New Type System

**Extend existing 3 types (Markdown, Code, Images) with 2 new types:**

```
Artifact Types:
├── Existing (MVP)
│   ├── Markdown       (text editor + preview)
│   ├── Code           (HTML/CSS/JS + iframe)
│   └── Images         (upload/paste gallery)
│
└── New (Phase B)
    ├── InteractivePlot (Plotly.js charts/diagrams)
    └── Calculator      (Math.js calculations with UI)
```

### Type Definitions

Update `backend/models.py`:

```python
ArtifactType = Literal["markdown", "code", "images", "plot", "calculator"]
```

---

### Type 1: InteractivePlot

**Purpose:** Interactive charts, graphs, diagrams using Plotly

**Data Structure:**
```json
{
  "type": "plot",
  "title": "P-V Diagram - Otto Cycle",
  "config": {
    "plotType": "scatter" | "line" | "bar" | "surface",
    "data": [...],
    "layout": {...},
    "interactive": true
  }
}
```

**UI Features:**
- Plotly chart renders in artifact viewer
- Built-in controls (zoom, pan, reset)
- Hover tooltips with data values
- Export chart as PNG/SVG
- Responsive sizing

**Template Examples:**
- P-V Diagram (Pressure-Volume)
- Temperature vs Time
- Efficiency vs Compression Ratio
- Torque/Power curves

---

### Type 2: Calculator

**Purpose:** Mathematical calculators with input controls and live results

**Data Structure:**
```json
{
  "type": "calculator",
  "title": "Compression Ratio Calculator",
  "config": {
    "inputs": [
      {
        "name": "bore",
        "label": "Bore (mm)",
        "type": "number",
        "min": 50,
        "max": 150,
        "default": 86,
        "unit": "mm"
      },
      {
        "name": "stroke",
        "label": "Stroke (mm)",
        "type": "number",
        "min": 50,
        "max": 150,
        "default": 86,
        "unit": "mm"
      }
    ],
    "formulas": [
      {
        "name": "displacement",
        "expression": "PI * (bore/2)^2 * stroke / 1000",
        "label": "Displacement per cylinder",
        "unit": "cm³"
      },
      {
        "name": "compressionRatio",
        "expression": "(displacement + combustionVolume) / combustionVolume",
        "label": "Compression Ratio"
      }
    ]
  }
}
```

**UI Features:**
- Input sliders/number fields (shadcn/ui)
- Live calculation (updates on input change)
- Results displayed with units
- Formula visualization (show the equation)
- Step-by-step calculation breakdown (optional)

**Template Examples:**
- Compression Ratio Calculator
- Otto Cycle Efficiency Calculator
- Power/Torque Calculator
- Fuel Consumption Calculator

---

## 4. Implementation Phases

### Phase 1: Setup Libraries (Priority: CRITICAL)

**Goal:** Install and verify all required libraries

**Steps:**
1. Install npm packages (see section 2)
2. Verify imports work in a test component
3. Create basic Plotly example
4. Create basic Math.js example
5. Document any issues/conflicts

**Files:**
- `frontend/package.json` (updated)
- `frontend/src/components/test/PlotlyTest.jsx` (create for testing)
- `frontend/src/components/test/MathTest.jsx` (create for testing)

**Success Criteria:**
- [ ] All libraries installed without errors
- [ ] Can import and use Plotly
- [ ] Can import and use Math.js
- [ ] No version conflicts
- [ ] Test components render correctly

---

### Phase 2: Extend Artifact Type System (Priority: HIGH)

**Goal:** Add new artifact types to backend and frontend

**Backend Tasks:**
1. Update `ArtifactType` in `backend/models.py`
2. Add validation for `plot` and `calculator` types
3. Update `POST /artifacts` to handle new types
4. Update storage format (JSON config for plot/calculator)

**Frontend Tasks:**
1. Update `ArtifactCanvas.jsx` to handle 5 types (not 3)
2. Create new tabs: Markdown | Code | Images | Plot | Calculator
3. Add routing logic for new types

**Files to Modify:**
- `backend/models.py`
- `backend/main.py` (artifact endpoints)
- `frontend/src/components/rightSidebar/ArtifactCanvas.jsx`

**Success Criteria:**
- [ ] Backend accepts `type: "plot"` and `type: "calculator"`
- [ ] Frontend shows 5 tabs
- [ ] Type switching works correctly
- [ ] No breaking changes to existing types

---

### Phase 3: InteractivePlot Component (Priority: HIGH)

**Goal:** Create Plotly-based interactive chart component

**Create New Component:**
`frontend/src/components/artifacts/InteractivePlot.jsx`

**Features:**
1. Render Plotly chart from config
2. Support multiple chart types (scatter, line, bar)
3. Responsive sizing (fills container)
4. Toolbar: Export PNG, Reset view, Fullscreen
5. Handle plot updates (when data changes)

**Component Structure:**
```jsx
import Plotly from 'plotly.js-dist-min';
import { useEffect, useRef, useState } from 'react';

export default function InteractivePlot({ config, onUpdate }) {
  const plotRef = useRef(null);
  
  useEffect(() => {
    // Render Plotly chart
    Plotly.newPlot(plotRef.current, config.data, config.layout);
  }, [config]);
  
  return (
    <div className="interactive-plot">
      <div className="plot-toolbar">
        {/* Export, Reset, Fullscreen buttons */}
      </div>
      <div ref={plotRef} className="plot-container" />
    </div>
  );
}
```

**Integrate into ArtifactCanvas:**
```jsx
{mode === 'plot' && (
  <InteractivePlot 
    config={plotConfig}
    onUpdate={handlePlotUpdate}
  />
)}
```

**Success Criteria:**
- [ ] Can render basic line chart
- [ ] Can render scatter plot
- [ ] Charts are interactive (zoom, pan work)
- [ ] Responsive sizing works
- [ ] Export to PNG works

---

### Phase 4: Calculator Component (Priority: HIGH)

**Goal:** Create Math.js-based calculator with UI controls

**Create New Component:**
`frontend/src/components/artifacts/Calculator.jsx`

**Features:**
1. Render input controls from config (sliders, number inputs)
2. Live calculation using Math.js
3. Display results with units
4. Show formulas (optional)
5. Validation (min/max bounds)

**Component Structure:**
```jsx
import * as math from 'mathjs';
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

export default function Calculator({ config, onUpdate }) {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  
  useEffect(() => {
    // Calculate results when inputs change
    const newResults = {};
    config.formulas.forEach(formula => {
      try {
        const scope = { ...inputs, PI: Math.PI };
        newResults[formula.name] = math.evaluate(formula.expression, scope);
      } catch (e) {
        newResults[formula.name] = 'Error';
      }
    });
    setResults(newResults);
  }, [inputs, config]);
  
  return (
    <div className="calculator">
      <div className="calculator-inputs">
        {config.inputs.map(input => (
          <div key={input.name} className="input-group">
            <label>{input.label}</label>
            <Slider
              value={[inputs[input.name] || input.default]}
              onValueChange={(val) => setInputs({...inputs, [input.name]: val[0]})}
              min={input.min}
              max={input.max}
            />
            <span>{inputs[input.name] || input.default} {input.unit}</span>
          </div>
        ))}
      </div>
      
      <div className="calculator-results">
        {config.formulas.map(formula => (
          <div key={formula.name} className="result-item">
            <strong>{formula.label}:</strong>
            <span>{results[formula.name]} {formula.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Integrate into ArtifactCanvas:**
```jsx
{mode === 'calculator' && (
  <Calculator 
    config={calculatorConfig}
    onUpdate={handleCalculatorUpdate}
  />
)}
```

**Success Criteria:**
- [ ] Input sliders render correctly
- [ ] Calculations update live
- [ ] Results display with units
- [ ] Validation works (min/max)
- [ ] Math.js errors handled gracefully

---

### Phase 5: Artifact Templates (Priority: MEDIUM)

**Goal:** Create reusable templates for common use cases

**Create Templates Directory:**
```
frontend/src/components/artifacts/templates/
├── plots/
│   ├── PVDiagram.jsx           # Pressure-Volume diagram
│   ├── LineChart.jsx           # Basic line chart
│   └── ScatterPlot.jsx         # Basic scatter plot
└── calculators/
    ├── CompressionRatio.jsx    # Compression ratio calc
    └── Generic.jsx             # Generic calculator template
```

**Template Structure:**
Each template is a function that returns artifact config:

```javascript
// templates/calculators/CompressionRatio.js
export function createCompressionRatioCalculator() {
  return {
    type: 'calculator',
    title: 'Compression Ratio Calculator',
    config: {
      inputs: [
        {
          name: 'bore',
          label: 'Bore diameter',
          type: 'number',
          min: 50,
          max: 150,
          default: 86,
          unit: 'mm'
        },
        {
          name: 'stroke',
          label: 'Stroke length',
          type: 'number',
          min: 50,
          max: 150,
          default: 86,
          unit: 'mm'
        },
        {
          name: 'combustionVolume',
          label: 'Combustion chamber volume',
          type: 'number',
          min: 30,
          max: 100,
          default: 50,
          unit: 'cm³'
        }
      ],
      formulas: [
        {
          name: 'displacement',
          expression: 'PI * (bore/2)^2 * stroke / 1000',
          label: 'Displacement per cylinder',
          unit: 'cm³'
        },
        {
          name: 'compressionRatio',
          expression: '(displacement + combustionVolume) / combustionVolume',
          label: 'Compression Ratio',
          unit: ':1'
        }
      ]
    }
  };
}
```

**Usage in Lessons:**
```markdown
Calculate the compression ratio of your engine:

[🧮 Compression Ratio Calculator](artifact:template:compression-ratio)
```

**Success Criteria:**
- [ ] 3-5 plot templates created
- [ ] 3-5 calculator templates created
- [ ] Templates work correctly
- [ ] Easy to add new templates

---

### Phase 6: Markdown Link Integration (Priority: MEDIUM)

**Goal:** Support artifact links in lesson Markdown

**Syntax:**
```markdown
[Display Text](artifact:artifact-id)
[Display Text](artifact:template:template-name)
```

**Examples:**
```markdown
View the interactive P-V diagram:
[📊 P-V Diagram](artifact:pv-diagram-otto-cycle)

Calculate compression ratio:
[🧮 Calculator](artifact:template:compression-ratio)
```

**Implementation:**

**Step 1: Custom Markdown Component**

Modify `frontend/src/components/center/LessonViewer.jsx`:

```jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArtifactLink({ href, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Parse artifact:id or artifact:template:name
    const match = href.match(/^artifact:(template:)?(.+)$/);
    if (!match) return;
    
    const isTemplate = !!match[1];
    const idOrName = match[2];
    
    if (isTemplate) {
      // Load template
      openArtifactFromTemplate(idOrName);
    } else {
      // Load saved artifact
      openArtifactById(idOrName);
    }
  };
  
  return (
    <button 
      className="artifact-link-button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

// In ReactMarkdown component:
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    a: ({ href, children }) => {
      if (href?.startsWith('artifact:')) {
        return <ArtifactLink href={href}>{children}</ArtifactLink>;
      }
      return <a href={href}>{children}</a>;
    }
  }}
>
  {lessonContent}
</ReactMarkdown>
```

**Step 2: Template Registry**

Create `frontend/src/utils/artifactTemplates.js`:

```javascript
import { createCompressionRatioCalculator } from '../components/artifacts/templates/calculators/CompressionRatio';
import { createPVDiagram } from '../components/artifacts/templates/plots/PVDiagram';

export const ARTIFACT_TEMPLATES = {
  'compression-ratio': createCompressionRatioCalculator,
  'pv-diagram': createPVDiagram,
  // ... more templates
};

export function loadTemplate(name) {
  const template = ARTIFACT_TEMPLATES[name];
  if (!template) {
    throw new Error(`Template not found: ${name}`);
  }
  return template();
}
```

**Step 3: Event Integration**

When link clicked:
```javascript
function openArtifactFromTemplate(templateName) {
  const config = loadTemplate(templateName);
  
  // Dispatch event to open artifact in CENTER
  window.dispatchEvent(new CustomEvent('artifact:open', {
    detail: {
      ...config,
      source: 'lesson'
    }
  }));
}
```

**Success Criteria:**
- [ ] Links render as buttons in lessons
- [ ] Click loads artifact correctly
- [ ] Works with saved artifacts (by ID)
- [ ] Works with templates (by name)
- [ ] Proper error handling for missing artifacts

---

### Phase 7: Backend Extensions (Priority: LOW)

**Goal:** Extend backend to store plot/calculator configs

**Tasks:**

1. **Storage Format:**
   - For `type: "plot"` → save config as JSON in frontmatter
   - For `type: "calculator"` → save config as JSON in frontmatter

2. **API Updates:**
   - `POST /artifacts` validates plot/calculator config
   - `GET /artifacts/{id}` returns full config
   - Add endpoint: `GET /artifacts/templates` (list available templates)

3. **Template Storage:**
   - Store templates as JSON files in `backend/data/artifact_templates/`
   - Load templates on startup
   - Allow dynamic template loading

**Files to Modify:**
- `backend/main.py`
- `backend/models.py`
- Create: `backend/data/artifact_templates/`

**Success Criteria:**
- [ ] Can save plot artifacts to backend
- [ ] Can save calculator artifacts to backend
- [ ] Can load artifacts by ID
- [ ] Templates accessible via API

---

## 5. Artifact Templates

### Template Categories

#### Category 1: Plots (Plotly)

**Basic Templates:**
1. **Line Chart** - time series, trends
2. **Scatter Plot** - correlation, data points
3. **Bar Chart** - comparisons, categories
4. **P-V Diagram** - thermodynamic cycles (Otto, Diesel)
5. **Multi-line Chart** - compare multiple datasets

**Advanced Templates (Future):**
- 3D Surface plots
- Contour plots
- Heatmaps
- Polar plots

---

#### Category 2: Calculators (Math.js)

**Engineering Calculators:**
1. **Compression Ratio Calculator**
2. **Otto Cycle Efficiency Calculator**
3. **Power/Torque Calculator**
4. **Fuel Consumption Calculator**
5. **Valve Timing Calculator**

**Generic Templates:**
- Unit Converter
- Formula Evaluator
- Equation Solver

---

### Template Design Principles

1. **Self-contained:** All data/config in template
2. **Configurable:** Easy to customize parameters
3. **Educational:** Show formulas, explain results
4. **Interactive:** Immediate visual feedback
5. **Professional:** Clean UI, proper units, error handling

---

## 6. Markdown Link Integration

### Syntax Design

**Format:**
```markdown
[Display Text](artifact:type:identifier)
```

**Types:**
- `artifact:saved:id` - Load saved artifact by ID
- `artifact:template:name` - Load template by name

**Examples:**
```markdown
# Lesson: Thermodynamic Cycles

View the Otto cycle on a P-V diagram:
[📊 Interactive P-V Diagram](artifact:template:pv-diagram-otto)

Calculate the efficiency of your engine:
[🧮 Efficiency Calculator](artifact:template:otto-efficiency)

Or view a previously saved example:
[📊 Example: High Compression Engine](artifact:saved:20251018123456-abc123)
```

### Styling

**Artifact links should look distinct:**
- Button-like appearance
- Icon prefix (📊 for plots, 🧮 for calculators)
- Hover effect
- Disabled state (if artifact not available)

**CSS:**
```css
.artifact-link-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.artifact-link-button:hover {
  transform: translateY(-2px);
}
```

---

## 7. Backend Integration

### API Endpoints

**Existing (already implemented):**
- `POST /artifacts` - Create/save artifact
- `GET /artifacts` - List all artifacts
- `GET /artifacts/{id}` - Get artifact by ID

**New (to be added):**
- `GET /artifacts/templates` - List available templates
- `GET /artifacts/templates/{name}` - Get template config
- `POST /artifacts/from-template` - Create artifact from template

### Storage Structure

```
docs/artifacts/
├── {id}.md                        # Saved artifacts (existing)
├── {id}.html                      # Code artifacts (existing)
├── assets/                        # Images (existing)
│   └── {id}-{n}.{ext}
└── templates/                     # NEW: Template definitions
    ├── plots/
    │   ├── pv-diagram.json
    │   └── line-chart.json
    └── calculators/
        ├── compression-ratio.json
        └── otto-efficiency.json
```

### Template JSON Format

```json
{
  "id": "compression-ratio",
  "name": "Compression Ratio Calculator",
  "description": "Calculate compression ratio from engine dimensions",
  "category": "calculator",
  "version": "1.0",
  "config": {
    "inputs": [...],
    "formulas": [...]
  }
}
```

---

## 8. Testing Strategy

### Phase Testing

**After Phase 1 (Libraries):**
- [ ] Verify all imports work
- [ ] Create simple Plotly chart in test component
- [ ] Create simple Math.js calculation in test component
- [ ] Check bundle size (should be reasonable)

**After Phase 3 (InteractivePlot):**
- [ ] Render line chart from config
- [ ] Test interactivity (zoom, pan)
- [ ] Test export to PNG
- [ ] Test responsive sizing
- [ ] Test multiple chart types

**After Phase 4 (Calculator):**
- [ ] Render inputs correctly
- [ ] Test live calculations
- [ ] Test validation (min/max)
- [ ] Test error handling (invalid formulas)
- [ ] Test multiple formulas

**After Phase 5 (Templates):**
- [ ] Load template by name
- [ ] Verify template config is valid
- [ ] Test 3-5 different templates
- [ ] Ensure templates are reusable

**After Phase 6 (Markdown Links):**
- [ ] Parse artifact links correctly
- [ ] Open artifact on click
- [ ] Handle missing artifacts gracefully
- [ ] Test template links
- [ ] Test saved artifact links

### Integration Testing

**Full Workflow Tests:**

1. **Create artifact from template:**
   - Click link in lesson → template loads → artifact opens in CENTER

2. **Modify and save:**
   - Open template → modify parameters → save → get unique ID → can reopen

3. **AI creates artifact:**
   - Ask AI for demo → AI returns config → artifact opens → works correctly

4. **Link to saved artifact:**
   - Save artifact → copy ID → create link in lesson → link works

---

## 9. Future Enhancements

### Phase 8: Advanced Visualizations

**3D Visualizations (Three.js):**
- 3D engine models
- Animated mechanisms
- Interactive exploded views
- Spatial diagrams

**Complex Charts:**
- Multi-axis plots
- Real-time data streaming
- Animation sequences
- Synchronized charts

### Phase 9: Collaboration Features

**Shared Artifacts:**
- Share artifact link with others
- Public artifact gallery
- Community templates

**Versioning:**
- Save artifact versions
- Compare versions
- Rollback to previous version

### Phase 10: AI Integration

**AI-Generated Artifacts:**
- Ask AI to create plot from description
- AI suggests calculator for problem
- AI generates template from requirements

**Smart Templates:**
- Templates adapt to lesson context
- Pre-fill values from lesson
- Suggest related artifacts

---

## 10. Implementation Checklist

### Phase 1: Libraries ✅
- [ ] Install plotly.js-dist-min
- [ ] Install mathjs
- [ ] Install three (optional)
- [ ] Verify imports work
- [ ] Create test components
- [ ] Document any issues

### Phase 2: Type System ✅
- [ ] Update backend models (ArtifactType)
- [ ] Update backend validation
- [ ] Update frontend ArtifactCanvas (5 tabs)
- [ ] Test type switching
- [ ] Ensure backward compatibility

### Phase 3: InteractivePlot ✅
- [ ] Create InteractivePlot.jsx component
- [ ] Implement Plotly rendering
- [ ] Add toolbar (export, reset)
- [ ] Integrate into ArtifactCanvas
- [ ] Test multiple chart types
- [ ] Test responsiveness

### Phase 4: Calculator ✅
- [ ] Create Calculator.jsx component
- [ ] Implement input controls
- [ ] Implement Math.js calculations
- [ ] Add results display
- [ ] Integrate into ArtifactCanvas
- [ ] Test validation
- [ ] Test error handling

### Phase 5: Templates ✅
- [ ] Create templates directory structure
- [ ] Create 3 plot templates
- [ ] Create 3 calculator templates
- [ ] Create template registry
- [ ] Test template loading
- [ ] Document template creation

### Phase 6: Markdown Links ✅
- [ ] Implement custom link parser
- [ ] Create ArtifactLink component
- [ ] Implement template loading
- [ ] Implement saved artifact loading
- [ ] Style artifact links
- [ ] Test link functionality

### Phase 7: Backend ✅
- [ ] Update artifact storage for new types
- [ ] Add template API endpoints
- [ ] Store templates in backend
- [ ] Update artifact loading
- [ ] Test full save/load cycle

---

## 11. Success Criteria

### Must Have ✅
- [x] Plotly.js and Math.js installed and working
- [x] Can create interactive plots (line, scatter, bar)
- [x] Can create calculators with live calculations
- [x] Artifact links work in lessons
- [x] Templates system implemented
- [x] 5+ templates available (plots + calculators)
- [x] Save/load works for new types

### Should Have ✅
- [x] Professional UI for plots and calculators
- [x] Error handling for invalid configs
- [x] Template documentation
- [x] Examples in lessons

### Nice to Have 🎯
- [ ] 3D visualizations (Three.js)
- [ ] Animation sequences
- [ ] Template gallery UI
- [ ] AI-generated artifacts

---

## 12. Notes for Claude Code

### Architecture Principles

**Modularity:**
- Each artifact type is independent component
- Templates are pure functions (config generators)
- Easy to add new types/templates

**Reusability:**
- Templates can be used multiple times
- Configs can be copied and modified
- Components are composable

**Extensibility:**
- Easy to add new chart types
- Easy to create new templates
- Plugin system for future types

### Performance Considerations

**Bundle Size:**
- Plotly.js minified: ~3.5MB (large but necessary)
- Math.js: ~500KB
- Use code splitting if needed
- Lazy load components

**Rendering:**
- Debounce calculations in Calculator
- Use React.memo for expensive renders
- Optimize Plotly updates (don't recreate plot on every change)

### Error Handling

**Template Loading:**
- Graceful fallback if template not found
- Show user-friendly error message
- Log error details for debugging

**Calculation Errors:**
- Catch Math.js errors (invalid expressions)
- Show "Invalid formula" instead of crash
- Validate input ranges

**Plot Rendering:**
- Handle missing data gracefully
- Show loading state while rendering
- Catch Plotly errors

---

## 13. Migration Strategy

### For Existing Artifacts

**Backward Compatibility:**
- Existing artifacts (Markdown, Code, Images) continue to work
- No changes to existing saved artifacts
- Gradual migration to new types as needed

**Adding New Types:**
- New types are additive (not breaking changes)
- Old artifacts load correctly
- Type detection in backend

---

## Document End

**Next Steps:**
1. Complete Layout Redesign (Roadmap A) FIRST
2. Then start this Artifact System implementation
3. Begin with Phase 1 (install libraries)
4. Work through phases sequentially
5. Test thoroughly at each phase

**Questions?** Review documentation and ask before implementation!

---

**Prepared by:** Claude AI (Sonnet 4.5)  
**For:** Claude Code Agent  
**Project:** AI Learning Agent - Artifact System  
**Depends on:** Layout Redesign Roadmap (must be completed first)