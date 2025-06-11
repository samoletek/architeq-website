# Architeq Website - Project Structure Documentation

**Project Type:** Next.js 15 Business Website with Advanced Animations  
**Last Updated:** December 2024  
**Technologies:** React 19, TypeScript 5, Tailwind CSS 3.4, Framer Motion 12.5

## Project Overview

The Architeq website is a sophisticated business automation company website featuring advanced animations, glassmorphism effects, and a comprehensive component library. The project emphasizes scalability, maintainability, and exceptional user experience through modern web technologies.

## Directory Structure

```
architeq-website/
├── 📁 public/                     # Static assets and public files
│   ├── 📁 favicon/                # Favicon variants and manifest
│   ├── 📁 styles/                 # Global CSS files (animations, effects)
│   ├── robots.txt                 # SEO crawler instructions
│   ├── sitemap.xml               # SEO sitemap
│   └── *.svg                     # SVG icons and assets
│
├── 📁 scripts/                    # Development and build scripts
│   ├── analyze-components.js      # Component structure analysis
│   └── generate-structure.js     # Project documentation generator
│
└── 📁 src/                       # Main application source code
    ├── 📁 app/                   # Next.js App Router structure
    ├── 📁 components/            # React component library
    └── 📁 lib/                   # Utilities, data, and services
```

## Core Application Structure (`/src/app/`)

### App Router Organization
```
app/
├── 📁 (pages)/                   # Route group for main pages
│   ├── 📁 about/                 # About page
│   ├── 📁 cases/                 # Case studies
│   │   ├── [slug]/page.tsx       # Dynamic case study pages
│   │   └── page.tsx             # Case studies listing
│   ├── 📁 contacts/             # Contact page
│   ├── 📁 services/             # Service pages
│   │   ├── ai-solutions/        # AI solutions service
│   │   ├── business-process/    # Business process automation
│   │   ├── crm-integration/     # CRM integration services
│   │   ├── boxed-solutions/     # Industry-specific solutions
│   │   ├── documentation/       # Documentation services
│   │   ├── finance/            # Financial automation
│   │   └── page.tsx            # Services overview
│   └── 📁 [legal]/             # Legal pages (privacy, terms, cookies)
│
├── 📁 api/                      # API endpoints
│   ├── contact/route.ts         # Contact form handler
│   └── search/route.ts          # Search functionality
│
├── layout.tsx                   # Root layout with fonts and metadata
├── page.tsx                     # Homepage
├── globals.css                  # Global styles and CSS variables
└── favicon.ico                  # Default favicon
```

## Component Architecture (`/src/components/`)

### Component Organization Strategy
The component library follows a hierarchical organization pattern from layout-level components down to granular UI elements.

```
components/
├── 📁 layout/                   # Layout and structure components
│   └── site-layout.tsx         # Main site wrapper with header/footer
│
├── 📁 navigation/               # Navigation-related components
│   ├── header.tsx              # Main navigation with search and mobile menu
│   └── footer.tsx              # Site footer with links and company info
│
├── 📁 pages/                   # Page-specific content components
│   ├── cases-content.tsx       # Case studies page content
│   └── contacts-content.tsx    # Contact page content
│
├── 📁 sections/                # Reusable page sections
│   ├── hero-section.tsx        # Hero banners and intro sections
│   ├── benefits-section.tsx    # Benefits/features display
│   ├── featured-cases-section.tsx # Case studies showcase
│   ├── testimonials-section.tsx # Customer testimonials
│   ├── cta-section.tsx         # Call-to-action sections
│   └── unified-cta-section.tsx # Standardized CTA component
│
├── 📁 templates/               # Page templates for consistency
│   ├── service-template.tsx    # Comprehensive service page template
│   └── case-study-template.tsx # Detailed case study presentation
│
└── 📁 ui/                      # Reusable UI component library
    ├── 📁 buttons/             # Button variants and styles
    ├── 📁 cards/               # Card components with effects
    ├── 📁 effects/             # Animation and visual effects
    ├── 📁 filters/             # Search and filtering components
    ├── 📁 icons/               # Icon components
    ├── 📁 tags/                # Tag and label components
    └── [30+ individual components] # Form inputs, navigation, etc.
```

