# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - Unreleased

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
  - Grok 4 Fast (FREE now! 2M context, auto-cache)
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
