# Урок 6.2: Платежи и подписки с Stripe - Монетизация приложения

> **Модуль 6:** Монетизация  
> **Урок:** 6.2  
> **Длительность:** 60-70 минут  
> **Prerequisite:** Урок 6.1 (Аутентификация с Clerk)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать зачем нужны платежи и подписки
- ✅ Знать что такое Stripe и почему он лучший
- ✅ Интегрировать Stripe в React и FastAPI
- ✅ Создать модель подписок
- ✅ Сформулировать задачу для Claude Code со Stripe
- ✅ Монетизировать EngineCamPro v2

---

## 📖 Концепция: Модели монетизации

### Типы монетизации

```
1️⃣ FREEMIUM (бесплатная + премиум)
   Free: 5 расчётов в месяц
   Pro: Безлимитные расчёты
   
2️⃣ SUBSCRIPTION (подписка)
   $10/месяц за доступ
   
3️⃣ PAY-PER-USE (оплата за использование)
   $1 за каждый расчёт
   
4️⃣ ONE-TIME PAYMENT (разовый платёж)
   $49 за пожизненный доступ
```

### Для EngineCamPro

```
Рекомендуется: FREEMIUM + SUBSCRIPTION

FREE TIER:
✅ 5 расчётов в месяц
✅ Базовые функции
✅ Сохранение результатов (7 дней)
❌ Нет экспорта
❌ Нет расширенной аналитики

PRO TIER ($19/месяц):
✅ Безлимитные расчёты
✅ Все функции
✅ Сохранение навсегда
✅ Экспорт в CSV/PDF
✅ Расширенная аналитика
✅ Приоритетная поддержка
```

---

## 💳 Что такое Stripe

### Простое определение

**Stripe** - платёжная платформа которая обрабатывает платежи, подписки, и всю финансовую логику.

### Почему Stripe

```
СВОИ ПЛАТЕЖИ (невозможно):
- Работа с банками
- PCI DSS compliance
- Защита от мошенничества
- Обработка карт
- Международные платежи
- Налоги
→ Годы работы + миллионы долларов

STRIPE (просто):
- npm install @stripe/stripe-js
- Добавить код
- Готово!
→ Пара часов + $0.029 за транзакцию
```

### Альтернативы

| Решение | Комиссия | Сложность | Для EngineCamPro |
|---------|----------|-----------|------------------|
| **Stripe** | 2.9% + $0.30 | ⭐ | ✅ Рекомендуется |
| **PayPal** | 3.5% + фикс | ⭐⭐ | ⚠️ Дороже |
| **Paddle** | 5% + $0.50 | ⭐ | ⚠️ Для SaaS |
| **Lemon Squeezy** | 5% + fees | ⭐ | ⚠️ Новый |

---

## 🔄 Как работает Stripe

### Схема подписки

```
┌───────────────────────────────────────────────────┐
│              STRIPE SUBSCRIPTION FLOW              │
├───────────────────────────────────────────────────┤
│                                                   │
│  1️⃣ User нажимает "Upgrade to Pro"                │
│     ↓                                             │
│  2️⃣ React создаёт Checkout Session:               │
│     POST /api/create-checkout-session             │
│     Body: { priceId: "price_xxxxx" }              │
│     ↓                                             │
│  3️⃣ Backend вызывает Stripe API:                  │
│     stripe.checkout.sessions.create({             │
│       customer: user_id,                          │
│       line_items: [{ price: priceId, quantity: 1}]│
│     })                                            │
│     ↓                                             │
│  4️⃣ Stripe возвращает checkout URL                │
│     ↓                                             │
│  5️⃣ Redirect user на Stripe Checkout page         │
│     (красивая страница оплаты от Stripe)          │
│     ↓                                             │
│  6️⃣ User вводит карту и платит                    │
│     ↓                                             │
│  7️⃣ Stripe обрабатывает платёж                    │
│     ↓                                             │
│  8️⃣ Stripe отправляет webhook на backend:         │
│     POST /api/webhooks/stripe                     │
│     Event: checkout.session.completed             │
│     ↓                                             │
│  9️⃣ Backend обновляет user в БД:                  │
│     user.subscription_status = "active"           │
│     user.subscription_end = date + 30 days        │
│     ↓                                             │
│  🔟 Redirect user обратно в приложение             │
│     success_url="/dashboard?success=true"         │
│                                                   │
│  🎉 User теперь Pro!                               │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## 💡 Интеграция в React

### Stripe Checkout (самое простое)

```
1. Установка:
npm install @stripe/stripe-js

2. Создание checkout:

import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)

const handleUpgrade = async () => {
  // Создать checkout session на backend
  const { sessionId } = await api.createCheckoutSession({
    priceId: 'price_xxxxx'
  })
  
  // Redirect на Stripe Checkout
  await stripe.redirectToCheckout({ sessionId })
}

3. Кнопка:
<button onClick={handleUpgrade}>
  Upgrade to Pro - $19/month
</button>

4. Готово! Stripe обработает всё остальное.
```

### Проверка подписки

```
const { user } = useUser() // Clerk
const [subscription, setSubscription] = useState(null)

useEffect(() => {
  // Загрузить статус подписки
  const status = await api.getSubscriptionStatus()
  setSubscription(status)
}, [])

