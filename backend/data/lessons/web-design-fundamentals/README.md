# Web Design Fundamentals

> **Философия курса:** Понимание UI/UX терминологии и артефактов дизайна для эффективного общения с ИИ-ассистентами

---

## 🎯 О курсе

**Web Design Fundamentals** — курс по основам веб-дизайна для разработчиков, практикующих **Vibe Coding** (AI-assisted development).

### Цель курса

Научить правильно называть элементы веб-интерфейса, понимать артефакты дизайна и эффективно формулировать задачи для ИИ-ассистентов (Claude Code, Cursor, GitHub Copilot).

### Для кого этот курс

✅ Разработчики, работающие с ИИ-помощниками
✅ Те, кто хочет правильно формулировать UI/UX задачи
✅ Практикующие вайб-кодинг (понимание концепций, а не ручная вёрстка)

### Что НЕ учит курс

❌ Синтаксис CSS (это делает ИИ)
❌ Пиксель-перфектную вёрстку
❌ Photoshop/Figma детали

---

## 📚 Модули курса

### Module 1: UI Terminology (5 уроков) 🎨

**Путь:** `1-ui-terminology/`

**Цель:** Научиться правильно называть элементы интерфейса

**Уроки:**

1. **lesson-1-1-layout-elements.md** — Основные элементы разметки
   - Header, Footer, Sidebar, Main, Container
   - Three-panel layout (как в AI Learning Agent)
   - Аналогии: Header = шапка дома

2. **lesson-1-2-navigation-elements.md** — Элементы навигации
   - Navbar, Tree navigation, Breadcrumbs, Tabs
   - Примеры из AI Learning Agent (CourseTree, LessonNavigation)
   - Аналогии: Tree = папки в проводнике

3. **lesson-1-3-interactive-elements.md** — Интерактивные элементы
   - Button, Input, Dropdown, Checkbox, Radio, Toggle
   - Примеры из AI Learning Agent (ModelSelector, InputForm)
   - Аналогии: Dropdown = меню в ресторане

4. **lesson-1-4-feedback-elements.md** — Элементы обратной связи
   - Modal, Toast, Loading spinner, Progress bar, Badge
   - Примеры из AI Learning Agent (ContextSelectorModal)
   - Аналогии: Modal = всплывающее окно блокирует экран

5. **lesson-1-5-prompting-for-ui.md** — Формулировка задач для ИИ
   - Шаблоны промптов для Claude Code
   - Плохие vs Хорошие промпты
   - Как описать layout и элементы

---

### Module 2: Artifacts (6 уроков) 🎨

**Путь:** `2-artifacts/`

**Цель:** Понимать артефакты дизайна и использовать их с ИИ

**Уроки:**

1. **lesson-2-1-what-are-artifacts.md** — Что такое артефакты дизайна
   - Wireframe, Mockup, Prototype, Design System
   - Зачем нужны артефакты
   - Жизненный цикл артефактов

2. **lesson-2-2-wireframes-mockups.md** — Wireframes, Mockups, Prototypes
   - Low-Fi, Mid-Fi, High-Fi подходы
   - Когда использовать каждый тип
   - ASCII wireframe примеры

3. **lesson-2-3-design-systems.md** — Design Systems, Style Guides
   - Atomic Design (Atoms, Molecules, Organisms)
   - Design Tokens (colors, spacing, typography)
   - Material Design, Ant Design, Chakra UI

4. **lesson-2-4-component-libraries.md** — Component Libraries, UI Kits
   - Material-UI, Ant Design, Chakra UI, shadcn/ui
   - Storybook для документации компонентов
   - Кастомизация и интеграция

5. **lesson-2-5-handoff-artifacts.md** — Design → Dev Handoff
   - Figma Inspect Panel
   - Извлечение design specs
   - Экспорт assets и responsive specs

6. **lesson-2-6-prompting-with-artifacts.md** — Мастер-класс: Промптинг с артефактами
   - Структура идеальных промптов
   - Progressive prompting (Lo-Fi → Hi-Fi)
   - Anti-patterns и продвинутые техники
   - Полные workflow примеры

