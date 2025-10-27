#!/bin/bash

# AI Learning Agent - Скрипт перезапуска
# Остановка и запуск приложения

echo "🔄 Перезапуск AI Learning Agent..."
echo ""

# Определяем директорию проекта
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Остановка
cd "$PROJECT_DIR"
./stop.sh

# Небольшая пауза
sleep 2

# Запуск
./start.sh
