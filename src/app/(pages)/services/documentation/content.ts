import { ServiceContent } from '@/components/templates/service-template'

export const DocumentationContent: ServiceContent = {
  meta: {
    title: 'Automated Document Flow | Architeq',
    description: 'Documents that write themselves. Processes that follow through. We automate the full lifecycle of business documentation — from creation to compliance — with regulatory requirements.'
  },
  hero: {
    title: 'Automated Document Flow',
    description: 'Documents that write themselves. Processes that follow through. We automate the full lifecycle of business documentation — from creation to compliance — with regulatory requirements.',
    primaryButton: { text: 'See How It Works', href: '#how-it-works' },
    secondaryButton: { text: 'View Related Case Studies', href: '/cases?tag=Documents%20Generation' }
  },
  sections: [
    {
      id: 'what-is-automated-document-flow',
      title: 'What Is Automated Document Flow?',
      content: 'Automated document flow means your forms, contracts, and internal docs are created, filled, sent, signed, and stored — without manual work.',
      fullContent: 'Automated document flow means your forms, contracts, and internal docs are created, filled, sent, signed, and stored — without manual work.\n\nInstead of chasing files and copying data between systems, automation ensures everything moves through your business faster, more accurately, and with full compliance.\n\nOur solutions connect directly to your CRM and key tools, generating documents based on real-time data and guiding them through approval, signature, and storage — all in one seamless flow.'
    },
    {
      id: 'common-challenges',
      title: 'Common Document Challenges',
      cards: [
        {
          title: 'Time-Consuming Manual Processes',
          description: 'Staff spending hours creating documents and manually entering data'
        },
        {
          title: 'Errors and Inconsistencies',
          description: 'Typos, outdated information, and formatting inconsistencies'
        },
        {
          title: 'Signing Delays',
          description: 'Long waiting times for document approval and signature collection'
        }
      ]
    },
    {
      id: 'business-outcomes',
      title: 'Business Outcomes',
      cards: [
        {
          title: 'Time Savings',
          description: 'Reduce document creation and processing time by up to 90%, freeing your team for higher-value activities.'
        },
        {
          title: 'Error Reduction',
          description: 'Eliminate manual data entry errors that can lead to costly mistakes and compliance issues.'
        },
        {
          title: 'Improved Compliance',
          description: 'Ensure consistent document formatting and content that meets regulatory requirements.'
        },
        {
          title: 'Enhanced Customer Experience',
          description: 'Provide a seamless, modern experience for customers submitting information and signing documents.'
        }
      ]
    },
    {
      id: 'what-you-can-automate',
      title: 'What You Can Automate',
      cards: [
        {
          title: 'Document Management',
          description: 'End-to-end document automation — from CRM- or form-powered generation and structuring to version control and compliance.',
          features: [
            'No more manual input, copy-paste, or edits',
            'Unified formatting — no version chaos',
            'Consistent, error-free content',
            'Cut prep time by up to 90%',
            'Intelligent file classification and search',
            'Role-based permission controls'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Documents%20Generation'
        },
        {
          title: 'E-Signature',
          description: 'Streamline your document signing process with seamless electronic signature integration directly from your CRM.',
          features: [
            'Accelerate document signing cycle',
            'Track signing status in real time',
            'Automatic reminders for pending signatures',
            'Secure and legally compliant process'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=E-Signature'
        },
        {
          title: 'Web Forms',
          description: 'Custom web forms connected to your CRM and other business systems — enriched with autofill logic and smart routing.',
          features: [
            'Capture lead and client information without manual entry',
            'Ensure data validation at point of entry',
            'Automatically trigger workflows based on form submissions',
            'Improve user experience with modern, responsive forms'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Web%20Forms'
        }
      ]
    },
    {
      id: 'how-it-works',
      title: 'How We Work Through Your Workflow',
      description: 'From process discovery to system design — we break down complex operations into clear, actionable steps and build automations that bring measurable value.',
      workflow: [
        {
          title: 'Step 0: Alignment, NDA & Kickoff',
          description: 'We start with a short alignment call to understand your business case and goals. After signing an NDA, we onboard your team and set the ground rules for collaboration.',
          deliverables: [
            'Signed NDA',
            'Initial scope definition',
            'Stakeholder alignment'
          ]
        },
        {
          title: 'Step 1: Process & Template Discovery',
          description: 'We analyze your current document flows, form inputs, approval chains, and storage structure. We also audit existing templates and identify where automation will provide the most impact.',
          deliverables: [
            'Visual flow of your current process',
            'Inventory of document types & use cases',
            'Prioritized list of automation opportunities'
          ]
        },
        {
          title: 'Step 2: Solution Design & Wireframing',
          description: 'We design the full document flow — from generation to signing — with data sources, triggers, approval logic, and destinations. Every component is planned and validated before development.',
          deliverables: [
            'Document automation map',
            'Data source connections (e.g., CRM, forms)',
            'Signing & approval workflow logic'
          ]
        },
        {
          title: 'Step 3: Template Development & Integration',
          description: 'We build dynamic document templates and connect them to your systems. This includes conditional logic, variable fields, branded formatting, and legal compliance.',
          deliverables: [
            'Reusable document templates',
            'Connected web forms (if needed)',
            'CRM/e-signature platform integration'
          ]
        },
        {
          title: 'Step 4: Pilot Launch & Iteration',
          description: 'We launch the solution in a controlled environment, collect feedback, and refine based on real user behavior. Quick adjustments are made before full rollout.',
          deliverables: [
            'Working MVP of document automation',
            'Feedback loop from your users',
            'Adjustments based on live test cases'
          ]
        },
        {
          title: 'Step 5: Rollout, Training & Support',
          description: 'Once finalized, we launch the system across your teams. We provide training materials, live support, and documentation for internal use.',
          deliverables: [
            'Documented how-to guides',
            'Video walkthroughs',
            'Ongoing optimization as your needs evolve'
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How secure are automated document solutions?',
          answer: 'Our document automation solutions implement industry-standard security measures, including encryption, secure access controls, and audit trails. We ensure compliance with relevant regulations such as GDPR and can implement additional security measures based on your specific requirements.'
        },
        {
          question: 'Can I still customize documents after automation?',
          answer: 'Absolutely. Our document automation solutions allow for both automated generation and manual customization when needed. You can set up templates with fixed elements and variable sections that can be edited on a case-by-case basis.'
        },
        {
          question: 'How long does implementation typically take?',
          answer: 'Implementation time varies based on the complexity of your documents and workflows. Simple document automation can be implemented in 2-3 weeks, while more complex solutions with multiple integrations might take 4-8 weeks. We will provide a detailed timeline during our initial consultation.'
        },
        {
          question: 'Are electronic signatures legally binding?',
          answer: 'Yes, electronic signatures are legally binding in most countries under laws such as the ESIGN Act in the US and eIDAS in the EU. Our solutions use compliant e-signature technologies that meet legal requirements, including authentication, consent, and record retention.'
        }
      ]
    },
    {
      id: 'integration-options',
      title: 'Integration Options',
      content: 'We tailor our tech stack to each project — the tools below are just a snapshot of what we work with.',
      logoCards: [
        { 
          title: 'CRM Systems',
          logos: [
            { name: 'Monday.com', logo: '/images/tools/mondaycom.svg' },
            { name: 'HubSpot', logo: '/images/tools/hubspot.svg' },
            { name: 'Salesforce', logo: '/images/tools/salesforce.svg' },
            { name: 'Pipedrive', logo: '/images/tools/pipedrive.svg' }
          ]
        },
        {
          title: 'E-Signature Platforms',
          logos: [
            { name: 'DocuSign', logo: '/images/tools/docusign.svg' },
            { name: 'PandaDoc', logo: '/images/tools/pandadoc.svg' },
            { name: 'SignNow', logo: '/images/tools/signnow.svg' },
            { name: 'Adobe Sign', logo: '/images/tools/adobe-sign.svg' }
          ]
        },
        {
          title: 'Form & Document Tools',
          logos: [
            { name: 'JotForm', logo: '/images/tools/jotform.svg' },
            { name: 'Typeform', logo: '/images/tools/typeform.svg' },
            { name: 'Google Forms', logo: '/images/tools/google-forms.svg' },
            { name: 'Google Docs', logo: '/images/tools/google-docs.svg' }
          ]
        }
      ]
    }
  ],
  cta: {
    title: 'Ready to Streamline the Flow?',
    description: 'Trust our team to map your processes and uncover automation potential.',
    buttons: [
      { text: 'See How It Works', href: '/schedule-call', isPrimary: true },
      { text: 'View Our Case Studies', href: '/cases', isPrimary: false }
    ]
  }
}