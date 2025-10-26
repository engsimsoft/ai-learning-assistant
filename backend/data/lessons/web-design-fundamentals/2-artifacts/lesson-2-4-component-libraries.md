# Урок 2.4: Component Libraries & UI Kits (Библиотеки компонентов и UI-киты)

> **Модуль 2:** Artifacts
> **Урок:** 2.4
> **Длительность:** 60-75 минут
> **Prerequisite:** Lessons 2.1, 2.2, 2.3

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Объяснить разницу между Design System и Component Library
- ✅ Выбирать подходящую библиотеку компонентов для проекта
- ✅ Использовать популярные библиотеки: Material-UI, Ant Design, Chakra UI, Tailwind UI, shadcn/ui
- ✅ Кастомизировать компоненты без нарушения системы
- ✅ Формулировать промпты для Claude Code с указанием конкретной библиотеки
- ✅ Работать со Storybook для документации компонентов

---

## 📖 Концепция: Что такое Component Library?

### Простое определение

**Component Library (библиотека компонентов)** — это готовый набор переиспользуемых UI-компонентов (кнопки, формы, модальные окна), которые можно установить в проект и использовать "из коробки".

**Важно:** Component Library — это как магазин готовой мебели IKEA. Вместо того чтобы создавать каждый компонент с нуля, ты берёшь готовые и собираешь интерфейс.

---

## 🏗️ Аналогия: Строительство дома

Представь два подхода к созданию интерфейса:

```
🔨 CUSTOM COMPONENTS              🏪 COMPONENT LIBRARY
(Строишь всё сам)                 (Покупаешь готовое)

Кнопка: 2 часа                    Кнопка: <Button />
  ├─ Дизайн                         └─ Уже готова!
  ├─ Код
  ├─ Стили                        Форма: <Form />
  ├─ Адаптивность                   └─ Уже готова!
  └─ Тестирование
                                  Modal: <Modal />
Форма: 5 часов                      └─ Уже готов!
  ├─ Валидация
  ├─ Ошибки                       Итого: 10 минут
  ├─ Стили                        Интеграция в проект
  └─ Адаптивность

Modal: 3 часа
  ├─ Overlay
  ├─ Анимации
  ├─ A11y
  └─ Закрытие

Итого: 10+ часов
```

**Ключевые моменты:**
- **Custom** — полный контроль, но долго
- **Library** — быстро, но меньше гибкости
- **Золотая середина** — библиотека + кастомизация

---

## 🎨 Design System vs Component Library

### Разница понятий

| Аспект | Design System | Component Library |
|--------|---------------|-------------------|
| **Что это** | Концепция + правила | Код + компоненты |
| **Формат** | Figma, документы | npm пакет |
| **Включает** | Философия, принципы, гайдлайны | Готовые React/Vue компоненты |
| **Использует** | Дизайнер | Разработчик |
| **Примеры** | Material Design (концепция) | Material-UI (код) |
| **Обновления** | Редко (философия стабильна) | Часто (bugfix, features) |

### Визуальная схема

```
DESIGN SYSTEM                      COMPONENT LIBRARY
(Концепция)                        (Реализация)

┌───────────────┐                  ┌───────────────┐
│ Принципы      │                  │ Code          │
│ - Typography  │──────────────────>│ - Button.tsx  │
│ - Colors      │   Реализация     │ - Input.tsx   │
│ - Spacing     │   в коде         │ - Modal.tsx   │
└───────────────┘                  └───────────────┘
     │                                     │
     │ Дизайнер                            │ Разработчик
     │ читает                              │ устанавливает
     ↓                                     ↓
 Создаёт mockup                      npm install
```

**Пример:**
- **Material Design** — это Design System (концепция от Google)
- **Material-UI (MUI)** — это Component Library (React реализация Material Design)

---

## 🛠️ Популярные Component Libraries

### Обзор топовых библиотек

#### 1. Material-UI (MUI)
```
🏢 Создатель: Google (концепция), MUI team (библиотека)
📦 Установка: npm install @mui/material @emotion/react @emotion/styled
⭐ GitHub: 93k+ stars
💰 Лицензия: MIT (бесплатная)
```

