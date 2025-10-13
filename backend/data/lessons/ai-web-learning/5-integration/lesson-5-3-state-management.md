# Урок 5.3: State Management и кэширование - Оптимизация производительности

> **Модуль 5:** Интеграция Frontend-Backend  
> **Урок:** 5.3  
> **Длительность:** 60-70 минут  
> **Prerequisite:** Урок 5.2 (Error handling и Loading states)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать когда useState достаточно, а когда нужно больше
- ✅ Знать паттерны state management (Context, Zustand)
- ✅ Понимать концепцию кэширования данных
- ✅ Использовать React Query для server state
- ✅ Сформулировать задачу для Claude Code с правильным state management
- ✅ Оптимизировать EngineCamPro v2

---

## 📖 Концепция: Client State vs Server State

### Простое определение

**Client State** - данные которые живут только в браузере (UI состояние).

**Server State** - данные которые приходят с сервера и могут устареть.

### Зачем разделять

Без разделения:
- ❌ Сложно понять откуда данные
- ❌ Дублирование логики загрузки
- ❌ Устаревшие данные
- ❌ Избыточные запросы к серверу

С разделением:
- ✅ Чёткая ответственность
- ✅ Автоматическое обновление
- ✅ Кэширование из коробки
- ✅ Оптимизация запросов

### 🗂️ Аналогия: Библиотека

```
┌─────────────────────────────────────────────────┐
│              CLIENT STATE = ТВОЙ БЛОКНОТ         │
├─────────────────────────────────────────────────┤
│                                                 │
│  📓 Твой личный блокнот:                         │
│     - Какая страница открыта                    │
│     - Что ты выделил маркером                   │
│     - Где закладка                              │
│     - Твои заметки на полях                     │
│                                                 │
│  Это ТОЛЬКО У ТЕБЯ, не на сервере:              │
│  - Не нужно сохранять на сервер                 │
│  - Исчезает при закрытии блокнота               │
│  - Быстрое изменение                            │
│                                                 │
│  Примеры в приложении:                          │
│  - Открыто ли модальное окно                    │
│  - Какой tab активен                            │
│  - Zoom уровень графика                         │
│  - Тема (dark/light mode)                       │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           SERVER STATE = КНИГИ В БИБЛИОТЕКЕ      │
├─────────────────────────────────────────────────┤
│                                                 │
│  📚 Книги на полках библиотеки:                  │
│     - Каталог всех книг                         │
│     - Содержимое книг                           │
│     - Кто взял какую книгу                      │
│     - История выдач                             │
│                                                 │
│  Это ОБЩЕЕ, хранится на сервере:                │
│  - Нужно запросить у библиотекаря (API)         │
│  - Может измениться пока ты не смотришь         │
│  - Другие люди тоже меняют                      │
│                                                 │
│  Проблемы:                                      │
│  ⏱️ Каждый раз ходить к полке долго              │
│  💾 Нужно кэширование (запомнить что брал)       │
│  🔄 Может устареть (кто-то взял книгу)           │
│                                                 │
│  Примеры в приложении:                          │
│  - Список кулачков                              │
│  - Результаты расчётов                          │
│  - Данные пользователя                          │
│  - История операций                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Когда useState достаточно

### Простое правило

```
useState ДОСТАТОЧНО когда:
✅ State используется в 1-2 компонентах
✅ State это UI состояние (не server data)
✅ Не нужно шарить между далёкими компонентами
✅ Приложение маленькое (<10 компонентов)

useState НЕ ДОСТАТОЧНО когда:
❌ State нужен в 3+ компонентах на разных уровнях
❌ Prop drilling становится болью
❌ Много server state (API данные)
❌ Приложение растёт (>10 компонентов)
```

### Пример prop drilling (проблема)

```
❌ ПРОБЛЕМА: Prop drilling

<App>                           ← userData здесь
  └─ <Dashboard>                ← props передаются
      └─ <Sidebar>              ← props передаются
          └─ <UserMenu>         ← props передаются
              └─ <UserProfile>  ← userData используется тут!

Каждый промежуточный компонент просто передаёт props дальше
= Prop drilling hell (ад пробрасывания пропсов)

Проблемы:
- Много boilerplate кода
- Сложно поддерживать
- Трудно добавить новые данные
```

---

## 🏪 Решения для state management

### 1. React Context (встроенное)

**Когда использовать:**
- Глобальный UI state (тема, язык, auth)
- Не часто меняется
- Не требует оптимизации

**Концепция:**
```
Context = Глобальное хранилище

┌──────────────────────────────────┐
│  <ThemeContext.Provider>         │  ← Данные наверху
│    ↓                             │
│    Любой компонент может читать  │
│    без prop drilling             │
│    ↓                             │
│  </ThemeContext.Provider>        │
└──────────────────────────────────┘

