#!/bin/bash

# AI Learning Agent - Скрипт остановки
# Остановка Backend и Frontend

echo "🛑 Остановка AI Learning Agent..."
echo ""

# Определяем директорию проекта
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Функция остановки по PID файлу
stop_by_pid() {
    local pid_file=$1
    local name=$2

    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid"
            echo "✅ $name остановлен (PID: $pid)"
        else
            echo "⚠️  $name уже остановлен"
        fi
        rm -f "$pid_file"
    else
        echo "⚠️  PID файл $name не найден"
    fi
}

# Функция остановки по портам
stop_by_ports() {
    echo "🔍 Поиск процессов на портах 8000 и 5173..."

    # Backend (порт 8000)
    local backend_pids=$(lsof -ti :8000 2>/dev/null)
    if [ ! -z "$backend_pids" ]; then
        echo "$backend_pids" | xargs kill 2>/dev/null
        echo "✅ Backend процессы остановлены"
    fi

    # Frontend (порт 5173)
    local frontend_pids=$(lsof -ti :5173 2>/dev/null)
    if [ ! -z "$frontend_pids" ]; then
        echo "$frontend_pids" | xargs kill 2>/dev/null
        echo "✅ Frontend процессы остановлены"
    fi

    if [ -z "$backend_pids" ] && [ -z "$frontend_pids" ]; then
        echo "ℹ️  Процессы не найдены на портах 8000 и 5173"
    fi
}

# Основная логика
cd "$PROJECT_DIR"

# Пробуем остановить по PID файлам
stop_by_pid "backend.pid" "Backend"
stop_by_pid "frontend.pid" "Frontend"

# На всякий случай ищем и убиваем по портам
stop_by_ports

# Очистка лог файлов (опционально)
if [ -f "backend.log" ]; then
    > backend.log
fi
if [ -f "frontend.log" ]; then
    > frontend.log
fi

echo ""
echo "✅ Приложение остановлено!"
echo ""
