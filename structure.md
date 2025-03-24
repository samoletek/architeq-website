s78-website/
├── node_modules/
├── public/
│   ├── images/
│   │   ├── cases/      # Изображения для кейсов
│   │   ├── team/       # Фотографии команды
│   │   ├── solutions/  # Изображения решений
│   │   └── testimonials/ # Фотографии для отзывов
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── about/
│   │   │   │   └── page.tsx  # Страница "О нас"
│   │   │   ├── cases/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx  # Динамическая страница кейса
│   │   │   │   └── page.tsx  # Список кейсов с фильтрами
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx  # Контактная форма
│   │   │   ├── cookies/
│   │   │   │   └── page.tsx  # Политика использования cookie
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx  # Политика конфиденциальности
│   │   │   ├── services/
│   │   │   │   ├── ai-solutions/
│   │   │   │   │   └── page.tsx  # Страница услуги "AI-решения"
│   │   │   │   ├── boxed-solutions/
│   │   │   │   │   └── page.tsx  # Страница услуги "Готовые решения"
│   │   │   │   ├── business-process/
│   │   │   │   │   └── page.tsx  # Страница услуги "Автоматизация бизнес-процессов"
│   │   │   │   ├── crm-integration/
│   │   │   │   │   └── page.tsx  # Страница услуги "Интеграция CRM"
│   │   │   │   ├── documentation/
│   │   │   │   │   └── page.tsx  # Страница услуги "Документация"
│   │   │   │   ├── finance/
│   │   │   │   │   └── page.tsx  # Страница услуги "Финансовые системы"
│   │   │   │   └── page.tsx  # Общая страница услуг
│   │   │   └── terms/
│   │   │       └── page.tsx  # Условия использования
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts  # API-эндпоинт для обработки формы
│   │   ├── globals.css  # Глобальные стили
│   │   ├── layout.tsx  # Основной лейаут приложения
│   │   └── page.tsx  # Главная страница
│   ├── components/
│   │   ├── layout/
│   │   │   └── site-layout.tsx  # Компонент общего лейаута сайта
│   │   ├── navigation/
│   │   │   ├── footer.tsx  # Компонент подвала
│   │   │   └── header.tsx  # Компонент шапки
│   │   ├── pages/
│   │   │   ├── cases-content.tsx  # Содержимое страницы кейсов
│   │   │   └── contacts-content.tsx  # Содержимое страницы контактов
│   │   ├── sections/
│   │   │   ├── benefits-section.tsx  # Секция преимуществ
│   │   │   ├── cta-section.tsx  # Секция призыва к действию
│   │   │   ├── featured-cases-section.tsx  # Секция избранных кейсов
│   │   │   ├── hero-section.tsx  # Главная секция
│   │   │   ├── solutions-section.tsx  # Секция решений
│   │   │   └── testimonials-section.tsx  # Секция отзывов
│   │   └── ui/
│   │       ├── cards/
│   │       │   └── case-card.tsx  # Компонент карточки кейса
│   │       ├── filters/
│   │       │   └── case-filters.tsx  # Компонент фильтров для кейсов
│   │       ├── icons/
│   │       │   └── icon.tsx  # Компонент иконок
│   │       ├── benefit-card.tsx  # Компонент карточки преимущества
│   │       ├── button.tsx  # Компонент кнопки
│   │       ├── calendly-widget.tsx  # Виджет Calendly
│   │       ├── image-with-fallback.tsx  # Компонент изображения с заглушкой
│   │       └── solution-switcher.tsx  # Компонент переключателя решений
│   └── lib/
│       ├── seo/
│       │   └── metadata.ts  # Метаданные для SEO
│       ├── services/
│       │   └── monday-service.ts  # Сервис для работы с Monday.com API
│       └── utils/
│           └── utils.ts  # Вспомогательные функции
├── .env.local  # Переменные окружения
├── .gitignore
├── eslint.config.mjs
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── structure.md  # Структура проекта
├── tailwind.config.ts
└── tsconfig.json