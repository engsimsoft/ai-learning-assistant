---
id: hello-react
title: Hello React Test Component
type: react-component
source: test
tags: [react, test, lazy, suspense, error-boundary]
created_at: 2025-10-19T14:00:00Z
updated_at: 2025-10-19T14:00:00Z
componentId: hello-react
propsTitle: React Artifacts Test
propsMessage: React.lazy + Suspense + Error Boundary working correctly!
propsTimestamp: 1729350000000
---

# Hello React - Test Component

Тестовый React компонент для проверки системы React артефактов.

## Что тестируем:
- ✅ React.lazy динамическая загрузка
- ✅ Suspense fallback (loading состояние)
- ✅ Error Boundary (обработка ошибок)
- ✅ Props передача

## Технологии:
- React.lazy
- Suspense
- Error Boundary
- Vite dynamic import
- Registry pattern

## Ожидаемое поведение:
1. Loading состояние (spinner)
2. Компонент с градиентом indigo → purple
3. Заголовок: "React Artifacts Test"
4. Сообщение с информацией о системе
5. Timestamp загрузки
