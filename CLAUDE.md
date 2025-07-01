# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for fast builds)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Run linting**: `npm run lint`
- **Generate project structure**: `npm run structure`

## Architecture Overview

This is a Next.js 15 corporate website for Architeq, a business automation company. The architecture follows atomic design principles with clear separation of concerns:

### Key Architectural Patterns

- **App Router Structure**: Uses Next.js App Router with Server Components for optimal performance
- **Atomic Design**: Components organized as atoms → molecules → organisms → templates → pages
- **Data-Driven Content**: Case studies and services are centrally managed in `/src/lib/data/case-studies.ts`
- **SEO-First**: Comprehensive metadata system with structured data and sitemap generation

### Directory Structure

```
architeq-website/
├── .claude/
│   └── settings.local.json         # Claude Code local settings
├── public/                         # Static assets
│   ├── favicon/                    # Favicon collection (all sizes, formats)
│   │   ├── android-chrome-192x192.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── site.webmanifest
│   ├── icons/tech/                 # Technology integration icons
│   │   ├── Aircall.svg            # 40+ integration icons
│   │   ├── monday-com.svg         # (CRM, AI, payment systems)
│   │   └── ...
│   ├── styles/                     # Advanced CSS utilities
│   │   ├── animations.css         # Extended animation utilities
│   │   ├── glassmorphism.css      # Glass effect components
│   │   └── gradients.css          # Custom gradient utilities
│   ├── robots.txt                 # SEO crawling rules
│   └── sitemap.xml                # Generated sitemap
├── scripts/
│   └── generate-structure.js      # Auto-generate project structure
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (pages)/              # Route groups for main pages
│   │   │   ├── about/page.tsx    # About page
│   │   │   ├── cases/            # Case studies
│   │   │   │   ├── [slug]/page.tsx    # Dynamic case study pages
│   │   │   │   └── page.tsx      # Cases listing page
│   │   │   ├── contacts/page.tsx # Contact page
│   │   │   ├── services/         # Service pages
│   │   │   │   ├── ai-solutions/page.tsx      # AI automation services
│   │   │   │   ├── boxed-solutions/page.tsx   # Pre-built solutions
│   │   │   │   ├── business-process/page.tsx  # Process automation
│   │   │   │   ├── crm-integration/page.tsx   # CRM integrations
│   │   │   │   ├── documentation/page.tsx     # Documentation services
│   │   │   │   ├── finance/page.tsx           # Financial automation
│   │   │   │   └── page.tsx      # Services overview
│   │   │   ├── privacy/page.tsx  # Privacy policy
│   │   │   ├── terms/page.tsx    # Terms of service
│   │   │   └── cookies/page.tsx  # Cookie policy
│   │   ├── api/                  # API endpoints
│   │   │   ├── contact/route.ts  # Contact form submission
│   │   │   └── search/route.ts   # Full-text search API
│   │   ├── search/page.tsx       # Search results page
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   └── site-layout.tsx   # Main site layout wrapper
│   │   ├── navigation/
│   │   │   ├── header.tsx        # Site header with navigation
│   │   │   └── footer.tsx        # Site footer
│   │   ├── pages/                # Page-specific content
│   │   │   ├── about-content.tsx # About page content
│   │   │   ├── cases-content.tsx # Cases page content
│   │   │   └── contacts-content.tsx # Contact page content
│   │   ├── sections/             # Reusable page sections
│   │   │   ├── hero-section.tsx  # Homepage hero
│   │   │   ├── solutions-section.tsx # Solutions showcase
│   │   │   ├── benefits-section.tsx  # Benefits presentation
│   │   │   ├── testimonials-section.tsx # Client testimonials
│   │   │   ├── featured-cases-section.tsx # Case studies preview
│   │   │   ├── automation-flow-timeline.tsx # Process visualization
│   │   │   ├── cta-section.tsx   # Call-to-action sections
│   │   │   └── unified-cta-section.tsx # Unified CTA
│   │   └── ui/                   # Atomic UI components
│   │       ├── buttons/
│   │       │   └── glowing-text-button.tsx # Animated button component
│   │       ├── cards/
│   │       │   ├── case-card.tsx # Case study card component
│   │       │   └── contact-case-card.tsx # Contact-enabled case card
│   │       ├── effects/          # Visual effects
│   │       │   ├── simple-glow-card.tsx # Glow effect card
│   │       │   └── traveling-border-glow.tsx # Animated border
│   │       ├── filters/          # Search and filter components
│   │       │   ├── industry-filters.tsx # Industry filter buttons
│   │       │   ├── function-filters.tsx # Function filter buttons
│   │       │   ├── integrated-search-filters.tsx # Combined search/filter
│   │       │   └── mobile-filters-panel.tsx # Mobile filter panel
│   │       ├── icons/
│   │       │   └── icon.tsx      # Dynamic icon component
│   │       ├── button.tsx        # Base button component
│   │       ├── calendly-widget.tsx # Calendly integration
│   │       ├── form-input.tsx    # Enhanced form input
│   │       ├── form-select.tsx   # Form select component
│   │       ├── gcs-video.tsx     # Google Cloud Storage video player
│   │       ├── hero-search.tsx   # Homepage search component
│   │       ├── image-with-fallback.tsx # Robust image loading
│   │       ├── loading-button.tsx # Button with loading states
│   │       ├── page-transition.tsx # Page transition animations
│   │       ├── recently-viewed-cases.tsx # Recent cases tracking
│   │       ├── search-bar.tsx    # Search input component
│   │       ├── section-animation.tsx # Scroll-triggered animations
│   │       └── timeline.tsx      # Timeline visualization
│   └── lib/
│       ├── data/
│       │   └── case-studies.ts   # Central case studies data
│       ├── seo/                  # SEO management
│       │   ├── metadata.ts       # Page metadata configuration
│       │   ├── schema.tsx        # Structured data schemas
│       │   ├── service-metadata.tsx # Service-specific metadata
│       │   ├── breadcrumb-helper.ts # Breadcrumb generation
│       │   └── favicon-metadata.tsx # Favicon configuration
│       ├── services/
│       │   └── monday-service.ts # Monday.com CRM integration
│       └── utils/                # Shared utilities
│           ├── common.ts         # Common utility functions
│           ├── utils.ts          # General utilities
│           ├── device-detection.ts # Device/performance detection
│           ├── animation.ts      # Animation utilities
│           └── validation.ts     # Form validation helpers
├── CLAUDE.md                     # Project documentation (this file)
├── package.json                  # Dependencies and scripts
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── eslint.config.mjs             # ESLint configuration
```

