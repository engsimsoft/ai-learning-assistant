# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- FastAPI application with async support
- OpenRouter integration for multiple LLM access
- Support for Claude 3.5, GPT-4, Gemini Pro, Llama 3, and 100+ models
- Automatic model fallback mechanism
- Context service for managing 70+ lessons
- Lesson loading from Markdown/text files
- Pydantic models for request/response validation
- CORS middleware for frontend integration
- Health check endpoint
- API endpoints: `/lessons`, `/models`, `/chat`
- Comprehensive error handling and logging
- Environment-based configuration

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
- Comprehensive README with quick start
- Detailed setup guide
- Architecture documentation with diagrams
- Deployment guide for Railway
- Troubleshooting guide
- ADR 001: OpenRouter decision
- ADR template for future decisions
- Project roadmap

**DevOps:**
- `.gitignore` for Python and Node.js
- `.env.example` files for configuration
- Railway deployment configuration
- CORS setup for local and production

### Features

- **Multi-Model Support**: Choose from multiple AI models via OpenRouter
- **Context-Aware Responses**: AI has access to 70+ structured lessons
- **Flexible Lesson Selection**: Use all lessons or select specific modules
- **Automatic Fallback**: Switches to backup model if primary unavailable
- **Real-Time Chat**: Interactive conversation with history
- **Responsive UI**: Works on desktop, tablet, and mobile
- **Metadata Display**: Shows model used, tokens consumed, lessons referenced

### Technical Stack

- Backend: FastAPI 0.104.1, Python 3.11+, OpenRouter API
- Frontend: React 18, Vite 5, Modern JavaScript
- Deployment: Railway
- Architecture: RESTful API, stateless design, layered architecture

---

## Version History

### [1.0.0] - 2025-10-13
- Initial release
- Core chat functionality
- Multi-model support via OpenRouter
- 70+ lessons integrated (10 modules + Project Setup Guide)
- Full documentation

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