**Что это:**
- Реализация Material Design (дизайн Google)
- Самая популярная библиотека для React
- Богатый набор компонентов (100+)

**Когда использовать:**
- ✅ Нужен современный, профессиональный вид
- ✅ Быстрый старт проекта
- ✅ Привычный интерфейс (похож на Gmail, Google Docs)

**Плюсы:**
- ✅ Огромное сообщество
- ✅ Отличная документация
- ✅ Доступность (a11y) из коробки
- ✅ Кастомизация через theming

**Минусы:**
- ❌ Тяжёлая (размер bundle)
- ❌ Специфичный стиль Google
- ❌ Сложно радикально изменить дизайн

---

#### 2. Ant Design
```
🏢 Создатель: Alibaba Group
📦 Установка: npm install antd
⭐ GitHub: 91k+ stars
💰 Лицензия: MIT
```

**Что это:**
- Китайская библиотека для enterprise приложений
- Фокус на бизнес-интерфейсах (CRM, ERP, admin panels)
- Rich компоненты (таблицы, формы, графики)

**Когда использовать:**
- ✅ Admin панели, dashboard
- ✅ Enterprise приложения
- ✅ Нужны сложные компоненты (таблицы с сортировкой, фильтрами)

**Плюсы:**
- ✅ Много компонентов для бизнеса
- ✅ Мощные Table, Form
- ✅ Китайский + английский (интернационализация)

**Минусы:**
- ❌ Консервативный дизайн
- ❌ Сложнее кастомизировать
- ❌ Тяжёлая библиотека

---

#### 3. Chakra UI
```
🏢 Создатель: Segun Adebayo
📦 Установка: npm install @chakra-ui/react @emotion/react @emotion/styled
⭐ GitHub: 37k+ stars
💰 Лицензия: MIT
```

**Что это:**
- Современная библиотека с фокусом на доступность (a11y)
- Простой и чистый API
- Composable компоненты (легко комбинировать)

**Когда использовать:**
- ✅ Нужна простота и скорость разработки
- ✅ Доступность (a11y) критична
- ✅ Хочешь лёгкую кастомизацию

**Плюсы:**
- ✅ Простой API (легко учить)
- ✅ Отличная a11y из коробки
- ✅ Малый размер bundle
- ✅ Dark mode встроен

**Минусы:**
- ❌ Меньше компонентов чем MUI/Ant
- ❌ Молодая библиотека (меньше примеров)

---

#### 4. Tailwind UI
```
🏢 Создатель: Tailwind Labs
📦 Установка: Tailwind CSS + покупка компонентов
⭐ Популярность: Очень высокая
💰 Лицензия: $299 (платная)
```

**Что это:**
- НЕ библиотека компонентов в классическом смысле
- Набор готовых HTML/React примеров
- Работает с Tailwind CSS (utility-first framework)

**Когда использовать:**
- ✅ Уже используешь Tailwind CSS
- ✅ Нужен уникальный дизайн
- ✅ Готов платить за качественные примеры

**Плюсы:**
- ✅ Красивый, современный дизайн
- ✅ Полный контроль (это просто код)
- ✅ Нет зависимостей (кроме Tailwind)

**Минусы:**
- ❌ Платная ($299)
- ❌ Не библиотека (нужно копировать код)
- ❌ Нужно знать Tailwind CSS

---

#### 5. shadcn/ui
```
🏢 Создатель: shadcn (opensource)
📦 Установка: npx shadcn-ui@latest init
⭐ GitHub: 70k+ stars
💰 Лицензия: MIT (бесплатная)
```

**Что это:**
- НЕ npm пакет, а CLI для копирования компонентов
- Компоненты копируются в твой проект (ты владеешь кодом)
- Построен на Radix UI + Tailwind CSS

**Когда использовать:**
- ✅ Хочешь полный контроль над кодом
- ✅ Используешь Tailwind CSS
- ✅ Нужна современность + гибкость

