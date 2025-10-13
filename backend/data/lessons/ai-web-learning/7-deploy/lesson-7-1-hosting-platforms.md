# Урок 7.1: Выбор платформы для Deploy - Где хостить приложение

> **Модуль 7:** Deploy и Production  
> **Урок:** 7.1  
> **Длительность:** 40-50 минут  
> **Prerequisite:** Модули 1-6 (всё приложение готово)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать разницу между Development и Production
- ✅ Знать популярные платформы для хостинга
- ✅ Выбрать правильную платформу для своего проекта
- ✅ Понимать стоимость и ограничения
- ✅ Подготовиться к deploy EngineCamPro v2

---

## 📖 Концепция: Development vs Production

### Простое определение

**Development** - разработка на локальном компьютере (localhost).

**Production** - реальное приложение доступное пользователям в интернете.

### Отличия

```
┌─────────────────────────────────────────────────┐
│           DEVELOPMENT (localhost)                │
├─────────────────────────────────────────────────┤
│                                                 │
│  🖥️ Только на твоём компьютере                   │
│  🔧 Режим разработки (hot reload)               │
│  🐛 Debug информация видна                      │
│  ⚡ Не оптимизировано                            │
│  🔓 Нет security layers                         │
│  📊 Нет аналитики                               │
│  ❌ Никто кроме тебя не может использовать      │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           PRODUCTION (в интернете)               │
├─────────────────────────────────────────────────┤
│                                                 │
│  🌐 Доступно всем в интернете                    │
│  🚀 Production mode (оптимизировано)            │
│  🔒 Ошибки скрыты от пользователей              │
│  ⚡ Минифицировано и сжато                      │
│  🔐 HTTPS, Security headers                     │
│  📊 Мониторинг и логирование                    │
│  ✅ Реальные пользователи используют            │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🏢 Типы платформ

### 1. Platform as a Service (PaaS) - Самое простое

**Концепция:** Платформа управляет инфраструктурой за тебя.

```
ТЫ ДЕЛАЕШЬ:
- git push
- Платформа делает всё остальное

ПЛАТФОРМА ДЕЛАЕТ:
- Билдит приложение
- Разворачивает
- Масштабирует
- Мониторит
```

**Примеры:**
- Vercel (для Frontend)
- Railway (для Backend)
- Render (универсальный)

**Плюсы:**
- ✅ Очень просто (git push = deploy)
- ✅ Автоматический SSL
- ✅ Scaling из коробки
- ✅ CI/CD встроен

**Минусы:**
- ⚠️ Дороже в долгосрочной
- ⚠️ Меньше контроля

### 2. Infrastructure as a Service (IaaS) - Полный контроль

**Концепция:** Ты управляешь серверами сам.

```
ТЫ ДЕЛАЕШЬ ВСЁ:
- Настраиваешь сервер
- Устанавливаешь зависимости
- Настраиваешь nginx
- Настраиваешь SSL
- Мониторишь
- Обновляешь
```

**Примеры:**
- DigitalOcean Droplets
- AWS EC2
- Linode

**Плюсы:**
- ✅ Полный контроль
- ✅ Дешевле при масштабе

**Минусы:**
- ❌ Сложно для новичков
- ❌ Много ручной работы
- ❌ Требует DevOps знаний

---

## 🎯 Рекомендуемые платформы для EngineCamPro

### Frontend (React) - Vercel

**Почему Vercel:**
- ✅ Создан для React/Next.js
- ✅ git push = автоматический deploy
- ✅ CDN глобально
- ✅ Бесплатный SSL
- ✅ Preview deployments для каждого PR
- ✅ Отличная производительность

**Ценообразование:**
```
Hobby (Free):
- 100GB bandwidth/месяц
- Безлимитные deployments
- ✅ Достаточно для старта

Pro ($20/месяц):
- 1TB bandwidth
- Advanced analytics
- Team features
```

### Backend (FastAPI) - Railway

**Почему Railway:**
- ✅ Простой как Heroku, современный
- ✅ PostgreSQL встроенная
- ✅ Переменные окружения
- ✅ Автоматический HTTPS
- ✅ Логи и мониторинг

**Ценообразование:**
```
Free Trial:
- $5 credit каждый месяц
- ✅ Для тестирования

Hobby ($5-20/месяц):
- Pay as you go
- ~$0.02/час за сервер
- Масштабируется по нагрузке
```

### База данных - Railway PostgreSQL

**Почему встроенная БД Railway:**
- ✅ Одна платформа для всего
- ✅ Автоматические бэкапы
- ✅ Легкая настройка
- ✅ Подключение одной строкой

---

## 📊 Сравнение платформ

### Для Frontend

| Платформа | Сложность | Цена | Производительность | Для EngineCamPro |
|-----------|-----------|------|-------------------|------------------|
| **Vercel** | ⭐ | Free → $20 | ⭐⭐⭐⭐⭐ | ✅ Рекомендуется |
| **Netlify** | ⭐ | Free → $19 | ⭐⭐⭐⭐ | ✅ Хорошо |
| **Cloudflare Pages** | ⭐⭐ | Free | ⭐⭐⭐⭐⭐ | ✅ Отлично |
| **GitHub Pages** | ⭐ | Free | ⭐⭐⭐ | ⚠️ Только статика |

### Для Backend

| Платформа | Сложность | Цена | Python Support | Для EngineCamPro |
|-----------|-----------|------|----------------|------------------|
| **Railway** | ⭐ | $5-20 | ⭐⭐⭐⭐⭐ | ✅ Рекомендуется |
| **Render** | ⭐ | Free → $7 | ⭐⭐⭐⭐⭐ | ✅ Хорошо |
| **Fly.io** | ⭐⭐ | Pay as you go | ⭐⭐⭐⭐ | ✅ Отлично |
| **Heroku** | ⭐ | $5-7 | ⭐⭐⭐⭐ | ⚠️ Дорого |
| **DigitalOcean** | ⭐⭐⭐⭐ | $4+ | ⭐⭐⭐⭐⭐ | ⚠️ Сложно |

---

## 💰 Оценка стоимости

### Сценарий: 100 активных пользователей

```
FRONTEND (Vercel Free):
- 100 users × 10 visits/month = 1000 pageviews
- ~5GB bandwidth
✅ Бесплатно

