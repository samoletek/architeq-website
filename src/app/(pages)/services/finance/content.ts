import { ServiceContent } from '@/components/templates/service-template'

export const FinanceContent: ServiceContent = {
  meta: {
    title: 'Finance Operations Automation | Architeq',
    description: 'Connect and automate your full financial stack — from invoicing to reconciliation — for faster, cleaner, and error-free money flow.'
  },
  hero: {
    title: 'Finance Operations Automation',
    description: 'Connect and automate your full financial stack — from invoicing to reconciliation — for faster, cleaner, and error-free money flow.',
    primaryButton: { text: 'See How It Works', href: '#how-it-works' },
    secondaryButton: { text: 'View Related Case Studies', href: '/cases?tag=Stripe%20Invoicing' }
  },
  sections: [
    {
      id: 'what-is-finance-automation',
      title: 'What Is Finance Operations Automation?',
      content: 'Financial systems integration is the process of connecting your financial tools—such as accounting software, payment processors, and banking platforms—with your CRM and other business systems to create a seamless flow of financial data across your organization.',
      fullContent: 'Financial systems integration is the process of connecting your financial tools—such as accounting software, payment processors, and banking platforms—with your CRM and other business systems to create a seamless flow of financial data across your organization.\n\nThis integration eliminates manual data entry, reduces errors, accelerates financial processes, and provides real-time financial visibility throughout your business.\n\nOur approach focuses on creating secure, reliable connections between your existing financial systems and operational tools, automating financial workflows while maintaining data integrity and compliance.'
    },
    {
      id: 'common-challenges',
      title: 'Common Financial Challenges',
      cards: [
        {
          title: 'Duplicate Work, Manual Entry',
          description: 'Teams waste hours re-entering the same financial data across disconnected systems.'
        },
        {
          title: 'Payment Delays & Chasing',
          description: 'Late invoices, no reminders, and slow follow-ups lead to cash flow gaps.'
        },
        {
          title: 'Error-Prone Reconciliation',
          description: 'Manual matching of payments to records creates mistakes and drains productivity.'
        },
        {
          title: 'Lack of Financial Clarity',
          description: 'No unified, real-time view of your financial health — just scattered spreadsheets.'
        }
      ]
    },
    {
      id: 'business-outcomes',
      title: 'Business Outcomes',
      cards: [
        {
          title: 'Improved Cash Flow',
          description: 'Automate invoicing, reminders, and reconciliation to get paid faster and reduce receivables.'
        },
        {
          title: 'Lower Admin Costs',
          description: 'Eliminate manual data entry and save hours of back-office time every week.'
        },
        {
          title: 'Financial Transparency',
          description: 'Gain real-time visibility into your financial status across all connected systems and platforms.'
        },
        {
          title: 'Built-In Compliance',
          description: 'Ensure consistent financial record-keeping and reporting that meets regulatory requirements.'
        }
      ]
    },
    {
      id: 'what-you-can-automate',
      title: 'What You Can Automate',
      cards: [
        {
          title: 'Invoice Automation',
          description: 'Trigger invoice generation directly from CRM events. Send, track, and follow up — automatically.',
          features: [
            'Automatic invoice generation based on CRM triggers',
            'Immediate delivery to clients via email or client portal',
            'Real-time payment tracking and status updates',
            'Automated reminders for overdue payments'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Stripe%20Invoicing'
        },
        {
          title: 'Accounting System Integration',
          description: 'Sync financial data between your CRM, ERP, and accounting platforms.',
          features: [
            'Two-way CRM sync across all tools',
            'Auto-match transactions',
            'Eliminate double entry',
            'Consolidated reporting'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Accounting%20Integration'
        },
        {
          title: 'Payment Processing',
          description: 'Connect payment gateways for fast, secure, and seamless collections.',
          features: [
            'Multiple payment method support (credit cards, ACH, etc.)',
            'Automatic payment status updates in CRM',
            'Secure payment processing with compliance focus',
            'Reduced payment delays and improved cash flow'
          ]
        },
        {
          title: 'Financial Reports & Dashboards',
          description: 'Create custom financial dashboards and automated reports for better business visibility.',
          features: [
            'Real-time financial performance visualization',
            'Customizable KPIs and metrics tracking',
            'Automatic scheduled report distribution',
            'Data-driven financial decision making'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Dashboard'
        },
        {
          title: 'Factoring Automation',
          description: 'Streamline invoice factoring: from identifying eligible invoices to platform submission and advance tracking — all automated.',
          features: [
            'Instantly aggregate eligible invoices from your CRM',
            'Auto-generate compliant, ready-to-submit reports',
            'Push data directly to factoring platforms — no exports needed',
            'Track factoring status and cash advance progress right inside your CRM'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Factoring'
        },
        {
          title: 'Complex Financial Calculations',
          description: 'Let automation handle commissions, payroll, dynamic pricing, and more.',
          features: [
            'Custom calculation engines for specific business needs',
            'Multi-variable formula support with conditional logic',
            'Automatic updates when variables change',
            'Integration with payment and accounting systems'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Calculations'
        }
      ]
    },
    {
      id: 'how-it-works',
      title: 'How We Work Through Your Workflow',
      description: 'From process discovery to system design — we break down complex operations into clear, actionable steps and build automations that bring measurable value.',
      workflow: [
        {
          title: 'Step 1: Financial Process Assessment',
          description: 'We audit your current finance stack, workflows, and bottlenecks to uncover where automation will bring the most value.',
          deliverables: [
            'Process map of your finance operations',
            'Pain point analysis',
            'Automation opportunities roadmap'
          ]
        },
        {
          title: 'Step 2: Solution Design',
          description: 'We architect a tailored integration and automation plan that connects your CRM, ERP, and accounting systems into a unified financial flow.',
          deliverables: [
            'Custom automation blueprint',
            'System connection strategy',
            'Compliance & data security plan'
          ]
        },
        {
          title: 'Step 3: Data Mapping & Workflow Setup',
          description: 'We align data fields and triggers across platforms to ensure clean, synchronized financial processes.',
          deliverables: [
            'Cross-system data mapping',
            'Workflow rules and logic',
            'Trigger-based automation paths'
          ]
        },
        {
          title: 'Step 4: Integration & Testing',
          description: 'We implement the integrations, sync your systems, and run thorough QA to ensure accuracy, reliability, and performance.',
          deliverables: [
            'Working financial automations',
            'End-to-end test cases',
            'Live sandbox'
          ]
        },
        {
          title: 'Step 5: Training & Deployment',
          description: 'We onboard your finance team, ensure they're confident with the new tools, and deploy without disrupting day-to-day operations.',
          deliverables: [
            'Staff onboarding sessions',
            'User documentation',
            'Go-live support'
          ]
        },
        {
          title: 'Step 6: Support & Optimization',
          description: 'We monitor performance, resolve issues quickly, and optimize flows as your business grows and evolves.',
          deliverables: [
            'SLA-based support',
            'Regular performance reviews',
            'Iterative updates and tuning'
          ]
        }
      ]
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'See how our solutions have helped businesses streamline operations and improve efficiency.',
      filterTag: 'Finance' // This will filter all cases with finance-related tags
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How will automation affect our accounting team?',
          answer: 'It won't replace them — it empowers them. By eliminating manual input and repetitive tasks, your team can focus on higher-value work like financial planning, reporting, and strategy.'
        },
        {
          question: 'Is our financial data secure during integration?',
          answer: 'Absolutely. We use bank-grade encryption, secure APIs, and strict access controls. All integrations follow financial industry standards, and we'll collaborate with your IT/security team to meet internal policies.'
        },
        {
          question: 'How long does implementation take?',
          answer: 'It depends on complexity. Simple integrations take 3—4 weeks; more advanced projects typically take 8—12 weeks. We'll define a clear timeline after the initial assessment.'
        },
        {
          question: 'Can you integrate with our legacy systems?',
          answer: 'Yes, we have experience integrating with a wide range of financial systems, including legacy software. As long as your system provides some form of data access (API, database connection, file imports/exports), we can develop a solution to integrate it with your modern business tools.'
        }
      ]
    },
    {
      id: 'integration-options',
      title: 'Integration Options',
      content: 'We tailor our tech stack to each project — the tools below are just a snapshot of what we work with.',
      logoCards: [
        {
          title: 'Accounting Systems',
          logos: [
            { name: 'QuickBooks Online', logo: '/images/tools/quickbooks.svg' },
            { name: 'QuickBooks Desktop', logo: '/images/tools/quickbooks-desktop.svg' },
            { name: 'Xero', logo: '/images/tools/xero.svg' },
            { name: 'FreshBooks', logo: '/images/tools/freshbooks.svg' },
            { name: 'Sage', logo: '/images/tools/sage.svg' }
          ]
        },
        {
          title: 'Payment Processors',
          logos: [
            { name: 'Stripe', logo: '/images/tools/stripe.svg' },
            { name: 'PayPal', logo: '/images/tools/paypal.svg' },
            { name: 'Square', logo: '/images/tools/square.svg' },
            { name: 'Authorize.net', logo: '/images/tools/authorize.svg' },
            { name: 'Braintree', logo: '/images/tools/braintree.svg' }
          ]
        },
        {
          title: 'Financial Services',
          logos: [
            { name: 'Factoring Platforms', logo: '/images/tools/factoring.svg' },
            { name: 'Bill.com', logo: '/images/tools/billcom.svg' },
            { name: 'Expensify', logo: '/images/tools/expensify.svg' },
            { name: 'Banking APIs', logo: '/images/tools/banking.svg' },
            { name: 'Payroll Systems', logo: '/images/tools/payroll.svg' }
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