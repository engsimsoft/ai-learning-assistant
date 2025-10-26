# Architecture Overview

## System Architecture

```
┌──────────────┐
│   Student    │  Asks question + selects model + selects lessons
└──────┬───────┘
       │
       ↓
┌────────────────────────────────────────────┐
│         React Frontend                     │
│  • ChatInterface                           │
│  • MessageList                             │
│  • InputForm                               │
│  • LessonSelector                          │
│  • ModelSelector                           │
└──────┬─────────────────────────────────────┘
       │ HTTP POST /chat
       │ { message, lesson_ids, model, history }
       ↓
┌────────────────────────────────────────────┐
│       FastAPI Backend                      │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  main.py                             │ │
│  │  • GET /lessons                      │ │
│  │  • GET /lessons/grouped              │ │
│  │  • GET /models                       │ │
│  │  • POST /chat                        │ │
│  │  • POST /context/preview             │ │
│  │  • CORS middleware                   │ │
│  └────────┬─────────────────────────────┘ │
│           │                                │
│  ┌────────▼─────────────────────────────┐ │
│  │  context_service.py                  │ │
│  │  • Loads 72 lessons                  │ │
│  │  • Builds context                    │ │
│  │  • Groups lessons by course/module   │ │
│  │  • Estimates tokens                  │ │
│  │  • Selects requested lessons         │ │
│  └────────┬─────────────────────────────┘ │
│           │                                │
│  ┌────────▼─────────────────────────────┐ │
│  │  openrouter_service.py               │ │
│  │  • Builds system prompt              │ │
│  │  • Selects model                     │ │
│  │  • Sends to OpenRouter               │ │
│  │  • Handles fallback                  │ │
│  │  • Returns response                  │ │
│  └────────┬─────────────────────────────┘ │
└───────────┼────────────────────────────────┘
            │
            ↓
   ┌────────────────────────────────────────┐
   │      OpenRouter API                    │
   │                                        │
   │  ┌──────────────────────────────────┐ │
   │  │ Claude 3.5 Sonnet                │ │
   │  │ GPT-4 Turbo                      │ │
   │  │ Gemini Pro                       │ │
   │  │ Llama 3 70B                      │ │
   │  │ ... and 100+ more models         │ │
   │  └──────────────────────────────────┘ │
   │                                        │
   │  • Unified API interface               │
   │  • Automatic fallback                  │
   │  • Load balancing                      │
   └────────────────────────────────────────┘
```

## Data Flow

### 1. Student Asks Question

```
Student: "What is REST API?"
Model: "Claude 3.5 Sonnet"
Lessons: [1, 2, 3] or "All"
         ↓
ChatInterface (React)
```

### 2. Frontend Sends Request

```javascript
POST /chat
{
  "message": "What is REST API?",
  "lesson_ids": [1, 2, 3],
  "model": "anthropic/claude-3.5-sonnet",
  "conversation_history": [...],
  "images": ["data:image/jpeg;base64,..."]  // Optional: for Vision API
}
```

### 3. Backend Processing

```python
# main.py → endpoint
context_service.build_context([1,2,3])
  ↓
openrouter_service.chat(message, context, history, model, images)
  ↓
If images present → format as multimodal content
  ↓
OpenRouter API → Selected model (with vision support) → Response
  ↓
If error → fallback to another model
  ↓
return ChatResponse
```

### 4. Frontend Displays Response

```
MessageList updates → AI response appears
Metadata: model used, tokens consumed, lessons used
```

## Architectural Layers

### Presentation Layer (Routes)
- `main.py` - FastAPI endpoints
- Pydantic validation (`models.py`)
- CORS configuration for frontend

### Business Logic Layer (Services)
- `openrouter_service.py` - LLM communication
- `context_service.py` - Lesson management
- Isolated from HTTP concerns
- Supports multiple AI models
- Automatic fallback handling

### Data Layer
- `data/lessons/` - 50+ lessons in Markdown
- In-memory caching for MVP
- No database (stateless for now)

## Key Design Decisions

### Why OpenRouter?

See [decisions/001-why-openrouter.md](decisions/001-why-openrouter.md)

**Benefits:**
1. **Unified API** - One interface for all models
2. **Flexibility** - Easy to switch models without code changes
3. **Reliability** - Built-in fallback mechanism
4. **Cost-effective** - Choose best model for the task
5. **Convenience** - Single API key for everything

### Why No Database?

**MVP Strategy:**
- Conversation history stored in-memory (session-based)
- Lessons loaded at startup and cached
- No need for persistence yet

**Future Enhancement:**
- PostgreSQL for conversation history
- User accounts and preferences
- Analytics and usage tracking

### Stateless Architecture

**Current:**
- Each request is independent
- No server-side session storage
- Frontend manages conversation history