BACKEND (Railway):
- 1 instance × $0.02/hour × 730 hours = ~$14.6
- PostgreSQL small = ~$5
✅ ~$20/месяц

ИТОГО: ~$20/месяц для начала
```

### Масштабирование (1000 пользователей)

```
FRONTEND (Vercel Pro):
- 1000 users × 10 visits = 10K pageviews
- ~50GB bandwidth
✅ $20/месяц

BACKEND (Railway):
- 2 instances для надёжности = ~$30
- PostgreSQL medium = ~$10
✅ ~$40/месяц

STRIPE fees:
- $19/месяц × 100 подписок = $1900
- Комиссия: $1900 × 0.029 = $55

ИТОГО: ~$115/месяц операционные расходы
REVENUE: $1900/месяц
PROFIT: $1785/месяц 💰
```

---

## 🔧 Что нужно перед deploy

### Чеклист подготовки

```
FRONTEND:
- [ ] Environment variables настроены (.env.production)
- [ ] API_URL указывает на production backend
- [ ] Build command работает (npm run build)
- [ ] Clerk production keys
- [ ] Stripe production keys
- [ ] Error tracking (Sentry опционально)

BACKEND:
- [ ] Environment variables настроены
- [ ] Database URL production
- [ ] CORS настроен для production frontend URL
- [ ] Secret keys безопасны (не в git!)
- [ ] Stripe webhook endpoint настроен
- [ ] Gunicorn для production server

DATABASE:
- [ ] PostgreSQL готова
- [ ] Миграции применены
- [ ] Бэкапы настроены

DOMAIN (опционально):
- [ ] Купить домен (namecheap, google domains)
- [ ] Настроить DNS
- [ ] SSL сертификат (автоматически на Vercel/Railway)
```

---

## 🤖 Работа с Claude Code

### Сценарий: Подготовка к deploy

```
Ты: Подготовь EngineCamPro к deploy на Vercel (Frontend) и 
Railway (Backend).

Требования:

Frontend подготовка:
1. Создать vercel.json:
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

2. Environment variables template:
Создать .env.production.template:
VITE_API_URL=https://your-backend.railway.app
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

3. Build script проверка:
package.json должен иметь:
"scripts": {
  "build": "vite build",
  "preview": "vite preview"
}

4. README с инструкциями deploy

Backend подготовка:
1. Создать railway.json:
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT",
    "healthcheckPath": "/health"
  }
}

2. requirements.txt обновить:
Добавить production dependencies:
gunicorn
psycopg2-binary

3. Environment variables template:
.env.production.template:
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
FRONTEND_URL=https://enginecampro.vercel.app

4. Health check endpoint:
@app.get("/health")
async def health():
    return {"status": "healthy"}

5. CORS update для production:
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://enginecampro.vercel.app",
        "https://*.vercel.app"  # Preview deployments
    ]
)

6. README с инструкциями deploy

Общее:
1. .gitignore проверка:
.env
.env.local
.env.production
*.pyc
__pycache__/
node_modules/

2. Документация:
DEPLOY.md с пошаговыми инструкциями:
- Как deploy на Vercel
- Как deploy на Railway
- Как настроить environment variables
- Как настроить domain

Claude Code: [подготавливает всё для deploy]

Создано:

Frontend:
✅ vercel.json
✅ .env.production.template
✅ Build проверен
✅ README.md обновлён

Backend:
✅ railway.json
✅ requirements.txt обновлён
✅ Health check endpoint
✅ Production CORS
✅ README.md обновлён

Документация:
✅ DEPLOY.md с инструкциями

.gitignore:
✅ Все секреты исключены

Теперь готово к deploy!
Следующие шаги:
1. Push на GitHub
2. Connect Vercel к repo
3. Connect Railway к repo
4. Настроить environment variables
5. Deploy!
```

---

## 📋 Подготовка environment variables

### Frontend (.env.production)

```
# API
VITE_API_URL=https://enginecampro-backend.railway.app

# Clerk (production keys)
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx

# Stripe (production keys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
```

### Backend (.env)

```
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Auth
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Payments
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Frontend
FRONTEND_URL=https://enginecampro.vercel.app

# Config
ENVIRONMENT=production
DEBUG=False
```

---

## ❓ Вопросы для самопроверки

1. **Development vs Production:**
   - В чём разница?
   
2. **Почему PaaS для EngineCamPro?**
   - Какие преимущества?

3. **Vercel vs Netlify:**
   - Почему Vercel?

4. **Railway vs Heroku:**
   - В чём разница?

5. **Сколько стоит хостинг?**
   - Для 100 пользователей?

---

## 🔗 Связь с другими уроками

**Основано на:** Модули 1-6 (всё приложение)  
**Подготавливает к:** Урок 7.2 (Deploy процесс)

---

## ✅ Критерии завершения

- [ ] Понимаю Development vs Production
- [ ] Выбрал платформы (Vercel + Railway)
- [ ] Подготовил конфигурацию
- [ ] Environment variables готовы
- [ ] Готов к deploy!

---

**Статус урока:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён