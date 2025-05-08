// Типы для кейсов
export interface Testimonial {
    quote: string;
    author: string;
    position: string;
    image: string;
  }
  
  export interface CaseStudy {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    category: string;
    tags: string[];
    image: string;
    image_hero?: string;
    problem: string;
    solution: string[];
    technologies: string[];
    results: string[];
    testimonial?: Testimonial;
    related_cases?: string[];
  }
  
  // Данные кейсов
  export const allCases: CaseStudy[] = [
    {
      id: "stripe-invoicing",
      title: "Stripe Invoicing and Financial Control Automation",
      description: "Integration of CRM with financial systems for automatic invoice creation and payment tracking.",
      company: "EclipseGroup",
      location: "Miami, FL, USA",
      category: "Financial Automation",
      tags: ["Financial", "Automation", "Integration", "Stripe"],
      image: "/images/cases/stripe-invoicing.jpg",
      image_hero: "/images/cases/stripe-invoicing-hero.jpg",
      problem: "Companies spend dozens of hours monthly on manual invoicing, payment tracking, and sending reminders. Accountants are forced to duplicate data between CRM and financial systems, leading to errors and payment delays.",
      solution: [
        "Integration of CRM (Monday/Hubspot/Zoho/etc) with financial systems (QuickBooks/Stripe)",
        "Automatic creation of invoices in Stripe when deal status changes in CRM",
        "Instant delivery of invoices to customers with online payment options",
        "Automatic monitoring of payment status with CRM data updates",
        "Reminder system for unpaid invoices",
        "Automatic generation of financial reports (Dashboards)"
      ],
      technologies: [
        "Monday CRM",
        "QuickBooks",
        "Stripe",
        "Make/Zapier/n8n",
        "API integrations"
      ],
      results: [
        "85% reduction in time spent on invoicing",
        "30% acceleration in receiving payments",
        "Elimination of errors in data transfer",
        "25-30% improvement in cash flow"
      ],
      testimonial: {
        quote: "The automation solution Architeq implemented completely transformed our invoicing process. What used to take our accounting team several days each month now happens automatically. The integration between our CRM and financial systems has not only saved us time but has significantly improved our cash flow.",
        author: "Uliana Pak",
        position: "CFO at EclipseGroup",
        image: "/images/testimonials/uliana-pak.jpg"
      },
      related_cases: ["quickbooks-integration", "complex-calculations", "factoring-data-submission"]
    },
    {
      id: "ai-voice-bot",
      title: "AI-Voice Bot for Client Request Processing",
      description: "Multi-level voice assistant that fully handles client calls without human agents — routing, answering, resolving.",
      company: "Up-Struct LLC",
      location: "Seattle, WA, USA",
      category: "AI Solutions",
      tags: ["AI", "Voice Bot", "Client Requests", "Automation"],
      image: "/images/cases/ai-voice-bot.jpg",
      image_hero: "/images/cases/ai-voice-bot-hero.jpg",
      problem: "Customer service team was overwhelmed with routine inquiries that required no specialized knowledge but consumed 70% of their time. Call wait times were increasing, weekend coverage was expensive, and scaling the team to meet growing demand was becoming financially unviable.",
      solution: [
        "Development of an advanced AI voice bot capable of natural conversation",
        "Integration with CRM and knowledge base for context-aware responses",
        "Multi-turn conversation capabilities for complex inquiries",
        "Ability to process and fulfill common requests (status updates, information changes, booking appointments)",
        "Intelligent routing to human agents for complex cases with full context transfer",
        "24/7 availability with consistent quality and response time",
        "Continuous learning from interactions to improve handling capabilities"
      ],
      technologies: [
        "OpenAI GPT-4 for natural language processing",
        "ElevenLabs for voice synthesis",
        "Whisper model for speech recognition",
        "Monday CRM integration",
        "Twilio for telephony",
        "Custom conversation flow manager"
      ],
      results: [
        "70% of inbound requests fully handled by AI without human intervention",
        "Average wait time reduced from 12 minutes to under 10 seconds",
        "24/7 service availability with no increase in staffing costs",
        "Human agents now focused on complex, high-value customer interactions"
      ],
      testimonial: {
        quote: "Thanks to Architeq's custom AI bot, we handle 70% more client inquiries without expanding our team — with faster responses and happier customers. The voice bot sounds completely natural, understands complex questions, and even handles booking appointments and account updates automatically. Our human team can now focus on the complex cases that truly need their expertise.",
        author: "Alexandr Alexeyev",
        position: "CEO at Up-Struct LLC",
        image: "/images/testimonials/alexandr-alexeyev.jpg"
      },
      related_cases: ["ai-assistant-crm", "ai-speech-to-text", "telephony-setup"]
    }
  ];
  
  // Категории и теги для фильтрации
  export const categories = [
    {
      id: "financial-automation",
      name: "Financial Automation",
      description: "Solutions for automating financial processes, payments, invoicing, and accounting"
    },
    {
      id: "ai-solutions",
      name: "AI Solutions",
      description: "Advanced AI-powered tools for business process automation"
    }
    // Добавьте остальные категории по мере необходимости
  ];
  
  export const tags = [
    { id: "financial", name: "Financial" },
    { id: "automation", name: "Automation" },
    { id: "integration", name: "Integration" },
    { id: "stripe", name: "Stripe" },
    { id: "ai", name: "AI" },
    { id: "voice-bot", name: "Voice Bot" },
    { id: "client-requests", name: "Client Requests" }
    // Добавьте остальные теги по мере необходимости
  ];
  
  export const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "oldest", name: "Oldest First" },
    { id: "alphabetical", name: "Alphabetical" }
  ];