**Benefits:**
- Easy to scale horizontally
- Simple deployment
- No session management overhead

**Trade-offs:**
- History lost on page refresh
- No conversation persistence
- Limited to current session

## Component Responsibilities

### Backend Components

**config.py**
- Environment variable management
- Model configuration
- CORS settings

**models.py**
- Request/response validation
- Type safety with Pydantic
- API contract definition

**context_service.py**
- Lesson file loading (72 lessons from 2 courses)
- Context building
- Lesson metadata extraction
- Module organization
- Lesson grouping by course and module
- Token estimation (1 token ≈ 4 characters)
- Lesson IDs in module retrieval

**openrouter_service.py**
- OpenRouter API communication
- Prompt construction
- Model selection
- Error handling and fallback
- Response parsing

### Frontend Components

**ChatInterface.jsx**
- Main container
- State management
- Orchestrates child components

**MessageList.jsx**
- Display messages
- Auto-scroll
- Loading indicators

**InputForm.jsx**
- User input
- Message submission
- Keyboard shortcuts

**LessonSelector.jsx**
- Lesson selection UI
- Module grouping
- Select all/none

**ModelSelector.jsx**
- AI model selection
- Model information display
- Default model handling

**ContextSelectorModal.jsx** (NEW - v2.0)
- Smart context selector modal
- 4 modes: Current Lesson, Current Module, All Lessons, Custom
- Real-time token and cost estimation
- Hierarchical lesson tree
- Shows selected context description

**LessonTree.jsx** (NEW - v2.0)
- Hierarchical tree with checkboxes
- Expand/collapse courses and modules
- Select entire courses or modules
- Indeterminate checkbox state support

**ContextEstimate.jsx** (NEW - v2.0)
- Displays estimated token count
- Shows input/output cost preview
- Loading and error states
- Real-time updates with debounce

## React Artifacts System (NEW - 2025-10-19)

The artifact system enables interactive visualizations and React components within lessons.

### Architecture Overview

```
Lesson Markdown
    ↓
[artifact:template-id] link
    ↓
Frontend detects artifact protocol
    ↓
ArtifactViewer.jsx
    ↓
┌─────────────────────────────────────┐
│  Artifact Type Router               │
│                                     │
│  • markdown → Markdown renderer     │
│  • code → Code viewer               │
│  • images → Image gallery           │
│  • plot → Plotly.js graph           │
│  • calculator → Math.js calculator  │
│  • react-component → ReactArtifact  │ ← NEW
└─────────────────────────────────────┘
                 ↓
         ReactArtifact.jsx
                 ↓
    ┌────────────────────────┐
    │  React.lazy + Suspense │
    │  Error Boundary        │
    │  Props passing         │
    └────────────────────────┘
                 ↓
        Component Registry
                 ↓
    Lazy-loaded React Component
```

### Artifact Types

| Type | Description | Example Use Cases |
|------|-------------|-------------------|
| `markdown` | Rich text content | Lesson documentation, explanations |
| `code` | Syntax-highlighted code | Code examples, snippets |
| `images` | Image gallery | Diagrams, screenshots |
| `plot` | Plotly.js interactive graphs | Data visualization (Level 3) |
| `calculator` | Math.js calculators | Interactive calculations (Level 3) |
| **`react-component`** | **Custom React components** | **Recharts graphs (Level 4), Animations (Level 5)** |

### React Component Architecture

**Key Design Decisions:**
- **React.lazy** - Industry standard for code splitting and dynamic imports
- **Static Registry** - Required by Vite's build-time analysis (cannot use fully dynamic import paths)
- **Error Boundary** - Prevents component crashes from breaking entire app
- **Suspense** - Automatic loading states during component fetch

**Component Structure:**

```javascript
// 1. Registry (frontend/src/templates/react/registry.js)
export const REACT_COMPONENTS = {
  'hello-react': lazy(() => import('./HelloReact.jsx')),
  'recharts-line': lazy(() => import('./RechartsLine.jsx')),
  // Static mapping required by Vite
};

// 2. Wrapper (frontend/src/components/artifacts/ReactArtifact.jsx)
export default function ReactArtifact({ componentId, props }) {
  const LazyComponent = getReactComponent(componentId);

  return (
    <ReactArtifactErrorBoundary componentId={componentId}>
      <Suspense fallback={<LoadingFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    </ReactArtifactErrorBoundary>
  );
}

// 3. Error Boundary (frontend/src/components/artifacts/ReactArtifactErrorBoundary.jsx)
class ReactArtifactErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Display fallback UI instead of crashing
  }
}
```

**Backend Integration:**

```python
# backend/models.py
ArtifactType = Literal["markdown", "code", "images", "plot", "calculator", "react-component"]

# backend/main.py - Artifact loading
if meta.get("type") == "react-component":
    config_dict = {
        "type": "react-component",
        "id": meta.get("componentId"),
        "props": {
            "title": meta.get("propsTitle"),
            "message": meta.get("propsMessage"),
            # ... other props from flat YAML
        }
    }
```

