import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Services | Business Process Automation',
  description: 'Explore our full range of business automation services including CRM integration, document automation, AI solutions, and more.',
  keywords: ['business automation', 'CRM integration', 'document automation', 'AI solutions', 'business process', 'financial systems integration'],
  openGraph: {
    title: 'Business Automation Services | Architeq',
    description: 'Explore our full range of business automation services including CRM integration, document automation, AI solutions, and more.',
    url: `${siteMetadata.siteUrl}/services`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services`,
  },
};

// Данные о услугах
const services = [
  {
    id: 'business-process',
    title: 'Workflow Design & Automation',
    description: 'We reengineer core business processes by removing manual steps, syncing tools, and building flexible, intelligent workflows.',
    icon: 'process',
    features: [
      'Workflow mapping and optimizing',
      'Clear roadmap for implementation',
      'End-to-end workflow automation',
      'System integration & error-proof data flow',
      'Custom dashboards for live insights'
    ],
    caseStudies: ['monday-integration', 'notification-system']
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration',
    description: 'No more scattered data — we build your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.',
    icon: 'crm',
    features: [
      'Centralized CRM built from scratch — fully tailored to your workflows',
      'Wide integration capabilities',
      'Cross-platform consistency',
      'Document management automation',
      'Customizable insight dashboards'
    ],
    caseStudies: ['monday-integration', 'dashboards-creation']
  },
  {
    id: 'boxed-solutions',
    title: 'Industry-Specific Boxed Solutions',
    description: 'Ready-to-run automation kits tailored to your industry — deployed fast, scaled smart, and of course fully customized for your edge.',
    icon: 'industry',
    features: [
      'Pre-configured workflows for key sectors',
      'Custom fields & data structure',
      'Industry-specific integrations',
      'Scalable & field-proven automations',
      'Fast deployment'
    ],
    caseStudies: ['car-hauling-solution', 'music-label-solution']
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    description: 'Use AI to surface insight and automate high-effort tasks — from client comms to operations logic. Use AI to automate what truly matters — from client comms to operations logic, only where it drives real value.',
    icon: 'ai',
    features: [
      'AI-driven voice assistants',
      'CRM-integrated assistant',
      'Real-time conversation transcription',
      'Scalable and customizable solutions',
      'Quick and efficient deployment'
    ],
    caseStudies: ['ai-voice-bot', 'ai-crm-assistant']
  },
  {
    id: 'documentation',
    title: 'Automated Document Flow',
    description: 'We automate your entire document flow — creation, approval, compliance — all in sync with your CRM, tools and teams, using our pre-built document generation tools.',
    icon: 'document',
    features: [
      'Auto-generation from CRM templates',
      'E-signature & approval flows',
      'Smart forms & structured capture',
      'Document version control',
      'Regulatory compliance built-in'
    ],
    caseStudies: ['document-generation', 'electronic-signatures']
  },
  {
    id: 'finance',
    title: 'Finance Operations Automation',
    description: 'Connect and automate your full financial stack — from invoicing to reconciliation — for faster, cleaner, and error-free money flow.',
    icon: 'finance',
    features: [
      'Smart invoice generation',
      'Real-time payment tracking & reconciliation',
      'Seamless accounting system integration',
      'Financial dashboards & custom reports',
      'Multi-currency, multi-market, and multi-payment method support'
    ],
    caseStudies: ['stripe-invoicing', 'quickbooks-integration']
  }
];

export default function ServicesPage() {
  return (
    <SiteLayout>
      {/* Hero section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How We Architect</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
                We design and build automation systems that connect, optimize, and scale your operations — from tools to teams to outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/contacts">
                See How It Works 
              </Button>
              <Button variant="secondary" size="lg" href="/cases">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions We Offer</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              From CRM integration to AI-powered automation, we provide solutions to address all aspects of your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl p-6 h-full border border-medium-gray hover:border-primary/30 transition-all duration-300 hover:shadow-neon-glow group"
              >
                {/* Icon */}
                <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-medium-gray text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  {renderServiceIcon(service.icon)}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-light-gray mb-4">{service.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 text-primary">Core Capabilities:</h4>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-light-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="mt-auto pt-4">
                  <Link href={`/services/${service.id}`}>
                    <Button variant="secondary" className="w-full">
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
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
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Automation Flow: From Discovery to Deployment</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
            A sharp, proven framework — designed to deliver fast and integrate deep into your ops.
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
                  <h3 className="text-xl font-bold mb-2">Align on Scope. Kick Things Off</h3>
                  <p className="text-light-gray">
                  We start by signing an NDA and holding a kickoff meeting to clarify your objectives and expectations. This ensures that we are fully aligned on your needs, priorities, and timelines from the very beginning.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">2</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Understand Your Reality</h3>
                  <p className="text-light-gray">
                  We dive deep into understanding your business operations through stakeholder interviews and process discovery. We observe your current workflows, uncover inefficiencies, and identify where automation can add the most value.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">3</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Map the Process. Spot the Gaps</h3>
                  <p className="text-light-gray">
                  We document your existing business processes in detail, mapping every step, role, and decision point. This step helps us highlight pain points, overlaps, and areas where automation can be implemented effectively.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">4</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Design the Future Flow</h3>
                  <p className="text-light-gray">
                  Based on our analysis, we design a custom solution that will optimize your processes. We define what your future workflows should look like and ensure that the solution is tailored to meet your specific needs, with an emphasis on improving efficiency and reducing complexity.
                  </p>
                </div>
              </div>
              {/* Step 5 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">5</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Plan the Rollout. Set the Timeline</h3>
                  <p className="text-light-gray">
                  We create a detailed implementation plan, including the specific steps, timelines, and resources required to get the solution up and running. Our team sets clear milestones to ensure timely delivery and success at each stage of the project.
                  </p>
                </div>
              </div>
              {/* Step 6 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">6</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Implement, Test, Iterate</h3>
                  <p className="text-light-gray">
                  We deploy the solution, ensuring minimal disruption to your daily operations. During this phase, we rigorously test the system to ensure everything functions as expected. If necessary, we make adjustments and improvements before the full-scale launch.
                  </p>
                </div>
              </div>
              {/* Step 7 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">7</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Data Migration & System Integration</h3>
                  <p className="text-light-gray">
                  After the solution has been tested and confirmed, we migrate your existing data and integrate the new system with your other tools. This ensures smooth data transfer, seamless workflows, and full compatibility with your existing infrastructure.
                  </p>
                </div>
              </div>
              {/* Step 8 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">8</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Train the Team. Support the Growth</h3>
                  <p className="text-light-gray">
                  Once the solution is live, we provide comprehensive training to ensure your team can fully leverage the new system. We offer ongoing support to address any challenges and make adjustments as your business continues to evolve.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Technologies section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We plug into the tools you already use and build automations on proven, scalable tech — no hacks, no guesswork.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-dark-gray rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">CRM Systems</h3>
              <ul className="text-light-gray space-y-2">
                <li>Monday.com</li>
                <li>HubSpot</li>
                <li>Zoho CRM</li>
                <li>Pipedrive</li>
              </ul>
            </div>

            <div className="bg-dark-gray rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">Automation Tools</h3>
              <ul className="text-light-gray space-y-2">
                <li>Make</li>
                <li>Zapier</li>
                <li>n8n</li>
              </ul>
            </div>

            <div className="bg-dark-gray rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">Financial Systems</h3>
              <ul className="text-light-gray space-y-2">
                <li>QuickBooks</li>
                <li>Stripe</li>
                <li>PayPal</li>
                <li>Bill.com</li>
              </ul>
            </div>

            <div className="bg-dark-gray rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">AI & Document Tools</h3>
              <ul className="text-light-gray space-y-2">
                <li>ChatGPT</li>
                <li>Claude</li>
                <li>DocuSign</li>
                <li>PandaDoc</li>
                <li>JotForm</li>
                <li>Google Workspace</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline the Flow?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
          Trust our team to map your processes and uncover automation potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" href="/contacts">
              See How It Works
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

// Функция для рендеринга иконок
function renderServiceIcon(icon: string) {
  switch (icon) {
    case 'process':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'crm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'industry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'finance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}