Использование:
const theme = useContext(ThemeContext)
```

**Плюсы:**
- ✅ Встроено в React
- ✅ Простое API
- ✅ Решает prop drilling

**Минусы:**
- ⚠️ Все подписчики re-render при изменении
- ⚠️ Нет dev tools
- ⚠️ Нет middleware

### 2. Zustand (лёгкая библиотека)

**Когда использовать:**
- Нужен глобальный state
- Хочешь простоту useState
- Не нужна сложность Redux

**Концепция:**
```
Zustand = useState но глобальный

// Создание store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))

// Использование
const count = useStore((state) => state.count)
const increment = useStore((state) => state.increment)

Просто как useState, но доступно везде!
```

**Плюсы:**
- ✅ Очень простой
- ✅ Маленький размер
- ✅ TypeScript friendly
- ✅ Dev tools
- ✅ Оптимизация из коробки

**Минусы:**
- ⚠️ Ещё одна зависимость

### 3. React Query (для server state)

**Когда использовать:**
- Работа с API данными
- Нужно кэширование
- Автоматическое обновление

**Концепция:**
```
React Query = Супер-хук для API данных

const { data, loading, error } = useQuery({
  queryKey: ['cams'],
  queryFn: () => camAPI.getAll()
})

React Query автоматически:
✅ Кэширует данные
✅ Обновляет при фокусе окна
✅ Retry при ошибках
✅ Показывает stale данные пока грузятся новые
✅ Оптимизирует запросы
```

**Плюсы:**
- ✅ Убирает 90% boilerplate
- ✅ Кэширование из коробки
- ✅ Автообновление
- ✅ Dev tools отличные
- ✅ Industry standard

**Минусы:**
- ⚠️ Нужно изучить концепции
- ⚠️ Размер bundle

---

## 💾 Кэширование данных

### Зачем нужен кэш

```
БЕЗ КЭША:
User открыл страницу → Fetch API → 2s loading
User закрыл страницу
User снова открыл → Fetch API опять → 2s loading

= Медленно, много запросов, плохой UX

С КЭШЕМ:
User открыл страницу → Fetch API → 2s loading → Save to cache
User закрыл страницу
User снова открыл → Show from cache мгновенно! → 
                   → Fetch в фоне обновляет

= Быстро, меньше запросов, отличный UX
```

### Стратегии кэширования

```
1️⃣ CACHE-FIRST (кэш приоритет):
   - Показать из кэша мгновенно
   - Fetch в фоне обновить
   - Лучше для данных которые редко меняются

2️⃣ NETWORK-FIRST (сеть приоритет):
   - Fetch сначала
   - Если ошибка - показать из кэша
   - Лучше для важных real-time данных

3️⃣ STALE-WHILE-REVALIDATE (устаревшие пока обновляется):
   - Показать устаревшие из кэша
   - Fetch новые параллельно
   - Обновить когда придут
   - React Query использует это!

4️⃣ TIME-BASED (по времени):
   - Кэш валиден 5 минут
   - Потом fetch снова
   - Настраиваемое время жизни
```

---

## 🎯 React Query в деталях

### Основные концепции

```
┌────────────────────────────────────────────────┐
│          REACT QUERY MENTAL MODEL              │
├────────────────────────────────────────────────┤
│                                                │
│  QUERY = Запрос данных (GET)                   │
│  ┌──────────────────────────────────┐          │
│  │ useQuery({                       │          │
│  │   queryKey: ['cams'],  ← Уникальный ключ   │
│  │   queryFn: fetchCams   ← Функция загрузки  │
│  │ })                               │          │
│  └──────────────────────────────────┘          │
│                                                │
│  MUTATION = Изменение данных (POST/PUT/DELETE) │
│  ┌──────────────────────────────────┐          │
│  │ useMutation({                    │          │
│  │   mutationFn: createCam,         │          │
│  │   onSuccess: () => {             │          │
│  │     // Invalidate cache          │          │
│  │     queryClient.invalidateQueries(['cams']) │
│  │   }                              │          │
│  │ })                               │          │
│  └──────────────────────────────────┘          │
│                                                │
│  КЭШ = Автоматическое хранилище                │
│  ┌──────────────────────────────────┐          │
│  │  ['cams'] → [data, timestamp]    │          │
│  │  ['cam', 5] → [data, timestamp]  │          │
│  │  ['projects'] → [data, timestamp]│          │
│  └──────────────────────────────────┘          │
│                                                │
└────────────────────────────────────────────────┘
```

### Для EngineCamPro

```
// Загрузка всех кулачков
const { data: cams, isLoading } = useQuery({
  queryKey: ['cams'],
  queryFn: camAPI.getAll,
  staleTime: 5 * 60 * 1000, // 5 минут fresh
})

