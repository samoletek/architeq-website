import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CRMIntegrationPage() {
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

  const integrationOptions = [
    {
      title: "Email & Communication",
      description: "Connect your CRM with email services, Slack, Teams, and other communication tools for seamless information flow.",
      examples: ["Gmail", "Outlook", "Slack", "Microsoft Teams"]
    },
    {
      title: "Document Management",
      description: "Integrate with document storage and e-signature solutions to automate contract and document workflows.",
      examples: ["Google Drive", "Dropbox", "DocuSign", "PandaDoc"]
    },
    {
      title: "Accounting & Payments",
      description: "Link your CRM with financial systems for automated invoicing, payment tracking, and financial reporting.",
      examples: ["QuickBooks", "Xero", "Stripe", "PayPal"]
    },
    {
      title: "Marketing Platforms",
      description: "Connect marketing tools to synchronize campaigns, leads, and analytics with your CRM.",
      examples: ["Mailchimp", "HubSpot", "Google Analytics", "Facebook Ads"]
    },
    {
      title: "Project Management",
      description: "Integrate task management tools to keep projects aligned with customer information and requirements.",
      examples: ["Asana", "Trello", "Jira", "Monday.com"]
    },
    {
      title: "Custom Applications",
      description: "Connect proprietary or custom-built applications using APIs and custom integration solutions.",
      examples: ["REST APIs", "GraphQL", "Custom Webhooks", "Database Connections"]
    }
  ];

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
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
              <span className="text-white">CRM Integration Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CRM Integration Services</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              Connect your CRM with other business tools to create a unified information environment, improve data flow, and enhance customer service.
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
              <h2 className="text-3xl font-bold mb-6">What Is CRM Integration?</h2>
              <p className="text-light-gray mb-4">
                CRM integration is the process of connecting your customer relationship management system with other business applications to create a seamless flow of information across your organization.
              </p>
              <p className="text-light-gray mb-4">
                By integrating your CRM with other tools, you eliminate manual data entry, reduce errors, and ensure that all departments have access to the most up-to-date customer information.
              </p>
              <p className="text-light-gray">
                Our approach to CRM integration focuses on creating custom connections that align with your specific business processes and objectives, whether you're using Monday.com, HubSpot, Salesforce, or any other CRM platform.
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-xl">
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
                  <span>Airtable</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Microsoft Dynamics</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom CRM Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of CRM Integration</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Integrating your CRM with other business systems delivers powerful benefits that improve efficiency, data accuracy, and customer experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl p-6 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-neon-glow"
              >
                <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-medium-gray text-primary">
                  {renderIcon(benefit.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-light-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Options section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integration Options</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We can connect your CRM with a wide range of business tools and applications to create a seamless information ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-dark-gray rounded-xl p-6 border border-medium-gray hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-light-gray mb-4">{option.description}</p>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-primary">Popular Integrations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {option.examples.map((example, exIndex) => (
                      <span 
                        key={exIndex}
                        className="bg-medium-gray rounded-full px-3 py-1 text-xs text-light-gray"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Integration Process</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We follow a proven methodology to deliver seamless CRM integrations that align with your business goals and requirements.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative space-y-12">
              {/* Vertical line */}
              <div className="absolute left-5 top-5 bottom-0 w-0.5 bg-primary" />
              
              {/* Step 1 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">1</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Requirement Analysis</h3>
                  <p className="text-light-gray">
                    We start by understanding your current CRM setup, the systems you want to integrate, and your specific business objectives. This helps us design a solution that addresses your unique challenges.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">2</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Data Mapping & Workflow Design</h3>
                  <p className="text-light-gray">
                    We create a comprehensive data mapping plan to determine how information will flow between systems and design automated workflows that align with your business processes.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">3</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Integration Development</h3>
                  <p className="text-light-gray">
                    Our team implements the integration using appropriate tools such as Make (Integromat), Zapier, n8n, or custom API connections, ensuring secure and reliable data synchronization.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">4</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Testing & Validation</h3>
                  <p className="text-light-gray">
                    We thoroughly test the integration to ensure data flows correctly, error handling works as expected, and all business requirements are met before deployment.
                  </p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">5</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Deployment & Training</h3>
                  <p className="text-light-gray">
                    We implement the integration in your production environment and provide comprehensive training to ensure your team can effectively use and manage the integrated systems.
                  </p>
                </div>
              </div>
              
              {/* Step 6 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">6</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Ongoing Support & Optimization</h3>
                  <p className="text-light-gray">
                    We provide ongoing maintenance and support to ensure your integration continues to function optimally, and we make adjustments as your business needs evolve.
                  </p>
                </div>
              </div>
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
              See how our CRM integration solutions have helped businesses streamline operations and improve customer experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-dark-gray rounded-xl overflow-hidden border border-medium-gray hover:border-primary/30 transition-all duration-300">
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)' }} className="relative">
                <div className="absolute top-3 left-3">
                  <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Monday Integration</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Comprehensive Monday Integration</h3>
                <p className="text-light-gray text-sm mb-4">New Age Cabinetry & Coatings</p>
                <p className="text-light-gray mb-4">Connected Monday.com with multiple external systems to create a unified information ecosystem for a cabinet manufacturing company.</p>
                <Link href="/cases/monday-integration" className="text-primary font-medium text-sm flex items-center">
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
                  <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Notification System</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Deep Notification Tree by Triggers</h3>
                <p className="text-light-gray text-sm mb-4">MC Keeper</p>
                <p className="text-light-gray mb-4">Created a complex automatic notification system with conditional triggers based on CRM actions to improve team communication.</p>
                <Link href="/cases/notification-system" className="text-primary font-medium text-sm flex items-center">
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
                  <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Dashboards</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Creating Informative Dashboards</h3>
                <p className="text-light-gray text-sm mb-4">DreamLine</p>
                <p className="text-light-gray mb-4">Developed customized interactive dashboards for real-time business monitoring, pulling data from multiple integrated systems.</p>
                <Link href="/cases/dashboards-creation" className="text-primary font-medium text-sm flex items-center">
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
                View All CRM Integration Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect Your Business Systems?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation to discuss how our CRM integration services can help streamline your operations and create a unified data environment.
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