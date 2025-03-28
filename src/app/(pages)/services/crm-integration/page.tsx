// src/app/(pages)/services/crm-integration/page.tsx

import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'CRM System Integration',
  description: 'Connect your CRM with other business tools to create a unified information environment. Improve data flow, enhance customer service, and eliminate manual data entry.',
  keywords: ['CRM integration', 'CRM connection', 'Monday integration', 'Salesforce integration', 'HubSpot integration', 'unified data', 'data synchronization'],
  path: '/services/crm-integration'
});

export default function CRMIntegrationPage() {
  // Преимущества
  const benefits = [
    {
      title: "Unified Data Environment",
      description: "Create a single source of truth by connecting your CRM with other business tools and databases.",
      icon: "database"
    },
    {
      title: "Automated Workflows",
      description: "Eliminate manual data transfer and automate cross-platform processes for better efficiency.",
      icon: "automation"
    },
    {
      title: "360° Customer View",
      description: "Get a complete picture of customer interactions across all touchpoints and platforms.",
      icon: "customer"
    },
    {
      title: "Real-time Insights",
      description: "Access up-to-date information and analytics for better decision-making and customer service.",
      icon: "insights"
    }
  ];

  // Опции интеграции
  const integrationOptions = [
    {
      title: "Email & Communication",
      description: "Connect your CRM with email services, Slack, Teams, and other communication tools for seamless information flow.",
      benefits: [
        "Automatic email tracking in CRM",
        "Slack notifications for CRM events",
        "Two-way synchronization with email clients",
        "Team chat integration with client records"
      ],
      icon: "email"
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
      icon: "payment",
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
      icon: "marketing"
    }
  ];

  // Процесс интеграции
  const processes = [
    {
      step: 1,
      title: "Requirement Analysis",
      description: "We start by understanding your current CRM setup, the systems you want to integrate, and your specific business objectives. This helps us design a solution that addresses your unique challenges."
    },
    {
      step: 2,
      title: "Data Mapping & Workflow Design",
      description: "We create a comprehensive data mapping plan to determine how information will flow between systems and design automated workflows that align with your business processes."
    },
    {
      step: 3,
      title: "Integration Development",
      description: "Our team implements the integration using appropriate tools such as Make (Integromat), Zapier, n8n, or custom API connections, ensuring secure and reliable data synchronization."
    },
    {
      step: 4,
      title: "Testing & Validation",
      description: "We thoroughly test the integration to ensure data flows correctly, error handling works as expected, and all business requirements are met before deployment."
    },
    {
      step: 5,
      title: "Deployment & Training",
      description: "We implement the integration in your production environment and provide comprehensive training to ensure your team can effectively use and manage the integrated systems."
    },
    {
      step: 6,
      title: "Ongoing Support & Optimization",
      description: "We provide ongoing maintenance and support to ensure your integration continues to function optimally, and we make adjustments as your business needs evolve."
    }
  ];

  // Кейсы
  const caseStudies = [
    {
      id: "monday-integration",
      title: "Comprehensive Monday Integration",
      company: "New Age Cabinetry & Coatings",
      description: "Connected Monday.com with multiple external systems to create a unified information ecosystem for a cabinet manufacturing company.",
      results: [
        "60% reduction in time spent switching between systems",
        "Increased transparency of all processes",
        "Automation of up to 70% of routine operations"
      ]
    },
    {
      id: "notification-system",
      title: "Deep Notification Tree by Triggers",
      company: "MC Keeper",
      description: "Created a complex automatic notification system with conditional triggers based on CRM actions to improve team communication.",
      results: [
        "75% reduction in reaction time to project changes",
        "40% increase in customer service satisfaction",
        "Reduction of missed updates and deadlines to zero"
      ]
    },
    {
      id: "dashboards-creation",
      title: "Creating Informative Dashboards",
      company: "DreamLine",
      description: "Developed customized interactive dashboards for real-time business monitoring, pulling data from multiple integrated systems.",
      results: [
        "80% reduction in time spent on reporting",
        "Decision-making based on up-to-date data",
        "35% increase in management efficiency"
      ]
    }
  ];

  // FAQ
  const faqs = [
    {
      question: "Which CRM systems can you integrate?",
      answer: "We have experience integrating all major CRM systems, including Monday.com, Salesforce, HubSpot, Zoho, Pipedrive, Microsoft Dynamics, and many others. Our approach is platform-agnostic, allowing us to work with any CRM that provides API access."
    },
    {
      question: "Will integration affect my current CRM data?",
      answer: "No, we implement integrations with safeguards to protect your existing data. We typically start with a sandbox or staging environment to validate the integration before deploying to production, ensuring no disruption to your operations."
    },
    {
      question: "How long does a typical CRM integration take?",
      answer: "The timeline depends on the complexity of the integration and the number of systems involved. Simple integrations can be completed in 2-3 weeks, while more complex projects might take 6-8 weeks. We'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "Can you integrate custom or legacy systems?",
      answer: "Yes, we specialize in complex integrations, including custom-built and legacy systems. As long as the system provides some form of data access (API, database, file exports), we can develop a solution to integrate it with your CRM."
    }
  ];

  // Обзорный контент
  const overviewSideContent = (
    <>
      <h3 className="text-2xl font-bold mb-4">CRM Systems We Work With</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Monday.com</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>HubSpot</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Salesforce</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Zoho CRM</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Pipedrive</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Custom CRM Systems</span>
        </div>
      </div>
    </>
  );

  // Функция для рендеринга иконок
  function renderIcon(icon: string) {
    switch (icon) {
      case 'database':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case 'automation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'customer':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'insights':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'email':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'payment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'marketing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  }

  return (
    <ServiceTemplate
      serviceId="crm-integration"
      serviceTitle="CRM Integration Services"
      serviceDescription="Connect your CRM with other business tools to create a unified information environment, improve data flow, and enhance customer service."
      breadcrumbTitle="CRM Integration Services"
      overview={{
        title: "What Is CRM Integration?",
        description: (
          <>
            <p className="text-light-gray mb-4">
              CRM integration is the process of connecting your customer relationship management system with other business applications to create a seamless flow of information across your organization.
            </p>
            <p className="text-light-gray mb-4">
              By integrating your CRM with other tools, you eliminate manual data entry, reduce errors, and ensure that all departments have access to the most up-to-date customer information.
            </p>
            <p className="text-light-gray">
              Our approach to CRM integration focuses on creating custom connections that align with your specific business processes and objectives, whether you are using Monday.com, HubSpot, Salesforce, or any other CRM platform.
            </p>
          </>
        ),
        sideContent: overviewSideContent
      }}
      benefits={benefits}
      features={integrationOptions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      primaryColor="primary"
      accentColor="primary"
      iconRenderer={renderIcon}
    />
  );
}