**Плюсы:**
- ✅ Ты владеешь кодом (можешь менять что угодно)
- ✅ Красивый дизайн
- ✅ Не добавляет зависимости

**Минусы:**
- ❌ Нужно знать Tailwind
- ❌ Обновления вручную (не npm update)
- ❌ Больше ответственности

---

## 📊 Сравнительная таблица библиотек

| Библиотека | Компонентов | Bundle Size | Кастомизация | Сложность | Лучше для |
|-----------|-------------|-------------|--------------|-----------|-----------|
| **Material-UI** | 100+ | 📦📦📦 Большой | ⭐⭐⭐ Средняя | ⭐⭐ Средняя | Общие проекты |
| **Ant Design** | 80+ | 📦📦📦 Большой | ⭐⭐ Сложная | ⭐⭐⭐ Высокая | Admin панели |
| **Chakra UI** | 50+ | 📦📦 Средний | ⭐⭐⭐⭐ Легкая | ⭐ Простая | Стартапы, MVP |
| **Tailwind UI** | 500+ примеров | 📦 Малый | ⭐⭐⭐⭐⭐ Полная | ⭐⭐ Средняя | Уникальный дизайн |
| **shadcn/ui** | 40+ | 📦 Малый | ⭐⭐⭐⭐⭐ Полная | ⭐⭐ Средняя | Полный контроль |

### Как выбрать?

```
                    Выбор библиотеки
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    Быстро?          Контроль?         Enterprise?
        │                 │                 │
        ↓                 ↓                 ↓
   Material-UI      shadcn/ui         Ant Design
   или Chakra UI    или Tailwind UI
```

**Вопросы для выбора:**

1. **Нужен быстрый старт?** → Material-UI, Chakra UI
2. **Нужен полный контроль над дизайном?** → shadcn/ui, Tailwind UI
3. **Делаешь admin панель?** → Ant Design
4. **Важна доступность (a11y)?** → Chakra UI
5. **Бюджет есть?** → Tailwind UI ($299)
6. **Используешь Tailwind CSS?** → shadcn/ui, Tailwind UI

---

## 💻 Примеры кода: Основные компоненты

### Кнопка (Button) в разных библиотеках

#### Material-UI
```typescript
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      {/* Основная кнопка */}
      <Button variant="contained" color="primary">
        Click me
      </Button>

      {/* Вторичная кнопка */}
      <Button variant="outlined" color="secondary">
        Cancel
      </Button>

      {/* С иконкой */}
      <Button variant="contained" startIcon={<SaveIcon />}>
        Save
      </Button>
    </>
  );
}
```

#### Ant Design
```typescript
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

function App() {
  return (
    <>
      {/* Основная кнопка */}
      <Button type="primary">Click me</Button>

      {/* Вторичная кнопка */}
      <Button>Cancel</Button>

      {/* С иконкой */}
      <Button type="primary" icon={<SaveOutlined />}>
        Save
      </Button>
    </>
  );
}
```

#### Chakra UI
```typescript
import { Button } from '@chakra-ui/react';
import { SaveIcon } from '@chakra-ui/icons';

function App() {
  return (
    <>
      {/* Основная кнопка */}
      <Button colorScheme="blue">Click me</Button>

      {/* Вторичная кнопка */}
      <Button variant="outline" colorScheme="blue">
        Cancel
      </Button>

      {/* С иконкой */}
      <Button leftIcon={<SaveIcon />} colorScheme="blue">
        Save
      </Button>
    </>
  );
}
```

#### shadcn/ui
```typescript
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

function App() {
  return (
    <>
      {/* Основная кнопка */}
      <Button>Click me</Button>

      {/* Вторичная кнопка */}
      <Button variant="outline">Cancel</Button>

      {/* С иконкой */}
      <Button>
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
    </>
  );
}
```

**Вывод:** Синтаксис похож, но есть нюансы в названиях props!

---

## 🎨 Кастомизация компонентов

### Подход 1: Theming (Темизация)

