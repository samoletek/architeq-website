s78-website/
├── node_modules/
├── public/
│   └── images/
│       └── cases/  # Директория для изображений кейсов
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
│   │   ├── favicon.ico
│   │   ├── globals.css  # Глобальные стили
│   │   ├── layout.tsx  # Основной лейаут приложения
│   │   └── page.tsx  # Главная страница
│   ├── components/
│   │   ├── layout/
│   │   │   └── site-layout.tsx  # Компонент общего лейаута сайта
│   │   ├── navigation/
│   │   │   ├── footer.tsx  # Компонент подвала
│   │   │   └── header.tsx  # Компонент шапки
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
│   │       ├── benefit-card.tsx  # Компонент карточки преимущества
│   │       ├── button.tsx  # Компонент кнопки
│   │       └── solution-switcher.tsx  # Компонент переключателя решений
│   └── lib/utils/
│       └── utils.ts  # Вспомогательные функции
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── structure.md
├── tailwind.config.ts
└── tsconfig.json