// src/app/(pages)/services/documentation/page.tsx

import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Documentation & Forms',
  description: 'Automate document creation, processing, and management. Streamline form data collection and processing to reduce administrative burden and ensure compliance.',
  keywords: ['document automation', 'form automation', 'document generation', 'electronic signatures', 'document management', 'web forms', 'form integration'],
  path: '/services/documentation'
});

export default function DocumentationPage() {
  // Преимущества
  const benefits = [
    {
      title: "Time Savings",
      description: "Reduce document creation and processing time by up to 90%, freeing your team for higher-value activities.",
      icon: "clock"
    },
    {
      title: "Error Reduction",
      description: "Eliminate manual data entry errors that can lead to costly mistakes and compliance issues.",
      icon: "shield"
    },
    {
      title: "Improved Compliance",
      description: "Ensure consistent document formatting and content that meets regulatory requirements.",
      icon: "check"
    },
    {
      title: "Enhanced Customer Experience",
      description: "Provide a seamless, modern experience for customers submitting information and signing documents.",
      icon: "user"
    }
  ];

  // Решения
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
      icon: "folder"
    }
  ];

  // Процесс внедрения
  const processes = [
    {
      step: 1,
      title: "Needs Assessment",
      description: "We analyze your current document and form processes to identify inefficiencies, bottlenecks, and opportunities for automation."
    },
    {
      step: 2,
      title: "Solution Design",
      description: "Our team designs a custom document and form automation solution that addresses your specific needs and integrates with your existing systems."
    },
    {
      step: 3,
      title: "Template Creation",
      description: "We create customized document templates and form designs that match your branding and include all necessary fields and logic."
    },
    {
      step: 4,
      title: "Implementation & Integration",
      description: "We implement the solution and integrate it with your CRM, electronic signature platforms, and other business systems."
    },
    {
      step: 5,
      title: "Testing & Training",
      description: "We thoroughly test all components and provide comprehensive training to ensure your team can effectively use and manage the new system."
    }
  ];

  // Кейсы
  const caseStudies = [
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

  // FAQ
  const faqs = [
    {
      question: "How secure are automated document solutions?",
      answer: "Our document automation solutions implement industry-standard security measures, including encryption, secure access controls, and audit trails. We ensure compliance with relevant regulations such as GDPR and can implement additional security measures based on your specific requirements."
    },
    {
      question: "Can I still customize documents after automation?",
      answer: "Absolutely. Our document automation solutions allow for both automated generation and manual customization when needed. You can set up templates with fixed elements and variable sections that can be edited on a case-by-case basis."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation time varies based on the complexity of your documents and workflows. Simple document automation can be implemented in 2-3 weeks, while more complex solutions with multiple integrations might take 4-8 weeks. We will provide a detailed timeline during our initial consultation."
    },
    {
      question: "Are electronic signatures legally binding?",
      answer: "Yes, electronic signatures are legally binding in most countries under laws such as the ESIGN Act in the US and eIDAS in the EU. Our solutions use compliant e-signature technologies that meet legal requirements, including authentication, consent, and record retention."
    }
  ];

  // Обзорный контент
  const overviewSideContent = (
    <>
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
      </ul>
    </>
  );

  // Секция интеграции
  const integrationSection = (
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
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  // ROI секция
  const roiSection = (
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
  );

  // Функция для рендеринга иконок
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
      case 'check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

  return (
    <ServiceTemplate
      serviceId="documentation"
      serviceTitle="Documentation & Forms"
      serviceDescription="Automate document creation, processing, and management to reduce administrative burden, ensure compliance, and improve efficiency."
      breadcrumbTitle="Documentation & Forms"
      overview={{
        title: "What Is Document & Form Automation?",
        description: (
          <>
            <p className="text-light-gray mb-4">
              Document and form automation is the process of using technology to streamline the creation, processing, management, and storage of business documents and forms.
            </p>
            <p className="text-light-gray mb-4">
              By automating these processes, businesses can eliminate manual data entry, reduce errors, ensure compliance, and significantly improve efficiency across departments.
            </p>
            <p className="text-light-gray">
              Our document and form automation solutions integrate seamlessly with your existing CRM and business systems to create a unified workflow that saves time and improves accuracy.
            </p>
          </>
        ),
        sideContent: overviewSideContent
      }}
      benefits={benefits}
      features={documentSolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={<>{integrationSection}{roiSection}</>}
      primaryColor="neon-blue"
      accentColor="neon-blue"
      iconRenderer={renderIcon}
    />
  );
}