**Material-UI Theme:**
```typescript
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Создаём кастомную тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF', // Твой основной цвет
    },
    secondary: {
      main: '#6C757D',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    button: {
      textTransform: 'none', // Убрать UPPERCASE
    },
  },
  shape: {
    borderRadius: 8, // Скругление углов
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Все компоненты используют твою тему */}
      <Button variant="contained">Кнопка с кастомным цветом</Button>
    </ThemeProvider>
  );
}
```

**Chakra UI Theme:**
```typescript
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#007BFF',
      600: '#0056b3',
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '8px',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Button colorScheme="brand">Кастомная кнопка</Button>
    </ChakraProvider>
  );
}
```

---

### Подход 2: Styled Components

**Обёртка над библиотечным компонентом:**
```typescript
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Создаём кастомную версию
const CustomButton = styled(MuiButton)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 8,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',

  '&:hover': {
    background: 'linear-gradient(45deg, #FE5B7B 30%, #FF7E43 90%)',
  },
});

function App() {
  return <CustomButton>Красивая кнопка</CustomButton>;
}
```

---

### Подход 3: CSS Modules / Tailwind

**shadcn/ui с Tailwind (прямая модификация):**
```typescript
import { Button } from '@/components/ui/button';

function App() {
  return (
    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
      Градиентная кнопка
    </Button>
  );
}
```

**Преимущество:** Ты владеешь кодом компонента, можешь менять что угодно!

---

## 📚 Storybook: Документация компонентов

### Что такое Storybook?

**Storybook** — это инструмент для разработки UI компонентов в изоляции (отдельно от основного приложения).

**Аналогия:** Storybook — это каталог IKEA для твоих компонентов. Каждый компонент на отдельной странице, можно посмотреть все варианты.

```
ОБЫЧНАЯ РАЗРАБОТКА          STORYBOOK

App.tsx                     Button.stories.tsx
├─ Header                   ├─ Primary Button
├─ Sidebar                  ├─ Secondary Button
│  ├─ Button ← Где он???    ├─ Disabled Button
├─ Content                  ├─ Loading Button
│  ├─ Form                  └─ With Icon
│     ├─ Button ← И тут?
└─ Footer                   Всё в одном месте!
```

### Установка Storybook

```bash
# Автоматическая установка в существующий проект
npx storybook@latest init
```

### Пример Story (файл Button.stories.tsx)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Метаданные компонента
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// История 1: Основная кнопка
export const Primary: Story = {
  args: {
    variant: 'contained',
    children: 'Click me',
  },
};

// История 2: Вторичная кнопка
export const Secondary: Story = {
  args: {
    variant: 'outlined',
    children: 'Cancel',
  },
};

// История 3: Отключенная кнопка
export const Disabled: Story = {
  args: {
    variant: 'contained',
    disabled: true,
    children: 'Disabled',
  },
};

// История 4: С иконкой
export const WithIcon: Story = {
  args: {
    variant: 'contained',
    children: (
      <>
        <SaveIcon /> Save
      </>
    ),
  },
};
```

### Запуск Storybook

```bash
npm run storybook
```

Откроется браузер с UI-каталогом твоих компонентов!

---

## 🎯 Vibe Coding: Промпты для работы с библиотеками

### Шаблон 1: Установка и настройка библиотеки

```
📝 PROMPT:
Установи и настрой [библиотека] в моём React проекте.

Требования:
- Установи все необходимые зависимости
- Настрой ThemeProvider (если нужно)
- Создай базовую тему с кастомными цветами:
  - Primary: #007BFF
  - Secondary: #6C757D
- Покажи пример использования Button и TextField
```

**Пример для Material-UI:**
```
Установи и настрой Material-UI (MUI) в моём React проекте.

Требования:
- Установи @mui/material, @emotion/react, @emotion/styled
- Настрой ThemeProvider в App.tsx
- Создай тему с цветами:
  - Primary: #1976D2 (синий)
  - Secondary: #DC004E (розовый)
