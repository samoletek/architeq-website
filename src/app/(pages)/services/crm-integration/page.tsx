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

  const integrationHubSection = (
    <section className="pt-48 pb-48 bg-dark-gray relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Integration Hub
          </h2>
          <p className="text-light-gray text-xl md:text-2xl max-w-3xl mx-auto">
            Connect your CRM with hundreds of popular business tools. We specialize in creating seamless data flows between systems, eliminating manual work and ensuring real-time synchronization.
          </p>
        </div>

        {/* Main Integration Diagram */}
        <div className="mb-20">
          {/* Central CRM Hub */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="w-32 h-32 bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-full border-2 border-primary/40 flex items-center justify-center relative z-10">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <div className="text-white font-bold text-sm">Your CRM</div>
                </div>
              </div>
              
              {/* Animated Ring */}
              <div className="absolute inset-0 w-32 h-32 rounded-full border border-primary/30 animate-pulse"></div>
              <div className="absolute -inset-4 w-40 h-40 rounded-full border border-primary/20 animate-ping"></div>
            </div>
          </div>

          {/* Integration Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Communication Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Communication</h4>
              <p className="text-base text-light-gray">Slack, Teams, Email, SMS</p>
            </div>

            {/* Financial Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Financial</h4>
              <p className="text-base text-light-gray">QuickBooks, Stripe, Xero</p>
            </div>

            {/* Document Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Documents</h4>
              <p className="text-base text-light-gray">DocuSign, Google Drive, OneDrive</p>
            </div>

            {/* Marketing Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Marketing</h4>
              <p className="text-base text-light-gray">Mailchimp, Google Ads, Facebook</p>
            </div>
          </div>
        </div>

        {/* Popular Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
          {[
            { name: 'Monday.com', category: 'Project Management' },
            { name: 'Slack', category: 'Communication' },
            { name: 'QuickBooks', category: 'Accounting' },
            { name: 'DocuSign', category: 'E-Signatures' },
            { name: 'Google Workspace', category: 'Productivity' },
            { name: 'Stripe', category: 'Payments' },
            { name: 'Zapier', category: 'Automation' },
            { name: 'HubSpot', category: 'Marketing' },
            { name: 'Salesforce', category: 'CRM' },
            { name: 'Trello', category: 'Project Management' },
            { name: 'Zoom', category: 'Video Conferencing' },
            { name: 'Pipedrive', category: 'Sales' }
          ].map((tool, index) => (
            <div 
              key={index}
              className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-lg p-4 border border-primary/20 text-center hover:border-primary/40 transition-all duration-300 group cursor-default"
            >
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/30 transition-colors duration-300">
                <div className="w-4 h-4 rounded bg-primary"></div>
              </div>
              <div className="text-white font-medium text-sm mb-1">{tool.name}</div>
              <div className="text-light-gray text-xs">{tool.category}</div>
            </div>
          ))}
        </div>

        {/* ROI Stats */}
        <div className="bg-dark-gray rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                }}>
              Integration Impact
            </h3>
            <p className="text-light-gray text-xl md:text-2xl">
              See the measurable benefits our CRM integrations deliver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">80%</div>
              <div className="text-white font-semibold mb-2 text-lg">Time Saved</div>
              <div className="text-light-gray text-base">on manual data entry and system switching</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">95%</div>
              <div className="text-white font-semibold mb-2 text-lg">Error Reduction</div>
              <div className="text-light-gray text-base">in data transfer between systems</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">3x</div>
              <div className="text-white font-semibold mb-2 text-lg">Faster Workflows</div>
              <div className="text-light-gray text-base">with automated cross-platform processes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">100%</div>
              <div className="text-white font-semibold mb-2 text-lg">Data Visibility</div>
              <div className="text-light-gray text-base">across all connected business systems</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

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
          "Monday CRM",
          "HubSpot",
          "Salesforce",
          "Zoho CRM",
          "Pipedrive",
          "ClickUp"
        ],
        featuresTitle: "Supported CRM"
      }}
      benefits={benefits}
      features={integrationOptions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={integrationHubSection}
    />
  );
}