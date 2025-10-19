# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-10-19

### Changed - Artifact System Guide Course Restructure

**Major Update:** Complete course restructure from 5 lessons to 9 lessons, focusing on **diversity of artifact types** (Level 1-6) rather than deep dive into one library.

**Philosophy Change:**
- **Before:** 5 lessons with 20+ examples of mostly Plotly (Level 3 only)
- **After:** 9 lessons showing ALL 6 levels with 1-3 examples each + educational "when/why" explanations

**New Course Structure:**
```
1.1 Типы артефактов - полная классификация (taxonomy overview)
1.2 Level 1-2 - Простые типы (ASCII, HTML, SVG, Mermaid)
1.3 Level 3 - Plotly.js графики (reduced to 3 types + comparisons)
1.4 Level 3 - Math.js калькуляторы (added "What is Math.js" intro)
1.5 Level 4 - Recharts (React графики) (~500 lines, full guide)
1.6 Level 4-5 - UI компоненты (Tailwind vs CSS, shadcn/ui, Lucide)
1.7 Level 5 - Анимированные диаграммы (~600 lines, P-V diagram breakdown)
1.8 Создание артефактов через AI (prompt engineering)
1.9 Галерея всех артефактов (reference + decision trees)
```

**New Content:**
- **docs/artifact-types-taxonomy.md:** Technical reference document (~600 lines)
  - 6 levels of artifact complexity (ASCII → 3D)
  - Comprehensive comparison tables (Plotly vs Recharts vs Chart.js vs D3.js)
  - Decision trees for choosing tools

- **Lesson 1.1:** Full taxonomy with classification of all 6 levels
- **Lesson 1.2:** Simple types with ASCII box-drawing, HTML, SVG, Mermaid examples
- **Lesson 1.5:** Recharts guide (~500 lines)
  - Component composition vs object configuration
  - Canvas vs SVG rendering
  - Complete chart type examples

- **Lesson 1.6:** UI components (~800 lines)
  - 100+ lines CSS vs 1 line Tailwind comparison
  - 4 CSS approaches compared (Vanilla, CSS Modules, Tailwind, styled-components)
  - shadcn/ui philosophy and complete component list
  - Lucide icons integration
  - Real example showing all tools together

- **Lesson 1.7:** Animated diagrams (~600 lines)
  - Complete breakdown of animated P-V diagram
  - Integration of ALL 5 technologies: Recharts + Tailwind + shadcn/ui + Lucide + React hooks
  - State management with useState/useEffect
  - Animation logic with setInterval
  - Level 3 vs Level 5 comparison

- **Lesson 1.8:** AI generation with 8+ prompt examples
- **Lesson 1.9:** Complete gallery with decision trees and when-to-use guidelines

**Educational Focus:**
- Added "ЗАЧЕМ" (WHY) explanations for each tool
- Comparison tables showing when to use each approach
- Decision trees for choosing the right artifact type
- Terminology explanations (Tailwind, shadcn/ui, Recharts, etc.)

**Files Modified:**
- `backend/data/lessons/artifact-system-guide/course.json`: Updated with 9 lessons
- Deleted old lessons 1.4 and 1.5 (AI generation, gallery)
- Created new lessons 1.1, 1.2, 1.5, 1.6, 1.7, 1.8, 1.9
- Updated lessons 1.3 and 1.4 (Plotly simplified, Math.js enhanced)

**Documentation:**
- `artifact-system-implementation-roadmap.md`: Updated Phase 3 with new structure
- Total content: ~4000+ lines across 9 lessons + taxonomy doc
- 100+ ASCII diagrams and code examples
- 40+ comparison tables

## [3.1.1] - 2025-10-19

### Fixed - Artifact Links with ReactMarkdown urlTransform

**Problem:**
- Artifact links `[📊 Chart](artifact:line-chart)` were opening new browser tabs instead of artifacts in CENTER
- Root cause: ReactMarkdown/remark-gfm doesn't recognize custom `artifact:` protocol (only http, https, mailto, tel)
- Result: href attribute was empty, global click handler couldn't find artifact links

