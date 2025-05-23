# Структура проекта architeq-website

```
architeq-website/
├── public/
│   ├── favicon/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── site.webmanifest
│   ├── images/
│   │   └── services/
│   ├── styles/
│   │   ├── animations.css
│   │   ├── glassmorphism.css
│   │   └── gradients.css
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── vercel.svg
│   └── window.svg
├── scripts/
│   ├── analyze-components.js
│   └── generate-structure.js
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
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   └── search/
│   │   │       └── route.ts
│   │   ├── effects-demo/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
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
│   │       ├── buttons/
│   │       │   └── glowing-text-button.tsx
│   │       ├── cards/
│   │       │   └── case-card.tsx
│   │       ├── effects/
│   │       │   ├── depth-card.tsx
│   │       │   ├── gradient-follow.tsx
│   │       │   ├── hover-element.tsx
│   │       │   ├── parallax-element.tsx
│   │       │   ├── rotation-utils.ts
│   │       │   ├── scroll-animate.tsx
│   │       │   └── wave-divider.tsx
│   │       ├── filters/
│   │       │   └── case-filters.tsx
│   │       ├── icons/
│   │       │   └── icon.tsx
│   │       ├── benefit-card.tsx
│   │       ├── button.tsx
│   │       ├── calendly-widget.tsx
│   │       ├── form-input.tsx
│   │       ├── form-select.tsx
│   │       ├── gcs-video.tsx
│   │       ├── hero-search.tsx
│   │       ├── image-with-fallback.tsx
│   │       ├── interactive-search.tsx
│   │       ├── loading-button.tsx
│   │       ├── neon-button.tsx
│   │       ├── page-transition.tsx
│   │       ├── recently-viewed-cases.tsx
│   │       ├── search-bar.tsx
│   │       ├── section-animation.tsx
│   │       └── solution-switcher.tsx
│   └── lib/
│       ├── data/
│       │   └── case-studies.ts
│       ├── seo/
│       │   ├── favicon-metadata.tsx
│       │   ├── metadata.ts
│       │   ├── schema.tsx
│       │   └── service-metadata.tsx
│       ├── services/
│       │   └── monday-service.ts
│       └── utils/
│           ├── animation.ts
│           ├── common.ts
│           ├── device-detection.ts
│           ├── utils.ts
│           └── validation.ts
├── .claude/
│   └── settings.local.json
├── .eslintcache
├── component-structure.json
├── eslint.config.mjs
├── LICENSE
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── structure.md
├── tailwind.config.ts
└── tsconfig.json
```

*Структура обновлена: 23.05.2025, 14:22*

---

## Описание файлов проекта

### Корневая директория
- **`.claude/settings.local.json`** - Локальные настройки Claude Code
- **`.env.local`** - Переменные окружения для локальной разработки
- **`.eslintcache`** - Кэш ESLint для ускорения проверки кода
- **`.gitignore`** - Файлы и папки, игнорируемые Git
- **`component-structure.json`** - JSON-структура компонентов проекта
- **`eslint.config.mjs`** - Конфигурация ESLint для линтинга кода
- **`LICENSE`** - Лицензия проекта (MIT)
- **`next-env.d.ts`** - TypeScript типы для Next.js
- **`next.config.js`** - Конфигурация Next.js приложения
- **`package-lock.json`** - Зафиксированные версии зависимостей
- **`package.json`** - Метаданные проекта и зависимости
- **`postcss.config.js`** - Конфигурация PostCSS для обработки CSS
- **`README.md`** - Документация проекта
- **`structure.md`** - Структура и описание файлов проекта
- **`tailwind.config.ts`** - Конфигурация Tailwind CSS
- **`tsconfig.json`** - Конфигурация TypeScript компилятора

### public/
- **`favicon/`** - Иконки для разных устройств и браузеров
  - **`android-chrome-*.png`** - Иконки для Android Chrome
  - **`apple-touch-icon.png`** - Иконка для iOS Safari
  - **`favicon-*.png`** - Стандартные favicon размеры
  - **`site.webmanifest`** - Манифест веб-приложения
- **`images/services/`** - Изображения для страниц услуг
- **`styles/`** - Дополнительные CSS файлы
  - **`animations.css`** - CSS анимации
  - **`glassmorphism.css`** - Эффекты стекломорфизма
  - **`gradients.css`** - Градиентные стили
- **`*.svg`** - SVG иконки (file, globe, next, vercel, window)
- **`robots.txt`** - Инструкции для поисковых роботов
- **`sitemap.xml`** - Карта сайта для SEO

### scripts/
- **`analyze-components.js`** - Скрипт анализа структуры компонентов
- **`generate-structure.js`** - Скрипт генерации файла структуры

