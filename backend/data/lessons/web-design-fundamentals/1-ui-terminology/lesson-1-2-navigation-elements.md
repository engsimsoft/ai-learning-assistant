# Урок 1.2: Navigation Elements (Элементы навигации)

> **Модуль 1:** UI Terminology
> **Урок:** 1.2
> **Длительность:** 30-45 минут
> **Prerequisite:** Урок 1.1 (Layout Elements)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Правильно называть элементы навигации (Navbar, Tree, Breadcrumbs, Tabs)
- ✅ Понимать когда использовать какой тип навигации
- ✅ Объяснить как работает Tree navigation на примере CourseTree
- ✅ Формулировать задачи для Claude Code используя правильные термины навигации

---

## 📖 Концепция: Что такое Navigation?

### Простое определение

**Navigation (навигация)** — это элементы интерфейса, которые помогают пользователю перемещаться по сайту или приложению.

**Важно:** Навигация — это "карта" сайта. Без навигации пользователь потеряется.

**Аналогия:** Указатели в торговом центре — показывают где какой магазин.

---

## 🗺️ Основные типы навигации

### 1. Navbar (Navigation Bar) — Панель навигации

**Что это:**
- Горизонтальная панель с ссылками
- Обычно в Header
- Основная навигация по разделам сайта

**Аналогия:** Указатели на дороге — главные направления

```
┌─────────────────────────────────────────┐
│ [Logo]  Home  About  Services  Contact │ ← Navbar
├─────────────────────────────────────────┤
│                                         │
│           Content                       │
└─────────────────────────────────────────┘
```

**Когда использовать:**
- Сайты с 3-7 основными разделами
- Публичные сайты (корпоративные, лендинги)

**Пример для Claude Code:**
```
Создай Navbar компонент:
- Horizontal layout
- Links: Home, About, Services, Contact
- Logo слева
- Hover эффект для ссылок
- Active состояние (подчёркивание текущей страницы)
```

---

### 2. Tree Navigation (Древовидная навигация)

**Что это:**
- Иерархическая структура (как папки в проводнике)
- Показывает вложенность: Parent → Child → Grandchild
- Можно раскрывать/сворачивать ветки

**Аналогия:** Дерево генеалогии — видно родителей, детей, внуков

```
📁 Course 1
  📂 Module 1
    📄 Lesson 1.1
    📄 Lesson 1.2
  📂 Module 2
    📄 Lesson 2.1

📁 Course 2
  📂 Module 1
    📄 Lesson 1.1
```

**В AI Learning Agent:**
- Компонент: `CourseTree.jsx`
- Структура: Course → Module → Lesson
- Раскрытие/сворачивание курсов и модулей
- Подсветка текущего урока

**Когда использовать:**
- Сложная иерархия (курсы, документация)
- Много уровней вложенности
- Sidebar navigation

**Пример для Claude Code:**
```
Создай Tree Navigation компонент для курсов:

СТРУКТУРА:
- Level 1: Courses (с иконкой 📁)
- Level 2: Modules (с иконкой 📂)
- Level 3: Lessons (с иконкой 📄)

ФУНКЦИОНАЛЬНОСТЬ:
- Клик на Course → раскрыть/свернуть Modules
- Клик на Module → раскрыть/свернуть Lessons
- Клик на Lesson → открыть урок
- Подсветка выбранного Lesson (background: #E0F2FE)

СТИЛЬ:
- Отступы для вложенности (каждый level +16px padding-left)
- Hover эффект (background: #F3F4F6)
- Active lesson (background: #DBEAFE, border-left: 3px solid #3B82F6)
```

---

### 3. Breadcrumbs (Хлебные крошки)

**Что это:**
- Показывает путь от главной страницы до текущей
- Формат: Home > Category > Subcategory > Current Page
- Помогает понять где находишься

**Аналогия:** Хлебные крошки из сказки — путь обратно домой

```
Home > Courses > AI Web Learning > Module 2 > Lesson 2.1
  ↑       ↑            ↑              ↑          ↑
клик  →  клик    →    клик      →   клик   текущая страница
```

**Когда использовать:**
- Глубокая вложенность (3+ уровня)
- E-commerce (категории товаров)
- Документация

**В AI Learning Agent:**
- Не используются (есть Tree navigation, которая показывает структуру)
- Альтернатива: Lesson title показывает Course и Module