**Solution (Official ReactMarkdown API):**
- Added `customUrlTransform` function to explicitly allow `artifact:` protocol
- Added `urlTransform={customUrlTransform}` prop to ReactMarkdown component
- Based on official documentation: https://github.com/remarkjs/react-markdown#urltransform
- Added global click handler with capture phase to intercept artifact link clicks before browser navigation

**Technical Implementation:**
```javascript
// Allow artifact: protocol in ReactMarkdown
const customUrlTransform = (url) => {
  if (url && url.startsWith('artifact:')) {
    return url; // Allow artifact protocol
  }
  return url; // Default security for other URLs
};

<ReactMarkdown urlTransform={customUrlTransform}>
  {lessonContent}
</ReactMarkdown>
```

**Modified Files:**
- `frontend/src/components/center/LessonViewer.jsx`:
  - Added `customUrlTransform` function (lines 28-37)
  - Added `urlTransform` prop to ReactMarkdown (line 257)
  - Added global click handler with `a[href^="artifact:"]` selector (lines 92-121)
  - Added `handleArtifactLink` function for parsing artifact URLs and dispatching events (lines 170-225)
  - Imported `getTemplate` and `hasTemplate` from artifact templates (line 10)

**Result:**
- ✅ Artifact links now correctly open artifacts in CENTER container
- ✅ Split view: Lesson + Artifact side-by-side
- ✅ No more new browser tabs
- ✅ Fully working with light theme (indigo #6366f1 accent color)

**Testing:**
- Tested with `artifact-gallery.md` lesson
- Confirmed: line-chart, scatter-plot, generic-calculator templates load correctly
- Confirmed: artifact:open events dispatch to CenterContainer
- Confirmed: CENTER switches to LESSON_ARTIFACT state (split view)

---

## [3.1.0] - 2025-10-18

### Added - Artifact System: Plot & Calculator Templates (Sprint 4-5)

**New Artifact Types (Sprint 4):**
- Added **Plot** artifact type with Plotly.js integration (interactive charts)
- Added **Calculator** artifact type with Math.js integration (live calculations)
- Extended artifact type system from 3 to 5 types: markdown, code, images, plot, calculator
- Added `config` field to backend Artifact model for storing plot/calculator configurations

**New Components:**
- `frontend/src/components/artifacts/InteractivePlot.jsx` - Plotly.js chart renderer with export, fullscreen, reset features
- `frontend/src/components/artifacts/Calculator.jsx` - Math.js calculator with sliders, formulas, live results
- `frontend/src/components/artifacts/InteractivePlot.css` - Styled toolbar and fullscreen mode
- `frontend/src/components/artifacts/Calculator.css` - Styled sliders, results, and formulas

**Dependencies:**
- Installed `plotly.js-dist-min@3.1.2` (3.5MB minified) for interactive charts
- Installed `mathjs@15.0.0` (500KB) for mathematical expression evaluation

**Template System (Sprint 5):**
- Created `frontend/src/templates/` directory structure (plots/, calculators/)
- Created 3 universal templates:
  * `line-chart.js` - Line charts for time series and trends
  * `scatter-plot.js` - Scatter plots for correlations and distributions
  * `generic-calculator.js` - Flexible calculator for custom formulas
- Created `artifactTemplates.js` - Template registry with helper functions
- Integrated template selector dropdown in ArtifactCanvas (appears for Plot and Calculator tabs)
- Each template includes: default config, multiple examples, and usage instructions

**Modified Components:**
- `backend/models.py` - Extended ArtifactType from 3 to 5 types, added config field
- `frontend/src/components/rightSidebar/ArtifactCanvas.jsx` - Added Plot and Calculator tabs, integrated template loader
- `frontend/src/components/layout/Header.jsx` - Added `[🎨]` Canvas button for manual artifact creation

**Markdown Artifact Links (Sprint 6):**
- Added custom link parser in `LessonViewer.jsx` for `artifact:` protocol
- Syntax: `[Link Text](artifact:template-id)` or `[Link Text](artifact:template-id:example-name)`
- Artifact links automatically open templates in CENTER split view (Lesson + Artifact)
- Visual indicator: 🎨 emoji prepended to artifact link text
- Created demo lesson: `artifact-links-demo.md` with 10+ example links
- Styled artifact links with purple accent color and hover effects

**Features:**
- ✅ Interactive Plotly.js charts with zoom, pan, export PNG, reset, fullscreen
- ✅ Live Math.js calculations with sliders and number inputs
- ✅ Template system for quick artifact creation (line-chart, scatter-plot, generic-calculator)
- ✅ **Markdown artifact links** - embed interactive content directly in lessons
- ✅ Dark theme integration across all new components
- ✅ Canvas accessible via Header `[🎨]` button

## [3.0.0] - 2025-10-18

### Added - Layout Redesign (Major UI Overhaul)

**Dynamic CENTER Container with 3 States:**
- CENTER can now show: Lesson only, Lesson + Artifact (split), or Artifact only
- Artifacts moved from RIGHT sidebar tab → CENTER container (up to full screen width)
- Implemented state machine: `LESSON_ONLY`, `LESSON_ARTIFACT`, `ARTIFACT_ONLY`
- Added ResizeHandle for dragging split between Lesson and Artifact (30%-70% bounds)

**Smart Panel Auto-Hide Logic:**
- Scenario 1: Artifact from lesson → RIGHT sidebar (chat) auto-hides
- Scenario 2: Artifact from AI → LEFT sidebar (courses) auto-hides
- User can manually show/hide any panel via Header buttons
- Respects user preferences (doesn't auto-restore hidden panels)

**New UI Controls:**
- Added `[💬]` button in Header to toggle RIGHT sidebar (AI chat)
- Improved `[☰]` button behavior in Header for LEFT sidebar (courses)
- Added `[×]` close button in Artifact toolbar
- Added `[📄 Show Lesson]` button in Artifact toolbar (when lesson hidden)
- Removed old "reopen sidebar" floating button

**Event System:**
- Introduced `artifact:open` event for opening artifacts in CENTER
- Introduced `center:showLesson` event for showing lesson in split view
- Maintained backward compatibility with legacy `canvas:add` and `rightSidebar:switchTab` events

**New Components:**
- `frontend/src/components/center/CenterContainer.jsx` - Dynamic CENTER with state machine
- `frontend/src/components/center/CenterResizeHandle.jsx` - Draggable split handle
- `frontend/src/components/center/ArtifactViewer.jsx` - Artifact wrapper in CENTER

**Modified Components:**
- `frontend/src/components/layout/Layout.jsx` - Integrated CenterContainer + auto-hide logic
- `frontend/src/components/layout/Header.jsx` - Added chat toggle button
- `frontend/src/components/rightSidebar/ClaudeAISidebar.jsx` - Removed Canvas tab (chat only)
- `frontend/src/components/center/LessonViewer.jsx` - Sends `artifact:open` events

**Benefits:**
- ✅ Artifacts get significantly more space (60%+ vs 400-800px in old sidebar)
- ✅ Context-aware layout adapts to user workflow
- ✅ Lesson + Artifact visible simultaneously in split view
- ✅ Smooth transitions between states (300ms CSS transitions)
- ✅ Better UX for studying demos alongside lessons

**Version:** Bumped to v3.0 in Header component

### Added (2025-10-18) - Personal Documents Folder

**New: my-documents/ folder for user's personal notes**
- Created `my-documents/` folder in project root for personal learning materials
- Purpose: Store personal notes/documentation without polluting AI agent context
- Goal: **Optimize context window usage** - AI agents should not read personal files

**Context Optimization:**
- Added `my-documents/` to `.gitignore` - won't be committed to repository
- Created `.claudeignore` file - Claude Code won't index excluded folders
- Added strict rules to `CLAUDE.md` - agents must NOT read `my-documents/`
- Updated `DOCUMENTATION_GUIDE.md` - added `my-documents/` to project structure
- Created `my-documents/README.md` - explains folder purpose and usage

**Why this matters:**
- ✅ Save context tokens (don't waste on irrelevant files)
- ✅ Keep personal learning materials separate from project code
- ✅ AI agents focus only on project-related files
- ✅ User can store any notes without worrying about commits or context pollution

**Files Modified:**
- `.gitignore` - added `my-documents/` exclusion
- `.claudeignore` - created new file with context optimization rules
- `CLAUDE.md` - added "🚫 Оптимизация контекста" section with strict rules
- `DOCUMENTATION_GUIDE.md` - added `my-documents/` to structure diagram
- `my-documents/README.md` - created usage guide

### Changed (2025-10-16) - Prompt System Updates
- Boundaries merged into the system prompt via PromptLoader; {boundaries} placeholder supported (auto-appended if missing)
- Added Canvas Demo Rules to system_prompt.md (return exactly one self-contained HTML fenced block for Canvas)
- Updated docs/prompt-system.md to reflect new placeholders and Canvas rules (SSOT, no duplication of lesson counts)


### Added (2025-10-16) - Vision API Support

**AI Agent Can Now See Images:**
- Added multimodal vision capabilities to AI chat
- Users can paste screenshots with Ctrl+V / Cmd+V directly into chat input
- Supports all 4 models: Gemini 2.5 Flash, Grok 4 Fast, GPT-4.1 Mini, Claude Sonnet 4.5
- Real-time image preview before sending
- Images displayed in conversation history

**Frontend Changes:**
- Updated `ClaudeAISidebar.jsx` with paste event handler and image state management
- Added `handlePaste()` to detect and convert images to base64
- Added image preview UI with remove functionality
- Updated message rendering to display attached images
- Updated `ClaudeAISidebar.css` with styles for `.attached-images`, `.image-preview`, `.message-images`
- Updated placeholder text: "Ask a question... (Paste images with Ctrl+V)"

**Backend Changes:**
- Updated `models.py`: `ChatMessage` and `ChatRequest` now support `images: Optional[List[str]]`
- Updated `openrouter_service.py`:
  - `chat()` method accepts `images` parameter
  - `_send_request()` formats multimodal content for OpenRouter Vision API
  - Supports images in conversation history
- Updated `main.py`: `/chat` endpoint passes images to OpenRouter service

**API Changes:**
- Modified `/chat` endpoint to accept `images` field (array of base64 encoded images)
- Images format: `data:image/jpeg;base64,...` or `data:image/png;base64,...`
- Multimodal messages use OpenRouter vision format with `type: "image_url"`

**Cost Impact:**
- Image token cost: ~85-255 tokens per image (varies by resolution)
- Vision supported by all 4 models with existing pricing

**Files Modified:**
- Frontend: `ClaudeAISidebar.jsx`, `ClaudeAISidebar.css`, `api.js`
- Backend: `models.py`, `openrouter_service.py`, `main.py`
- Legacy files (not used in v2.0): `InputForm.jsx`, `InputForm.css`, `MessageList.jsx`, `MessageList.css`, `ChatInterface.jsx`

### Changed (2025-10-16) - Model Pricing Update

**Grok 4 Fast Pricing:**
- Updated Grok 4 Fast model pricing (no longer free)
- Input cost: $0.05 per 1M tokens
- Output cost: $0.15 per 1M tokens
- Updated description: "2M context, auto-cache, affordable pricing"
- Updated in: backend/config.py, README.md, CHANGELOG.md, documentation

### Added (2025-10-16) - Web Design Fundamentals Course

**New Course: UI/UX Terminology for AI-Assisted Development**
- Created `backend/data/lessons/web-design-fundamentals/` directory structure
- **Module 1: UI Terminology** (5 lessons) - ✅ ЗАВЕРШЕН
  - Lesson 1.1: Layout Elements (Header, Footer, Sidebar, Main, Container, Three-panel layout)
  - Lesson 1.2: Navigation Elements (Navbar, Tree Navigation, Breadcrumbs, Tabs, Pagination, Prev/Next)
  - Lesson 1.3: Interactive Elements (Button, Input, Dropdown, Checkbox, Radio, Toggle, Slider)
  - Lesson 1.4: Feedback Elements (Modal, Toast, Loading Spinner, Progress Bar, Badge, Tooltip)
  - Lesson 1.5: Prompting for UI (Templates, good vs bad prompts, complete workflows)
- **Module 2: Artifacts** (6 lessons) - ✅ ЗАВЕРШЕН
  - Lesson 2.1: What are Artifacts (Introduction, lifecycle, types, tools)
  - Lesson 2.2: Wireframes, Mockups, Prototypes (Lo-Fi, Mid-Fi, Hi-Fi approaches)
  - Lesson 2.3: Design Systems (Atomic Design, Design Tokens, Material/Ant/Chakra)
  - Lesson 2.4: Component Libraries (MUI, Ant Design, Chakra UI, shadcn/ui, Storybook)
  - Lesson 2.5: Handoff Process (Figma, extracting specs, export settings)
  - Lesson 2.6: Prompting with Artifacts (Masterclass: progressive prompting, anti-patterns, workflows)
- **Worked Examples:**
  - `ui-terminology-guide.md` - Complete UI element map of AI Learning Agent (Module 1)
  - `design-artifacts-guide.md` - Design artifacts for AI Learning Agent (Module 2)

**Documentation:**
- Added `docs/web-design-fundamentals-structure.md` - complete course structure
- Updated README.md section "Образовательные курсы" (2 курса → 3 курса, 72 → 94 урока)
- Updated `docs/course-structure.md` with link to new course
- Project now teaches: WHAT to create (AI Web Learning), HOW to organize (Project Setup Guide), HOW to name (Web Design Fundamentals)

**Backend Integration:**
- Updated `backend/services/context_service.py` with `COURSE_PATHS["web-design-fundamentals"]`
- Course accessible through lesson selector

**Course Statistics:**
- Total lessons: 11 (5 + 6)
- Total lines: ~13,000+ lines
- Total content: ~400KB
- Worked examples: 2 comprehensive guides
- 40+ Claude Code prompt templates
- 100+ ASCII diagrams
- Real examples from AI Learning Agent project throughout

**Benefits:**
- ✅ Learn proper UI terminology for precise AI prompts
- ✅ Master design artifacts (wireframes, mockups, design systems, component libraries)
- ✅ Understand progressive prompting (Lo-Fi → Hi-Fi workflows)
- ✅ Improve communication with AI when building interfaces
- ✅ "Vibe Coding для дизайна" - philosophy of UI terminology mastery
- ✅ 2 comprehensive worked examples with real project artifacts

### Added (2025-10-16) - Smart Context Selector for AI Chat

**New Feature: Flexible Context Management**
- Implemented smart context selector modal for AI Assistant
- 4 context modes: Current Lesson, Current Module, All Lessons, Custom Selection
- Real-time token estimation and cost preview before sending messages
- Hierarchical lesson tree with checkboxes for granular selection

**Backend Changes:**
- Added `/context/preview` endpoint - estimates tokens and cost for selected lessons
- Added `/lessons/grouped` endpoint - returns lessons grouped by course and module
- New methods in `ContextService`: `get_grouped_lessons()`, `get_lessons_in_module()`, `estimate_tokens()`
- New Pydantic models: `ContextPreviewRequest`, `ContextPreviewResponse`, `LessonsGroupedResponse`

**Frontend Changes:**
- Created `ContextSelectorModal` component - main modal for context configuration
- Created `LessonTree` component - hierarchical tree with checkboxes and expand/collapse
- Created `ContextEstimate` component - displays token count and estimated cost
- Added utility functions: `tokenEstimation.js`, `lessonTree.js`
- Updated `ClaudeAISidebar` - replaced simple checkbox with smart context selector
- Updated API service with `previewContext()` and `getLessonsGrouped()` methods

**User Experience:**
- ✅ Visual feedback showing selected context (e.g., "Current Module: ai-web-learning → 2-backend")
- ✅ Token count estimation (~341K tokens for all lessons)
- ✅ Cost preview (e.g., "$0.03 in / $0.10 out")
- ✅ Prevents accidental selection of all lessons (expensive!)
- ✅ Supports selecting entire courses, modules, or individual lessons
- ✅ Light theme UI consistent with existing design

### Added (2025-10-16) - Worked Examples Section

**New Course Section:**
- Created `backend/data/lessons/worked-examples/` directory
- Added Example 1: AI Learning Agent - Comprehensive documentation of the current project as a worked example

**Example 1 Documentation (5 files):**
- `overview.md` - Project overview, tech stack, key features, applied concepts (92 KB)
- `architecture.md` - Detailed architecture, data flow, API endpoints, configuration (78 KB)
- `implementation.md` - Implementation details, key components, design decisions (85 KB)
- `lessons-applied.md` - Mapping of 37+ course lessons to real implementation (103 KB)
- `integration-guide.md` - How to adapt for your project (3 integration levels, use cases) (71 KB)

**Course Structure Updates:**
- Updated `docs/course-structure.md` with Worked Examples section
- Added to course statistics: 42+ total lessons (41 lessons + 1 worked example)
- Documents real-world application of course principles

**Benefits:**
- ✅ Students see theory applied in practice
- ✅ Complete real-world example for online school chatbot
- ✅ 3 integration levels (Full Copy, Backend Only, Specific Components)
- ✅ Use case examples (онлайн-школа, документация, корпоративное обучение)
- ✅ Project follows the same principles it teaches (Lesson 1.7)

### Added (2025-10-16) - Prompt System Refactoring

**Backend Prompts Architecture (следует Уроку 1.7):**
- Created `backend/prompts/` directory for Markdown-based prompts
- `system_prompt.md` - AI tutor instructions (moved from hardcoded string in code)
- `boundaries.md` - Knowledge boundaries as Single Source of Truth (SSOT principle)
- `model_settings.md` - Documentation for model parameters
- `PromptLoader` service for loading Markdown prompts with caching

**Model Configuration:**
- Added model-specific settings in `config.py` (temperature, max_tokens, top_p)
- Gemini 2.5 Flash: temperature=0.7, max_tokens=4000, top_p=1.0
- Grok 4 Fast: temperature=0.7, max_tokens=4000, top_p=1.0
- GPT-4.1 Mini: temperature=0.6, max_tokens=3000, top_p=0.95
- Claude Sonnet 4.5: temperature=0.5, max_tokens=8000, top_p=0.95 (optimized for code)

**Documentation:**
- Added `docs/prompt-system.md` - Prompt system architecture guide
- Removed `docs/ai-agent-boundaries/` - Eliminated duplication (SSOT principle from Lesson 1.7)
- All prompt configuration now in `backend/prompts/` (Single Source of Truth)

**Benefits:**
- ✅ Edit prompts without touching Python code
- ✅ Version control for prompts in Markdown
- ✅ SSOT principle maintained (no duplication)
- ✅ Model-specific parameters per model
- ✅ Follows Lesson 1.7 architecture principles (Separation of Concerns, SSOT, links instead of copying)

### Changed (2025-10-16)
- **Backend config:** Changed API port from 8000 to 8001 in `frontend/src/config.js`
- **Backend CORS:** Added `localhost:5174` to allowed origins in `backend/config.py`
- **Lesson formatting:** Normalized markdown headers from `###` to `#` in 20 lesson files
- **UI theme:** Switched right sidebar from dark (Claude-style) to light (Cline-style) theme

### Major Changes
- **🎨 Complete UI Rефакторинг** - Переход на трёхпанельный layout в стиле Claude
  - LEFT sidebar: дерево курсов с навигацией
  - CENTER: просмотр урока с Markdown рендерингом
  - RIGHT sidebar: Claude AI чат с темной темой
  - Drag-resize для RIGHT sidebar (400-800px)
  - Сворачивание панелей для fullscreen reading mode
  - Только десктоп (минимум 1366px, оптимально 1920px)

### Added (2025-10-13) - Phase 1 Implementation

#### Phase 1: UI Layout ✅ ПОЧТИ ЗАВЕРШЕНО (26/29 задач)

**Frontend Structure:**
- [X] Трёхпанельная структура Layout.jsx с Header
- [X] Новая структура папок: components/{layout, leftSidebar, center, rightSidebar}
- [X] Константы размеров панелей (layoutSizes.js)
- [X] Обновленная цветовая схема (Claude-style) в index.css

**LEFT Sidebar - Course Navigation:**
- [X] LeftSidebar.jsx с загрузкой уроков из API
- [X] CourseTree.jsx с иерархией (Course → Module → Lesson)
- [X] Раскрытие/сворачивание с анимацией
- [X] Выделение активного урока
- [X] Кнопка "Hide Sidebar"

**CENTER - Lesson Viewer:**
- [X] LessonViewer.jsx с загрузкой через API
- [X] Интеграция react-markdown + remark-gfm
- [X] Markdown стили (H1-H6, code blocks, lists)
- [X] Компактная навигация Prev/Next
- [X] Scroll to top при смене урока

**RIGHT Sidebar - Claude AI Chat:**
- [X] ClaudeAISidebar.jsx с темной темой
- [X] ModelSelector (4 модели)
- [X] MessageList с метаданными
- [X] MessageInput с кнопкой Send
- [X] Опция "Include all lessons"

**Drag-Resize:**
- [X] ResizeHandle.jsx для RIGHT sidebar
- [X] Сохранение размера в localStorage

**Backend:**
- [X] Endpoint GET /lessons/:id
- [X] LessonDetailResponse в models.py

**Remaining:**
- [ ] Тестирование адаптивности (1366px/1920px)

### Planned Features

#### Phase 2: Стоимость и кэширование (1-2 недели)
- [ ] Цены моделей в config (input, output, cached)
- [ ] Backend расчёт стоимости с учётом кэша
- [ ] UI метаданных: токены (input/cached/output)
- [ ] Отображение стоимости и экономии от кэша
- [ ] Пример: "💰 Cost: $0.003 | 💾 Saved: $0.009 (75% from cache)"

#### Phase 3: Ограничение Claude Sonnet (1 неделя)
- [ ] Лимит контекста для Claude Sonnet 4.5 (100K/20 уроков)
- [ ] UI выбора модулей в RIGHT sidebar
- [ ] Счётчики в реальном времени (18/20 lessons, 90K/100K tokens)
- [ ] Валидация в backend

#### Phase 4: Поиск по документации (2 недели)
- [ ] База официальных источников (React, FastAPI, Python и т.д.)
- [ ] Brave Search API интеграция
- [ ] Определение технологии из вопроса
- [ ] Двухэтапный процесс (курс → официальная документация)
- [ ] Кнопка "🔍 Search Official Docs" в сообщении AI

### Technical Details
- **Подход:** Long Context Window (1M-2M токенов) вместо RAG
- **Модели:** Gemini 2.5 Flash (1M), Grok 4 Fast (2M), GPT-4.1 Mini (1M), Claude Sonnet 4.5 (200K)
- **Roadmap:** [roadmap.md](roadmap.md) - 58 задач в 4 фазах (~6-8 недель)

---

## [1.0.0] - 2025-10-13

### Added
- **Course-level selection in LessonSelector** - New checkbox for each course to select all lessons at once
  - Added checkbox next to each course name (AI Web Learning, Project Setup Guide, Additional Materials)
  - Click checkbox to select/deselect all lessons in that course
  - Indeterminate state when some (but not all) lessons selected
  - Improved UX: no need to expand modules and select lessons individually
- **Module-level selection in LessonSelector** - New checkbox for each module to select all lessons in module
  - Added checkbox next to each module name (1-basics, 2-backend, 3-database, etc.)
  - Click checkbox to select/deselect all lessons in that module
  - Indeterminate state when some (but not all) lessons in module selected
  - Three-level selection: Course → Module → Individual Lessons

### Fixed
- **LessonSelector UI display issue** - Course names now visible with proper styling
  - Added missing `--secondary-color` CSS variable to `frontend/src/index.css`
  - Fixed gradient background not rendering (was causing white text on white background)
  - Complete rewrite of LessonSelector component with improved structure
  - Added natural sorting for modules (1-10 instead of alphabetical 1, 10, 2...)
  - Backend now returns `course` field instead of `category` for three-level hierarchy
  - Used Playwright MCP for browser inspection and CSS debugging

### Added
- **Course structure reorganization** - Improved lesson organization with clear separation
  - Created `ai-web-learning/` directory (10 modules, 41+ lessons)
  - Created `project-setup-guide/` directory (5 parts, 21 lessons)
  - Created `extras/` directory for additional materials (3 files)
  - Renamed all module folders: removed "module-" and "part-" prefixes
  - New naming: `1-basics`, `2-backend`, `3-database`, etc. (auto-sorted)
- **Documentation improvements**
  - Added `docs/course-structure.md` - detailed AI Web Learning course structure
  - Added `docs/project-setup-guide-structure.md` - Project Setup Guide structure
  - Updated README.md with course overview section
  - Added critical pre-commit checklist to CLAUDE.md
- **Backend updates**
  - Updated `context_service.py` to support new folder structure
  - Added support for 3 categories: ai-web-learning, project-setup-guide, extras
  - Improved lesson loading with course/module tracking
  - Successfully loads all 70 lessons with new structure

### Changed
- Reorganized 72 lessons into logical course-based structure
- Simplified folder names for better navigation
- Moved lesson intro/overview files back to their modules

### Removed
- Deleted obsolete explanation files
- Removed duplicate module description files

### Planned
- User authentication and accounts
- Conversation history persistence (PostgreSQL)
- Advanced lesson search and filtering
- Analytics dashboard
- Mobile app (React Native)
- Voice input/output support
- Code execution sandbox for practice

## [1.0.0] - 2025-10-13

### Added

**Backend:**
- FastAPI 0.115+ application with async support
- OpenRouter integration for multiple LLM access
- Support for 4 carefully selected AI models:
  - Gemini 2.5 Flash Preview (default, fast & cost-effective)
  - Grok 4 Fast (2M context, auto-cache, affordable)
  - GPT-4.1 Mini (compact OpenAI model)
  - Claude Sonnet 4.5 (premium quality for code)
- Automatic model fallback mechanism (Gemini → Grok)
- Context service for managing 72 lessons
- Lesson loading from Markdown/text files
- Pydantic 2.10+ models for request/response validation
- CORS middleware for frontend integration
- Health check endpoint
- API endpoints: `/lessons`, `/models`, `/chat`
- Comprehensive error handling and logging
- Environment-based configuration (.env support)

**Frontend:**
- React 18 with Vite 5 build system
- ChatInterface component with state management
- MessageList with auto-scroll and typing indicators
- InputForm with keyboard shortcuts
- LessonSelector with module grouping
- ModelSelector for AI model choice
- API service layer for backend communication
- Responsive design with modern CSS
- Loading states and error handling
- Conversation history display
- Model and token usage metadata

**Documentation:**
- Comprehensive README with quick start (96 lines, within 80-120 requirement)
- CLAUDE.md - project rules and workflow guidelines
- DOCUMENTATION_GUIDE.md - comprehensive documentation standards (SSOT principles)
- Detailed setup guide (docs/setup.md)
- Architecture documentation with diagrams (docs/architecture.md)
- Deployment guide for Railway (docs/deployment.md)
- Troubleshooting guide (docs/troubleshooting.md)
- ADR 001: OpenRouter decision (docs/decisions/)
- ADR template for future decisions
- Project roadmap with 100% completed tasks

**DevOps:**
- `.gitignore` for Python and Node.js (root + backend + frontend)
- `.env.example` files for configuration
- Git repository initialized and pushed to GitHub
- CORS setup for local and production
- Virtual environment setup (backend/venv)
- Node modules setup (frontend/node_modules)

### Features

- **Multi-Model Support**: Choose from 4 AI models via OpenRouter (Gemini 2.5 Flash, Grok 4 Fast, GPT-4.1 Mini, Claude Sonnet 4.5)
- **Context-Aware Responses**: AI has access to 72 structured lessons
- **Flexible Lesson Selection**: Use all lessons or select specific modules
- **Automatic Fallback**: Switches to Grok if Gemini unavailable
- **Real-Time Chat**: Interactive conversation with history
- **Responsive UI**: Works on desktop, tablet, and mobile
- **Metadata Display**: Shows model used, tokens consumed, lessons referenced
- **GitHub Integration**: Full source code available at github.com/engsimsoft/ai-learning-assistant

### Technical Stack

- Backend: FastAPI 0.115+, Uvicorn 0.32+, Python 3.13, OpenRouter API, Pydantic 2.10+, httpx 0.27+
- Frontend: React 18, Vite 5, Modern JavaScript (ES6+)
- Deployment: Ready for Railway
- Architecture: RESTful API, stateless design, layered architecture
- Version Control: Git + GitHub

---

## Version History

### [1.0.0] - 2025-10-13
- Initial release
- Core chat functionality with 4 AI models
- Multi-model support via OpenRouter (Gemini 2.5 Flash, Grok 4 Fast, GPT-4.1 Mini, Claude Sonnet 4.5)
- 72 lessons integrated (10 modules + Project Setup Guide)
- Full documentation following SSOT principles
- Git repository with first commit
- Tested and working locally (backend + frontend)

---

## Notes

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Change Categories:

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