**YAML Frontmatter Format:**

```yaml
# docs/artifacts/hello-react.md
---
id: hello-react
type: react-component
componentId: hello-react
propsTitle: React Artifacts Test
propsMessage: Component working!
propsTimestamp: 1729350000000
---
```

**Why Flat YAML?**
Backend uses simple YAML parser. Flat structure (propsTitle, propsMessage) is more reliable than nested objects.

### Component Lifecycle

1. **Student clicks artifact link** - `[hello-react](artifact:hello-react)` in lesson
2. **LessonViewer detects** - Checks if template has `category: 'react'`
3. **Dispatches event** - `artifact:open` with `type: 'react-component'`
4. **CenterContainer receives** - Opens split view (lesson | artifact)
5. **ArtifactViewer routes** - Passes to ReactArtifact component
6. **ReactArtifact loads** - Registry returns lazy(() => import('./HelloReact.jsx'))
7. **Suspense shows loading** - Spinner + "Loading component..." message
8. **Component renders** - HelloReact receives props, displays UI
9. **Error Boundary monitors** - Catches any runtime errors gracefully

### Performance Optimizations

**Code Splitting:**
- Each React component is a separate chunk
- Only loaded when artifact is opened
- Reduces initial bundle size significantly

**Vite HMR:**
- Hot module replacement for fast development
- Component changes reflect instantly (usually)
- Occasionally requires manual refresh

**Lazy Loading:**
- Components load on-demand
- Faster initial page load
- Better user experience for lessons without React artifacts

### Adding New Components

**3-Step Process:**

```bash
# Step 1: Create component
touch frontend/src/templates/react/MyComponent.jsx

# Step 2: Register component (add one line)
# frontend/src/templates/react/registry.js
export const REACT_COMPONENTS = {
  'my-component': lazy(() => import('./MyComponent.jsx')),
};

# Step 3: Create artifact metadata
touch docs/artifacts/my-component.md
```

**Component Template:**

```javascript
// frontend/src/templates/react/MyComponent.jsx
export default function MyComponent({ title, data, config }) {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {/* Your component logic */}
    </div>
  );
}
```

### Future Enhancements

**Phase 2 (In Progress):**
- Recharts integration (Line, Bar, Area charts)
- Level 4 interactive graphs

**Phase 3 (Planned):**
- Animated diagrams (P-V diagram, Otto cycle)
- Level 5 animations with Framer Motion

**Phase 4 (Future):**
- Three.js / React Three Fiber
- Level 6 3D visualizations

**Potential Improvements:**
- Auto-generate registry from filesystem scan
- TypeScript interfaces for component props
- Component versioning (v1, v2)
- Storybook integration for component development

### Related Documentation

- **ADR 004:** React Artifacts Architecture - Design decisions and rationale
- **react-artifacts-roadmap.md:** Full project roadmap with 4 phases
- **CHANGELOG.md:** Phase 1 implementation details

## Security Considerations

**API Keys:**
- Stored in `.env` files (never committed)
- Backend-only (not exposed to frontend)
- OpenRouter handles rate limiting

**CORS:**
- Configured for specific origins
- Prevents unauthorized frontend access
- Production URLs must be whitelisted

**Input Validation:**
- Pydantic models validate all inputs
- FastAPI automatic validation
- Prevents malformed requests

**Error Handling:**
- Graceful degradation
- User-friendly error messages
- Logs for debugging

## Performance Considerations

**Caching:**
- Lessons loaded once at startup
- In-memory access for fast retrieval
- No database queries

**Context Size:**
- Smart context selector with 4 modes
- Token estimation before sending (prevents expensive mistakes)
- Select specific lessons, modules, or entire courses
- Reduces token usage significantly
- Faster response times
- Cost preview (e.g., "$0.03 in / $0.10 out")

**Model Selection:**
- Choose appropriate model for task
- Balance between quality and cost
- Fallback to cheaper models on error

**Vision API (Multimodal):**
- Images converted to base64 on client side
- Sent with text in multimodal format
- Image processing cost: ~85-255 tokens per image
- All 4 models support vision capabilities
- Images preserved in conversation history

## Vision API Support

**Capabilities:**
- Paste images directly into chat with Ctrl+V / Cmd+V
- Automatic base64 encoding
- Real-time image preview before sending
- Images displayed in conversation history
- Support for multiple images per message

**Supported Models:**
- ✅ Gemini 2.5 Flash Preview ($0.075/1M in, $0.30/1M out)
- ✅ Grok 4 Fast ($0.05/1M in, $0.15/1M out)
- ✅ GPT-4.1 Mini ($0.15/1M in, $0.60/1M out)
- ✅ Claude Sonnet 4.5 ($3.00/1M in, $15.00/1M out)