### src/app/
- **`favicon.ico`** - Основная иконка сайта
- **`globals.css`** - Глобальные стили приложения
- **`layout.tsx`** - Корневой лейаут приложения
- **`page.tsx`** - Главная страница сайта

#### src/app/(pages)/
- **`about/page.tsx`** - Страница "О нас"
- **`cases/page.tsx`** - Список кейсов
- **`cases/[slug]/page.tsx`** - Динамическая страница кейса
- **`contacts/page.tsx`** - Страница контактов
- **`cookies/page.tsx`** - Политика использования cookies
- **`privacy/page.tsx`** - Политика конфиденциальности
- **`terms/page.tsx`** - Пользовательское соглашение
- **`services/page.tsx`** - Общая страница услуг
- **`services/*/page.tsx`** - Страницы отдельных услуг (AI, CRM, etc.)

#### src/app/api/
- **`contact/route.ts`** - API endpoint для обработки контактных форм
- **`search/route.ts`** - API endpoint для поиска по сайту

#### Другие страницы
- **`effects-demo/page.tsx`** - Демо-страница эффектов
- **`search/page.tsx`** - Страница результатов поиска

### src/components/

#### layout/
- **`site-layout.tsx`** - Основной лейаут с хедером и футером

#### navigation/
- **`footer.tsx`** - Компонент футера сайта
- **`header.tsx`** - Компонент хедера с навигацией

#### pages/
- **`cases-content.tsx`** - Контент для страницы кейсов
- **`contacts-content.tsx`** - Контент для страницы контактов

#### sections/
- **`benefits-section.tsx`** - Секция преимуществ на главной
- **`cta-section.tsx`** - Секция призыва к действию
- **`featured-cases-section.tsx`** - Секция избранных кейсов
- **`hero-section.tsx`** - Героическая секция главной страницы
- **`solutions-section.tsx`** - Секция решений с переключателем
- **`testimonials-section.tsx`** - Секция отзывов клиентов

#### templates/
- **`service-template.tsx`** - Шаблон для страниц услуг

#### ui/
**Кнопки:**
- **`button.tsx`** - Базовый компонент кнопки
- **`buttons/glowing-text-button.tsx`** - Кнопка с неоновым эффектом
- **`loading-button.tsx`** - Кнопка с индикатором загрузки
- **`neon-button.tsx`** - Неоновая кнопка

**Карточки:**
- **`benefit-card.tsx`** - Карточка преимущества
- **`cards/case-card.tsx`** - Карточка кейса

**Эффекты:**
- **`effects/depth-card.tsx`** - Карточка с 3D эффектом
- **`effects/gradient-follow.tsx`** - Следящий за курсором градиент
- **`effects/hover-element.tsx`** - Элемент с hover эффектами
- **`effects/parallax-element.tsx`** - Параллакс элемент
- **`effects/rotation-utils.ts`** - Утилиты для поворотов
- **`effects/scroll-animate.tsx`** - Анимация при скролле
- **`effects/wave-divider.tsx`** - Волновой разделитель

**Формы:**
- **`form-input.tsx`** - Компонент поля ввода
- **`form-select.tsx`** - Компонент выпадающего списка
- **`calendly-widget.tsx`** - Виджет календарного планировщика

**Поиск:**
- **`hero-search.tsx`** - Поиск в героической секции
- **`interactive-search.tsx`** - Интерактивный поиск
- **`search-bar.tsx`** - Строка поиска
- **`filters/case-filters.tsx`** - Фильтры для кейсов

**Анимации:**
- **`page-transition.tsx`** - Переходы между страницами
- **`section-animation.tsx`** - Анимации секций

**Другие:**
- **`gcs-video.tsx`** - Компонент видео с Google Cloud Storage
- **`icons/icon.tsx`** - Универсальный компонент иконок
- **`image-with-fallback.tsx`** - Изображение с резервным вариантом
- **`recently-viewed-cases.tsx`** - Недавно просмотренные кейсы
- **`solution-switcher.tsx`** - Переключатель решений

### src/lib/

#### data/
- **`case-studies.ts`** - Данные кейсов и проектов

#### seo/
- **`favicon-metadata.tsx`** - Метаданные для favicon
- **`metadata.ts`** - SEO метаданные для страниц
- **`schema.tsx`** - Schema.org разметка для поисковиков
- **`service-metadata.tsx`** - Метаданные для страниц услуг

#### services/
- **`monday-service.ts`** - Интеграция с Monday.com CRM

#### utils/
- **`animation.ts`** - Утилиты для анимаций
- **`common.ts`** - Общие вспомогательные функции
- **`device-detection.ts`** - Определение типа устройства
- **`utils.ts`** - Основные утилиты (cn, форматирование)
- **`validation.ts`** - Валидация форм и данных