**Пример для Claude Code:**
```
Создай Breadcrumbs компонент:

INPUT: path = ['Home', 'Courses', 'AI Web Learning', 'Module 2', 'Lesson 2.1']

OUTPUT:
Home > Courses > AI Web Learning > Module 2 > Lesson 2.1

СТИЛЬ:
- Separator: " > " (серый цвет)
- Ссылки: синий цвет, underline on hover
- Текущая страница: чёрный цвет, не кликабельна
```

---

### 4. Tabs (Вкладки)

**Что это:**
- Горизонтальные кнопки для переключения контента
- Один активный tab в момент времени
- Контент меняется без перезагрузки страницы

**Аналогия:** Вкладки в браузере — переключаешься между страницами

```
┌────────┬────────┬────────┬────────┐
│ Tab 1  │ Tab 2  │ Tab 3  │ Tab 4  │
└────────┴────────┴────────┴────────┘
┌────────────────────────────────────┐
│                                    │
│  Content for active tab            │
│                                    │
└────────────────────────────────────┘
```

**Когда использовать:**
- 2-7 разделов одного уровня
- Настройки, профиль пользователя
- Фильтры, категории

**Пример для Claude Code:**
```
Создай Tabs компонент:

TABS: ['Overview', 'Features', 'Pricing', 'FAQ']
DEFAULT: 'Overview'

СТИЛЬ:
Active tab:
- Background: white
- Border-bottom: 2px solid #3B82F6
- Color: #3B82F6

Inactive tab:
- Background: transparent
- Color: #6B7280
- Hover: background #F3F4F6
```

---

### 5. Pagination (Пагинация)

**Что это:**
- Навигация по страницам (1, 2, 3, ...)
- Для длинных списков (статьи, товары, результаты поиска)

**Аналогия:** Страницы в книге — читаешь по порядку

```
┌──────────────────────────────────────────┐
│ Results 1-10 of 250                      │
├──────────────────────────────────────────┤
│ Item 1                                   │
│ Item 2                                   │
│ ...                                      │
│ Item 10                                  │
├──────────────────────────────────────────┤
│ ‹ Prev  1  [2]  3  4  5 ... 25  Next ›  │ ← Pagination
└──────────────────────────────────────────┘
```

**Когда использовать:**
- Длинные списки (50+ элементов)
- Блог, новости
- E-commerce, поиск

---

### 6. Prev/Next Buttons (Кнопки Назад/Вперёд)

**Что это:**
- Простая навигация между соседними элементами
- Только 2 кнопки: Previous и Next

**Аналогия:** Листание книги — предыдущая/следующая страница

```
┌────────────────────────────────────┐
│                                    │
│        Lesson Content              │
│                                    │
├────────────────────────────────────┤
│ ‹ Previous    ·    Next ›         │ ← Prev/Next
└────────────────────────────────────┘
```

**В AI Learning Agent:**
- Компонент: `LessonNavigation.jsx`
- Внизу `LessonViewer`
- Показывает названия соседних уроков
- Disabled если первый/последний урок

**Пример для Claude Code:**
```
Создай Prev/Next navigation для уроков:

PROPS:
- prevLesson: {id: 1, title: "Lesson 1.1"}
- nextLesson: {id: 3, title: "Lesson 1.3"}
- onNavigate: (lessonId) => {...}

LAYOUT:
┌───────────────────────────────────────────┐
│ ‹ Lesson 1.1          Lesson 1.3 ›       │
└───────────────────────────────────────────┘

СТИЛЬ:
- Buttons: padding 12px 24px
- Hover: background #F3F4F6
- Disabled: opacity 0.5, cursor not-allowed
- Show lesson titles on buttons
```

---

## 🌐 Примеры из AI Learning Agent

### Left Sidebar: CourseTree (Tree Navigation)

**Компонент:** `LeftSidebar.jsx` + `CourseTree.jsx`

**Структура:**
```
📁 AI Web Learning               ← Course (click to expand)
  📂 1. Basics                   ← Module (click to expand)
    📄 Lesson 1.1: Client-Server ← Lesson (click to open)
    📄 Lesson 1.2: HTTP Basics
  📂 2. Backend
    📄 Lesson 2.1: FastAPI Intro

📁 Project Setup Guide
  📂 1. Fundamentals
    📄 Lesson 1.1: Philosophy
```

**Особенности:**
- Раскрытие/сворачивание курсов и модулей
- Подсветка текущего урока (голубой фон)
- Иконки для визуальной иерархии
- Прокрутка если много уроков

---

### Center Panel: LessonNavigation (Prev/Next)