**Technical Implementation:**
- Frontend: `handlePaste()` in ClaudeAISidebar.jsx
- Base64 encoding via FileReader API
- Backend: Multimodal content formatting in openrouter_service.py
- OpenRouter Vision API format: `{"type": "image_url", "image_url": {"url": "data:..."}}`

**Use Cases:**
- Analyzing UI screenshots
- Debugging code from images
- Explaining diagrams and charts
- Reviewing design mockups

## React Artifacts System

**Overview:**
Dynamic React component rendering for interactive learning artifacts (Level 4-5).

**Architecture:**

```
┌─────────────────────────────────────────────────────────┐
│            Lesson Content (Markdown)                    │
│  "See example: [artifact:recharts-line](link)"          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────┐
│          LessonViewer.jsx (Link Handler)                │
│  Detects: artifact:* protocol                           │
│  Maps: category='react' → type='react-component'        │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────┐
│          ArtifactViewer.jsx (Router)                    │
│  Switch by type:                                        │
│  - 'react-component' → ReactArtifact                    │
│  - 'interactive-plot' → InteractivePlot                 │
│  - 'calculator' → Calculator                            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────┐
│          ReactArtifact.jsx (Loader)                     │
│  • Gets lazy component from Registry                    │
│  • Wraps in Error Boundary                              │
│  • Wraps in Suspense (loading state)                    │
│  • Passes props to component                            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────┐
│          React Components Registry                      │
│  Static mapping (Vite requirement):                     │
│  {                                                      │
│    'recharts-line': lazy(() => import('./recharts-line'))│
│    'recharts-bar': lazy(() => import('./recharts-bar')) │
│    'recharts-area': lazy(() => import('./recharts-area'))│
│  }                                                      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────┐
│          Actual React Components                        │
│  • recharts-line.jsx (LineChart)                        │
│  • recharts-bar.jsx (BarChart)                          │
│  • recharts-area.jsx (AreaChart)                        │
│  Each with: PropTypes, ResponsiveContainer, Tailwind    │
└─────────────────────────────────────────────────────────┘
```

**Technical Details:**

**1. Dynamic Import Challenge (Vite)**
- **Problem:** Vite requires static paths for build-time analysis
- **Solution:** Registry with static lazy imports
- **Why:** `lazy(() => import('./' + id))` doesn't work in Vite
- **ADR:** See `docs/decisions/004-react-artifacts-architecture.md`

**2. Component Loading Flow:**
```javascript
// 1. User clicks artifact link
artifact:recharts-line

// 2. LessonViewer handles it
const template = getTemplate('recharts-line')
// template.category === 'react' → type = 'react-component'

// 3. ArtifactViewer routes
case 'react-component':
  return <ReactArtifact componentId="recharts-line" props={...} />

// 4. ReactArtifact loads from registry
const Component = REACT_COMPONENTS['recharts-line']
// Component = lazy(() => import('./recharts-line.jsx'))

// 5. Suspense + Error Boundary wrap
<ErrorBoundary>
  <Suspense fallback={<Loading/>}>
    <Component {...props} />
  </Suspense>
</ErrorBoundary>
```

**3. Dependencies:**
- `recharts@^3.2.1` - React charting library (~500KB)
- `prop-types` - Props validation

**4. Current Artifacts (Phase 2):**
- **recharts-line** - Engine Power Curve (RPM vs Power/Torque)
- **recharts-bar** - Monthly Fuel Consumption
- **recharts-area** - Engine Temperature Monitoring

**5. Design Principles:**
- **Responsive:** All use `<ResponsiveContainer width="100%" height={400}>`
- **Interactive:** Hover tooltips, legends, cartesian grids
- **Styled:** Tailwind CSS for containers, Recharts props for charts
- **Validated:** PropTypes for all components
- **Best Practices:** Followed official Recharts documentation

**Files:**
- `frontend/src/components/artifacts/ReactArtifact.jsx`
- `frontend/src/components/artifacts/ReactArtifactErrorBoundary.jsx`
- `frontend/src/templates/react/registry.js`
- `frontend/src/templates/react/recharts-*.jsx`
- `frontend/src/templates/artifactTemplates.js` (metadata)

## Scalability

**Current Limitations:**
- Single instance
- In-memory state
- No load balancing

**Future Enhancements:**
- Horizontal scaling with Railway
- Redis for session management
- Database for persistence
- CDN for frontend assets
- Message queue for async processing

## Monitoring & Logging

**Current:**
- Python logging to stdout
- Error tracking in console
- Basic health check endpoint

**Recommended Additions:**
- Structured logging (JSON)
- Application monitoring (Sentry)
- Performance metrics
- User analytics
- Token usage tracking
