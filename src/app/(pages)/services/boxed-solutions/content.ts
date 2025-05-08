import { ServiceContent } from '@/components/templates/service-template'

export const BoxedSolutionsContent: ServiceContent = {
  meta: {
    title: 'Industry-Specific Boxed Solutions | Architeq',
    description: 'Ready-to-run automation kits tailored to your industry — deployed fast, scaled smart, and fully customized for your edge.'
  },
  hero: {
    title: 'Industry-Specific Boxed Solutions',
    description: 'Ready-to-run automation kits tailored to your industry — deployed fast, scaled smart, and fully customized for your edge.',
    primaryButton: { text: 'See How It Works', href: '#how-it-works' },
    secondaryButton: { text: 'View Related Case Studies', href: '/cases?tag=Boxed%20Solution' }
  },
  sections: [
    {
      id: 'what-are-boxed-solutions',
      title: 'What Are Boxed Solutions?',
      content: 'Boxed solutions are pre-configured automation frameworks designed specifically for particular industries — fast to deploy, proven to work, and easy to tailor.',
      fullContent: 'Boxed solutions are pre-configured automation frameworks designed specifically for particular industries — fast to deploy, proven to work, and easy to tailor.\n\nBuilt on our deep experience in business automation and vertical-specific processes, each solution comes with ready-to-go workflows, integrations, and templates that solve the most common (and costly) operational bottlenecks in your industry.\n\nOur boxed solutions provide faster implementation times, lower costs, and proven results compared to building automation solutions from scratch, while still allowing for the customization needed to match your unique business processes.',
      cards: [
        {
          title: 'Who Benefits Most:',
          description: 'Industry leaders seeking competitive operational advantages\nOperations teams dealing with industry-specific workflow challenges\nGrowing companies who need rapid automation deployment\nOrganizations wanting proven solutions rather than experimental approaches'
        }
      ]
    },
    {
      id: 'business-outcomes',
      title: 'Business Outcomes',
      cards: [
        {
          title: 'Quick Deployment',
          description: 'Start seeing results in weeks instead of months with our pre-configured automation packages tailored to your industry's needs.'
        },
        {
          title: 'Industry Best Practices',
          description: 'Leverage proven industry best practices based on years of experience working with similar businesses.'
        },
        {
          title: 'Cost Efficiency',
          description: 'Minimize costs by using ready-made solutions that require minimal customization, giving you a powerful tool at a fraction of the cost of a custom build.'
        },
        {
          title: 'Proven Results',
          description: 'Our boxed solutions have delivered measurable results for similar businesses in your industry.'
        }
      ]
    },
    {
      id: 'what-you-can-automate',
      title: 'What You Can Automate',
      cards: [
        {
          title: 'Car Hauling Companies',
          description: 'Manage dispatch, pricing, payments, and logistics in one streamlined workflow.',
          features: [
            'Unified CRM with full order lifecycle tracking',
            'Automated delivery cost and transportation pricing',
            'QuickBooks & factoring integration',
            'Digital document flow without delays'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Car%20Hauling'
        },
        {
          title: 'Kitchen Cabinetry Manufacturers',
          description: 'Connect design to production and track materials in real time for faster delivery.',
          features: [
            'Seamless link between orders and design software',
            'Automated production task assignments',
            'Real-time material inventory tracking',
            'Live dashboards for project tracking',
            'Fully automated document flow from quotes to delivery'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Manufacturing'
        },
        {
          title: 'Music Labels',
          description: 'Automatically manage catalogs, royalties, and rights in a single system.',
          features: [
            'Centralized music asset and catalog management',
            'Royalty calculations that run themselves',
            'Instant document generation for contracts, splits, and reports',
            'Copyright control',
            'Automated vendor payments'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Music%20Industry'
        },
        {
          title: 'Real Estate Companies',
          description: 'Capture leads, automate follow-ups, and close deals faster with full visibility.',
          features: [
            'Lead capture and auto-qualification',
            'Calendar sync for showings',
            'Smart client reminders and status updates',
            'Document automation for listings and closings',
            'Analytics by agent and property'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Real%20Estate'
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
          description: 'We confirm the fit between your needs and our boxed solution, secure confidentiality, and align on project scope, timing, and team structure.',
          deliverables: [
            'NDA & access checklist',
            'Assigned project manager and delivery team',
            'High-level scope confirmation',
            'Kickoff deck & working timeline'
          ]
        },
        {
          title: 'Step 1: Process Review & Fit Analysis',
          description: 'We analyze your existing workflows to understand where and how our boxed solution aligns — and what needs minor adjustment for a seamless fit.',
          deliverables: [
            'Mapped current workflows (dispatch, sales, finance, etc.)',
            'Gap-fit analysis against our boxed solution',
            'Tailoring checklist (terminology, rules, UI tweaks)'
          ]
        },
        {
          title: 'Step 2: Tailored Configuration',
          description: 'We configure the boxed solution based on your unique process flow, terminology, and system architecture — with no need to reinvent the wheel.',
          deliverables: [
            'Pre-built system configured to your workflow',
            'Custom field mapping and process routing',
            'Template adjustments (documents, forms, notifications)',
            'Role-based user access setup'
          ]
        },
        {
          title: 'Step 3: Data Import & Light Integration',
          description: 'We import essential data and connect the boxed solution to your existing systems (accounting, CRM, ERPs, etc.) via light integrations or API plug-ins.',
          deliverables: [
            'Import-ready templates for clients, jobs, payments',
            'Pre-mapped fields for upload',
            'Quick integrations via APIs, file sync, or connectors',
            'Sync validation report'
          ]
        },
        {
          title: 'Step 4: Testing & Go-Live',
          description: 'We test core workflows, confirm integrations, and launch — often in days, not weeks — with minimal disruption and maximum confidence.',
          deliverables: [
            'Pre-written test cases & validation checklist',
            'User Acceptance Testing (UAT)',
            'Go-live launch plan'
          ]
        },
        {
          title: 'Step 5: Training & Handoff',
          description: 'We train your team on the adapted system and hand over full control, ensuring your staff is equipped to work efficiently from day one.',
          deliverables: [
            'Live training (recorded sessions included)',
            'Role-based user manuals',
            'Knowledge base access',
            'Admin control panel walkthrough'
          ]
        },
        {
          title: 'Step 6: Post-Launch Support & Optimization',
          description: 'After go-live, we monitor performance and provide support, with optional enhancements as your needs evolve — keeping your solution sharp and relevant.',
          deliverables: [
            'SLA-based support',
            'Dedicated support channel',
            'Minor post-launch tweaks',
            'Optimization roadmap (optional add-on)'
          ]
        }
      ]
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'See how our solutions have helped businesses streamline operations and improve efficiency.',
      filterTag: 'Boxed Solution'
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How much customization is possible with boxed solutions?',
          answer: 'While our boxed solutions come pre-configured, they are highly customizable. We can adapt them to your specific workflows, terminology, and processes while maintaining the core functionality that makes them efficient.'
        },
        {
          question: 'How long does implementation typically take?',
          answer: 'Implementation time for boxed solutions is typically 3-6 weeks, depending on the complexity of your business and any customizations needed. This is significantly faster than building custom solutions from scratch.'
        },
        {
          question: 'Can boxed solutions integrate with our existing systems?',
          answer: 'Yes, our boxed solutions are designed to integrate with common industry tools and software. We handle all aspects of integration to ensure seamless data flow between your existing systems and the new solution.'
        },
        {
          question: 'What if my industry is not listed?',
          answer: 'If you don't see a boxed solution for your specific industry, we can still help. We can either adapt an existing solution or develop a custom solution tailored to your industry's unique requirements.'
        }
      ]
    },
    {
      id: 'custom-solution',
      title: 'Don't See Your Industry?',
      customContent: {
        title: 'Don't See Your Industry?',
        description: 'If you don't see a boxed solution for your specific industry, don't worry. We also offer custom automation solutions tailored to your unique business needs.',
        additionalContent: 'Our team of experts will analyze your workflows, identify automation opportunities, and develop a solution that addresses your specific challenges.',
        conclusion: 'Didn't see your industry listed? If our boxed solutions don't align perfectly with your workflows, we'll tailor one that does. We start with what works — proven automation modules — and adapt them to your unique operations for faster time-to-value. You'll get a rapid analysis of your workflows, a custom-fit automation built on solid foundations, and a solution delivered with minimal disruption and maximum efficiency. Let's build the right fit — without starting from scratch.',
        cta: { text: 'Learn About Custom Solutions', href: '/services' }
      }
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