- Шрифт: Inter
- Border radius: 8px
- Покажи пример страницы с Button, TextField, Card
```

---

### Шаблон 2: Создание компонента с библиотекой

```
📝 PROMPT:
Создай React компонент [название] используя [библиотека].

Структура:
[Описание или wireframe]

Используй компоненты:
- [список компонентов из библиотеки]

Требования:
- TypeScript
- Адаптивность (mobile + desktop)
- [Дополнительные требования]
```

**Пример для Chakra UI:**
```
Создай React компонент LoginForm используя Chakra UI.

Структура:
┌───────────────────────┐
│   [Logo]              │
│                       │
│   Email: [________]   │
│   Password: [______]  │
│   [ ] Remember me     │
│                       │
│   [Login Button]      │
│   Forgot password?    │
└───────────────────────┘

Используй компоненты:
- Box, VStack для layout
- Input, FormControl, FormLabel для полей
- Button для кнопки
- Checkbox для "Remember me"
- Link для "Forgot password"

Требования:
- TypeScript
- Валидация (email формат, password минимум 6 символов)
- Loading state на кнопке
- Адаптивность
```

---

### Шаблон 3: Кастомизация компонента

```
📝 PROMPT:
Кастомизируй [компонент] из [библиотека] под наш дизайн.

Текущий вид: [описание]
Желаемый вид: [описание]

Изменения:
- Цвет: [значение]
- Размер: [значение]
- Эффекты: [описание]

Используй [метод кастомизации: theme/styled/className]
```

**Пример для Material-UI:**
```
Кастомизируй Button из Material-UI под наш дизайн.

Текущий вид: стандартная синяя кнопка
Желаемый вид: градиентная кнопка с анимацией

Изменения:
- Фон: градиент от #6366F1 до #8B5CF6
- Тень: 0 4px 12px rgba(99, 102, 241, 0.4)
- Hover: градиент ярче + тень больше
- Анимация: плавный переход 0.3s
- Border radius: 12px

Используй styled() для создания CustomButton компонента.
```

---

### Шаблон 4: Интеграция с AI Learning Agent

```
📝 PROMPT:
Интегрируй [компонент] из [библиотека] в AI Learning Agent.

Где: [путь к файлу]
Заменить: [текущий компонент]
На: [новый компонент из библиотеки]

Требования:
- Сохранить текущую функциональность
- Адаптировать стили под текущую тему
- Обновить TypeScript типы
```

**Пример:**
```
Интегрируй Drawer из Material-UI в AI Learning Agent для Course Sidebar.

Где: frontend/src/components/CourseSidebar.tsx
Заменить: текущий кастомный sidebar
На: Material-UI Drawer (persistent variant)

Требования:
- Drawer слева, ширина 300px
- Кнопка toggle в Header
- Сохранить текущий контент (список курсов)
- Адаптировать цвета под тему проекта
- Mobile: drawer overlay (не persistent)
```

---

## 🔄 Миграция между библиотеками

### Когда нужно менять библиотеку?

**Признаки что пора менять:**
- ❌ Библиотека не обновляется (deprecated)
- ❌ Размер bundle слишком большой
- ❌ Не хватает гибкости кастомизации
- ❌ Проблемы с производительностью
- ❌ Команда не может разобраться

### Процесс миграции (пример: Material-UI → Chakra UI)

```
ЭТАП 1: Подготовка
├─ Установить новую библиотеку
├─ Создать mapping компонентов
│  (Button MUI → Button Chakra)
└─ Настроить theme (цвета, шрифты)

ЭТАП 2: Миграция по компонентам
├─ Начать с простых (Button, Text)
├─ Постепенно менять сложные (Form, Modal)
└─ Тестировать каждый компонент

ЭТАП 3: Финализация
├─ Удалить старую библиотеку
├─ Обновить imports
└─ Проверить bundle size
```

**Промпт для Claude Code:**
```
Помоги мигрировать проект с Material-UI на Chakra UI.

Шаг 1: Создай mapping table:
- Какие компоненты MUI соответствуют компонентам Chakra
- Как конвертировать props (variant → colorScheme)

