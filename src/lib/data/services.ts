// src/lib/data/services.ts
// Централизованный источник данных для всех сервисов

import React from 'react';

export interface ServiceMetrics {
  label: string;
  value: string;
  unit: string;
}

export interface ServiceSalesData {
  timeToROI: string;
  avgEfficiencyGain: string;
  avgTimeSaved: string;
  clientsSaved: string;
  valueProps: string[];
  metrics: ServiceMetrics[];
}

export interface ServicePreview {
  id: string;
  title: string;
  shortDescription: string; // Для карточек/preview
  fullDescription: string;  // Для полных страниц
  icon: string;
  href: string;
  previewFeatures: string[]; // Краткий список для карточек
  salesData: ServiceSalesData;
}

export interface ServiceOverview {
  title: string;
  description: React.ReactNode;
  features: string[];
  featuresTitle: string;
}

export interface ServiceDetailData {
  // SEO metadata
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  
  // Main content
  serviceTitle: string;
  serviceDescription: string;
  breadcrumbTitle: string;
  
  // Overview section
  overview: ServiceOverview;
  
  // Benefits section
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  
  // Features/Solutions section
  features: Array<{
    title: string;
    description: string;
    benefits?: string[];
    icon?: string;
    caseId?: string;
    discountButton?: boolean;
  }>;
  
  // Process steps
  processes: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  
  // Related case studies
  relatedCaseIds: string[];
  
  // FAQ section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  
  // Schema.org data
  schema?: {
    serviceOutput?: string;
    serviceArea?: string[];
    hoursAvailable?: {
      opens: string;
      closes: string;
      dayOfWeek: string[];
    };
  };
}

export interface Service extends ServicePreview {
  details: ServiceDetailData;
}

