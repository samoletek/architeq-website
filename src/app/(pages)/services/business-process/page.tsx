// src/app/(pages)/services/business-process/page.tsx

import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Business Process Automation',
  description: 'Streamline your business operations with our business process automation services. Eliminate manual tasks, reduce errors, and improve efficiency.',
  keywords: ['business process automation', 'workflow automation', 'process optimization', 'efficiency improvement', 'task automation'],
  path: '/services/business-process'
});

export default function BusinessProcessPage() {
  // Преимущества
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

  // Функции и возможности
  const features = [
    {
      title: "Process Mapping & Analysis",
      description: "We analyze your current workflows to identify bottlenecks, redundancies, and opportunities for automation.",
      benefits: [
        "Comprehensive workflow documentation",
        "Identification of inefficiencies",
        "Prioritization of automation opportunities",
        "Clear roadmap for implementation"
      ],
      icon: "map"
    },
    {
      title: "Custom Workflow Design",
      description: "Based on your needs, we design automated workflows that streamline operations and reduce manual intervention.",
      benefits: [
        "Tailored to your specific business processes",
        "Integration between different systems",
        "Conditional logic and decision points",
        "Exception handling mechanisms"
      ],
      icon: "workflow"
    },
    {
      title: "System Integration",
      description: "We connect your existing tools and software to create a seamless flow of information across your organization.",
      benefits: [
        "Bidirectional data synchronization",
        "Elimination of manual data entry",
        "Real-time information updates",
        "Unified data environment"
      ],
      icon: "connect"
    },
    {
      title: "Dashboard Creation",
      description: "Custom dashboards provide real-time visibility into your business processes and KPIs.",
      benefits: [
        "Visual representation of key metrics",
        "Customizable views for different roles",
        "Real-time performance monitoring",
        "Data-driven decision making"
      ],
      icon: "dashboard",
      caseId: "dashboards-creation"
    }
  ];

  // Процесс внедрения
  const processes = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "We begin by understanding your current processes, pain points, and objectives through detailed consultations and process mapping."
    },
    {
      step: 2,
      title: "Solution Design",
      description: "Our team designs a custom automation solution tailored to your specific business needs, with a focus on scalability and user-friendliness."
    },
    {
      step: 3,
      title: "Implementation",
      description: "We implement the solution with minimal disruption to your operations, providing comprehensive testing and validation at each stage."
    },
    {
      step: 4,
      title: "Training & Deployment",
      description: "We thoroughly train your team on the new system and deploy it in your production environment."
    },
    {
      step: 5,
      title: "Continuous Improvement",
      description: "We provide ongoing support and regularly review the solution's performance, making adjustments to optimize efficiency and adapt to changing needs."
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
      question: "Which business processes can be automated?",
      answer: "Almost any repetitive, rule-based process can be automated. Common examples include data entry, document generation, approval workflows, notification systems, reporting, and customer onboarding. We can help identify the best automation opportunities in your business."
    },
    {
      question: "Will automation replace our current systems?",
      answer: "No, our automation solutions are designed to work with your existing systems rather than replace them. We connect and enhance your current tools to create a more efficient workflow, preserving your previous investments."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation time varies based on the complexity of the processes being automated. Simple automations can be implemented in 2-4 weeks, while more complex solutions might take 6-12 weeks. We provide a detailed timeline during our initial assessment."
    },
    {
      question: "How do you ensure security of our business data?",
      answer: "Security is a top priority in all our implementations. We follow industry best practices for data security, use encrypted connections, implement proper access controls, and ensure compliance with relevant regulations. We're happy to discuss specific security requirements for your project."
    }
  ];

  // Сектор обзора
  const overviewSideContent = (
    <>
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
      </div>
    </>
  );

  // Секция технологий
  const technologiesSection = (
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
  );

  // Функция для рендеринга иконок
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
      case 'map':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case 'workflow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'connect':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'dashboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
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
      serviceId="business-process"
      serviceTitle="Business Process Automation"
      serviceDescription="Transform your business operations by automating repetitive tasks, connecting systems, and creating efficient workflows that save time and reduce errors."
      breadcrumbTitle="Business Process Automation"
      overview={{
        title: "What Is Business Process Automation?",
        description: (
          <>
            <p className="text-light-gray mb-4">
              Business Process Automation (BPA) is the technology-enabled automation of complex business processes. It streamlines a business for simplicity, achieves digital transformation, increases service quality, improves service delivery, and contains costs.
            </p>
            <p className="text-light-gray mb-4">
              Our approach to BPA focuses on connecting your existing tools and systems to create automated workflows that reduce manual intervention, minimize errors, and save time.
            </p>
            <p className="text-light-gray">
              Whether you need to automate simple tasks like data entry or complex workflows across multiple departments, our solutions are tailored to your specific business needs.
            </p>
          </>
        ),
        sideContent: overviewSideContent
      }}
      benefits={benefits}
      features={features}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={technologiesSection}
      primaryColor="primary"
      accentColor="primary"
      iconRenderer={renderIcon}
    />
  );
}