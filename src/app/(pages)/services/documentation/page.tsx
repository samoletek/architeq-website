import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Documentation & Forms',
  description: 'Automate document creation, processing, and management. Streamline form data collection and processing to reduce administrative burden and ensure compliance.',
  keywords: ['document automation', 'form automation', 'document generation', 'electronic signatures', 'document management', 'web forms', 'form integration'],
  openGraph: {
    title: 'Documentation & Forms | §78',
    description: 'Automate document creation, processing, and management. Streamline form data collection and processing to reduce administrative burden and ensure compliance.',
    url: `${siteMetadata.siteUrl}/services/documentation`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services/documentation`,
  },
};

export default function DocumentationPage() {
  const documentSolutions = [
    {
      title: "Automatic Document Generation",
      description: "Create standardized documents automatically from templates using data from your CRM or other systems.",
      benefits: [
        "Eliminate manual document creation",
        "Ensure consistency across all documents",
        "Reduce errors in document content",
        "Save significant time on document preparation"
      ],
      icon: "document",
      caseId: "document-generation"
    },
    {
      title: "Electronic Signatures Integration",
      description: "Streamline your document signing process with seamless electronic signature integration directly from your CRM.",
      benefits: [
        "Accelerate document signing cycle",
        "Track signing status in real time",
        "Automatic reminders for pending signatures",
        "Secure and legally compliant process"
      ],
      icon: "signature",
      caseId: "electronic-signatures"
    },
    {
      title: "Web Forms with CRM Integration",
      description: "Create customized web forms that automatically feed data directly into your CRM and other business systems.",
      benefits: [
        "Capture lead and client information without manual entry",
        "Ensure data validation at point of entry",
        "Automatically trigger workflows based on form submissions",
        "Improve user experience with modern, responsive forms"
      ],
      icon: "form",
      caseId: "web-forms-integration"
    },
    {
      title: "Document Management Automation",
      description: "Automate document organization, storage, version control, and access management across your organization.",
      benefits: [
        "Centralize document storage with intelligent organization",
        "Implement version control and audit trails",
        "Automate document retention and archiving",
        "Control document access with role-based permissions"
      ],
      icon: "folder",
      caseId: ""
    }
  ];

  const casesStudies = [
    {
      id: "document-generation",
      title: "Document Generation from CRM Status Changes",
      company: "Affiliated Medical Supplies",
      description: "Automatic document generation system that creates documents based on CRM data changes.",
      results: [
        "Document creation time reduced from 35 minutes to 2-3 minutes",
        "Complete elimination of data errors",
        "Standardization of all company documents"
      ]
    },
    {
      id: "electronic-signatures",
      title: "Electronic Signature Integration",
      company: "485 Logistics",
      description: "Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.",
      results: [
        "70% reduction in document signing cycle time",
        "20% increase in completed deal percentage",
        "Automatic auditing of all signed documents"
      ]
    },
    {
      id: "web-forms-integration",
      title: "Web Forms with CRM Integration",
      company: "Ameriland Capital",
      description: "Creation and integration of web forms with direct CRM integration for efficient data collection.",
      results: [
        "Increase in form completion conversion to 60%",
        "Reduction of application processing time by 35%",
        "Elimination of errors in data transfer"
      ]
    }
  ];

  // Function to render icons
  function renderIcon(icon: string) {
    switch (icon) {
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'signature':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        );
      case 'form':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'folder':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
              <span className="text-white">Documentation & Forms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation & Forms</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              Automate document creation, processing, and management to reduce administrative burden, ensure compliance, and improve efficiency.
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
              <h2 className="text-3xl font-bold mb-6">What Is Document & Form Automation?</h2>
              <p className="text-light-gray mb-4">
                Document and form automation is the process of using technology to streamline the creation, processing, management, and storage of business documents and forms.
              </p>
              <p className="text-light-gray mb-4">
                By automating these processes, businesses can eliminate manual data entry, reduce errors, ensure compliance, and significantly improve efficiency across departments.
              </p>
              <p className="text-light-gray">
                Our document and form automation solutions integrate seamlessly with your existing CRM and business systems to create a unified workflow that saves time and improves accuracy.
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Common Document Challenges</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Time-Consuming Manual Processes</h4>
                    <p className="text-light-gray">Staff spending hours creating documents and manually entering data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Errors and Inconsistencies</h4>
                    <p className="text-light-gray">Typos, outdated information, and formatting inconsistencies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Signing Delays</h4>
                    <p className="text-light-gray">Long waiting times for document approval and signature collection</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Version Control Problems</h4>
                    <p className="text-light-gray">Difficulty tracking document versions and maintaining history</p>
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
            <h2 className="text-3xl font-bold mb-4">Our Document & Form Solutions</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              We offer comprehensive document and form automation solutions to streamline your business processes and reduce administrative burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {documentSolutions.map((solution, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl p-6 border border-medium-gray hover:border-neon-blue/30 transition-all duration-300 hover:shadow-neon-blue-glow"
              >
                <div className="flex items-start">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center mr-6 bg-medium-gray text-neon-blue">
                    {renderIcon(solution.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-light-gray mb-4">{solution.description}</p>
                    
                    <h4 className="text-sm font-medium mb-2 text-neon-blue">Key Benefits:</h4>
                    <ul className="text-light-gray space-y-1 mb-4">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <span className="text-neon-blue mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {solution.caseId && (
                      <Link href={`/cases/${solution.caseId}`} className="text-neon-blue font-medium text-sm flex items-center mt-2">
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
            <h2 className="text-3xl font-bold mb-4">Integration Options</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Our document and form solutions integrate with a wide range of business tools and platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-gray rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-neon-blue">CRM Systems</h3>
              <ul className="text-light-gray space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monday.com</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>HubSpot</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Salesforce</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pipedrive</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zoho CRM</span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-gray rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-neon-blue">E-Signature Platforms</h3>
              <ul className="text-light-gray space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>DocuSign</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>PandaDoc</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>SignNow</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Adobe Sign</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>HelloSign</span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-gray rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-neon-blue">Form & Document Tools</h3>
              <ul className="text-light-gray space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>JotForm</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Typeform</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Google Forms</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Google Docs</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Microsoft Office</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              See how our document and form automation solutions have helped businesses streamline their operations and reduce administrative burden.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {casesStudies.map((caseStudy, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl overflow-hidden border border-medium-gray hover:border-neon-blue/30 transition-all duration-300"
              >
                <div style={placeholderStyle} className="relative">
                  <div className="absolute top-3 left-3">
                    <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">Documents & Forms</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
                  <p className="text-light-gray text-sm mb-4">{caseStudy.company}</p>
                  <p className="text-light-gray mb-4">{caseStudy.description}</p>
                  
                  <h4 className="text-sm font-semibold mb-2 text-neon-blue">Key Results:</h4>
                  <ul className="text-light-gray text-sm space-y-1 mb-4">
                    {caseStudy.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start">
                        <span className="text-neon-blue mr-2">•</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/cases/${caseStudy.id}`} className="text-neon-blue font-medium text-sm flex items-center">
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
                View All Document & Form Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Implementation Process section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Implementation Process</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Our streamlined approach ensures a smooth transition to automated document and form processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-neon-blue flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Deployment & Training</h3>
              <p className="text-light-gray">
                We implement the solution in your environment and provide training to ensure your team can effectively use the new tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Return on Investment</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Document and form automation delivers measurable benefits and significant ROI across various business metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <div className="text-4xl font-bold text-neon-blue mb-2">80%</div>
              <h3 className="text-xl font-semibold mb-2">Time Savings</h3>
              <p className="text-light-gray">
                Reduce document creation and processing time by up to 80%, freeing staff for higher-value activities.
              </p>
            </div>

            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <div className="text-4xl font-bold text-neon-blue mb-2">95%</div>
              <h3 className="text-xl font-semibold mb-2">Error Reduction</h3>
              <p className="text-light-gray">
                Nearly eliminate errors in document content through automated data population and validation.
              </p>
            </div>

            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <div className="text-4xl font-bold text-neon-blue mb-2">70%</div>
              <h3 className="text-xl font-semibold mb-2">Faster Cycle Times</h3>
              <p className="text-light-gray">
                Accelerate document approval and signing processes by an average of 70% using electronic signatures.
              </p>
            </div>

            <div className="bg-dark-gradient rounded-xl p-6 border border-medium-gray">
              <div className="text-4xl font-bold text-neon-blue mb-2">50%</div>
              <h3 className="text-xl font-semibold mb-2">Cost Reduction</h3>
              <p className="text-light-gray">
                Cut document-related costs by up to 50% through reduced labor, paper, and storage expenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Common questions about our document and form automation solutions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-dark-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How secure are automated document solutions?</h3>
              <p className="text-light-gray">Our document automation solutions implement industry-standard security measures, including encryption, secure access controls, and audit trails. We ensure compliance with relevant regulations such as GDPR and can implement additional security measures based on your specific requirements.</p>
            </div>
            
            <div className="bg-dark-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Can I still customize documents after automation?</h3>
              <p className="text-light-gray">Absolutely. Our document automation solutions allow for both automated generation and manual customization when needed. You can set up templates with fixed elements and variable sections that can be edited on a case-by-case basis.</p>
            </div>
            
            <div className="bg-dark-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How long does implementation typically take?</h3>
              <p className="text-light-gray">Implementation time varies based on the complexity of your documents and workflows. Simple document automation can be implemented in 2-3 weeks, while more complex solutions with multiple integrations might take 4-8 weeks. We'll provide a detailed timeline during our initial consultation.</p>
            </div>
            
            <div className="bg-dark-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Are electronic signatures legally binding?</h3>
              <p className="text-light-gray">Yes, electronic signatures are legally binding in most countries under laws such as the ESIGN Act in the US and eIDAS in the EU. Our solutions use compliant e-signature technologies that meet legal requirements, including authentication, consent, and record retention.</p>
            </div>
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