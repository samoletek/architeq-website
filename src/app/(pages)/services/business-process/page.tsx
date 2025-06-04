import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Business Process Automation',
  description: 'Streamline your business operations with our business process automation services. Eliminate manual tasks, reduce errors, and improve efficiency.',
  keywords: ['business process automation', 'workflow automation', 'process optimization', 'efficiency improvement', 'task automation'],
  path: '/services/business-process'
});

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

  const technologiesSection = (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Technologies We Use
          </h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            We leverage a variety of modern technologies and platforms to create powerful automation solutions.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {['Monday.com', 'n8n', 'Make', 'Zapier', 'Airtable', 'Google Workspace', 'Microsoft Power Automate', 'QuickBooks', 'Stripe', 'DocuSign', 'JotForm', 'HubSpot'].map((tech, index) => (
            <div 
              key={index}
              className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-lg p-4 flex items-center justify-center h-20 text-center border border-transparent hover:border-primary/30 transition-all duration-300"
            >
              <span className="font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

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
            <p className="mb-4">
              Business Process Automation (BPA) is the technology-enabled automation of complex business processes. It streamlines a business for simplicity, achieves digital transformation, increases service quality, improves service delivery, and contains costs.
            </p>
            <p className="mb-4">
              Our approach to BPA focuses on connecting your existing tools and systems to create automated workflows that reduce manual intervention, minimize errors, and save time.
            </p>
            <p>
              Whether you need to automate simple tasks like data entry or complex workflows across multiple departments, our solutions are tailored to your specific business needs.
            </p>
          </>
        ),
        features: [
          "Logistics & Transportation",
          "Manufacturing",
          "Financial Services",
          "Real Estate",
          "Healthcare",
          "E-commerce & Retail"
        ]
      }}
      benefits={benefits}
      features={features}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={technologiesSection}
    />
  );
}