### Core Systems

1. **Case Study System**: Centralized in `case-studies.ts` with matrix filtering (Industry × Function)
2. **SEO System**: Comprehensive metadata, structured data, and favicon management
3. **Animation System**: Combination of Framer Motion, GSAP, and CSS animations with performance detection
4. **CRM Integration**: Monday.com integration for lead management
5. **Search System**: Full-text search API across services, cases, and pages
6. **Video System**: Google Cloud Storage integration for case study videos
7. **Device Detection**: Comprehensive device/performance detection for optimized experiences
8. **Effects System**: Advanced visual effects including glow effects and glassmorphism

## Technology Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS with custom design system + utility plugins
- **Animations**: Framer Motion + GSAP for complex animations
- **CRM**: Monday.com API integration
- **AI**: Anthropic AI SDK integration
- **Utilities**: class-variance-authority, clsx, tailwind-merge for component variants
- **Validation**: libphonenumber-js for international phone number handling  
- **Performance**: react-intersection-observer for viewport-based animations
- **3D Graphics**: Three.js ready for future 3D features
- **SEO**: next-sitemap for automated sitemap generation
- **Fonts**: Inter (primary) + IBM Plex Mono (monospace)
- **Build**: Built-in Next.js with ESLint (flat config)

## Content Management

### Case Studies
- Central data source: `src/lib/data/case-studies.ts`
- Supports matrix filtering by industry and function categories
- Each case study includes testimonials, related cases, and detailed metadata
- Images stored in `public/images/cases/`

### SEO Configuration
- Metadata managed in `src/lib/seo/metadata.ts`
- Structured data in `src/lib/seo/schema.tsx`
- Service-specific metadata in `src/lib/seo/service-metadata.tsx`

## Styling System