// Расчёт профиля (mutation)
const { mutate: calculate, isPending } = useMutation({
  mutationFn: camAPI.calculate,
  onSuccess: (data) => {
    toast.success('Расчёт завершён!')
    // Сохранить в кэш
    queryClient.setQueryData(['cam-result', data.id], data)
  }
})

// Создание нового кулачка
const { mutate: createCam } = useMutation({
  mutationFn: camAPI.create,
  onSuccess: () => {
    // Обновить список кулачков
    queryClient.invalidateQueries(['cams'])
  }
})

ПРЕИМУЩЕСТВА:
✅ Нет useState для loading/error
✅ Автоматический кэш
✅ Invalidation после мутаций
✅ Refetch при фокусе окна
```

---

## 🤖 Работа с Claude Code

### Сценарий: Добавление React Query

#### ✅ Эффективный диалог

```
Ты: Добавь React Query в EngineCamPro для оптимизации 
state management и кэширования.

Требования:

Установка:
- @tanstack/react-query
- @tanstack/react-query-devtools

Setup в main.jsx:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      cacheTime: 10 * 60 * 1000, // 10 минут
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
})

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools />
</QueryClientProvider>

─────────────────────────────────────

Queries (GET запросы):

1. Список кулачков:
// src/hooks/queries/useCams.js
export function useCams() {
  return useQuery({
    queryKey: ['cams'],
    queryFn: camAPI.getAll,
  })
}

2. Один кулачок:
export function useCam(id) {
  return useQuery({
    queryKey: ['cam', id],
    queryFn: () => camAPI.getById(id),
    enabled: !!id, // Fetch только если id есть
  })
}

3. История расчётов:
export function useCalculationHistory() {
  return useQuery({
    queryKey: ['calculation-history'],
    queryFn: camAPI.getHistory,
    staleTime: 2 * 60 * 1000, // 2 минуты
  })
}

─────────────────────────────────────

Mutations (POST/PUT/DELETE):

1. Расчёт профиля:
// src/hooks/mutations/useCalculateCam.js
export function useCalculateCam() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: camAPI.calculate,
    onSuccess: (data) => {
      toast.success('Расчёт завершён!')
      
      // Сохранить результат в кэш
      queryClient.setQueryData(['cam-result', data.id], data)
      
      // Обновить историю
      queryClient.invalidateQueries(['calculation-history'])
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}

2. Создание кулачка:
export function useCreateCam() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: camAPI.create,
    onSuccess: () => {
      toast.success('Кулачок создан!')
      queryClient.invalidateQueries(['cams'])
    }
  })
}

3. Удаление кулачка:
export function useDeleteCam() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: camAPI.delete,
    onMutate: async (id) => {
      // Optimistic update
      await queryClient.cancelQueries(['cams'])
      
      const previousCams = queryClient.getQueryData(['cams'])
      
      queryClient.setQueryData(['cams'], (old) =>
        old.filter(cam => cam.id !== id)
      )
      
      return { previousCams }
    },
    onError: (err, id, context) => {
      // Откатить при ошибке
      queryClient.setQueryData(['cams'], context.previousCams)
      toast.error('Ошибка удаления')
    },
    onSettled: () => {
      queryClient.invalidateQueries(['cams'])
    }
  })
}

─────────────────────────────────────

Обновление компонентов:

1. CamList.jsx:
Было:
const [cams, setCams] = useState([])
const [loading, setLoading] = useState(true)
useEffect(() => { fetchCams() }, [])

Стало:
const { data: cams, isLoading } = useCams()

2. CamCalculator.jsx:
Было:
const [result, setResult] = useState(null)
const [loading, setLoading] = useState(false)
const calculate = async () => { ... }

Стало:
const { mutate: calculate, isPending, data: result } = useCalculateCam()

3. Удаление кулачка:
Было:
const handleDelete = async (id) => {
  setLoading(true)
  await camAPI.delete(id)
  setCams(cams.filter(c => c.id !== id))
  setLoading(false)
}

Стало:
const { mutate: deleteCam } = useDeleteCam()
const handleDelete = (id) => deleteCam(id)

─────────────────────────────────────

Дополнительные фичи:

1. Prefetching (предзагрузка):
const queryClient = useQueryClient()

// При hover на кулачке - prefetch детали
const handleMouseEnter = (id) => {
  queryClient.prefetchQuery({
    queryKey: ['cam', id],
    queryFn: () => camAPI.getById(id)
  })
}

