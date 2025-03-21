import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    id: 'business-process',
    title: 'Business Process Automation',
    description: 'Streamline your business operations by automating repetitive tasks, connecting systems, and creating efficient workflows.',
    icon: 'process',
    color: 'primary',
    features: [
      'Process mapping and optimization',
      'Workflow automation',
      'Integration between systems',
      'Data validation and error prevention',
      'Automated reporting and dashboards'
    ]
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration Services',
    description: 'Connect your CRM with other business tools to create a unified information environment and improve customer service.',
    icon: 'crm',
    color: 'neon-blue',
    features: [
      'Bidirectional data synchronization',
      'Email and messaging integration',
      'Calendar and scheduling synchronization',
      'Document management integration',
      'Custom dashboard creation'
    ]
  },
  {
    id: 'boxed-solutions',
    title: 'Industry-Specific Boxed Solutions',
    description: 'Ready-to-implement automation packages tailored for specific industries like logistics, manufacturing, and real estate.',
    icon: 'industry',
    color: 'primary',
    features: [
      'Pre-configured workflows for your industry',
      'Custom fields and data structure',
      'Industry-specific integrations',
      'Best practices implementation',
      'Scalable architecture'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights.',
    icon: 'ai',
    color: 'neon-purple',
    features: [
      'Voice bots for client communication',
      'Natural language processing',
      'Speech-to-text conversion and analysis',
      'Data pattern recognition',
      'Predictive analytics'
    ]
  },
  {
    id: 'documentation',
    title: 'Documentation & Forms',
    description: 'Automate document creation, processing, and management to reduce administrative burden and ensure compliance.',
    icon: 'document',
    color: 'neon-blue',
    features: [
      'Automatic document generation',
      'Electronic signature integration',
      'Form creation and data collection',
      'Document version control',
      'Compliance monitoring'
    ]
  },
  {
    id: 'finance',
    title: 'Financial Systems Integration',
    description: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting.',
    icon: 'finance',
    color: 'primary',
    features: [
      'Invoice automation',
      'Payment tracking and reconciliation',
      'Financial reporting and dashboards',
      'Integration with accounting systems',
      'Multi-currency support'
    ]
  }
];

// Функция для рендеринга иконок
function renderServiceIcon(icon: string, className: string = "h-8 w-8") {
  switch (icon) {
    case 'process':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'crm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'industry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'finance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}

export default function ServicesPage() {
  return (
    <SiteLayout>
      {/* Hero section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-light-gray mb-10">
              We provide comprehensive business process automation solutions tailored to your specific needs and industry requirements.
            </p>
            <Button variant="primary" size="lg" href="/contacts">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-dark-gray rounded-xl overflow-hidden border border-medium-gray hover:border-primary/50 transition-all duration-300 hover:shadow-neon-glow"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-${service.color} bg-medium-gray`}>
                    {renderServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-light-gray mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-light-gray text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
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
      
      {/* FAQ Section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-medium-gray rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">How long does implementation typically take?</h3>
                <p className="text-light-gray">Implementation time varies based on the complexity of your needs. Small-scale projects can be completed in as little as 2-4 weeks, while enterprise-level solutions may take 2-3 months. We always provide a detailed timeline during the consultation process.</p>
              </div>
              
              <div className="bg-medium-gray rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Do I need technical knowledge to use the automated systems?</h3>
                <p className="text-light-gray">No, our solutions are designed with user-friendliness in mind. We provide comprehensive training and documentation, ensuring your team can easily operate the systems without technical expertise.</p>
              </div>
              
              <div className="bg-medium-gray rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Can your solutions integrate with my existing software?</h3>
                <p className="text-light-gray">Yes, our automation solutions are designed to integrate with a wide range of existing software including popular CRMs, ERPs, accounting systems, and custom applications. We conduct a thorough assessment of your current tech stack before implementation.</p>
              </div>
              
              <div className="bg-medium-gray rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">What kind of support do you provide after implementation?</h3>
                <p className="text-light-gray">We offer comprehensive post-implementation support including regular maintenance, troubleshooting, system updates, and optimization. We also provide ongoing training for new staff and consultation for future improvements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business Processes?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our automation solutions can help streamline your operations and boost your productivity.
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