**Компонент:** `LessonNavigation.jsx`

**Расположение:** Внизу `LessonViewer`

**Пример:**
```
┌──────────────────────────────────────────┐
│ [Lesson content...]                      │
├──────────────────────────────────────────┤
│ ‹ Prev: Lesson 1.1    Next: Lesson 1.3 ›│
└──────────────────────────────────────────┘
```

---

## 🤖 Промпт для Claude Code

### Задача: Создать Tree Navigation

```
Создай Tree Navigation компонент для иерархической структуры курсов:

ДАННЫЕ (пример):
const courses = [
  {
    id: 1,
    title: "AI Web Learning",
    modules: [
      {
        id: 1,
        title: "Module 1: Basics",
        lessons: [
          {id: 1, title: "Lesson 1.1: Client-Server"},
          {id: 2, title: "Lesson 1.2: HTTP Basics"}
        ]
      }
    ]
  }
];

ФУНКЦИОНАЛЬНОСТЬ:
1. Раскрытие/сворачивание:
   - Courses: клик на название → toggle modules
   - Modules: клик на название → toggle lessons
   - Lessons: клик → вызвать onLessonSelect(lessonId)

2. Визуальные состояния:
   - Expanded course/module: иконка ▼
   - Collapsed course/module: иконка ►
   - Hover: background #F3F4F6
   - Active lesson: background #DBEAFE, border-left 3px #3B82F6

3. Отступы для вложенности:
   - Course: padding-left 12px
   - Module: padding-left 28px
   - Lesson: padding-left 44px

ТЕХНОЛОГИИ:
- React + useState (для раскрытия/сворачивания)
- CSS для стилей
- Props: courses, currentLessonId, onLessonSelect

Создай полнофункциональный компонент.
```

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Могу объяснить что такое Navigation
- [ ] Знаю типы навигации: Navbar, Tree, Breadcrumbs, Tabs, Pagination
- [ ] Понимаю когда использовать каждый тип
- [ ] Могу описать Tree navigation в AI Learning Agent

**Практическое применение:**
- [ ] Могу назвать тип навигации на любом сайте
- [ ] Понимаю разницу между Tree и Breadcrumbs
- [ ] Могу сформулировать задачу для Claude Code

**Связь с AI Learning Agent:**
- [ ] Понимаю как работает CourseTree
- [ ] Знаю компоненты: CourseTree, LessonNavigation
- [ ] Могу объяснить зачем Tree navigation для курсов

---

## 📝 Вопросы для самопроверки

1. **Типы навигации:**
   - Назови 5-6 типов навигации
   - Когда использовать Tree navigation?
   - Когда использовать Tabs вместо Navbar?

2. **Tree Navigation:**
   - Объясни иерархию: Course → Module → Lesson
   - Что происходит при клике на Course?
   - Как показать текущий урок?

3. **В AI Learning Agent:**
   - Где находится Tree navigation?
   - Что такое LessonNavigation?
   - Зачем нужны Prev/Next кнопки?

4. **Для Claude Code:**
   - Как описать Tree navigation с 3 уровнями?
   - Какие props нужны для навигации?

---

## 🔗 Связь с другими уроками

**Предыдущий урок:** 1.1 Layout Elements
- Layout определяет где разместить навигацию (обычно в Sidebar или Header)

**Следующий урок:** 1.3 Interactive Elements
- Узнаешь про кнопки, inputs, dropdowns
- Tree navigation использует кнопки для раскрытия/сворачивания

**Связь с проектом:**
- CourseTree — центральный элемент навигации в AI Learning Agent
- LessonNavigation — дополнительная навигация для удобства

---

## 💡 Итоговые выводы

**Что я понял:**

1. **Navigation** — элементы для перемещения по сайту
   - Navbar — горизонтальная панель
   - Tree — иерархическая структура
   - Breadcrumbs — путь от главной до текущей
   - Tabs — переключение контента
   - Pagination — навигация по страницам
   - Prev/Next — между соседними элементами

2. **Tree Navigation** (как CourseTree):
   - Показывает вложенность
   - Раскрытие/сворачивание веток
   - Подсветка текущего элемента

3. **Для работы с ИИ**:
   - Не "дерево курсов", а **"Tree Navigation"**
   - Не "кнопки назад-вперёд", а **"Prev/Next Navigation"**
   - Не "вкладки", а **"Tabs"**

---

*Версия урока: 1.0*
*Дата создания: 16 октября 2025*