Шаг 2: Перепиши компонент [название]:
- Заменить MUI imports на Chakra
- Адаптировать props
- Сохранить функциональность

Файл: [путь к файлу]
```

---

## 📐 Композиция компонентов

### Что такое Composable Components?

**Composable (составные) компоненты** — это маленькие компоненты, которые можно комбинировать как LEGO.

```
НЕ-COMPOSABLE                 COMPOSABLE
(Монолитный)                  (Модульный)

<Card                         <Card>
  title="Title"                 <CardHeader>
  subtitle="Subtitle"             <Heading>Title</Heading>
  content="Content"               <Text>Subtitle</Text>
  actions={[...]}                </CardHeader>
/>                               <CardBody>
                                   <Text>Content</Text>
                                 </CardBody>
Всё в одном компоненте           <CardFooter>
                                   <Button>Action</Button>
                                 </CardFooter>
                               </Card>

                              Каждая часть отдельно!
```

### Пример: Modal в Chakra UI (Composable)

```typescript
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* Можешь вставить что угодно! */}
            <Text>Your modal content here</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

**Преимущества Composable:**
- ✅ Гибкость — вставляй любой контент
- ✅ Понятность — структура видна в коде
- ✅ Переиспользование — компоненты независимы

---

## ⚖️ Pros & Cons: Библиотеки vs Custom

### Component Library (готовые компоненты)

**Плюсы:**
- ✅ **Скорость** — быстрый старт проекта (минуты vs часы)
- ✅ **Качество** — протестированные компоненты
- ✅ **Доступность** — a11y из коробки
- ✅ **Консистентность** — единый стиль
- ✅ **Обновления** — bugfix и новые фичи
- ✅ **Документация** — примеры и гайды

**Минусы:**
- ❌ **Размер** — увеличение bundle size
- ❌ **Зависимость** — привязка к библиотеке
- ❌ **Ограничения** — сложно радикально изменить дизайн
- ❌ **Learning curve** — нужно учить API
- ❌ **Стиль** — компоненты узнаваемы ("это Material-UI")

---

### Custom Components (свои компоненты)

**Плюсы:**
- ✅ **Контроль** — полная свобода дизайна
- ✅ **Уникальность** — никто не скажет "это Material-UI"
- ✅ **Размер** — минимальный bundle (только нужное)
- ✅ **Независимость** — нет внешних зависимостей
- ✅ **Обучение** — команда знает код

**Минусы:**
- ❌ **Время** — долго создавать с нуля
- ❌ **Баги** — нужно тестировать самим
- ❌ **A11y** — легко забыть про доступность
- ❌ **Поддержка** — нужно самим фиксить и обновлять
- ❌ **Консистентность** — сложнее поддерживать единый стиль

---

### Когда что использовать?

```
                     Выбор подхода
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    MVP/Стартап      Средний проект    Большой продукт
        │                 │                 │
        ↓                 ↓                 ↓
   Библиотека        Библиотека +      Custom + Design
   (быстро)          кастомизация       System (контроль)
                     (баланс)
```

**Правило 80/20:**
- 80% компонентов → Component Library
- 20% уникальных → Custom Components

**Пример AI Learning Agent:**
- Layout, Form, Modal → Material-UI (стандарт)
- Claude Chat UI → Custom (уникальная фича)

---

## 🎓 Практика: Интеграция библиотеки в AI Learning Agent

### Сценарий: Улучшение UI с Material-UI

**Текущее состояние:**
- Кастомные компоненты (написаны вручную)
- Непоследовательный стиль
- Долго добавлять новые компоненты

**Цель:**
- Интегрировать Material-UI
- Ускорить разработку новых фич
- Улучшить консистентность

---

### Шаг 1: Установка

**Промпт для Claude Code:**
```
Установи Material-UI в AI Learning Agent проект.

Требования:
- Установи @mui/material, @emotion/react, @emotion/styled
- Настрой ThemeProvider в src/App.tsx
- Создай тему в src/theme.ts с цветами:
  - Primary: #2196F3 (синий для обучения)
  - Secondary: #FF9800 (оранжевый для акцентов)
  - Background: #F5F5F5
- Шрифт: Inter
- Dark mode: включить поддержку
```

