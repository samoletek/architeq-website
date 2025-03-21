import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Business Process Automation',
  description: 'Streamline your business operations with our business process automation services. Eliminate manual tasks, reduce errors, and improve efficiency.',
  keywords: ['business process automation', 'workflow automation', 'process optimization', 'efficiency improvement', 'task automation'],
  openGraph: {
    title: 'Business Process Automation | §78',
    description: 'Streamline your business operations with our business process automation services. Eliminate manual tasks, reduce errors, and improve efficiency.',
    url: `${siteMetadata.siteUrl}/services/business-process`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services/business-process`,
  },
};

export default function BusinessProcessPage() {
  const benefits = [
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
  ];

  const features = [
    {
      title: "Process Mapping & Analysis",
      description: "We analyze your current workflows to identify bottlenecks, redundancies, and opportunities for automation."
    },
    {
      title: "Custom Workflow Design",
      description: "Based on your needs, we design automated workflows that streamline operations and reduce manual intervention."
    },
    {
      title: "System Integration",
      description: "We connect your existing tools and software to create a seamless flow of information across your organization."
    },
    {
      title: "Dashboard Creation",
      description: "Custom dashboards provide real-time visibility into your business processes and KPIs."
    },
    {
      title: "Automated Notifications",
      description: "Set up alerts and notifications to keep your team informed of important events and deadlines."
    },
    {
      title: "Continuous Optimization",
      description: "We regularly review and refine your automated processes to ensure they continue to meet your business needs."
    }
  ];

  function renderIcon(icon: string) {
    switch (icon) {
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
              <span className="text-white">Business Process Automation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Process Automation</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              Transform your business operations by automating repetitive tasks, connecting systems, and creating efficient workflows that save time and reduce errors.
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
              <h2 className="text-3xl font-bold mb-6">What Is Business Process Automation?</h2>
              <p className="text-light-gray mb-4">
                Business Process Automation (BPA) is the technology-enabled automation of complex business processes. It streamlines a business for simplicity, achieves digital transformation, increases service quality, improves service delivery, and contains costs.
              </p>
              <p className="text-light-gray mb-4">
                Our approach to BPA focuses on connecting your existing tools and systems to create automated workflows that reduce manual intervention, minimize errors, and save time.
              </p>
              <p className="text-light-gray">
                Whether you need to automate simple tasks like data entry or complex workflows across multiple departments, our solutions are tailored to your specific business needs.
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Industries We Serve</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Logistics & Transportation</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Manufacturing</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Financial Services</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real Estate</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Healthcare</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>E-commerce & Retail</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional Services</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Education</span>
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
            <h2 className="text-3xl font-bold mb-4">Benefits of Business Process Automation</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Our business process automation solutions deliver tangible benefits that directly impact your organization's efficiency and bottom line.
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

      {/* Features section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We follow a comprehensive approach to business process automation, ensuring that your solution is tailored to your specific needs and challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-dark-gray rounded-xl p-6 border border-medium-gray hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-primary text-4xl font-bold mb-4">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-light-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technologies section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We leverage a variety of modern technologies and platforms to create powerful automation solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Monday.com', 'n8n', 'Make', 'Zapier', 'Airtable', 'Google Workspace', 'Microsoft Power Automate', 'QuickBooks', 'Stripe', 'DocuSign', 'JotForm', 'HubSpot'].map((tech, index) => (
              <div 
                key={index}
                className="bg-medium-gray rounded-lg p-4 flex items-center justify-center h-20 text-center border border-transparent hover:border-primary/30 transition-all duration-300"
              >
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Business Operations?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation to discuss how our business process automation solutions can help your organization save time, reduce errors, and improve efficiency.
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