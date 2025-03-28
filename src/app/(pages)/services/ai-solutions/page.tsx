import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'AI-Powered Solutions',
  description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights. Use AI voice bots, natural language processing, and predictive analytics.',
  keywords: ['AI solutions', 'artificial intelligence', 'voice bots', 'predictive analytics', 'natural language processing', 'machine learning', 'AI automation'],
  path: '/services/ai-solutions'
});

export default function AISolutionsPage() {
  // Данные для преимуществ
  const benefits = [
    {
      title: "Time Efficiency",
      description: "Automate complex tasks that would take humans hours to complete, freeing up your team for high-value activities.",
      icon: "clock"
    },
    {
      title: "Data Analysis",
      description: "Process and analyze large volumes of data to uncover patterns and insights that humans might miss.",
      icon: "chart"
    },
    {
      title: "24/7 Availability",
      description: "AI systems can work around the clock without breaks, ensuring continuous service for your customers.",
      icon: "calendar"
    },
    {
      title: "Scalability",
      description: "Handle fluctuating workloads without needing to hire additional staff during peak periods.",
      icon: "scale"
    }
  ];

  // Данные для решений
  const aiSolutions = [
    {
      title: "AI Voice Bots",
      description: "Interactive voice assistants that can handle customer inquiries, book appointments, and collect information without human intervention.",
      benefits: [
        "24/7 automated call handling",
        "Reduction in staff workload",
        "Consistent customer experience",
        "Scalable to handle volume fluctuations"
      ],
      icon: "voice",
      caseId: "ai-voice-bot"
    },
    {
      title: "CRM AI Assistants",
      description: "Natural language search interfaces that help employees quickly find and summarize information across your CRM and connected systems.",
      benefits: [
        "Faster information retrieval",
        "Reduced training time for new employees",
        "Improved decision making with complete data",
        "More effective client interactions"
      ],
      icon: "search",
      caseId: "ai-crm-assistant"
    },
    {
      title: "Communication Analysis",
      description: "Automatic transcription and analysis of client conversations to improve service quality and identify training opportunities.",
      benefits: [
        "Quality control automation",
        "Identification of script deviations",
        "Recognition of emotional tone",
        "Training material generation"
      ],
      icon: "analysis",
      caseId: "speech-to-text-analysis"
    },
    {
      title: "Predictive Analytics",
      description: "AI-powered forecasting tools that analyze historical data to predict customer behavior, sales trends, and business opportunities.",
      benefits: [
        "More accurate sales forecasting",
        "Proactive customer retention",
        "Inventory optimization",
        "Data-driven strategic planning"
      ],
      icon: "prediction"
    }
  ];

  // Данные для процесса
  const processes = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We assess your business needs, identify opportunities for AI implementation, and develop a comprehensive implementation plan."
    },
    {
      step: 2,
      title: "Solution Design",
      description: "Our team designs a custom AI solution tailored to your specific requirements, focusing on integration with your existing systems."
    },
    {
      step: 3,
      title: "Development & Training",
      description: "We develop and train the AI models using your data, ensuring they are optimized for your specific use case and performance requirements."
    },
    {
      step: 4,
      title: "Deployment & Refinement",
      description: "We deploy the solution in your environment, provide training, and continuously refine the AI based on real-world performance and feedback."
    }
  ];

  // Данные для кейсов
  const caseStudies = [
    {
      id: "ai-voice-bot",
      title: "AI-Voice Bot for Client Request Processing",
      company: "Up-Struct LLC",
      description: "Multi-level interactive voice assistant for processing client requests without operator participation.",
      results: [
        "Automation of 60-70% of incoming requests",
        "Reduction of waiting time to minimum",
        "24/7 operation mode without increasing staff"
      ]
    },
    {
      id: "ai-crm-assistant",
      title: "AI Assistant for CRM Information Search",
      company: "SUQEAK E CLEAN STUDIOS",
      description: "Integration of AI assistant into CRM interface for natural language data search and summarization.",
      results: [
        "90% reduction in information search time",
        "Fast adaptation of new employees",
        "More informed decisions based on complete data"
      ]
    },
    {
      id: "speech-to-text-analysis",
      title: "AI Speech-to-Text Parser for Communication Analysis",
      company: "Various Companies",
      description: "System for automatic transcription and analysis of client conversations to improve service quality.",
      results: [
        "90% automation of conversation analysis",
        "75% reduction in time spent on call quality control",
        "Improvement of customer service quality and sales conversion"
      ]
    }
  ];

  // Данные для FAQ
  const faqs = [
    {
      question: "How long does it take to implement an AI solution?",
      answer: "Most AI solutions can be implemented within 4-8 weeks, depending on complexity and scope. We will provide a detailed timeline during our initial consultation."
    },
    {
      question: "Do I need a large dataset to use AI?",
      answer: "While more data generally leads to better results, we can work with smaller datasets or leverage pre-trained models that require less data to be effective for your specific use case."
    },
    {
      question: "How are AI solutions maintained?",
      answer: "We provide ongoing maintenance and monitoring to ensure your AI solution continues to perform optimally. This includes regular performance reviews, model retraining, and updates as needed."
    },
    {
      question: "How secure is my data with AI solutions?",
      answer: "Data security is a top priority. We implement industry-standard security measures and can design solutions that keep your data within your own environment if required."
    }
  ];

  // Функция для рендеринга иконок
  function renderIcon(icon: string) {
    switch (icon) {
      case 'voice':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'search':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'analysis':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'prediction':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'scale':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  }

  // Пример настраиваемого содержимого для секции обзора
  const overviewSideContent = (
    <>
      <h3 className="text-2xl font-bold mb-4">AI Technologies We Use</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Natural Language Processing</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Speech Recognition</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Machine Learning</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Predictive Analytics</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>OpenAI GPT Models</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Text-to-Speech</span>
        </div>
      </div>
    </>
  );

  // Пример дополнительной секции с отраслевыми применениями
  const industriesSection = (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Use Cases by Industry</h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            AI solutions can benefit businesses across various industries. Here are some common applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
            <h3 className="text-xl font-semibold mb-3">Retail & E-commerce</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Customer service chatbots and voice assistants</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Personalized product recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Inventory forecasting and management</span>
              </li>
            </ul>
          </div>

          <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
            <h3 className="text-xl font-semibold mb-3">Financial Services</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Fraud detection and prevention</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Customer service automation</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Risk assessment and management</span>
              </li>
            </ul>
          </div>

          <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
            <h3 className="text-xl font-semibold mb-3">Healthcare</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Patient appointment scheduling and reminders</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Medical record information retrieval</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-purple mr-2">•</span>
                <span>Automated patient follow-up communication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ServiceTemplate
      serviceId="ai-solutions"
      serviceTitle="AI-Powered Solutions"
      serviceDescription="Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights that drive business growth."
      breadcrumbTitle="AI-Powered Solutions"
      overview={{
        title: "What Are AI-Powered Solutions?",
        description: (
          <>
            <p className="text-light-gray mb-4">
              AI-powered solutions use artificial intelligence and machine learning to automate complex tasks, analyze large volumes of data, and generate insights that would be impossible or impractical for humans to produce manually.
            </p>
            <p className="text-light-gray mb-4">
              Our AI solutions are designed to integrate seamlessly with your existing business processes and systems, enhancing rather than replacing human capabilities.
            </p>
            <p className="text-light-gray">
              Whether you need to automate customer interactions, gain insights from communications, or leverage predictive analytics, our AI solutions can help you operate more efficiently and make better business decisions.
            </p>
          </>
        ),
        sideContent: overviewSideContent
      }}
      benefits={benefits}
      features={aiSolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={industriesSection}
      primaryColor="neon-purple"
      accentColor="neon-purple"
      iconRenderer={renderIcon}
    />
  );
}