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
│   │       ├── scroll-animation.tsx
│   │       ├── scroll-sections.tsx
│   │       ├── search-bar.tsx
│   │       ├── section-animation.tsx
│   │       ├── smooth-scroll.tsx
│   │       └── solution-switcher.tsx
│   └── lib/
│       ├── data/
│       │   └── case-studies.ts
│       ├── hooks/
│       │   └── useInViewAnimation.ts
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

*Структура сгенерирована автоматически: 22.05.2025, 12:11*
