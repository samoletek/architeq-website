import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'AI-Powered Solutions',
  description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights. Use AI voice bots, natural language processing, and predictive analytics.',
  keywords: ['AI solutions', 'artificial intelligence', 'voice bots', 'predictive analytics', 'natural language processing', 'machine learning', 'AI automation'],
  openGraph: {
    title: 'AI-Powered Solutions | §78',
    description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights. Use AI voice bots, natural language processing, and predictive analytics.',
    url: `${siteMetadata.siteUrl}/services/ai-solutions`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services/ai-solutions`,
  },
};

export default function AISolutionsPage() {
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
      icon: "voice"
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
      icon: "search"
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
      icon: "analysis"
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

  // Function to render icons
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
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  }

  // Placeholder for images
  const placeholderStyle = {
    background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)',
    height: '200px'
  };

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
              <span className="text-white">AI-Powered Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Solutions</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights that drive business growth.
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
              <h2 className="text-3xl font-bold mb-6">What Are AI-Powered Solutions?</h2>
              <p className="text-light-gray mb-4">
                AI-powered solutions use artificial intelligence and machine learning to automate complex tasks, analyze large volumes of data, and generate insights that would be impossible or impractical for humans to produce manually.
              </p>
              <p className="text-light-gray mb-4">
                Our AI solutions are designed to integrate seamlessly with your existing business processes and systems, enhancing rather than replacing human capabilities.
              </p>
              <p className="text-light-gray">
                Whether you need to automate customer interactions, gain insights from communications, or leverage predictive analytics, our AI solutions can help you operate more efficiently and make better business decisions.
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">AI Technologies We Use</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Natural Language Processing</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Speech Recognition</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Machine Learning</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Predictive Analytics</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>OpenAI GPT Models</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Text-to-Speech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our AI Solutions</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We offer a range of AI-powered solutions that can be tailored to your specific business needs and integrated with your existing systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiSolutions.map((solution, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl p-6 border border-medium-gray hover:border-neon-purple/30 transition-all duration-300 hover:shadow-neon-purple-glow"
              >
                <div className="flex items-start">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center mr-6 bg-medium-gray text-neon-purple">
                    {renderIcon(solution.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-light-gray mb-4">{solution.description}</p>
                    
                    <h4 className="text-sm font-medium mb-2 text-neon-purple">Key Benefits:</h4>
                    <ul className="text-light-gray space-y-1">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <span className="text-neon-purple mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Implementation Process</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Our proven approach ensures that AI solutions are implemented successfully and deliver tangible business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-neon-purple flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Discovery & Planning</h3>
              <p className="text-light-gray">
                We assess your business needs, identify opportunities for AI implementation, and develop a comprehensive implementation plan.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-neon-purple flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Solution Design</h3>
              <p className="text-light-gray">
                Our team designs a custom AI solution tailored to your specific requirements, focusing on integration with your existing systems.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-neon-purple flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Development & Training</h3>
              <p className="text-light-gray">
                We develop and train the AI models using your data, ensuring they are optimized for your specific use case and performance requirements.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-neon-purple flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Deployment & Refinement</h3>
              <p className="text-light-gray">
                We deploy the solution in your environment, provide training, and continuously refine the AI based on real-world performance and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases section */}
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

            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <h3 className="text-xl font-semibold mb-3">Manufacturing</h3>
              <ul className="text-light-gray space-y-2">
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Quality control and defect detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Predictive maintenance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Supply chain optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <h3 className="text-xl font-semibold mb-3">Real Estate</h3>
              <ul className="text-light-gray space-y-2">
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Lead qualification and routing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Automated property showings scheduling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Property value prediction</span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
              <ul className="text-light-gray space-y-2">
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Voice and chat customer support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Call quality analysis and agent feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-purple mr-2">•</span>
                  <span>Customer sentiment analysis</span>
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
              See how our AI solutions have helped businesses automate tasks and gain valuable insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={index}
                className="bg-dark-gray rounded-xl overflow-hidden border border-medium-gray hover:border-neon-purple/30 transition-all duration-300"
              >
                <div style={placeholderStyle} className="relative">
                  <div className="absolute top-3 left-3">
                    <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">AI Solution</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
                  <p className="text-light-gray text-sm mb-4">{caseStudy.company}</p>
                  <p className="text-light-gray mb-4">{caseStudy.description}</p>
                  
                  <h4 className="text-sm font-semibold mb-2 text-neon-purple">Key Results:</h4>
                  <ul className="text-light-gray text-sm space-y-1 mb-4">
                    {caseStudy.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start">
                        <span className="text-neon-purple mr-2">•</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/cases/${caseStudy.id}`} className="text-neon-purple font-medium text-sm flex items-center">
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
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/cases">
              <Button variant="secondary">
                View All AI Solution Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Common questions about our AI-powered solutions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How long does it take to implement an AI solution?</h3>
              <p className="text-light-gray">Most AI solutions can be implemented within 4-8 weeks, depending on complexity and scope. We will provide a detailed timeline during our initial consultation.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Do I need a large dataset to use AI?</h3>
              <p className="text-light-gray">While more data generally leads to better results, we can work with smaller datasets or leverage pre-trained models that require less data to be effective for your specific use case.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How are AI solutions maintained?</h3>
              <p className="text-light-gray">We provide ongoing maintenance and monitoring to ensure your AI solution continues to perform optimally. This includes regular performance reviews, model retraining, and updates as needed.</p>
            </div>
            
            <div className="bg-medium-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How secure is my data with AI solutions?</h3>
              <p className="text-light-gray">Data security is a top priority. We implement industry-standard security measures and can design solutions that keep your data within your own environment if required.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Leverage AI for Your Business?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation to discuss how our AI-powered solutions can help automate complex tasks and provide valuable insights for your business.
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