### Template System

#### Service Template (`service-template.tsx`)
**Purpose:** Standardized template for all service pages  
**Features:**
- Hero section with breadcrumb navigation
- Overview section with customizable feature highlights
- Benefits section with animations
- Features section with case study integration
- Interactive process section with scroll-based navigation
- FAQ section with card carousel interface
- Unified CTA section

**Usage Pattern:**
```typescript
<ServiceTemplate
  serviceId="crm-integration"
  serviceTitle="CRM Integration Services"
  serviceDescription="Connect your CRM with other business tools..."
  overview={{ title, description, features }}
  benefits={benefitsArray}
  features={featuresArray}
  processes={processSteps}
  faqs={faqArray}
/>
```

#### Case Study Template (`case-study-template.tsx`)
**Purpose:** Rich, interactive case study presentations  
**Features:**
- Hero section with company badges and immediate impact
- Animated impact metrics with counters
- Business context and problem statement
- Solution approach with technology stack
- Interactive results display with auto-rotation
- Client testimonials with enhanced typography
- Expandable technical deep-dive sections
- Related cases recommendations

## Data and Utilities (`/src/lib/`)

### Data Management
```
lib/
├── 📁 data/
│   └── case-studies.ts          # Structured case study data with categorization
│
├── 📁 seo/                     # SEO optimization utilities
│   ├── metadata.ts             # Meta tags and Open Graph
│   ├── schema.tsx              # Schema.org structured data
│   ├── service-metadata.tsx    # Service-specific SEO
│   └── favicon-metadata.tsx    # Favicon configuration
│
├── 📁 services/                # External service integrations
│   └── monday-service.ts       # Monday.com CRM integration
│
└── 📁 utils/                   # Utility functions and helpers
    ├── animation.ts            # Animation utilities and hooks
    ├── common.ts              # Common utility functions
    ├── device-detection.ts    # Device and browser detection
    ├── tag-utils.ts           # Tag filtering and management
    ├── utils.ts               # General utilities (cn, formatting)
    └── validation.ts          # Form validation helpers
```

### Case Studies Data Structure
The case studies system uses a sophisticated categorization approach:

```typescript
interface CaseStudy {
  id: string;
  title: string;
  company: string;
  location: string;
  industryCategory: IndustryCategory;    // New categorization
  functionCategory: FunctionCategory;    // New categorization
  industry: string;                     // Legacy compatibility
  solutionType: string;                 // Legacy compatibility
  description: string;
  technologies: string[];
  results: string[];
  problem?: string;
  solution?: string[];
  testimonial?: ClientTestimonial;
  clickableTags?: TaggedContent;
}
```

## Technology Stack & Configuration

### Core Dependencies
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - UI library with concurrent features
- **TypeScript 5** - Type safety and development experience
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Animation & Effects
- **Framer Motion 12.5** - Production-ready animation library
- **GSAP 3.13** - Professional animation toolkit
- **React Intersection Observer** - Scroll-triggered animations

### External Services
- **Cloudinary** - Image and video optimization
- **Anthropic SDK** - AI-powered features
- **Three.js** - 3D graphics and effects
- **Monday.com API** - CRM integration

### Development Tools
- **ESLint 9** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Class Variance Authority** - Component variant management

## Styling System

### Tailwind Configuration
The project extends Tailwind with custom design tokens:

```typescript
// Custom color palette
colors: {
  primary: '#B24FF3',      // Purple primary
  secondary: '#B0FF74',    // Green secondary
  'neon-blue': '#00D9FF',  // Accent blue
  'neon-purple': '#B24FF3', // Accent purple
  'dark-gray': '#1A1A1A',  // Background
  'medium-gray': '#2A2A2A', // Surface
  'light-gray': '#B3B3B3', // Text
}

// Custom effects
boxShadow: {
  'neon-blue': '0 0 20px rgba(0, 217, 255, 0.5)',
  'neon-purple': '0 0 20px rgba(178, 75, 243, 0.5)',
  'glassmorphism': '0 8px 32px rgba(31, 38, 135, 0.37)',
}

textShadow: {
  'glow': '0 0 10px rgba(255, 255, 255, 0.8)',
  'neon': '0 0 20px rgba(178, 75, 243, 0.8)',
}
```

### CSS Architecture
- **Global Styles** (`globals.css`) - CSS variables, base styles, utilities
- **Effect Stylesheets** (`public/styles/`) - Specialized effect classes
- **Component Styles** - Tailwind classes with conditional styling

## API and Services

### API Endpoints (`/src/app/api/`)
- **Contact Form** (`/api/contact`) - Handles contact form submissions
- **Search** (`/api/search`) - Provides search functionality for content

### External Integrations
- **Monday.com CRM** - Customer relationship management integration
- **Cloudinary CDN** - Optimized media delivery
- **Email Services** - Contact form processing

## Development Patterns

### Component Development
1. **Atomic Design** - Components built from small, reusable pieces
2. **Composition** - Complex components built by composing simpler ones
3. **Prop Drilling Prevention** - Context and state management strategies
4. **Performance** - Memoization and optimization techniques

### State Management
- **React Hooks** - useState, useEffect, useReducer for local state
- **Context API** - For shared state and theme management
- **Custom Hooks** - Reusable stateful logic (animations, data fetching)

### Animation Strategy
- **Progressive Enhancement** - Base functionality without animations
- **Performance First** - GPU-accelerated transforms and opacity
- **Accessibility** - Respect for reduced motion preferences
- **Scroll-Based** - IntersectionObserver for trigger-based animations

## Build and Deployment

### Build Configuration
```json
// package.json scripts
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "analyze": "node scripts/analyze-components.js"
}
```

### Performance Optimizations
- **Image Optimization** - Next.js Image component with Cloudinary
- **Font Optimization** - Google Fonts with display: swap
- **Code Splitting** - Automatic route-based splitting
- **Bundle Analysis** - Regular bundle size monitoring

## Recent Additions and Updates

### Template System (December 2024)
- **Service Template**: Comprehensive template for service pages with interactive elements
- **Case Study Template**: Rich case study presentation with animations and green theme adaptation

### Enhanced UI Components
- **Advanced Filtering**: Industry and function-based case study filtering
- **Improved Animations**: Scroll-triggered animations with performance optimization
- **Mobile Responsiveness**: Enhanced mobile experience across all components

### Development Tools
- **Component Analysis**: Automated component structure analysis
- **Structure Documentation**: Automated project documentation generation

## Key Files Reference

| File | Purpose | Lines | Key Features |
|------|---------|-------|--------------|
| `service-template.tsx` | Service page template | 1,788 | Interactive FAQ, process navigation, animations |
| `case-study-template.tsx` | Case study template | 1,360 | Green theme, animated counters, expandable sections |
| `case-studies.ts` | Case study data | 1,283 | Structured data, categorization, filtering |
| `site-layout.tsx` | Main layout wrapper | 200+ | Header/footer integration, responsive design |
| `header.tsx` | Main navigation | 300+ | Search, mobile menu, animations |

## Future Considerations

### Scalability
- Component library can be extracted to separate package
- API endpoints can be expanded for dynamic content
- Internationalization support can be added

### Performance
- Server-side rendering optimization
- Edge computing for global performance
- Progressive Web App features

### Functionality
- Advanced search with AI integration
- Real-time collaboration features
- Enhanced mobile app-like experience

---

This documentation provides a comprehensive overview of the Architeq website project structure, designed to help developers understand the codebase organization, architectural decisions, and development patterns used throughout the application.