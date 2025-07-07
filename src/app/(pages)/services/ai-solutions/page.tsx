import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { ProfessionalServiceSchema, FAQPageSchema } from '@/lib/seo/schema';

export const metadata = generateServiceMetadata({
  title: 'AI-Powered Solutions',
  description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights. Use AI voice agents, natural language processing, and predictive analytics.',
  keywords: ['AI solutions', 'artificial intelligence', 'AI agents', 'voice agents', 'predictive analytics', 'natural language processing', 'machine learning', 'AI automation'],
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
      title: "AI Voice Agents",
      description: "Intelligent voice agents that can handle customer inquiries, book appointments, and collect information without human intervention.",
      benefits: [
        "24/7 automated call handling",
        "Reduction in staff workload",
        "Consistent customer experience",
        "Scalable to handle volume fluctuations"
      ],
      icon: "voice",
      caseId: "ai-voice-agent"
    },
    {
      title: "CRM AI Agents",
      description: "Intelligent agents that help employees quickly find and summarize information across your CRM and connected systems using natural language.",
      benefits: [
        "Faster information retrieval",
        "Reduced training time for new employees",
        "Improved decision making with complete data",
        "More effective client interactions"
      ],
      icon: "search",
      caseId: "ai-crm-agent"
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
      discountButton: true
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
      icon: "prediction",
      discountButton: true
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
      id: "ai-voice-agent",
      title: "AI Voice Agent for Client Request Processing",
      company: "Up-Struct LLC",
      description: "Multi-level intelligent voice agent for processing client requests without operator participation.",
      results: [
        "Automation of 60-70% of incoming requests",
        "Reduction of waiting time to minimum",
        "24/7 operation mode without increasing staff"
      ]
    },
    {
      id: "ai-crm-agent",
      title: "AI Agent for CRM Information Search",
      company: "SUQEAK E CLEAN STUDIOS",
      description: "Integration of AI agent into CRM interface for natural language data search and summarization.",
      results: [
        "90% reduction in information search time",
        "Fast adaptation of new employees",
        "More informed decisions based on complete data"
      ]
    },
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



  return (
    <>
      {/* Enhanced Schema для AI-решений */}
      <ProfessionalServiceSchema 
        name="AI-Powered Solutions"
        description="Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights. Use AI voice agents, natural language processing, and predictive analytics."
        url="https://architeq.io/services/ai-solutions"
        serviceOutput="Automated business processes, AI agents, data analysis systems"
        serviceArea={["United States", "Canada", "United Kingdom"]}
        provider="Architeq"
        hoursAvailable={{
          opens: "09:00",
          closes: "17:00", 
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }}
      />
      
      {/* FAQ Schema для лучшей видимости в AI поиске */}
      <FAQPageSchema 
        url="https://architeq.io/services/ai-solutions"
        mainEntity={faqs}
      />
      
      <ServiceTemplate
      serviceId="ai-solutions"
      serviceTitle="AI-Powered Solutions"
      serviceDescription="Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights that drive business growth."
      breadcrumbTitle="AI-Powered Solutions"
      overview={{
        title: "What Are AI-Powered Solutions?",
        description: (
          <>
            <p className="mb-4">
              AI-powered solutions use artificial intelligence and machine learning to automate complex tasks, analyze large volumes of data, and generate insights that would be impossible or impractical for humans to produce manually.
            </p>
            <p className="mb-4">
              Our AI solutions are designed to integrate seamlessly with your existing business processes and systems, enhancing rather than replacing human capabilities.
            </p>
            <p>
              Whether you need to automate customer interactions, gain insights from communications, or leverage predictive analytics, our AI solutions can help you operate more efficiently and make better business decisions.
            </p>
          </>
        ),
        features: [
          "Natural Language Processing",
          "Speech Recognition", 
          "OpenAI Models",
          "Anthropic Models",
          "Real-Time Voice Generation",
          "Smart Research"
        ],
        featuresTitle: "AI Services"
      }}
      benefits={benefits}
      features={aiSolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
    />
    </>
  );
}