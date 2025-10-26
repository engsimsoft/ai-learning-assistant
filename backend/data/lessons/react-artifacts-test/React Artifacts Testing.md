# React Artifacts Testing

**Статус:** 🧪 Тестирование (изолированная среда)
**Фаза:** Фаза 1 - Базовая поддержка React компонентов
**Roadmap:** См. `react-artifacts-roadmap.md`

---

## 🎯 Цель этого урока

Изолированная тестовая среда для проверки системы React артефактов.

**Почему отдельный урок:**
- ✅ Не затрагиваем production курсы
- ✅ Легко удалить после тестирования
- ✅ Можем экспериментировать свободно

---

## 🧪 Тестовые артефакты

### Фаза 1: Базовая поддержка

#### ✅ [hello-react](artifact:hello-react) — React Test Component

**Описание:** Тестовый React компонент для проверки инфраструктуры.

**Что тестируем:**
- ✅ React.lazy динамическая загрузка
- ✅ Suspense fallback (loading состояние)
- ✅ Error Boundary (обработка ошибок)
- ✅ Props передача

**Технологии:**
- React.lazy
- Suspense
- Error Boundary
- Vite dynamic import
- Registry pattern

**Ожидаемое поведение:**
1. Нажми на ссылку → откроется артефакт
2. Увидишь loading состояние (Suspense fallback)
3. Затем загрузится компонент с переданными props
4. Компонент отобразит информацию о своей загрузке

---

## 📊 Статус тестирования

### Фаза 1: Базовая поддержка ✅ В процессе

**Создано:**
- ✅ `ReactArtifact.jsx` - главный компонент
- ✅ `ReactArtifactErrorBoundary.jsx` - обработка ошибок
- ✅ `templates/react/registry.js` - маппинг компонентов
- ✅ `templates/react/HelloReact.jsx` - тестовый компонент
- ✅ Обновлен `ArtifactViewer.jsx` - поддержка `react-component` типа
- ✅ Добавлен `hello-react` в `artifactTemplates.js`

**Следующие шаги:**
- [ ] Протестировать hello-react в браузере
- [ ] Проверить Error Boundary (намеренная ошибка)
- [ ] Проверить код toggle (`</>` кнопка)

---

## 🔍 Как тестировать

1. **Базовая загрузка:**
   - Нажми на [hello-react](artifact:hello-react)
   - Проверь что компонент загрузился
   - Проверь что props отобразились

2. **Loading состояние:**
   - Очисти кэш браузера (Hard Reload)
   - Нажми на ссылку снова
   - Должен увидеть spinner и текст "Loading component..."

3. **Code toggle:**
   - Открой артефакт
   - Нажми кнопку `</>`
   - Проверь что показывается JSON конфигурация

---

## 📚 Документация

- **Roadmap:** [react-artifacts-roadmap.md](../../react-artifacts-roadmap.md)
- **React.lazy docs:** https://react.dev/reference/react/lazy
- **Vite dynamic import:** https://vite.dev/guide/features.html

---

## 🚀 После успешного тестирования

Когда все тесты пройдут:
1. ✅ Отметить Фазу 1 как завершённую в roadmap
2. ✅ Обновить CHANGELOG.md
3. ✅ Создать ADR (Architecture Decision Record)
4. ✅ Интегрировать в основной курс (если требуется)
5. ✅ Удалить этот тестовый урок

---

**Создано:** 2025-10-19
**Фаза:** 1 из 4
**Прогресс:** Базовая инфраструктура готова, начинаем тестирование
