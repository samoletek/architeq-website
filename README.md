# Architeq - Liberating ambitious businesses through digital transformation

## About the project

Architeq is a corporate website for a company that specializes in business process automation and digital transformation. The site effectively communicates the company's mission of helping businesses scale by liberating them from operational inefficiencies, while showcasing their expertise in automation, AI-powered solutions, CRM integration, and process optimization. Through compelling case studies, detailed service descriptions, and strategic content placement, the website serves as both an informational resource and a lead generation tool.

## Technical Architecture

- Atomic design components approach (atoms → molecules → organisms → templates → pages)
- Compositional approach to interface building
- Separation of business logic and presentation
- Use of Server Components for performance optimization
- State and effects isolation through React Context API and custom hooks
- Content architecture that highlights transformation journey and business outcomes

## Target audience

- Growing businesses and mid-sized enterprises
- Companies looking to scale operations through digital transformation
- Businesses interested in CRM systems, AI automation, and data-driven process optimization

## Technology stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom utilities
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion) for component animations
  - [GSAP](https://greensock.com/gsap/) for complex animations
  - Native CSS animations for basic effects
- **State management**: React Context API, Server Components
- **Form Handling**: Custom validation with API routes
- **CRM & Scheduling Integration**: 
  - Monday.com API for lead management
  - Calendly for appointment scheduling
- **Code formatting**: ESLint, Prettier
- **Build system**: Built-in Next.js Turbopack
- **Version control**: Git with CI/CD system

## Our Mission

We're on a mission to liberate ambitious businesses from operational quicksand. By crafting intelligent automation systems, we redirect human talent toward what matters most - strategic thinking and innovation. Our solutions don't just make today more efficient.

## Our Vision

We're building toward a world where growing businesses operate through seamlessly integrated systems, not spreadsheets and manual workarounds. Where leadership teams spend Monday mornings discussing market opportunities, not fixing broken processes.

Architeq isn't just implementing software - we're your strategic digital ally, creating living, breathing ecosystems that adapt and grow alongside your business. Because when operational friction disappears, there's no limit to how far your vision can take you.

## Core Expertise

- Streamlining operations through intelligent automation
- Implementing AI-powered solutions for data-driven decision making
- Integrating and customizing CRM systems for improved customer management
- Optimizing business processes to increase efficiency and reduce costs
- Developing tailored solutions that adapt to growing business needs
- Creating seamless digital ecosystems that replace manual workarounds

## Main features

- Modern, responsive design
- SEO optimization
- Page and element animations
- Integrated customer engagement systems:
  - Monday.com for lead management
  - Calendly for scheduling consultations
- Feedback form with validation
- Case study section with filtering and searching
- Detailed services pages highlighting expertise in:
  - AI-powered business solutions
  - Business process automation
  - CRM integration and customization
  - Documentation and form digitization
  - Financial systems optimization
  - Boxed solutions for rapid deployment
- Conversion-focused content that emphasizes business transformation
- Success metrics and ROI demonstration through case studies
- Mobile-first approach

## Project structure

```
please check structure.md
```

## Integrations

### Monday.com integration
The site integrates with Monday.com to manage leads from the contact form. Lead information is automatically sent to Monday.com boards using their API, facilitating streamlined customer relationship management.

### Calendly integration
The website includes Calendly integration to allow potential clients to schedule consultations and meetings directly through the website, eliminating back-and-forth emails and streamlining the sales process.

## Design principles

- Professional, confident, and innovative tone
- Clean and structured design with focus on clarity and value delivery
- Primary background: Dark deep colors with white text
- Accent elements: Neon tech-style touches and gradients in specific areas
- Main font: Inter

## Performance goals

- Lighthouse score of 98+ on mobile and desktop
- Optimized asset loading and delivery
- Efficient code splitting and bundle optimization

## License

MIT