**Статус:** ✅ Завершен (2025-10-16)

---

## 💼 Worked Examples

### Example 1: AI Learning Agent 🤖

**Путь:** `../worked-examples/example-1-ai-learning-agent/`

**Файлы:**
- `ui-terminology-guide.md` — Карта всех UI элементов проекта (Module 1) ✅
- `design-artifacts-guide.md` — Артефакты проекта: wireframes, mockups, design system (Module 2) ✅

**Применение:** Все термины объясняются на примере реального проекта AI Learning Agent.

---

## 📊 Статистика курса

| Модуль | Тема | Уроков | Статус |
|--------|------|--------|--------|
| **Module 1** | UI Terminology | 5 | ✅ Завершен |
| **Module 2** | Artifacts | 6 | ✅ Завершен |
| **Всего** | | **11** | **✅ Готов** |

---

## 🎓 Философия курса: Vibe Coding для дизайна

### Традиционный подход (НЕ наш)

```
Дизайнер создаёт mockup в Figma
    ↓
Разработчик вручную верстает CSS
    ↓
Пиксель-перфектная подгонка
    ↓
Результат через 2-3 дня
```

### Vibe Coding подход (наш)

```
Понимаешь термины (Header, Sidebar, Modal)
    ↓
Формулируешь задачу для Claude Code
    ↓
ИИ создаёт компоненты и стили
    ↓
Результат через 30 минут
```

**Твоя роль:** Понимать концепции и правильно общаться с ИИ
**Роль ИИ:** Писать код и стили

---

## 🔗 Связь с другими курсами

### AI Web Learning
**ЧТО создавать:** Backend, Frontend, Database, RAG, ML
**Связь:** Web Design Fundamentals учит КАК называть UI элементы в этих проектах

### Project Setup Guide
**КАК организовать:** Структура проекта, документация, Git
**Связь:** Web Design Fundamentals дополняет организацию UI/UX частью

---

## 🚀 Рекомендуемый порядок изучения

**Вариант 1: Новичок в веб-разработке**
1. AI Web Learning (Module 1-2: Basics + Backend)
2. **Web Design Fundamentals (Module 1: UI Terminology)**
3. AI Web Learning (Module 4: Frontend)
4. **Web Design Fundamentals (Module 2: Artifacts)**

**Вариант 2: Опытный разработчик**
1. **Web Design Fundamentals (Module 1: UI Terminology)** — быстро освоить термины
2. Применять в своих проектах с ИИ
3. **Web Design Fundamentals (Module 2: Artifacts)** — по необходимости

---

## 💡 Главный takeaway

> **"В 2025 году ИИ пишет код и стили. Ты задаёшь направление и называешь элементы правильно."**

**После этого курса ты сможешь:**
- ✅ Правильно назвать любой UI элемент (Header, Modal, Dropdown)
- ✅ Сформулировать задачу для Claude Code так, что он поймёт с первого раза
- ✅ Понимать ответы ИИ (когда он говорит "добавь sidebar с tree navigation")
- ✅ Работать с артефактами дизайна (wireframes, mockups)

---

## 📖 Как использовать этот курс

### Для изучения уроков
1. Читай уроки последовательно (1.1 → 1.2 → ... → 1.5)
2. Смотри примеры из AI Learning Agent
3. Пробуй промпты для Claude Code
4. Проверяй понимание через вопросы для самопроверки

### Для справки
- Забыл как называется элемент? → Открой нужный урок
- Не знаешь как сформулировать задачу? → Урок 1.5 или 2.6

---

## 🔍 Дополнительные ресурсы

**Если хочешь углубиться (опционально):**
- [Material Design](https://material.io/design) - дизайн-система от Google
- [Laws of UX](https://lawsofux.com/) - принципы UX дизайна
- [Refactoring UI](https://www.refactoringui.com/) - практические советы по UI

**НО!** Это не обязательно. Главное - понять концепции из этого курса.

---

**Дата создания:** 2025-10-16
**Версия:** 1.0
**Язык:** Русский

---

**Следующий шаг:** Начни с [Урока 1.1: Layout Elements](1-ui-terminology/lesson-1-1-layout-elements.md)