2. Pagination (если много кулачков):
export function useCams(page = 1) {
  return useQuery({
    queryKey: ['cams', page],
    queryFn: () => camAPI.getAll({ page }),
    keepPreviousData: true, // Показать старые пока грузятся новые
  })
}

3. Infinite scroll:
export function useInfiniteCams() {
  return useInfiniteQuery({
    queryKey: ['cams'],
    queryFn: ({ pageParam = 1 }) => camAPI.getAll({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}

Claude Code: [устанавливает и интегрирует React Query]

Установлено и настроено:

✅ React Query setup в main.jsx
✅ DevTools для debugging
✅ Custom hooks для всех queries
✅ Custom hooks для всех mutations
✅ Оптимизация с кэшированием
✅ Optimistic updates для удаления
✅ Error handling с toast
✅ Prefetching для быстрого UX

Обновлены компоненты:
✅ CamList - использует useCams()
✅ CamCalculator - использует useCalculateCam()
✅ CamCard - использует useDeleteCam()

Преимущества:
✅ Код на 50% короче
✅ Автоматический кэш
✅ Refetch при фокусе
✅ Лучший UX (быстрее)
✅ DevTools для debugging

Открой DevTools (bottom right) чтобы видеть queries!

Хочешь что-то ещё?

Ты: Добавь Zustand для UI state (theme, sidebar)

Claude Code: [добавляет Zustand]
Создан src/store/uiStore.js:
- Theme (light/dark)
- Sidebar open/closed
- Active tab

Использование:
const { theme, toggleTheme } = useUIStore()
```

**Почему это эффективно:**
- ✅ React Query setup детальный
- ✅ Примеры queries и mutations
- ✅ Optimistic updates показаны
- ✅ Prefetching для UX
- ✅ Обновление компонентов (до/после)
- ✅ Zustand для UI state

---

## 🛠️ Практическое задание

### Задача

Добавь React Query в EngineCamPro и оптимизируй state management.

### Работа с Claude Code

Используй диалог из секции выше.

### Тестирование

1. **Кэширование:**
   - Загрузи список кулачков
   - Переключись на другую страницу
   - Вернись назад
   - Список должен показаться мгновенно из кэша

2. **Refetch:**
   - Открой DevTools Network
   - Переключись на другую вкладку браузера
   - Вернись назад
   - Должен быть refetch запрос

3. **Optimistic Update:**
   - Удали кулачок
   - UI должен обновиться мгновенно
   - Если ошибка - откат изменений

4. **DevTools:**
   - Открой React Query DevTools (bottom right)
   - Посмотри queries в кэше
   - Посмотри статус (fresh/stale/inactive)

### Ожидаемый результат

- ✅ React Query работает
- ✅ Кэширование ощутимо
- ✅ Код стал короче и чище
- ✅ UX улучшился

---

## ❓ Вопросы для самопроверки

1. **Client State vs Server State:**
   - В чём разница?
   - Приведи примеры каждого

2. **Когда useState достаточно?**
   - В каких случаях?
   - Когда нужно больше?

3. **React Query:**
   - Какие проблемы решает?
   - Зачем нужен кэш?

4. **Optimistic Updates:**
   - Что это?
   - Когда использовать?

5. **Для EngineCamPro v2:**
   - Какой state client, какой server?
   - Что кэшировать?
   - Когда invalidate cache?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 4.4: State - теперь продвинутый level
- Урок 5.1-5.2: Интеграция - оптимизируем

**Подготавливает к модулям:**
- Модуль 6: Монетизация - auth state
- Модуль 7: Deploy - production оптимизация

**Связь с EngineCamPro:**
Оптимизация делает приложение:
- Быстрее (кэширование)
- Масштабируемее (правильный state)
- Профессиональнее (best practices)

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Понимаю Client vs Server State
- [ ] Знаю когда нужен state management
- [ ] Понимаю концепцию кэширования
- [ ] Знаю как работает React Query

**Практические навыки:**
- [ ] Могу настроить React Query
- [ ] Могу создать queries и mutations
- [ ] Понимаю optimistic updates
- [ ] Знаю когда использовать Zustand

**Готовность к следующему модулю:**
- [ ] React Query интегрирован
- [ ] State оптимизирован
- [ ] Кэширование работает
- [ ] Готов к Модулю 6!

---

## 🎉 ПОЗДРАВЛЯЮ! МОДУЛЬ 5 ЗАВЕРШЁН!

Ты прошёл полную интеграцию Frontend-Backend:
- ✅ Соединил React и FastAPI
- ✅ Добавил профессиональный error handling
- ✅ Оптимизировал state management
- ✅ Внедрил кэширование

**Теперь ты готов к Модулю 6:**
Монетизация - аутентификация и платежи!

---

**Статус урока:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён  
**Дата начала:** _________  
**Дата завершения:** _________