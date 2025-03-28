// src/app/(pages)/services/finance/page.tsx

import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Financial Systems Integration',
  description: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting. Connect Stripe, QuickBooks, Xero and other systems.',
  keywords: ['financial automation', 'accounting integration', 'invoice automation', 'payment tracking', 'financial reporting', 'QuickBooks integration', 'Stripe integration'],
  path: '/services/finance'
});

export default function FinancePage() {
  // Преимущества
  const benefits = [
    {
      title: "Improved Cash Flow",
      description: "Accelerate payment cycles and reduce outstanding receivables through automated invoicing and payment tracking.",
      icon: "cash"
    },
    {
      title: "Reduced Administrative Costs",
      description: "Eliminate manual financial data entry and reconciliation, saving significant staff time and reducing errors.",
      icon: "dollar"
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

  // Решения
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
      icon: "invoice",
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
      icon: "accounting",
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
      icon: "payment"
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
      icon: "factoring",
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
      icon: "calculation",
      caseId: "financial-calculations"
    }
  ];

  // Кейсы
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

  // Секция интеграции
  const integrationSection = (
    <section className="py-20 bg-site-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Financial Systems We Integrate</h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            We connect your CRM and operational systems with a wide range of financial platforms and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-gray rounded-xl p-6">
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

          <div className="bg-dark-gray rounded-xl p-6">
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

          <div className="bg-dark-gray rounded-xl p-6">
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

  // Процесс внедрения
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

  // FAQ
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

  // Обзор
  const overviewContent = (
    <>
      <p className="text-light-gray mb-4">
        Financial systems integration is the process of connecting your financial tools—such as accounting software, payment processors, and banking platforms—with your CRM and other business systems to create a seamless flow of financial data across your organization.
      </p>
      <p className="text-light-gray mb-4">
        This integration eliminates manual data entry, reduces errors, accelerates financial processes, and provides real-time financial visibility throughout your business.
      </p>
      <p className="text-light-gray">
        Our approach focuses on creating secure, reliable connections between your existing financial systems and operational tools, automating financial workflows while maintaining data integrity and compliance.
      </p>
    </>
  );

  // Обзор боковой контент
  const overviewSideContent = (
    <>
      <h3 className="text-2xl font-bold mb-4">Common Financial Challenges</h3>
      <ul className="space-y-4">
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Manual Data Entry</h4>
            <p className="text-light-gray">Staff spending hours entering the same data into multiple systems</p>
          </div>
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Delayed Payments</h4>
            <p className="text-light-gray">Slow invoice delivery and lack of automatic payment reminders</p>
          </div>
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Reconciliation Errors</h4>
            <p className="text-light-gray">Difficult and time-consuming payment reconciliation process</p>
          </div>
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Limited Visibility</h4>
            <p className="text-light-gray">No real-time view of financial status across the organization</p>
          </div>
        </li>
      </ul>
    </>
  );

  // Функция для рендеринга иконок
  function renderIcon(icon: string) {
    switch (icon) {
      case 'invoice':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'accounting':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'payment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'dashboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'factoring':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'calculation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'cash':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'dollar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  }

  return (
    <ServiceTemplate
      serviceId="finance"
      serviceTitle="Financial Systems Integration"
      serviceDescription="Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting to improve cash flow and decision-making."
      breadcrumbTitle="Financial Systems Integration"
      overview={{
        title: "What Is Financial Systems Integration?",
        description: overviewContent,
        sideContent: overviewSideContent
      }}
      benefits={benefits}
      features={financeSolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={integrationSection}
      primaryColor="primary"
      accentColor="primary"
      iconRenderer={renderIcon}
    />
  );
}