---

### Шаг 2: Миграция компонентов

**Промпт для Claude Code:**
```
Перепиши компонент LessonCard используя Material-UI.

Текущий файл: frontend/src/components/LessonCard.tsx

Используй MUI компоненты:
- Card для обёртки
- CardHeader для заголовка
- CardContent для описания
- CardActions для кнопок
- Chip для тегов (duration, level)

Сохрани текущую функциональность:
- Клик на карточку открывает урок
- Показывать статус (completed/in-progress)
- Hover эффект

Добавь:
- Elevation (тень) при hover
- Ripple effect на клик
- Skeleton loader для loading state
```

---

### Шаг 3: Создание новых компонентов

**Промпт для Claude Code:**
```
Создай компонент ProgressTracker для AI Learning Agent используя Material-UI.

Функционал:
- Показывать прогресс по курсу (%)
- Linear progress bar
- Статистика: уроков завершено / всего
- Расчётное время до завершения

Используй MUI:
- LinearProgress для прогресс-бара
- Box, Stack для layout
- Typography для текста
- Card для обёртки

Где добавить: frontend/src/components/ProgressTracker.tsx
Где использовать: в CourseView компоненте
```

---

## 🚀 Продвинутые техники

### 1. Tree Shaking (оптимизация bundle)

**Проблема:** Импорт всей библиотеки увеличивает размер bundle.

**Плохо (импорт всего):**
```typescript
import * as MUI from '@mui/material';

function App() {
  return <MUI.Button>Click</MUI.Button>;
}
```

**Хорошо (импорт конкретных компонентов):**
```typescript
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
  return (
    <>
      <Button>Click</Button>
      <TextField label="Name" />
    </>
  );
}
```

**Результат:** Bundle меньше на 50-70%!

---

### 2. Code Splitting (ленивая загрузка)

**Проблема:** Тяжёлые компоненты загружаются сразу, даже если не используются.

**Решение:** Lazy loading с React.lazy()

```typescript
import { lazy, Suspense } from 'react';

// Загружается только когда нужен
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**Применение:** Modal, Dialog, Date Picker — загружать только при открытии.

---

### 3. Shared Theme между Figma и кодом

**Проблема:** Дизайнер меняет цвета в Figma → разработчик вручную обновляет код.

**Решение:** Figma Tokens + Style Dictionary

```
ПРОЦЕСС:

1. Figma Design Tokens
   ↓ (экспорт JSON)
2. tokens.json
   ↓ (Style Dictionary)
3. theme.ts (автогенерация)
   ↓ (использование)
4. Код приложения
```

**Промпт для Claude Code:**
```
Настрой автоматическую синхронизацию темы из Figma.

Шаги:
1. Установи style-dictionary
2. Создай скрипт для конвертации tokens.json → theme.ts
3. Настрой Material-UI theme из автогенерируемого файла

