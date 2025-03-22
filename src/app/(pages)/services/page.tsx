import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Financial Systems Integration',
  description: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting. Connect Stripe, QuickBooks, Xero and other systems.',
  keywords: ['financial automation', 'accounting integration', 'invoice automation', 'payment tracking', 'financial reporting', 'QuickBooks integration', 'Stripe integration'],
  openGraph: {
    title: 'Financial Systems Integration | §78',
    description: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting. Connect Stripe, QuickBooks, Xero and other systems.',
    url: `${siteMetadata.siteUrl}/services/finance`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services/finance`,
  },
};

export default function FinancePage() {
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
      icon: "payment",
      caseId: ""
    },
    {
      title: "Financial Reports & Dashboards",
      description: "Create custom financial dashboards and automated reports for better business visibility.",
      benefits: [
        "Real-time financial performance visualization",
        "Customizable KPIs and metrics tracking",
        "Automated report generation and distribution",
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
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  }

  return (
    <SiteLayout>
      {/* Hero section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center text-light-gray mb-4">
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Financial System Integration</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial System Integration</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/contacts">
                Book a Free Consultation
              </Button>
              <Button variant="secondary" size="lg" href="/cases">
                View Related Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What Is Financial Systems Integration?</h2>
              <p className="text-light-gray mb-4">
                Financial systems integration is the process of connecting your financial tools and software with your CRM and other business systems to create a unified ecosystem that automates financial operations and provides real-time financial visibility.
              </p>
              <p className="text-light-gray mb-4">
                By integrating systems like QuickBooks, Stripe, PayPal, and Xero with your CRM and operational tools, we eliminate manual data entry, reduce errors, and provide up-to-date financial information throughout your organization.
              </p>
              <p className="text-light-gray">
                Our approach focuses on creating seamless, bidirectional data flows that ensure your financial systems always have the most current information, while maintaining data integrity and security.
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-xl">
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
                    <h4 className="font-semibold">Limited Financial Visibility</h4>
                    <p className="text-light-gray">No real-time view of financial status across the organization</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Financial Integration Solutions</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We offer a comprehensive range of financial integration solutions to streamline your operations and improve financial management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financeSolutions.map((solution, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl p-6 border border-medium-gray hover:border-primary/30 transition-all duration-300 hover:shadow-neon-glow"
              >
                <div className="flex items-start">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center mr-6 bg-medium-gray text-primary">
                    {renderIcon(solution.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-light-gray mb-4">{solution.description}</p>
                    
                    <h4 className="text-sm font-medium mb-2 text-primary">Key Benefits:</h4>
                    <ul className="text-light-gray space-y-1 mb-4">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {solution.caseId && (
                      <Link href={`/cases/${solution.caseId}`} className="text-primary font-medium text-sm flex items-center mt-2">
                        View Related Case Study
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Options */}
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
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Wave</span>
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
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Plaid</span>
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
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tax Preparation Software</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              See how our financial integration solutions have helped businesses streamline operations and improve financial management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-dark-gray rounded-xl overflow-hidden border border-medium-gray hover:border-primary/30 transition-all duration-300">
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)' }} className="relative">
                <div className="absolute top-3 left-3">
                  <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Invoice Automation</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Stripe Invoicing and Financial Control</h3>
                <p className="text-light-gray text-sm mb-4">EclipseGroup</p>
                <p className="text-light-gray mb-4">Integration of CRM with Stripe for automatic invoice creation and payment tracking.</p>
                <Link href="/cases/stripe-invoicing" className="text-primary font-medium text-sm flex items-center">
                  View Case Study
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div className="bg-dark-gray rounded-xl overflow-hidden border border-medium-gray hover:border-primary/30 transition-all duration-300">
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)' }} className="relative">
                <div className="absolute top-3 left-3">
                  <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Accounting Integration</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">QuickBooks Integration for Automatic Accounting</h3>
                <p className="text-light-gray text-sm mb-4">485 Logistics</p>
                <p className="text-light-gray mb-4">Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.</p>
                <Link href="/cases/quickbooks-integration" className="text-primary font-medium text-sm flex items-center">
                  View Case Study
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Case Study 3 */}
            <div className="bg-dark-gray rounded-xl overflow-hidden border border-medium-gray hover:border-primary/30 transition-all duration-300">
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)' }} className="relative">
                <div className="absolute top-3 left-3">
                  <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Factoring Automation</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Factoring Data Submission Automation</h3>
                <p className="text-light-gray text-sm mb-4">LaneWise</p>
                <p className="text-light-gray mb-4">Automatic calculation and submission of accounts receivable data to factoring companies.</p>
                <Link href="/cases/factoring-automation" className="text-primary font-medium text-sm flex items-center">
                  View Case Study
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/cases">
              <Button variant="secondary">
                View All Financial Integration Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Financial Operations?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation to discuss how our financial integration solutions can help automate your financial processes and improve cash flow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" href="/contacts">
              Book a Free Consultation
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              View Our Case Studies
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}