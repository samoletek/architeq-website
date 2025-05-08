// Категории для фильтрации
export const categories = [
  {
    id: "financial-automation",
    name: "Financial Automation",
    description: "Solutions for automating financial processes, payments, invoicing, and accounting"
  },
  {
    id: "communication-automation",
    name: "Communication Automation",
    description: "Tools and integrations for streamlining communications and notifications"
  },
  {
    id: "ai-solutions",
    name: "AI Solutions",
    description: "Advanced AI-powered tools for business process automation"
  },
  {
    id: "boxed-solutions",
    name: "Boxed Solutions",
    description: "Industry-specific pre-configured automation solutions"
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    description: "End-to-end workflow and business process automation"
  },
  {
    id: "crm-integration",
    name: "CRM Integration",
    description: "Integration solutions connecting CRM systems with other business tools"
  },
  {
    id: "document-automation",
    name: "Document Automation",
    description: "Tools for automating document generation, processing, and signing"
  }
];

// Теги для фильтрации
export const tags = [
  { id: "financial", name: "Financial" },
  { id: "automation", name: "Automation" },
  { id: "integration", name: "Integration" },
  { id: "stripe", name: "Stripe" },
  { id: "quickbooks", name: "QuickBooks" },
  { id: "calculations", name: "Calculations" },
  { id: "communication", name: "Communication" },
  { id: "slack", name: "Slack" },
  { id: "notifications", name: "Notifications" },
  { id: "telephony", name: "Telephony" },
  { id: "crm", name: "CRM" },
  { id: "ai", name: "AI" },
  { id: "analysis", name: "Analysis" },
  { id: "speech-to-text", name: "Speech-to-Text" },
  { id: "search", name: "Search" },
  { id: "assistant", name: "Assistant" },
  { id: "voice-bot", name: "Voice Bot" },
  { id: "client-requests", name: "Client Requests" },
  { id: "boxed-solution", name: "Boxed Solution" },
  { id: "industry", name: "Industry" },
  { id: "real-estate", name: "Real Estate" },
  { id: "music", name: "Music" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "transportation", name: "Transportation" },
  { id: "logistics", name: "Logistics" },
  { id: "dashboards", name: "Dashboards" },
  { id: "analytics", name: "Analytics" },
  { id: "reporting", name: "Reporting" },
  { id: "visualization", name: "Visualization" },
  { id: "triggers", name: "Triggers" },
  { id: "workflow", name: "Workflow" },
  { id: "monday", name: "Monday" },
  { id: "external-systems", name: "External Systems" },
  { id: "web-forms", name: "Web Forms" },
  { id: "data-collection", name: "Data Collection" },
  { id: "document", name: "Document" },
  { id: "signature", name: "Signature" },
  { id: "generation", name: "Generation" },
  { id: "factoring", name: "Factoring" },
  { id: "data-submission", name: "Data Submission" }
];

// Опции сортировки
export const sortOptions = [
  {
    id: "newest",
    name: "Newest First"
  },
  {
    id: "oldest",
    name: "Oldest First"
  },
  {
    id: "alphabetical",
    name: "Alphabetical"
  }
];

// Данные о кейсах
export const allCases = [
  {
    id: "stripe-invoicing",
    title: "Stripe Invoicing and Financial Control Automation",
    description: "Integration of CRM with financial systems for automatic invoice creation and payment tracking.",
    company: "EclipseGroup",
    location: "Miami, FL, USA",
    category: "financial-automation",
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
    id: "quickbooks-integration",
    title: "QuickBooks Integration for Automatic Accounting",
    description: "Seamless connection between CRM platform and QuickBooks for real-time financial data synchronization.",
    company: "GreenSpace Logistics",
    location: "Portland, OR, USA",
    category: "financial-automation",
    tags: ["Financial", "QuickBooks", "Integration", "Accounting"],
    image: "/images/cases/quickbooks-integration.jpg",
    image_hero: "/images/cases/quickbooks-integration-hero.jpg",
    problem: "Manual data entry between CRM and accounting software led to costly errors, delays in financial reporting, and frustrated staff spending 15-20 hours weekly on duplicate data entry. Month-end reconciliation was becoming a nightmare with inconsistencies between systems.",
    solution: [
      "Bi-directional integration between QuickBooks and Monday CRM",
      "Automatic creation of vendors, customers, and products in QuickBooks based on CRM entries",
      "Real-time synchronization of expenses, invoices, and payments",
      "Instant generation of custom reports combining CRM and financial data",
      "Automated reconciliation alerts for inconsistencies between systems"
    ],
    technologies: [
      "Monday CRM",
      "QuickBooks Online",
      "Make (Integromat)",
      "Custom API handlers",
      "Power BI for reporting"
    ],
    results: [
      "90% reduction in data entry time (from 15-20 hours to 1-2 hours weekly)",
      "Accounting errors reduced by 95%",
      "Financial reports available immediately vs. 5-7 day delay previously",
      "40% faster month-end closing process"
    ],
    testimonial: {
      quote: "Before implementing this integration, our accounting team dreaded month-end closing. Now with the automatic sync between our CRM and QuickBooks, we've eliminated almost all manual entry and the errors that came with it. We're saving at least 60 hours per month and our financial data is finally trustworthy.",
      author: "Michael Chen",
      position: "Operations Director at GreenSpace Logistics",
      image: "/images/testimonials/michael-chen.jpg"
    },
    related_cases: ["stripe-invoicing", "complex-calculations", "factoring-data-submission"]
  },
  // Добавляем еще несколько кейсов для примера
  {
    id: "ai-voice-bot",
    title: "AI-Voice Bot for Client Request Processing",
    description: "Multi-level voice assistant that fully handles client calls without human agents — routing, answering, resolving.",
    company: "Up-Struct LLC",
    location: "Seattle, WA, USA",
    category: "ai-solutions",
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
    // Продолжение массива allCases
    testimonial: {
      quote: "Thanks to Architeq's custom AI bot, we handle 70% more client inquiries without expanding our team — with faster responses and happier customers. The voice bot sounds completely natural, understands complex questions, and even handles booking appointments and account updates automatically. Our human team can now focus on the complex cases that truly need their expertise.",
      author: "Alexandr Alexeyev",
      position: "CEO at Up-Struct LLC",
      image: "/images/testimonials/alexandr-alexeyev.jpg"
    },
    related_cases: ["ai-assistant-crm", "ai-speech-to-text", "telephony-setup"]
  },
  {
    id: "document-generation",
    title: "Document Generation from CRM Status Changes",
    description: "Automatic generation of consistent, error-free documents based on CRM data and status changes.",
    company: "Precision Contracts Inc.",
    location: "Chicago, IL, USA",
    category: "document-automation",
    tags: ["Document", "Generation", "CRM", "Automation"],
    image: "/images/cases/document-generation.jpg",
    image_hero: "/images/cases/document-generation-hero.jpg",
    problem: "Company spent excessive time manually creating documents (proposals, contracts, statements of work) with high error rates due to copy-paste mistakes. Each document required 35-40 minutes to create, with inconsistent formatting and frequent inaccuracies from manual data entry.",
    solution: [
      "Implementation of a document automation system triggered by CRM status changes",
      "Creation of dynamic templates for all standard document types",
      "Intelligent field mapping to pull accurate data from CRM records",
      "Conditional content inclusion based on deal parameters",
      "Automated approval workflows for generated documents",
      "Version control and document history tracking",
      "Multi-format output options (PDF, Word, HTML) with consistent branding",
      "Bulk generation capability for high-volume scenarios"
    ],
    technologies: [
      "Monday CRM",
      "Document template engine",
      "PDF generation library",
      "Cloud storage integration",
      "Make automation platform",
      "Version control system"
    ],
    results: [
      "Document creation time reduced from 35 minutes to 2 minutes per document",
      "100% elimination of data entry errors",
      "Complete consistency across all company documents",
      "Staff time savings of approximately 1,200 hours annually"
    ],
    testimonial: {
      quote: "The document generation system has been transformative for our business. Documents that used to take our team over half an hour to create are now generated automatically in seconds with perfect accuracy. The consistency in our client-facing materials has strengthened our brand, and the error reduction has improved our professional reputation.",
      author: "Daniel Morrison",
      position: "Operations Director at Precision Contracts Inc.",
      image: "/images/testimonials/daniel-morrison.jpg"
    },
    related_cases: ["document-signature", "web-forms", "monday-integration"]
  },
  {
    id: "boxed-solution-real-estate",
    title: "Boxed Solution for Real Estate Companies",
    description: "Comprehensive real estate management system with lead tracking, property management, and automated client communications.",
    company: "Stellar Properties Group",
    location: "San Diego, CA, USA",
    category: "boxed-solutions",
    tags: ["Boxed Solution", "Real Estate", "Industry"],
    image: "/images/cases/boxed-solution-real-estate.jpg",
    image_hero: "/images/cases/boxed-solution-real-estate-hero.jpg",
    problem: "Real estate agencies struggled with disconnected systems for lead management, property listings, agent scheduling, and client communications. This fragmentation led to missed follow-ups, double-booked showings, and an inability to scale operations efficiently.",
    solution: [
      "Implementation of a specialized real estate CRM with industry-specific workflows",
      "Automated lead capture from multiple sources (website, portals, social media)",
      "Intelligent lead qualification and routing to appropriate agents",
      "Property management system with digital showcase creation",
      "Automated showing scheduling with calendar integration",
      "Document generation for listings, offers, and closings",
      "Commission calculation and tracking",
      "Client portal for property updates and document sharing"
    ],
    technologies: [
      "Monday CRM with real estate customization",
      "MLS integration",
      "DocuSign for electronic signatures",
      "Property portal APIs",
      "Google Calendar integration",
      "Custom reporting engine"
    ],
    results: [
      "Lead response time reduced from hours to minutes",
      "50% increase in lead conversion rate",
      "35% more showings per agent per week",
      "Transaction close time reduced by 20%"
    ],
    testimonial: {
      quote: "The boxed solution from Architeq gave us everything we needed right out of the gate—property management, lead tracking, agent scheduling, document automation—all working together seamlessly. We were fully operational in just two weeks, and saw immediate improvements in our lead conversion and agent productivity.",
      author: "Maria Rodriguez",
      position: "Broker/Owner at Stellar Properties Group",
      image: "/images/testimonials/maria-rodriguez.jpg"
    },
    related_cases: ["boxed-solution-roofing", "document-generation", "web-forms"]
  },
  {
    id: "informative-dashboards",
    title: "Creating Informative Dashboards",
    description: "Custom visualization dashboards providing real-time business insights and performance metrics.",
    company: "MetricVision Analytics",
    location: "New York, NY, USA",
    category: "workflow-automation",
    tags: ["Dashboards", "Analytics", "Reporting", "Visualization"],
    image: "/images/cases/informative-dashboards.jpg",
    image_hero: "/images/cases/informative-dashboards-hero.jpg",
    problem: "Executives and managers were drowning in data but starving for insights. Multiple systems generated reports in different formats, making it impossible to get a unified view of business performance. Decision-making was delayed by the time required to compile and analyze fragmented data.",
    solution: [
      "Development of customized interactive dashboards for different departments and roles",
      "Integration with multiple data sources (CRM, ERP, marketing platforms, financial systems)",
      "Real-time KPI tracking with historical trend analysis",
      "Drill-down capabilities for deeper data exploration",
      "Automated alerts for metrics outside expected ranges",
      "Scheduled reports delivered via email or Slack",
      "Mobile-optimized views for on-the-go access"
    ],
    technologies: [
      "Power BI",
      "Monday dashboards",
      "Custom API integrations",
      "SQL databases",
      "Data warehouse",
      "Visualization libraries",
      "ETL processes"
    ],
    results: [
      "Decision-making time reduced by 65%",
      "Data analysis time cut by 80%",
      "Identified $1.2M in potential cost savings through pattern recognition",
      "Executives report 90% more confidence in business data"
    ],
    testimonial: {
      quote: "The dashboards Architeq created have transformed how we run our business. For the first time, we have a single source of truth that combines data from all our systems. Our morning management meetings are now focused on action items rather than questioning the numbers.",
      author: "Lisa Forester",
      position: "CEO at MetricVision Analytics",
      image: "/images/testimonials/lisa-forester.jpg"
    },
    related_cases: ["notification-tree", "complex-calculations", "monday-integration"]
  }
];