// Централизованные данные сервисов
export const services: Service[] = [
  {
    id: 'business-process',
    title: 'Business Process Automation',
    shortDescription: 'Build smarter workflows, not workarounds. We automate core operations by syncing your tools, mapping logic, and removing manual effort — for faster, cleaner results.',
    fullDescription: 'We reengineer core business processes by removing manual steps, syncing tools, and building flexible, intelligent workflows that adapt to your business needs.',
    icon: 'process',
    href: '/services/business-process',
    previewFeatures: [
      'Clear roadmap for implementation',
      'End-to-end workflow automation',
      'System integration & error-proof data flow',
      'Custom dashboards for live insights',
      'Smart validation & fail-safes'
    ],
    salesData: {
      timeToROI: '2-4 weeks',
      avgEfficiencyGain: '40-60%',
      avgTimeSaved: '25-30 hours/week',
      clientsSaved: '200+',
      valueProps: [
        'Eliminate 80% of manual processes',
        'Reduce processing time by 60%',
        'Zero human errors in core workflows',
        'Real-time visibility across operations'
      ],
      metrics: [
        { label: 'Time Saved', value: '30hrs', unit: '/week' },
        { label: 'Error Rate', value: '0%', unit: '' },
        { label: 'ROI Timeline', value: '2-4', unit: 'weeks' }
      ]
    },
    details: {
      seoTitle: 'Business Process Automation',
      seoDescription: 'Streamline your business operations with our business process automation services. Eliminate manual tasks, reduce errors, and improve efficiency.',
      seoKeywords: ['business process automation', 'workflow automation', 'process optimization', 'efficiency improvement', 'task automation'],
      
      serviceTitle: "Business Process Automation",
      serviceDescription: "Transform your business operations by automating repetitive tasks, connecting systems, and creating efficient workflows that save time and reduce errors.",
      breadcrumbTitle: "Business Process Automation",
      
      overview: {
        title: "What Is Business Process Automation?",
        description: React.createElement(React.Fragment, null,
          React.createElement('p', { className: 'mb-4' }, 
            'Business Process Automation (BPA) is the technology-enabled automation of complex business processes. It streamlines a business for simplicity, achieves digital transformation, increases service quality, improves service delivery, and contains costs.'
          ),
          React.createElement('p', { className: 'mb-4' }, 
            'Our approach to BPA focuses on connecting your existing tools and systems to create automated workflows that reduce manual intervention, minimize errors, and save time.'
          ),
          React.createElement('p', null, 
            'Whether you need to automate simple tasks like data entry or complex workflows across multiple departments, our solutions are tailored to your specific business needs.'
          )
        ),
        features: [
          "Logistics & Transportation",
          "Manufacturing", 
          "Financial Services",
          "Real Estate",
          "Healthcare",
          "E-commerce & Retail"
        ],
        featuresTitle: "Industries We Serve"
      },
      
      benefits: [
        {
          title: "Time Efficiency",
          description: "Reduce time spent on manual processes by up to 80%, allowing your team to focus on high-value activities.",
          icon: "clock"
        },
        {
          title: "Error Reduction",
          description: "Eliminate human errors in data entry and processing, ensuring consistency and accuracy in all operations.",
          icon: "shield"
        },
        {
          title: "Cost Reduction",
          description: "Lower operational costs by automating repetitive tasks and optimizing resource allocation.",
          icon: "dollar"
        },
        {
          title: "Improved Visibility",
          description: "Gain real-time insights into your business processes through customized dashboards and analytics.",
          icon: "chart"
        }
      ],
      
      features: [
        {
          title: "Process Mapping & Analysis",
          description: "We analyze your current workflows to identify bottlenecks, redundancies, and opportunities for automation.",
          benefits: [
            "Comprehensive workflow documentation",
            "Identification of inefficiencies",
            "Prioritization of automation opportunities",
            "Clear roadmap for implementation"
          ],
          icon: "map",
          caseId: "car-hauling-solution"
        },
        {
          title: "Custom Workflow Design",
          description: "Based on your needs, we design automated workflows that streamline operations and reduce manual intervention.",
          benefits: [
            "Tailored to your specific business processes",
            "Integration between different systems",
            "Conditional logic and decision points",
            "Exception handling mechanisms"
          ],
          icon: "workflow",
          caseId: "financial-calculations"
        },
        {
          title: "System Integration",
          description: "We connect your existing tools and software to create a seamless flow of information across your organization.",
          benefits: [
            "Bidirectional data synchronization",
            "Elimination of manual data entry",
            "Real-time information updates",
            "Unified data environment"
          ],
          icon: "connect",
          caseId: "monday-integration"
        },
        {
          title: "Dashboard Creation",
          description: "Custom dashboards provide real-time visibility into your business processes and KPIs.",
          benefits: [
            "Visual representation of key metrics",
            "Customizable views for different roles",
            "Real-time performance monitoring",
            "Data-driven decision making"
          ],
          icon: "dashboard",
          caseId: "dashboards-creation"
        }
      ],
      
      processes: [
        {
          step: 1,
          title: "Initial Assessment",
          description: "We begin by understanding your current processes, pain points, and objectives through detailed consultations and process mapping."
        },
        {
          step: 2,
          title: "Solution Design",
          description: "Our team designs a custom automation solution tailored to your specific business needs, with a focus on scalability and user-friendliness."
        },
        {
          step: 3,
          title: "Implementation",
          description: "We implement the solution with minimal disruption to your operations, providing comprehensive testing and validation at each stage."
        },
        {
          step: 4,
          title: "Training & Deployment",
          description: "We thoroughly train your team on the new system and deploy it in your production environment."
        },
        {
          step: 5,
          title: "Continuous Improvement",
          description: "We provide ongoing support and regularly review the solution's performance, making adjustments to optimize efficiency and adapt to changing needs."
        }
      ],
      
      relatedCaseIds: ['monday-integration', 'notification-system', 'dashboards-creation'],
      
      faqs: [
        {
          question: "Which business processes can be automated?",
          answer: "Almost any repetitive, rule-based process can be automated. Common examples include data entry, document generation, approval workflows, notification systems, reporting, and customer onboarding. We can help identify the best automation opportunities in your business."
        },
        {
          question: "Will automation replace our current systems?",
          answer: "No, our automation solutions are designed to work with your existing systems rather than replace them. We connect and enhance your current tools to create a more efficient workflow, preserving your previous investments."
        },
        {
          question: "How long does implementation typically take?",
          answer: "Implementation time varies based on the complexity of the processes being automated. Simple automations can be implemented in 2-4 weeks, while more complex solutions might take 6-12 weeks. We provide a detailed timeline during our initial assessment."
        },
        {
          question: "How do you ensure security of our business data?",
          answer: "Security is a top priority in all our implementations. We follow industry best practices for data security, use encrypted connections, implement proper access controls, and ensure compliance with relevant regulations. We're happy to discuss specific security requirements for your project."
        }
      ]
    }
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration',
    shortDescription: 'No more scattered data — we build your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.',
    fullDescription: 'Build a centralized CRM system that unifies all your customer data, automates lead management, and creates seamless workflows across your entire organization.',
    icon: 'crm',
    href: '/services/crm-integration',
    previewFeatures: [
      'Centralized CRM built from scratch — fully tailored to your workflows',
      'Cross-platform consistency',
      'Document management automation',
      'Wide integration capabilities',
      'Customizable insight dashboards'
    ],
    salesData: {
      timeToROI: '3-6 weeks',
      avgEfficiencyGain: '50-70%',
      avgTimeSaved: '20-25 hours/week',
      clientsSaved: '150+',
      valueProps: [
        'Unified customer data across all platforms',
        'Automated lead scoring and nurturing',
        '360° customer view for better decisions',
        'Seamless sales pipeline management'
      ],
      metrics: [
        { label: 'Lead Conversion', value: '+45%', unit: '' },
        { label: 'Data Accuracy', value: '99%', unit: '' },
        { label: 'Sales Velocity', value: '+60%', unit: '' }
      ]
    },
    details: {
      seoTitle: 'CRM System Integration',
      seoDescription: 'Connect your CRM with other business tools to create a unified information environment. Improve data flow, enhance customer service, and eliminate manual data entry.',
      seoKeywords: ['CRM integration', 'CRM connection', 'Monday integration', 'Salesforce integration', 'HubSpot integration', 'unified data', 'data synchronization'],
      
      serviceTitle: "CRM System Integration",
      serviceDescription: "Connect your CRM with other business tools to create a unified information environment and streamline your operations.",
      breadcrumbTitle: "CRM Integration",
      
      overview: {
        title: "What Is CRM Integration?",
        description: React.createElement(React.Fragment, null,
          React.createElement('p', { className: 'mb-4' }, 
            'CRM integration connects your customer relationship management system with other business tools and platforms to create a unified data environment and streamlined workflows.'
          ),
          React.createElement('p', { className: 'mb-4' }, 
            'Our integration solutions eliminate data silos, reduce manual data entry, and provide a complete view of your customer interactions across all touchpoints.'
          ),
          React.createElement('p', null, 
            'Whether you need to connect email systems, accounting software, or marketing platforms, our CRM integrations create seamless data flow throughout your organization.'
          )
        ),
        features: [
          "Monday.com Integration",
          "HubSpot Integration",
          "Salesforce Integration",
          "QuickBooks Integration",
          "Email Platform Integration",
          "Marketing Tool Integration"
        ],
        featuresTitle: "Supported Platforms"
      },
      
      benefits: [
        {
          title: "Unified Data Environment",
          description: "Create a single source of truth by connecting your CRM with other business tools and databases.",
          icon: "connect"
        },
        {
          title: "Automated Workflows",
          description: "Eliminate manual data transfer and automate cross-platform processes for better efficiency.",
          icon: "workflow"
        },
        {
          title: "360° Customer View",
          description: "Get a complete picture of customer interactions across all touchpoints and platforms.",
          icon: "chart"
        },
        {
          title: "Real-time Insights",
          description: "Access up-to-date information and analytics for better decision-making and customer service.",
          icon: "dashboard"
        }
      ],
      
      features: [
        {
          title: "Email & Communication",
          description: "Connect your CRM with email services, Slack, Teams, and other communication tools for seamless information flow.",
          benefits: [
            "Automatic email tracking in CRM",
            "Slack notifications for CRM events",
            "Two-way synchronization with email clients",
            "Team chat integration with client records"
          ],
          icon: "connect",
          caseId: "monday-integration"
        },
        {
          title: "Document Management",
          description: "Integrate with document storage and e-signature solutions to automate contract and document workflows.",
          benefits: [
            "Automatic document generation from CRM data",
            "Electronic signature integration",
            "Document version control and tracking",
            "Cloud storage synchronization"
          ],
          icon: "document",
          caseId: "document-generation"
        },
        {
          title: "Accounting & Payments",
          description: "Link your CRM with financial systems for automated invoicing, payment tracking, and financial reporting.",
          benefits: [
            "Automatic invoice creation based on CRM deals",
            "Real-time payment status updates",
            "Financial dashboard integration",
            "Expense tracking and reconciliation"
          ],
          icon: "dollar",
          caseId: "quickbooks-integration"
        },
        {
          title: "Marketing Platforms",
          description: "Connect marketing tools to synchronize campaigns, leads, and analytics with your CRM.",
          benefits: [
            "Campaign performance tracking in CRM",
            "Lead scoring and qualification automation",
            "Email marketing integration",
            "Analytics consolidation"
          ],
          icon: "analysis",
          caseId: "web-forms-integration"
        }
      ],
      
      processes: [
        {
          step: 1,
          title: "Requirement Analysis",
          description: "We start by understanding your current CRM setup, the systems you want to integrate, and your specific business objectives."
        },
        {
          step: 2,
          title: "Data Mapping & Workflow Design",
          description: "We create a comprehensive data mapping plan to determine how information will flow between systems and design automated workflows."
        },
        {
          step: 3,
          title: "Integration Development",
          description: "Our team develops the integration solution, ensuring secure and reliable data transfer between your CRM and other systems."
        },
        {
          step: 4,
          title: "Testing & Deployment",
          description: "We thoroughly test the integration to ensure data accuracy and system reliability before deploying to your production environment."
        },
        {
          step: 5,
          title: "Training & Support",
          description: "We provide comprehensive training for your team and ongoing support to ensure you maximize the benefits of your integrated systems."
        }
      ],
      
      relatedCaseIds: ['monday-integration', 'document-generation', 'quickbooks-integration'],
      
      faqs: [
        {
          question: "Which CRM systems do you work with?",
          answer: "We work with all major CRM platforms including Monday.com, Salesforce, HubSpot, Pipedrive, and many others. We can also help you choose the right CRM for your specific needs if you're starting from scratch."
        },
        {
          question: "How long does a CRM integration project take?",
          answer: "Integration timelines vary based on complexity, but most projects are completed within 3-6 weeks. Simple integrations can be done in 1-2 weeks, while complex multi-system integrations may take 6-8 weeks."
        },
        {
          question: "Will my existing data be safe during integration?",
          answer: "Yes, data security is our top priority. We always work with backup systems and use secure data transfer methods. We also perform thorough testing before any production deployment."
        },
        {
          question: "Can you integrate custom or legacy systems?",
          answer: "Absolutely. We have experience working with legacy systems and can create custom APIs and connectors to integrate older systems with modern CRM platforms."
        }
      ]
    }
  },
  {
    id: 'boxed-solutions',
    title: 'Industry-Specific Boxed Solutions',
    shortDescription: 'Prebuilt for your industry. Tailored to your edge. Accelerate with ready-to-run automation kits designed for your field — and customized for your operations.',
    fullDescription: 'Ready-to-run automation kits tailored to your industry — deployed fast, scaled smart, and fully customized for your competitive edge.',
    icon: 'industry',
    href: '/services/boxed-solutions',
    previewFeatures: [
      'Pre-configured workflows for key sectors',
      'Custom fields & data structure',
      'Industry-specific integrations',
      'Scalable & field-proven automations',
      'Fast deployment'
    ],
    salesData: {
      timeToROI: '1-2 weeks',
      avgEfficiencyGain: '30-50%',
      avgTimeSaved: '15-20 hours/week',
      clientsSaved: '100+',
      valueProps: [
        'Industry-proven workflows ready to deploy',
        'Fastest time to value in the market',
        'Pre-built integrations for common tools',
        'Scalable foundation for custom needs'
      ],
      metrics: [
        { label: 'Deploy Time', value: '1-2', unit: 'weeks' },
        { label: 'Setup Cost', value: '-70%', unit: '' },
        { label: 'Efficiency Gain', value: '40%', unit: '' }
      ]
    },
    details: {
      seoTitle: 'Industry-Specific Boxed Solutions',
      seoDescription: 'Pre-built automation solutions designed specifically for your industry. Fast deployment, proven workflows, and customizable features.',
      seoKeywords: ['industry solutions', 'pre-built automation', 'sector-specific tools', 'ready-to-deploy', 'vertical solutions'],
      
      serviceTitle: "Industry-Specific Boxed Solutions",
      serviceDescription: "Pre-built automation solutions designed specifically for your industry with fast deployment and proven results.",
      breadcrumbTitle: "Boxed Solutions",
      
      overview: {
        title: "What Are Boxed Solutions?",
        description: React.createElement(React.Fragment, null,
          React.createElement('p', { className: 'mb-4' }, 
            'Boxed solutions are pre-configured automation packages designed specifically for different industries. They combine proven workflows, industry-specific features, and best practices into ready-to-deploy solutions.'
          ),
          React.createElement('p', { className: 'mb-4' }, 
            'These solutions accelerate implementation by providing industry-tested frameworks while maintaining the flexibility to customize for your specific business needs.'
          ),
          React.createElement('p', null, 
            'Whether you\'re in logistics, healthcare, real estate, or e-commerce, our boxed solutions provide immediate value with minimal setup time.'
          )
        ),
        features: [
          "Real Estate",
          "Logistics & Transportation",
          "Healthcare Services",
          "E-commerce & Retail",
          "Professional Services",
          "Manufacturing"
        ],
        featuresTitle: "Industry Focus Areas"
      },
      
      benefits: [
        {
          title: "Fast Deployment",
          description: "Get up and running quickly with pre-built workflows designed for your specific industry needs.",
          icon: "clock"
        },
        {
          title: "Proven Frameworks",
          description: "Leverage industry-tested automation patterns and best practices from successful implementations.",
          icon: "shield"
        },
        {
          title: "Cost Effective",
          description: "Reduce development costs by starting with proven solutions rather than building from scratch.",
          icon: "dollar"
        },
        {
          title: "Customizable",
          description: "Adapt and extend the base solution to match your unique business requirements and processes.",
          icon: "workflow"
        }
      ],
      
      features: [
        {
          title: "Real Estate Solutions",
          description: "Complete automation package for real estate professionals including lead management, document generation, and client communication.",
          benefits: [
            "Automated lead capture and qualification",
            "Document generation for contracts and disclosures",
            "Client communication workflows",
            "Transaction milestone tracking"
          ],
          icon: "home",
          caseId: "real-estate-automation"
        },
        {
          title: "Logistics & Transportation",
          description: "Streamline operations with automated dispatch, tracking, and customer communication systems designed for logistics companies.",
          benefits: [
            "Automated dispatch and route optimization",
            "Real-time tracking and notifications",
            "Driver communication and coordination",
            "Customer portal and updates"
          ],
          icon: "truck",
          caseId: "logistics-automation"
        },
        {
          title: "Healthcare Solutions",
          description: "Patient management and communication automation designed for healthcare practices and service providers.",
          benefits: [
            "Appointment scheduling and reminders",
            "Patient intake and documentation",
            "Insurance verification automation",
            "HIPAA-compliant communication workflows"
          ],
          icon: "health",
          caseId: "healthcare-automation"
        },
        {
          title: "E-commerce Operations",
          description: "Complete e-commerce automation including inventory management, order processing, and customer service workflows.",
          benefits: [
            "Order processing and fulfillment automation",
            "Inventory tracking and restocking alerts",
            "Customer service ticket routing",
            "Return and refund processing"
          ],
          icon: "store",
          caseId: "ecommerce-automation"
        }
      ],
      
      processes: [
        {
          step: 1,
          title: "Industry Assessment",
          description: "We evaluate your industry-specific needs and match them with our proven solution frameworks."
        },
        {
          step: 2,
          title: "Solution Configuration",
          description: "We configure the boxed solution to align with your specific business processes and requirements."
        },
        {
          step: 3,
          title: "Customization & Integration",
          description: "We customize features and integrate with your existing systems to ensure seamless operation."
        },
        {
          step: 4,
          title: "Deployment & Training",
          description: "We deploy the solution and provide comprehensive training to ensure successful adoption."
        }
      ],
      
      relatedCaseIds: ['real-estate-automation', 'logistics-automation', 'healthcare-automation'],
      
      faqs: [
        {
          question: "How quickly can a boxed solution be deployed?",
          answer: "Most boxed solutions can be deployed within 1-2 weeks since they're pre-built and tested. The exact timeline depends on the complexity of customizations and integrations needed."
        },
        {
          question: "Can boxed solutions be customized for my specific needs?",
          answer: "Yes, all our boxed solutions are designed to be customizable. While they provide a proven foundation, we can adapt them to match your unique business processes and requirements."
        },
        {
          question: "What if my industry isn't listed?",
          answer: "We're constantly developing new industry-specific solutions. If your industry isn't listed, we can create a custom solution using proven components from our existing frameworks."
        },
        {
          question: "Do boxed solutions include ongoing support?",
          answer: "Yes, all boxed solutions include comprehensive support including training, documentation, and ongoing technical assistance to ensure successful implementation and operation."
        }
      ]
    }
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    shortDescription: 'Automate with intelligence. Operate with insight. Use AI to automate high-effort tasks, reveal patterns, and support decision-making with real-time insights.',
    fullDescription: 'Use AI to surface insight and automate high-effort tasks — from client comms to operations logic. Use AI to automate what truly matters — from client comms to operations logic, only where it drives real value.',
    icon: 'ai',
    href: '/services/ai-solutions',
    previewFeatures: [
      'AI-driven voice assistant',
      'CRM-integrated assistant',
      'Real-time conversation transcription',
      'Scalable and customizable solutions',
      'Quick and efficient deployment'
    ],
    salesData: {
      timeToROI: '4-8 weeks',
      avgEfficiencyGain: '60-80%',
      avgTimeSaved: '35-40 hours/week',
      clientsSaved: '80+',
      valueProps: [
        'AI-powered decision automation',
        'Natural language processing for communication',
        'Predictive analytics for business insights',
        'Smart routing and task assignment'
      ],
      metrics: [
        { label: 'Response Time', value: '90%', unit: 'faster' },
        { label: 'Decision Accuracy', value: '95%', unit: '' },
        { label: 'Processing Volume', value: '10x', unit: '' }
      ]
    },
    details: {
      seoTitle: 'AI-Powered Solutions',
      seoDescription: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights. Use AI voice agents, natural language processing, and predictive analytics.',
      seoKeywords: ['AI solutions', 'artificial intelligence', 'AI agents', 'voice agents', 'predictive analytics', 'natural language processing', 'machine learning', 'AI automation'],
      
      serviceTitle: "AI-Powered Solutions",
      serviceDescription: "Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights that drive business growth.",
      breadcrumbTitle: "AI-Powered Solutions",
      
      overview: {
        title: "What Are AI-Powered Solutions?",
        description: React.createElement(React.Fragment, null,
          React.createElement('p', { className: 'mb-4' }, 
            'AI-powered solutions use artificial intelligence and machine learning to automate complex tasks, analyze large volumes of data, and generate insights that would be impossible or impractical for humans to produce manually.'
          ),
          React.createElement('p', { className: 'mb-4' }, 
            'Our AI solutions are designed to integrate seamlessly with your existing business processes and systems, enhancing rather than replacing human capabilities.'
          ),
          React.createElement('p', null, 
            'Whether you need to automate customer interactions, gain insights from communications, or leverage predictive analytics, our AI solutions can help you operate more efficiently and make better business decisions.'
          )
        ),
        features: [
          "Natural Language Processing",
          "Speech Recognition",
          "OpenAI Models",
          "Anthropic Models",
          "Real-Time Voice Generation",
          "Smart Research"
        ],
        featuresTitle: "AI Services"
      },
      
      benefits: [
        {
          title: "Time Efficiency",
          description: "Automate complex tasks that would take humans hours to complete, freeing up your team for high-value activities.",
          icon: "clock"
        },
        {
          title: "Data Analysis",
          description: "Process and analyze large volumes of data to uncover patterns and insights that humans might miss.",
          icon: "chart"
        },
        {
          title: "24/7 Availability",
          description: "AI systems can work around the clock without breaks, ensuring continuous service for your customers.",
          icon: "calendar"
        },
        {
          title: "Scalability",
          description: "Handle fluctuating workloads without needing to hire additional staff during peak periods.",
          icon: "scale"
        }
      ],
      
      features: [
        {
          title: "AI Voice Agents",
          description: "Intelligent voice agents that can handle customer inquiries, book appointments, and collect information without human intervention.",
          benefits: [
            "24/7 automated call handling",
            "Reduction in staff workload",
            "Consistent customer experience",
            "Scalable to handle volume fluctuations"
          ],
          icon: "voice",
          caseId: "ai-voice-agent"
        },
        {
          title: "CRM AI Agents",
          description: "Intelligent agents that help employees quickly find and summarize information across your CRM and connected systems using natural language.",
          benefits: [
            "Faster information retrieval",
            "Reduced training time for new employees",
            "Improved decision making with complete data",
            "More effective client interactions"
          ],
          icon: "search",
          caseId: "ai-crm-agent"
        },
        {
          title: "Communication Analysis",
          description: "Automatic transcription and analysis of client conversations to improve service quality and identify training opportunities.",
          benefits: [
            "Quality control automation",
            "Identification of script deviations",
            "Recognition of emotional tone",
            "Training material generation"
          ],
          icon: "analysis",
          discountButton: true
        },
        {
          title: "Predictive Analytics",
          description: "AI-powered forecasting tools that analyze historical data to predict customer behavior, sales trends, and business opportunities.",
          benefits: [
            "More accurate sales forecasting",
            "Proactive customer retention",
            "Inventory optimization",
            "Data-driven strategic planning"
          ],
          icon: "prediction",
          discountButton: true
        }
      ],
      
      processes: [
        {
          step: 1,
          title: "Discovery & Planning",
          description: "We assess your business needs, identify opportunities for AI implementation, and develop a comprehensive implementation plan."
        },
        {
          step: 2,
          title: "Solution Design",
          description: "Our team designs a custom AI solution tailored to your specific requirements, focusing on integration with your existing systems."
        },
        {
          step: 3,
          title: "Development & Training",
          description: "We develop and train the AI models using your data, ensuring they are optimized for your specific use case and performance requirements."
        },
        {
          step: 4,
          title: "Deployment & Refinement",
          description: "We deploy the solution in your environment, provide training, and continuously refine the AI based on real-world performance and feedback."
        }
      ],
      
      relatedCaseIds: ['ai-voice-agent', 'ai-crm-agent'],
      
      faqs: [
        {
          question: "How long does it take to implement an AI solution?",
          answer: "Most AI solutions can be implemented within 4-8 weeks, depending on complexity and scope. We will provide a detailed timeline during our initial consultation."
        },
        {
          question: "Do I need a large dataset to use AI?",
          answer: "While more data generally leads to better results, we can work with smaller datasets or leverage pre-trained models that require less data to be effective for your specific use case."
        },
        {
          question: "How are AI solutions maintained?",
          answer: "We provide ongoing maintenance and monitoring to ensure your AI solution continues to perform optimally. This includes regular performance reviews, model retraining, and updates as needed."
        },
        {
          question: "How secure is my data with AI solutions?",
          answer: "Data security is a top priority. We implement industry-standard security measures and can design solutions that keep your data within your own environment if required."
        }
      ],
      
      schema: {
        serviceOutput: "Automated business processes, AI agents, data analysis systems",
        serviceArea: ["United States", "Canada", "United Kingdom"],
        hoursAvailable: {
          opens: "09:00",
          closes: "17:00",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }
      }
    }
  },
  {
    id: 'documentation',
    title: 'Automated Document Flow',
    shortDescription: 'Documents that write themselves. Processes that follow through. We automate the full lifecycle of business documentation — from creation to compliance — with regulatory requirements.',
    fullDescription: 'We automate your entire document flow — creation, approval, compliance — all in sync with your CRM, tools and teams, using our pre-built document generation tools.',
    icon: 'document',
    href: '/services/documentation',
    previewFeatures: [
      'Auto-generation from CRM templates',
      'E-signature & approval flows',
      'Smart forms & structured capture',
      'Document version control',
      'Regulatory compliance built-in'
    ],
    salesData: {
      timeToROI: '2-3 weeks',
      avgEfficiencyGain: '70-85%',
      avgTimeSaved: '20-30 hours/week',
      clientsSaved: '120+',
      valueProps: [
        'Zero manual document creation',
        'Automated approval workflows',
        'Real-time collaboration and versioning',
        'Built-in compliance and audit trails'
      ],
      metrics: [
        { label: 'Doc Processing', value: '85%', unit: 'faster' },
        { label: 'Approval Time', value: '-90%', unit: '' },
        { label: 'Compliance Rate', value: '100%', unit: '' }
      ]
    },
    details: {
      seoTitle: 'Documentation & Forms',
      seoDescription: 'Automate document creation, processing, and management. Streamline form data collection and processing to reduce administrative burden and ensure compliance.',
      seoKeywords: ['document automation', 'form automation', 'document generation', 'electronic signatures', 'document management', 'web forms', 'form integration'],
      
      serviceTitle: "Documentation & Forms",
      serviceDescription: "Automate document creation, processing, and management to reduce administrative burden, ensure compliance, and improve efficiency.",
      breadcrumbTitle: "Documentation & Forms",
      
      overview: {
        title: "What Is Document & Form Automation?",
        description: React.createElement(React.Fragment, null,
          React.createElement('p', { className: 'mb-4' }, 
            'Document and form automation is the process of using technology to streamline the creation, processing, management, and storage of business documents and forms.'
          ),
          React.createElement('p', { className: 'mb-4' }, 
            'By automating these processes, businesses can eliminate manual data entry, reduce errors, ensure compliance, and significantly improve efficiency across departments.'
          ),
          React.createElement('p', null, 
            'Our document and form automation solutions integrate seamlessly with your existing CRM and business systems to create a unified workflow that saves time and improves accuracy.'
          )
        ),
        features: [
          "Manual Docs Creation",
          "Errors and Inconsistencies",
          "Signing Delays",
          "Compliance Requirements",
          "Version Control",
          "Data Security"
        ],
        featuresTitle: "Document Challenges"
      },
      
      benefits: [
        {
          title: "Time Savings",
          description: "Reduce document creation and processing time by up to 90%, freeing your team for higher-value activities.",
          icon: "clock"
        },
        {
          title: "Error Reduction",
          description: "Eliminate manual data entry errors that can lead to costly mistakes and compliance issues.",
          icon: "shield"
        },
        {
          title: "Improved Compliance",
          description: "Ensure consistent document formatting and content that meets regulatory requirements.",
          icon: "check"
        },
        {
          title: "Enhanced Customer Experience",
          description: "Provide a seamless, modern experience for customers submitting information and signing documents.",
          icon: "user"
        }
      ],
      
      features: [
        {
          title: "Automatic Document Generation",
          description: "Create standardized documents automatically from templates using data from your CRM or other systems.",
          benefits: [
            "Eliminate manual document creation",
            "Ensure consistency across all documents",
            "Reduce errors in document content",
            "Save significant time on document preparation"
          ],
          icon: "document",
          caseId: "document-generation"
        },
        {
          title: "Electronic Signatures Integration",
          description: "Streamline your document signing process with seamless electronic signature integration directly from your CRM.",
          benefits: [
            "Accelerate document signing cycle",
            "Track signing status in real time",
            "Automatic reminders for pending signatures",
            "Secure and legally compliant process"
          ],
          icon: "check",
          caseId: "electronic-signatures"
        },
        {
          title: "Web Forms with CRM Integration",
          description: "Create customized web forms that automatically feed data directly into your CRM and other business systems.",
          benefits: [
            "Capture lead and client information without manual entry",
            "Ensure data validation at point of entry",
            "Automatically trigger workflows based on form submissions",
            "Improve user experience with modern, responsive forms"
          ],
          icon: "workflow",
          caseId: "web-forms-integration"
        },
        {
          title: "Document Management Automation",
          description: "Automate document organization, storage, version control, and access management across your organization.",
          benefits: [
            "Centralize document storage with intelligent organization",
            "Implement version control and audit trails",
            "Automate document retention and archiving",
            "Control document access with role-based permissions"
          ],
          icon: "dashboard",
          caseId: "monday-integration"
        }
      ],
      
      processes: [
        {
          step: 1,
          title: "Needs Assessment",
          description: "We analyze your current document and form processes to identify inefficiencies, bottlenecks, and opportunities for automation."
        },
        {
          step: 2,
          title: "Solution Design",
          description: "Our team designs a custom document and form automation solution that addresses your specific needs and integrates with your existing systems."
        },
        {
          step: 3,
          title: "Template Creation",
          description: "We create customized document templates and form designs that match your branding and include all necessary fields and logic."
        },
        {
          step: 4,
          title: "Implementation & Integration",
          description: "We implement the solution and integrate it with your CRM, electronic signature platforms, and other business systems."
        },
        {
          step: 5,
          title: "Testing & Training",
          description: "We thoroughly test all components and provide comprehensive training to ensure your team can effectively use and manage the new system."
        }
      ],
      
      relatedCaseIds: ['document-generation', 'electronic-signatures', 'web-forms-integration'],
      
      faqs: [
        {
          question: "How secure are automated document solutions?",
          answer: "Our document automation solutions implement industry-standard security measures, including encryption, secure access controls, and audit trails. We ensure compliance with relevant regulations such as GDPR and can implement additional security measures based on your specific requirements."
        },
        {
          question: "Can I still customize documents after automation?",
          answer: "Absolutely. Our document automation solutions allow for both automated generation and manual customization when needed. You can set up templates with fixed elements and variable sections that can be edited on a case-by-case basis."
        },
        {
          question: "How long does implementation typically take?",
          answer: "Implementation time varies based on the complexity of your documents and workflows. Simple document automation can be implemented in 2-3 weeks, while more complex solutions with multiple integrations might take 4-8 weeks. We will provide a detailed timeline during our initial consultation."
        },
        {
          question: "Are electronic signatures legally binding?",
          answer: "Yes, electronic signatures are legally binding in most countries under laws such as the ESIGN Act in the US and eIDAS in the EU. Our solutions use compliant e-signature technologies that meet legal requirements, including authentication, consent, and record retention."
        }
      ]
    }
  },
  {
    id: 'finance',
    title: 'Finance Operations Automation',
    shortDescription: 'Streamline the flow of money. Stay in control, always. From invoicing to reconciliation — we connect and automate every part of your financial stack for speed, accuracy, and visibility.',
    fullDescription: 'Connect and automate your full financial stack — from invoicing to reconciliation — for faster, cleaner, and error-free money flow.',
    icon: 'finance',
    href: '/services/finance',
    previewFeatures: [
      'Smart invoice generation',
      'Real-time payment tracking & reconciliation',
      'Financial dashboards & custom reports',
      'Seamless accounting system integration',
      'Multi-currency, multi-market, and multi-payment method support'
    ],
    salesData: {
      timeToROI: '3-5 weeks',
      avgEfficiencyGain: '55-75%',
      avgTimeSaved: '25-35 hours/week',
      clientsSaved: '90+',
      valueProps: [
        'Real-time financial visibility',
        'Automated reconciliation and reporting',
        'Multi-currency and payment method support',
        'Seamless accounting system integration'
      ],
      metrics: [
        { label: 'Reconciliation', value: '95%', unit: 'automated' },
        { label: 'Report Generation', value: '80%', unit: 'faster' },
        { label: 'Payment Processing', value: '24/7', unit: '' }
      ]
    },
    details: {
      seoTitle: 'Financial Systems Integration',
      seoDescription: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting. Connect Stripe, QuickBooks, Xero and other systems.',
      seoKeywords: ['financial automation', 'accounting integration', 'invoice automation', 'payment tracking', 'financial reporting', 'QuickBooks integration', 'Stripe integration'],
      
      serviceTitle: "Financial Systems Integration",
      serviceDescription: "Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting to improve cash flow and decision-making.",
      breadcrumbTitle: "Financial Systems Integration",
      
      overview: {
        title: "What Is Financial Systems Integration?",
        description: React.createElement(React.Fragment, null,
          React.createElement('p', { className: 'mb-4' }, 
            'Financial systems integration is the process of connecting your financial tools—such as accounting software, payment processors, and banking platforms—with your CRM and other business systems to create a seamless flow of financial data across your organization.'
          ),
          React.createElement('p', { className: 'mb-4' }, 
            'This integration eliminates manual data entry, reduces errors, accelerates financial processes, and provides real-time financial visibility throughout your business.'
          ),
          React.createElement('p', null, 
            'Our approach focuses on creating secure, reliable connections between your existing financial systems and operational tools, automating financial workflows while maintaining data integrity and compliance.'
          )
        ),
        features: [
          "Manual Data Entry",
          "Delayed Payments", 
          "Reconciliation Errors",
          "Limited Visibility",
          "Money Loss",
          "Compliance Challenges"
        ],
        featuresTitle: "Financial Challenges"
      },
      
      benefits: [
        {
          title: "Improved Cash Flow",
          description: "Accelerate payment cycles and reduce outstanding receivables through automated invoicing and payment tracking.",
          icon: "dollar"
        },
        {
          title: "Reduced Administrative Costs",
          description: "Eliminate manual financial data entry and reconciliation, saving significant staff time and reducing errors.",
          icon: "clock"
        },
        {
          title: "Financial Transparency",
          description: "Gain real-time visibility into your financial status across all connected systems and platforms.",
          icon: "chart"
        },
        {
          title: "Enhanced Compliance",
          description: "Ensure consistent financial record-keeping and reporting that meets regulatory requirements.",
          icon: "shield"
        }
      ],
      
      features: [
        {
          title: "Invoice Automation",
          description: "Automate the entire invoicing process from creation to delivery, tracking, and reconciliation.",
          benefits: [
            "Automatic invoice generation based on CRM triggers",
            "Immediate delivery to clients via email or client portal",
            "Real-time payment tracking and status updates",
            "Automated reminders for unpaid invoices"
          ],
          icon: "document",
          caseId: "stripe-invoicing"
        },
        {
          title: "Accounting Integration",
          description: "Connect your CRM with accounting systems for seamless data flow and financial management.",
          benefits: [
            "Bidirectional synchronization of financial data",
            "Automatic transaction matching and reconciliation",
            "Consolidated financial reporting across systems",
            "Elimination of double data entry"
          ],
          icon: "connect",
          caseId: "quickbooks-integration"
        },
        {
          title: "Factoring Automation",
          description: "Streamline the process of submitting receivables to factoring companies and tracking advances.",
          benefits: [
            "Automatic aggregation of eligible invoices",
            "Detailed report generation for factoring submission",
            "Integration with factoring platforms for data transfer",
            "Status tracking and notification system"
          ],
          icon: "workflow",
          caseId: "factoring-automation"
        },
        {
          title: "Complex Financial Calculations",
          description: "Automate complex financial computations like commissions, payroll, and pricing formulas.",
          benefits: [
            "Custom calculation engines for specific business needs",
            "Multi-variable formula support with conditional logic",
            "Automatic updates when variables change",
            "Integration with payment and accounting systems"
          ],
          icon: "analysis",
          caseId: "financial-calculations"
        }
      ],
      
      processes: [
        {
          step: 1,
          title: "Financial Process Assessment",
          description: "We analyze your current financial processes, systems, and pain points to identify opportunities for automation and integration."
        },
        {
          step: 2,
          title: "Solution Design",
          description: "We design a comprehensive financial integration solution tailored to your specific business needs and existing systems."
        },
        {
          step: 3,
          title: "Data Mapping & Workflow Setup",
          description: "We create detailed data mapping between systems and establish automated workflows that align with your financial processes."
        },
        {
          step: 4,
          title: "Integration & Testing",
          description: "We implement the integrations and thoroughly test all functionality to ensure accurate data flow and processing."
        },
        {
          step: 5,
          title: "Staff Training & Deployment",
          description: "We train your team on the new integrated systems and deploy the solution with minimal disruption to your operations."
        },
        {
          step: 6,
          title: "Ongoing Support & Optimization",
          description: "We provide continuous support and regularly optimize the solution to adapt to your evolving business needs."
        }
      ],
      
      relatedCaseIds: ['stripe-invoicing', 'quickbooks-integration', 'factoring-automation'],
      
      faqs: [
        {
          question: "How will financial automation impact our current accounting practices?",
          answer: "Financial automation enhances your existing accounting practices rather than replacing them. It eliminates manual data entry, reduces errors, and provides real-time financial visibility, allowing your accounting team to focus on analysis and strategic tasks rather than administrative work."
        },
        {
          question: "Is our financial data secure during integration?",
          answer: "Yes, security is our top priority. We implement bank-level encryption, secure API connections, and strict access controls. All integrations comply with financial industry security standards, and we can work with your IT security team to ensure all requirements are met."
        },
        {
          question: "How long does it take to implement financial system integrations?",
          answer: "Implementation time varies based on the complexity of your financial systems and processes. Simple integrations can be completed in 3-4 weeks, while more complex solutions might take 8-12 weeks. We provide a detailed timeline during our initial assessment."
        },
        {
          question: "Can you integrate with our legacy financial systems?",
          answer: "Yes, we have experience integrating with a wide range of financial systems, including legacy software. As long as your system provides some form of data access (API, database connection, file imports/exports), we can develop a solution to integrate it with your modern business tools."
        }
      ]
    }
  }
];

// Утилиты для получения данных
export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicePreview = (id: string): ServicePreview | undefined => {
  const service = getServiceById(id);
  if (!service) return undefined;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { details, ...preview } = service;
  return preview;
};

export const getServicePreviews = (): ServicePreview[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return services.map(({ details, ...preview }) => preview);
};

export const getServiceSalesData = (id: string): ServiceSalesData | undefined => {
  return getServiceById(id)?.salesData;
};

export const getServiceDetails = (id: string): ServiceDetailData | undefined => {
  return getServiceById(id)?.details;
};