import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Financial Systems Integration',
  description: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting. Connect Stripe, QuickBooks, Xero and other systems.',
  keywords: ['financial automation', 'accounting integration', 'invoice automation', 'payment tracking', 'financial reporting', 'QuickBooks integration', 'Stripe integration'],
  path: '/services/finance'
});

export default function FinancePage() {
  const benefits = [
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
  ];

  const financeSolutions = [
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
      title: "Payment Processing",
      description: "Integrate payment gateways with your business systems for smooth and efficient payment handling.",
      benefits: [
        "Multiple payment method support (credit cards, ACH, etc.)",
        "Automatic payment status updates in CRM",
        "Secure payment processing with compliance focus",
        "Reduced payment delays and improved cash flow"
      ],
      icon: "dollar"
    },
    {
      title: "Financial Reports & Dashboards",
      description: "Create custom financial dashboards and automated reports for better business visibility.",
      benefits: [
        "Real-time financial performance visualization",
        "Customizable KPIs and metrics tracking",
        "Automatic scheduled report distribution",
        "Data-driven financial decision making"
      ],
      icon: "dashboard",
      caseId: "dashboards-creation"
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
  ];

  const processes = [
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
  ];

  const caseStudies = [
    {
      id: "stripe-invoicing",
      title: "Stripe Invoicing and Financial Control Automation",
      company: "EclipseGroup",
      description: "Integration of CRM with financial systems for automatic invoice creation and payment tracking.",
      results: [
        "85% reduction in time spent on invoicing",
        "30% acceleration in receiving payments",
        "Elimination of errors in data transfer"
      ]
    },
    {
      id: "quickbooks-integration",
      title: "QuickBooks Integration for Automatic Accounting",
      company: "485 Logistics",
      description: "Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.",
      results: [
        "75% reduction in time spent on financial reporting",
        "Elimination of double data entry",
        "Increased accuracy of financial reports"
      ]
    },
    {
      id: "factoring-automation",
      title: "Factoring Data Submission Automation",
      company: "LaneWise",
      description: "Automatic calculation and submission of accounts receivable data to factoring companies.",
      results: [
        "Reduction of process from several hours to several minutes",
        "Elimination of human errors in calculations",
        "Faster receipt of financing"
      ]
    }
  ];

  const faqs = [
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
  ];

  const integrationSection = (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Financial Systems We Integrate
          </h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            We connect your CRM and operational systems with a wide range of financial platforms and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Accounting Systems</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>QuickBooks Online</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>QuickBooks Desktop</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Xero</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>FreshBooks</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sage</span>
              </li>
            </ul>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Payment Processors</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Stripe</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>PayPal</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Square</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Authorize.net</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Braintree</span>
              </li>
            </ul>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Financial Services</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Factoring Platforms</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Bill.com</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expensify</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Banking APIs</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Payroll Systems</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ServiceTemplate
      serviceId="finance"
      serviceTitle="Financial Systems Integration"
      serviceDescription="Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting to improve cash flow and decision-making."
      breadcrumbTitle="Financial Systems Integration"
      overview={{
        title: "What Is Financial Systems Integration?",
        description: (
          <>
            <p className="mb-4">
              Financial systems integration is the process of connecting your financial tools—such as accounting software, payment processors, and banking platforms—with your CRM and other business systems to create a seamless flow of financial data across your organization.
            </p>
            <p className="mb-4">
              This integration eliminates manual data entry, reduces errors, accelerates financial processes, and provides real-time financial visibility throughout your business.
            </p>
            <p>
              Our approach focuses on creating secure, reliable connections between your existing financial systems and operational tools, automating financial workflows while maintaining data integrity and compliance.
            </p>
          </>
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
      }}
      benefits={benefits}
      features={financeSolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={integrationSection}
    />
  );
}