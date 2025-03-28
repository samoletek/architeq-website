s78-website/
├── node_modules/
├── public/
│   ├── favicon/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── site.webmanifest
│   ├── images/
│   │   ├── cases/
│   │   ├── team/
│   │   ├── solutions/
│   │   └── testimonials/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── cases/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx
│   │   │   ├── cookies/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── ai-solutions/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── boxed-solutions/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── business-process/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── crm-integration/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── documentation/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── finance/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── terms/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   └── site-layout.tsx
│   │   ├── navigation/
│   │   │   ├── footer.tsx
│   │   │   └── header.tsx
│   │   ├── pages/
│   │   │   ├── cases-content.tsx
│   │   │   └── contacts-content.tsx
│   │   ├── sections/
│   │   │   ├── benefits-section.tsx
│   │   │   ├── cta-section.tsx
│   │   │   ├── featured-cases-section.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── solutions-section.tsx
│   │   │   └── testimonials-section.tsx
│   │   ├── templates/
│   │   │   └── service-template.tsx
│   │   └── ui/
│   │       ├── cards/
│   │       │   └── case-card.tsx
│   │       ├── filters/
│   │       │   └── case-filters.tsx
│   │       ├── icons/
│   │       │   └── icon.tsx
│   │       ├── benefit-card.tsx
│   │       ├── button.tsx
│   │       ├── calendly-widget.tsx
│   │       ├── form-input.tsx
│   │       ├── form-select.tsx
│   │       ├── image-with-fallback.tsx
│   │       ├── loading-button.tsx
│   │       ├── page-transition.tsx
│   │       ├── section-animation.tsx
│   │       └── solution-switcher.tsx
│   └── lib/
│       ├── seo/
│       │   ├── favicon-metadata.tsx
│       │   ├── metadata.ts
│       │   ├── service-metadata.tsx
│       │   └── schema.tsx
│       ├── services/
│       │   └── monday-service.ts
│       └── utils/
│           ├── device-detection.ts
│           └── utils.ts
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── structure.md
├── tailwind.config.ts
└── tsconfig.json


# Структура проекта §78-website

## Корневые файлы
- `.gitignore` - исключения для Git
- `.env.local` - локальные переменные окружения (не отслеживается Git)
- `eslint.config.mjs` - конфигурация линтера
- `next.config.js` - конфигурация Next.js
- `package.json` - зависимости и скрипты проекта
- `postcss.config.js` - конфигурация PostCSS
- `README.md` - описание проекта
- `structure.md` - структура проекта (этот файл)
- `tailwind.config.ts` - конфигурация Tailwind CSS
- `tsconfig.json` - конфигурация TypeScript

## Публичные ресурсы (/public)
- `/favicon/` - иконки для браузеров
  - `android-chrome-192x192.png`
  - `android-chrome-512x512.png`
  - `apple-touch-icon.png`
  - `favicon-16x16.png` 
  - `favicon-32x32.png`
  - `site.webmanifest`
- `/images/` - изображения
  - `/cases/` - изображения для кейсов
  - `/team/` - фотографии команды
  - `/solutions/` - изображения решений
  - `/testimonials/` - фотографии для отзывов
- Иконки и SVG
  - `file.svg`
  - `globe.svg`
  - `next.svg`
  - `vercel.svg`
  - `window.svg`

## Исходный код (/src)

### Приложение Next.js (/app)
- `globals.css` - глобальные стили
- `layout.tsx` - корневой layout приложения
- `page.tsx` - главная страница

- `/api/` - API эндпоинты
  - `/contact/`
    - `route.ts` - обработчик формы контактов

- `/(pages)/` - страницы сайта
  - `/about/`
    - `page.tsx` - страница О нас
  - `/cases/`
    - `page.tsx` - список кейсов
    - `/[slug]/` - динамические страницы кейсов
      - `page.tsx`
  - `/contacts/`
    - `page.tsx` - страница контактов
  - `/cookies/`
    - `page.tsx` - политика cookies
  - `/privacy/`
    - `page.tsx` - политика приватности
  - `/terms/`
    - `page.tsx` - условия использования
  - `/services/`
    - `page.tsx` - обзор услуг
    - `/ai-solutions/`
      - `page.tsx` - AI решения
    - `/boxed-solutions/`
      - `page.tsx` - готовые бизнес-решения
    - `/business-process/`
      - `page.tsx` - автоматизация бизнес-процессов
    - `/crm-integration/`
      - `page.tsx` - интеграция CRM
    - `/documentation/`
      - `page.tsx` - документация и формы
    - `/finance/`
      - `page.tsx` - финансовые системы

### Компоненты (/components)
- `/layout/`
  - `site-layout.tsx` - общий шаблон сайта

- `/navigation/`
  - `header.tsx` - шапка сайта
  - `footer.tsx` - подвал сайта

- `/pages/` - компоненты для отдельных страниц
  - `cases-content.tsx` - содержимое страницы кейсов
  - `contacts-content.tsx` - содержимое страницы контактов

- `/sections/` - секции для главной страницы
  - `hero-section.tsx` - главный баннер
  - `benefits-section.tsx` - секция преимуществ
  - `featured-cases-section.tsx` - избранные кейсы
  - `solutions-section.tsx` - секция решений
  - `testimonials-section.tsx` - отзывы
  - `cta-section.tsx` - призыв к действию

- `/templates/` - шаблоны страниц
  - `service-template.tsx` - шаблон для страниц услуг

- `/ui/` - переиспользуемые UI компоненты
  - `/cards/`
    - `case-card.tsx` - карточка кейса
  - `/filters/`
    - `case-filters.tsx` - фильтры для кейсов
  - `/icons/`
    - `icon.tsx` - компонент иконок
  - `benefit-card.tsx` - карточка преимущества
  - `button.tsx` - кнопка
  - `calendly-widget.tsx` - виджет Calendly
  - `form-input.tsx` - компонент поля ввода
  - `form-select.tsx` - компонент выпадающего списка
  - `image-with-fallback.tsx` - изображение с запасным вариантом
  - `loading-button.tsx` - кнопка с индикатором загрузки
  - `page-transition.tsx` - анимация перехода между страницами
  - `section-animation.tsx` - анимация секций
  - `solution-switcher.tsx` - переключатель решений

### Утилиты и сервисы (/lib)
- `/seo/` - компоненты для SEO
  - `favicon-metadata.tsx` - метаданные фавиконок
  - `metadata.ts` - общие метаданные
  - `schema.tsx` - схемы Schema.org

- `/services/` - сервисы для внешних API
  - `monday-service.ts` - интеграция с Monday.com

- `/utils/` - вспомогательные функции
  - `device-detection.ts` - определение типа устройства
  - `utils.ts` - общие утилиты