#!/bin/bash

# AI Learning Agent - Скрипт запуска
# Автоматический запуск Backend и Frontend

echo "🚀 Запуск AI Learning Agent..."
echo ""

# Определяем директорию проекта
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Функция для запуска Backend
start_backend() {
    echo "📦 Запуск Backend..."
    cd "$PROJECT_DIR/backend"

    # Проверка виртуального окружения
    if [ ! -d "venv" ]; then
        echo "❌ Ошибка: виртуальное окружение не найдено!"
        echo "   Создайте его командой: python3 -m venv venv"
        exit 1
    fi

    # Активация venv и запуск в фоне
    source venv/bin/activate
    uvicorn main:app --reload > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo "✅ Backend запущен (PID: $BACKEND_PID)"
    echo "$BACKEND_PID" > ../backend.pid
    deactivate
}

# Функция для запуска Frontend
start_frontend() {
    echo "🎨 Запуск Frontend..."
    cd "$PROJECT_DIR/frontend"

    # Проверка node_modules
    if [ ! -d "node_modules" ]; then
        echo "❌ Ошибка: node_modules не найден!"
        echo "   Установите зависимости: npm install"
        exit 1
    fi

    # Запуск в фоне
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "✅ Frontend запущен (PID: $FRONTEND_PID)"
    echo "$FRONTEND_PID" > ../frontend.pid
}

# Проверка занятости портов
check_ports() {
    if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo "⚠️  Порт 8000 уже занят!"
        echo "   Остановите процесс командой: ./stop.sh"
        exit 1
    fi

    if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo "⚠️  Порт 5173 уже занят!"
        echo "   Остановите процесс командой: ./stop.sh"
        exit 1
    fi
}

# Основная логика
check_ports
start_backend
sleep 2
start_frontend
sleep 3

echo ""
echo "✅ Приложение запущено!"
echo ""
echo "📊 Backend:  http://localhost:8000"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "📝 Логи:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 Остановка: ./stop.sh"
echo ""

# Открыть браузер (опционально)
sleep 2
if command -v open &> /dev/null; then
    open http://localhost:5173
fi
