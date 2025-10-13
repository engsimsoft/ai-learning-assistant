# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Course-level selection in LessonSelector** - New checkbox for each course to select all lessons at once
  - Added checkbox next to each course name (AI Web Learning, Project Setup Guide, Additional Materials)
  - Click checkbox to select/deselect all lessons in that course
  - Indeterminate state when some (but not all) lessons selected
  - Improved UX: no need to expand modules and select lessons individually

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
