import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Documentation & Forms',
  description: 'Automate document creation, processing, and management. Streamline form data collection and processing to reduce administrative burden and ensure compliance.',
  keywords: ['document automation', 'form automation', 'document generation', 'electronic signatures', 'document management', 'web forms', 'form integration'],
  path: '/services/documentation'
});

export default function DocumentationPage() {
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
      icon: "check",
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
      icon: "workflow",
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
      icon: "dashboard"
    }
  ];

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

  const integrationSection = (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Integration Options
          </h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            Our document and form solutions integrate with a wide range of business tools and platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">CRM Systems</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Monday.com</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>HubSpot</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Salesforce</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pipedrive</span>
              </li>
            </ul>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">E-Signature Platforms</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>DocuSign</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>PandaDoc</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>SignNow</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Adobe Sign</span>
              </li>
            </ul>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Form & Document Tools</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>JotForm</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Typeform</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Google Forms</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  const roiSection = (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Return on Investment
          </h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            Document and form automation delivers measurable benefits and significant ROI across various business metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">80%</div>
            <h3 className="text-xl font-semibold mb-2">Time Savings</h3>
            <p className="text-light-gray">
              Reduce document creation and processing time by up to 80%, freeing staff for higher-value activities.
            </p>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <h3 className="text-xl font-semibold mb-2">Error Reduction</h3>
            <p className="text-light-gray">
              Nearly eliminate errors in document content through automated data population and validation.
            </p>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">70%</div>
            <h3 className="text-xl font-semibold mb-2">Faster Cycle Times</h3>
            <p className="text-light-gray">
              Accelerate document approval and signing processes by an average of 70% using electronic signatures.
            </p>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">50%</div>
            <h3 className="text-xl font-semibold mb-2">Cost Reduction</h3>
            <p className="text-light-gray">
              Cut document-related costs by up to 50% through reduced labor, paper, and storage expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

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
            <p className="mb-4">
              Document and form automation is the process of using technology to streamline the creation, processing, management, and storage of business documents and forms.
            </p>
            <p className="mb-4">
              By automating these processes, businesses can eliminate manual data entry, reduce errors, ensure compliance, and significantly improve efficiency across departments.
            </p>
            <p>
              Our document and form automation solutions integrate seamlessly with your existing CRM and business systems to create a unified workflow that saves time and improves accuracy.
            </p>
          </>
        ),
        features: [
          "Manual Docs Creation",
          "Errors and Inconsistencies",
          "Signing Delays",
          "Compliance Requirements",
          "Version Control",
          "Data Security"
        ],
        featuresTitle: "Document Challenges"
      }}
      benefits={benefits}
      features={documentSolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={<>{integrationSection}{roiSection}</>}
    />
  );
}