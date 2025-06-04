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
      icon: "connect"
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
      icon: "analysis"
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
            <p className="mb-4">
              CRM integration is the process of connecting your customer relationship management system with other business applications to create a seamless flow of information across your organization.
            </p>
            <p className="mb-4">
              By integrating your CRM with other tools, you eliminate manual data entry, reduce errors, and ensure that all departments have access to the most up-to-date customer information.
            </p>
            <p>
              Our approach to CRM integration focuses on creating custom connections that align with your specific business processes and objectives, whether you are using Monday.com, HubSpot, Salesforce, or any other CRM platform.
            </p>
          </>
        ),
        features: [
          "Monday.com",
          "HubSpot",
          "Salesforce",
          "Zoho CRM",
          "Pipedrive",
          "Custom CRM Systems"
        ]
      }}
      benefits={benefits}
      features={integrationOptions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
    />
  );
}