// Показать разный UI
{subscription?.status === 'active' ? (
  <ProFeatures />
) : (
  <UpgradeButton />
)}
```

---

## 🔧 Интеграция в FastAPI

### Backend endpoints

```
1. Установка:
pip install stripe

2. Create Checkout Session:

import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

@app.post("/api/create-checkout-session")
async def create_checkout(
    request: CheckoutRequest,
    user_id: str = Depends(get_current_user)
):
    session = stripe.checkout.Session.create(
        customer=user_id,
        line_items=[{
            'price': request.price_id,
            'quantity': 1
        }],
        mode='subscription',
        success_url=f"{FRONTEND_URL}/dashboard?success=true",
        cancel_url=f"{FRONTEND_URL}/pricing"
    )
    
    return {"sessionId": session.id}

3. Webhook handler:

@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, WEBHOOK_SECRET
        )
    except:
        raise HTTPException(400)
    
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        
        # Обновить user в БД
        update_user_subscription(
            user_id=session['customer'],
            status='active',
            end_date=datetime.now() + timedelta(days=30)
        )
    
    return {"status": "success"}

4. Check subscription:

def check_subscription(user_id: str):
    user = get_user(user_id)
    
    if user.subscription_status != 'active':
        raise HTTPException(402, "Payment required")
    
    if user.subscription_end < datetime.now():
        raise HTTPException(402, "Subscription expired")
    
    return True

5. Protect premium endpoints:

@app.post("/api/cams/export")
async def export_cam(
    user_id: str = Depends(get_current_user),
    _: bool = Depends(check_subscription)
):
    # Premium feature
    return export_to_pdf()
```

---

## 🤖 Работа с Claude Code

### Сценарий: Добавление Stripe

```
Ты: Добавь Stripe подписки в EngineCamPro.

Требования:

Stripe Setup:
1. Создать продукт на Stripe Dashboard:
   - Product: "EngineCamPro Pro"
   - Price: $19/month recurring
   - Копировать Price ID

2. Environment Variables:
   Frontend: VITE_STRIPE_PUBLISHABLE_KEY
   Backend: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

Frontend:
1. Установить @stripe/stripe-js

2. Pricing Page (src/pages/PricingPage.jsx):
   - Free tier карточка
   - Pro tier карточка с кнопкой "Upgrade"
   - Сравнение features

3. Upgrade Flow:
   - Кнопка "Upgrade to Pro"
   - onClick → createCheckoutSession()
   - Redirect на Stripe Checkout
   - Success redirect → /dashboard?success=true
   - Cancel redirect → /pricing

4. Subscription Status:
   - Загрузить статус при mount
   - Показать badge "Pro" если active
   - Conditional rendering для premium features

Backend:
1. Установить stripe

2. Endpoints:
   POST /api/create-checkout-session
   POST /api/webhooks/stripe
   GET /api/subscription/status

3. Database Models:
   Добавить в User:
   - subscription_status: str (active/canceled/expired)
   - subscription_id: str (Stripe subscription ID)
   - subscription_end: datetime
   - stripe_customer_id: str

4. Middleware:
   check_subscription() dependency
   для premium endpoints

5. Webhook:
   - Обработка checkout.session.completed
   - Обработка invoice.payment_succeeded
   - Обработка customer.subscription.deleted

Features Lock:
1. Free tier limits:
   - Max 5 cams
   - Max 5 calculations/month
   - No export
   
2. Check в endpoints:
   @app.post("/api/cams")
   async def create_cam(...):
       if not has_subscription(user_id):
           cam_count = get_cam_count(user_id)
           if cam_count >= 5:
               raise HTTPException(402, "Upgrade to Pro")

3. UI показывает locks:
   {!isPro && <UpgradePrompt />}

Claude Code: [интегрирует Stripe]

Создано:

Frontend:
✅ PricingPage с карточками
✅ Stripe checkout integration
✅ Subscription status check
✅ Feature locks в UI

Backend:
✅ Checkout session endpoint
✅ Webhook handler
✅ Subscription middleware
✅ Database updates

Testing:
1. Открыть /pricing
2. Кликнуть "Upgrade to Pro"
3. Использовать test card: 4242 4242 4242 4242
4. Проверить что статус обновился
5. Проверить что premium features доступны

Готово!
```

---

## 🛠️ Практическое задание

### Задача

Добавь Stripe монетизацию в EngineCamPro.

### Шаги

1. **Stripe Setup:**
   - Регистрация на stripe.com
   - Создать Product и Price
   - Копировать keys

2. **Frontend:**
   - Используй диалог с Claude Code

3. **Backend:**
   - Используй диалог с Claude Code

4. **Testing:**
   - Test mode: 4242 4242 4242 4242
   - Проверить upgrade flow
   - Проверить webhook
   - Проверить feature locks

### Ожидаемый результат

- ✅ Stripe работает
- ✅ Подписки обрабатываются
- ✅ Feature locks работают
- ✅ Приложение монетизировано!

---

## 🎉 ПОЗДРАВЛЯЮ! МОДУЛЬ 6 ЗАВЕРШЁН!

Ты добавил:
- ✅ Аутентификацию (Clerk)
- ✅ Монетизацию (Stripe)
- ✅ Готово к запуску!

**Следующий модуль:** Deploy - выкатываем в продакшен!

---

**Статус урока:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён