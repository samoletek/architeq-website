// src/data/cases-content.ts

// Типы для кейсов
export interface CaseStudy {
    id: string
    title: string
    client: string
    category: string[]
    industry: string
    challenge: string
    solution: string
    results: string[]
    timeframe: string
    tags: string[]
    imageUrl: string
    description: string
    fullContent: {
      objectives: string[]
      approach: string[]
      implementation: string[]
      outcomes: string[]
    }
  }
  
  // Список категорий для фильтрации
  export const categories = [
    { id: 'workflow', name: 'Workflow Automation' },
    { id: 'crm', name: 'CRM Integration' },
    { id: 'ai', name: 'AI Solutions' },
    { id: 'document', name: 'Document Automation' },
    { id: 'finance', name: 'Finance Automation' },
    { id: 'custom', name: 'Custom Solutions' }
  ]
  
  // Список отраслей для фильтрации
  export const industries = [
    { id: 'logistics', name: 'Logistics' },
    { id: 'finance', name: 'Financial Services' },
    { id: 'retail', name: 'Retail' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' },
    { id: 'education', name: 'Education' }
  ]
  
  // Пример кейсов (данные из документа)
  export const cases: CaseStudy[] = [
    {
      id: 'stripe-invoicing',
      title: 'Automated Invoicing with Stripe',
      client: 'EclipseGroup',
      category: ['finance', 'workflow'],
      industry: 'financial services',
      challenge: 'Manual invoicing process took hours, delayed payments',
      solution: 'Full integration between CRM and finance system for automatic invoice generation',
      results: [
        '85% less time spent on invoicing',
        '30% faster payments',
        'Zero data transfer errors'
      ],
      timeframe: '3 months',
      tags: ['finance', 'automation', 'integration'],
      imageUrl: '/images/cases/stripe-invoicing.png',
      description: 'Full integration between CRM and finance system for fully automated invoice generation, tracking, and reconciliation — no more manual steps, just seamless flow.',
      fullContent: {
        objectives: [
          'Automate invoice generation process',
          'Integrate CRM with financial system',
          'Reduce payment processing time',
          'Eliminate manual data entry errors'
        ],
        approach: [
          'Analyzed existing manual workflow',
          'Mapped CRM data to invoice requirements',
          'Designed automated trigger system',
          'Implemented Stripe API integration'
        ],
        implementation: [
          'Created custom API connections',
          'Built automated invoice templates',
          'Set up payment tracking system',
          'Configured email notifications'
        ],
        outcomes: [
          'Reduced invoicing time by 85%',
          'Improved cash flow with faster payments',
          'Eliminated all data transfer errors',
          'Enhanced financial visibility'
        ]
      }
    },
    {
      id: 'document-builder',
      title: 'Smart Document Builder in CRM',
      client: 'Up-Struct LLC',
      category: ['document', 'crm'],
      industry: 'logistics',
      challenge: 'Creating documents manually took 35 minutes per document with frequent errors',
      solution: 'Automatic generation of documents based on CRM data with templates',
      results: [
        'From 35 minutes to 2 minutes per document',
        'No human input errors',
        'Full standardization across company docs'
      ],
      timeframe: '2 months',
      tags: ['automation', 'crm', 'documents'],
      imageUrl: '/images/cases/document-builder.png',
      description: 'Automatic generation of consistent, error-free documents based on CRM data.',
      fullContent: {
        objectives: [
          'Eliminate manual document creation',
          'Standardize document formats',
          'Reduce human errors',
          'Speed up document generation'
        ],
        approach: [
          'Mapped document types and requirements',
          'Analyzed CRM data structure',
          'Designed template system',
          'Created automated workflow'
        ],
        implementation: [
          'Built dynamic document templates',
          'Integrated with CRM database',
          'Configured auto-fill logic',
          'Set up approval workflows'
        ],
        outcomes: [
          'Cut document creation time by 94%',
          'Achieved 100% error reduction',
          'Standardized all company documents',
          'Improved client satisfaction'
        ]
      }
    },
    {
      id: 'ai-voice-bot',
      title: 'AI-Voice Bot for Client Requests',
      client: 'LaneWise',
      category: ['ai', 'workflow'],
      industry: 'customer service',
      challenge: 'High volume of client calls overwhelming support team',
      solution: 'Multi-level voice assistant handling calls without human agents',
      results: [
        '60-70% of inbound requests automated',
        'Instant response, no queue time',
        '24/7 availability with zero headcount growth'
      ],
      timeframe: '4 months',
      tags: ['ai', 'automation', 'customer-service'],
      imageUrl: '/images/cases/ai-voice-bot.png',
      description: 'Multi-level voice assistant that fully handles client calls without human agents — routing, answering, resolving.',
      fullContent: {
        objectives: [
          'Automate routine customer inquiries',
          'Reduce wait times',
          'Scale customer support 24/7',
          'Maintain service quality'
        ],
        approach: [
          'Analyzed customer service patterns',
          'Identified common inquiries',
          'Trained AI voice model',
          'Designed conversation flows'
        ],
        implementation: [
          'Developed voice recognition system',
          'Created response database',
          'Built routing algorithms',
          'Integrated with CRM'
        ],
        outcomes: [
          'Automated 65% of all support calls',
          'Eliminated wait times',
          'Provided 24/7 availability',
          'Maintained high satisfaction rates'
        ]
      }
    }
  ]