Файлы:
- tokens.json (из Figma)
- scripts/build-theme.js (конвертация)
- src/theme.ts (автогенерируется)
```

---

## 📋 Чек-лист: Работа с Component Library

### Перед установкой библиотеки:
- [ ] Проверил размер bundle (bundlephobia.com)
- [ ] Прочитал документацию (хотя бы Quick Start)
- [ ] Посмотрел примеры компонентов
- [ ] Проверил поддержку TypeScript
- [ ] Оценил сложность кастомизации
- [ ] Проверил лицензию (MIT, BSD, etc.)
- [ ] Посмотрел активность репозитория (GitHub stars, last commit)

### При интеграции:
- [ ] Настроил ThemeProvider
- [ ] Создал базовую тему (цвета, шрифты)
- [ ] Настроил tree shaking (imports)
- [ ] Добавил global styles (если нужно)
- [ ] Протестировал responsive (mobile, tablet, desktop)
- [ ] Проверил a11y (accessibility)

### При разработке:
- [ ] Использую composable компоненты
- [ ] Переиспользую theme variables
- [ ] Документирую кастомные компоненты (Storybook)
- [ ] Проверяю bundle size (npm run build)
- [ ] Тестирую на разных устройствах

---

## ✅ Резюме

**Ключевые концепции:**

1. **Component Library** — готовый набор UI компонентов (кнопки, формы, модалы)
2. **Design System vs Library:**
   - Design System = концепция (Figma, документы)
   - Component Library = код (npm пакет)
3. **Популярные библиотеки:**
   - Material-UI — универсальная, богатая функциями
   - Ant Design — для enterprise приложений
   - Chakra UI — простая, доступная, современная
   - Tailwind UI — платная, красивая, гибкая
   - shadcn/ui — полный контроль, современная
4. **Выбор библиотеки:**
   - Быстрый старт → Material-UI, Chakra UI
   - Полный контроль → shadcn/ui, Tailwind UI
   - Admin панели → Ant Design
5. **Кастомизация:**
   - Theming — глобальные изменения
   - Styled Components — кастомные обёртки
   - Direct modification — для shadcn/ui
6. **Storybook** — каталог компонентов в изоляции
7. **Vibe Coding:**
   - Указывай конкретную библиотеку в промпте
   - Давай примеры желаемого результата
   - Описывай не только "что", но и "как" (layout, colors, interactions)
8. **Библиотека vs Custom:**
   - Правило 80/20: 80% библиотека, 20% custom
   - MVP/Стартап → библиотека (быстро)
   - Уникальный продукт → custom (контроль)

**Главное правило:**
> Используй библиотеку для стандартных компонентов. Пиши custom код только для уникальных фич.

**Для AI Learning Agent:**
- Стандартные компоненты (Button, Form, Modal) → Material-UI
- Уникальные фичи (Claude Chat, Lesson Viewer) → Custom

---

## 🔗 Полезные ресурсы

### Библиотеки:
- **Material-UI** - https://mui.com
- **Ant Design** - https://ant.design
- **Chakra UI** - https://chakra-ui.com
- **shadcn/ui** - https://ui.shadcn.com
- **Tailwind UI** - https://tailwindui.com

### Инструменты:
- **Storybook** - https://storybook.js.org
- **Bundlephobia** - https://bundlephobia.com (проверка размера пакетов)
- **Style Dictionary** - https://amzn.github.io/style-dictionary (синхронизация токенов)

### Design Systems (примеры):
- **Material Design** - https://material.io/design
- **Apple Human Interface Guidelines** - https://developer.apple.com/design
- **Shopify Polaris** - https://polaris.shopify.com

---

## 🎯 Практическое задание

Создай компонент **CourseCard** для AI Learning Agent используя библиотеку на выбор (Material-UI или Chakra UI).

**Требования:**
```
CourseCard компонент:
├─ Image (обложка курса)
├─ Title (название курса)
├─ Description (краткое описание)
├─ Metadata:
│  ├─ Duration (иконка + текст)
│  ├─ Lessons count (иконка + текст)
│  └─ Level (chip: Beginner/Intermediate/Advanced)
├─ Progress bar (если курс начат)
└─ Button:
   ├─ "Start Course" (если не начат)
   └─ "Continue" (если начат)

Интерактивность:
- Hover: elevation (тень) увеличивается
- Click: открывает страницу курса
- Progress bar: анимированный

Адаптивность:
- Desktop: 3 карточки в ряд
- Tablet: 2 карточки в ряд
- Mobile: 1 карточка в ряд
```

**Промпт для Claude Code:**
```
Создай компонент CourseCard для AI Learning Agent используя Material-UI.

[Копируй требования выше]

Файл: frontend/src/components/CourseCard.tsx

Дополнительно:
- TypeScript типы для props
- Skeleton loader для loading state
- Storybook story с разными вариантами
```

---

**Готов к следующему уроку?** → Переходи к **Lesson 2.5: Handoff Process (Передача дизайна в разработку)**