### Design Tokens
- **Primary Colors**: `#7747CF` (purple), `#B0FF74` (neon green)
- **Background**: `#121212` (dark), `#180033` (deep purple)
- **Typography**: Inter font family with customized font weights
- **Spacing**: Extended Tailwind spacing with custom `29` spacing unit
- **Breakpoints**: Extended with 3xl, 4xl, ultrawide for high-res displays

### Advanced Styling Features
- **Glassmorphism**: Advanced glass effect utilities in `public/styles/glassmorphism.css`
- **Gradients**: Custom gradient utilities in `public/styles/gradients.css`
- **Animations**: Extended animation utilities in `public/styles/animations.css`
- **Effects**: Neon glow effects, depth shadows, and visual enhancements
- **Text Shadows**: Custom text shadow utilities for enhanced typography

### Animation Guidelines
- Use `motion.div` from Framer Motion for component animations
- GSAP for complex timeline animations and scroll triggers
- CSS animations for simple hover effects and loading states
- `SectionAnimation` component for intersection observer-based animations
- Performance-aware animation system with device detection
- Respect `prefers-reduced-motion` user preference

## Integration Points

### Monday.com CRM
- Service: `src/lib/services/monday-service.ts`
- Environment variables required: `NEXT_PUBLIC_MONDAY_*`
- Handles lead creation, duplicate detection, and error handling

### Video Management
- Google Cloud Storage integration for case study videos
- `GCSVideo` component for optimized video loading
- Environment variable: `NEXT_PUBLIC_GCS_BUCKET_NAME`

### Image Management
- Static images in `public/images/`
- Use `ImageWithFallback` component for robust image loading
- Optimize images for performance (WebP preferred)

### Search API
- Full-text search endpoint: `/api/search`
- Searches across services, case studies, and page content
- Returns structured results with relevance scoring

## Development Guidelines

### Component Creation
- Follow atomic design: start with existing components
- Use TypeScript interfaces for all props
- Implement proper error boundaries and loading states
- Follow existing naming conventions (kebab-case for files)

### Code Style
- Use TypeScript strictly with proper typing
- Follow existing import structure (absolute imports with `@/`)
- Maintain consistent indentation and formatting
- Use descriptive variable and function names

### Performance Considerations
- Leverage Server Components for static content
- Use dynamic imports for heavy client-side components
- Implement proper image optimization
- Monitor bundle size with build analyzer

## Testing & Quality

- Run `npm run lint` before committing
- Test responsive design across breakpoints
- Verify CRM integration in staging environment
- Check SEO metadata with browser dev tools
- Test animations with reduced motion settings

## Environment Setup

Required environment variables for full functionality:
- `NEXT_PUBLIC_MONDAY_API_KEY`
- `NEXT_PUBLIC_MONDAY_BOARD_ID`
- `NEXT_PUBLIC_MONDAY_*_COLUMN_ID` (for various form fields)
- `NEXT_PUBLIC_GCS_BUCKET_NAME` (for Google Cloud Storage video content)

## Common Tasks

- **Add new case study**: Edit `src/lib/data/case-studies.ts`
- **Update services**: Modify pages in `src/app/(pages)/services/`
- **Change global styles**: Edit `src/app/globals.css` or `tailwind.config.ts`
- **Add new page**: Create in `src/app/(pages)/` directory
- **Update SEO**: Modify files in `src/lib/seo/`
- **Add video content**: Use `GCSVideo` component with Google Cloud Storage
- **Create animated sections**: Use `SectionAnimation` wrapper for scroll-triggered animations
- **Add search functionality**: Extend `/api/search` endpoint for new content types
- **Implement effects**: Use utilities from `public/styles/` for glassmorphism and gradients

## Key Utilities

### Device Detection (`src/lib/utils/device-detection.ts`)
- Comprehensive device/performance detection
- Screen size, touch capability, battery status
- Performance classification for animation optimization

### Animation Utils (`src/lib/utils/animation.ts`)
- Performance-aware animation controls
- Reduced motion preference detection
- Animation queue management

### Component Variants
- Use `class-variance-authority` for component variant management
- Combine classes with `clsx` and `tailwind-merge`
- Follow existing patterns in UI components