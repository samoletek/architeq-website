import { ServiceContent } from '@/components/templates/service-template'

export const CrmIntegrationContent: ServiceContent = {
  meta: {
    title: 'CRM Integration Services | Architeq',
    description: 'No more scattered data — we integrate your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.'
  },
  hero: {
    title: 'CRM Integration Services',
    description: 'No more scattered data — we integrate your first real CRM and turn your operations into a unified ecosystem with full visibility, structure, and flow across tools, teams, and touchpoints.',
    primaryButton: { text: 'See How It Works', href: '#how-it-works' },
    secondaryButton: { text: 'View Related Case Studies', href: '/cases?tag=CRM%20Integration' }
  },
  sections: [
    {
      id: 'what-is-crm-integration',
      title: 'What Is CRM Integration?',
      content: 'CRM Integration means designing a centralized, custom-built system where all your company's processes, data, and communication flow through one hub. We don't just connect tools — we analyze how your business works, rebuild processes from the ground up, and build a CRM tailored to your real-world operations.',
      fullContent: 'CRM Integration means designing a centralized, custom-built system where all your company's processes, data, and communication flow through one hub. We don't just connect tools — we analyze how your business works, rebuild processes from the ground up, and build a CRM tailored to your real-world operations.\n\nThe result: streamlined workflows, complete data traceability, and automated processes that support scale.'
    },
    {
      id: 'trusted-crm-systems',
      title: 'Trusted CRM Systems We Integrate',
      content: 'We tailor our tech stack to each project — the tools below are just a snapshot of what we work with.',
      logoCards: [
        { name: 'Monday.com', logo: '/images/tools/mondaycom.svg' },
        { name: 'HubSpot', logo: '/images/tools/hubspot.svg' },
        { name: 'Salesforce', logo: '/images/tools/salesforce.svg' },
        { name: 'Zoho CRM', logo: '/images/tools/zoho.svg' },
        { name: 'Pipedrive', logo: '/images/tools/pipedrive.svg' }
      ]
    },
    {
      id: 'business-outcomes',
      title: 'Business Outcomes',
      cards: [
        {
          title: 'Unified Data Environment',
          description: 'Create a single source of truth – maintain consistency and traceability of data across your organization. Free up time, reduce human error, and speed up response with streamlined workflows and automation.'
        },
        {
          title: 'Cross-System Automation',
          description: 'Trigger actions, sync data, and run logic across platforms — with zero repetitive tasks.'
        },
        {
          title: 'Unified Operational Architecture',
          description: 'Create a structured, centralized system that integrates all key tools and workflows into your CRM. Track, manage, and optimize internal processes with full transparency.'
        },
        {
          title: 'Real-time Insights',
          description: 'Access up-to-date information. Build dashboards designed around your processes to surface key metrics and trends in real time.'
        }
      ]
    },
    {
      id: 'how-it-works',
      title: 'How We Work Through Your Workflow',
      description: 'From process discovery to full CRM implementation — we guide you through every phase of building a smart, scalable system tailored to your operations.',
      workflow: [
        {
          title: 'Step 0: NDA & Kickoff',
          description: 'Before we begin, we sign an NDA and hold a quick kickoff session to ensure we're aligned on goals, resources, and expectations.',
          deliverables: [
            'Signed NDA for confidentiality and security',
            'Kickoff session with key stakeholders',
            'Initial checklist to access tools and resources'
          ]
        },
        {
          title: 'Step 1: Stakeholder Interviews & Insight Gathering',
          description: 'We speak to your key team members to understand real workflows, pain points, and what success looks like.',
          deliverables: [
            'Interview summaries',
            'Process inventory by role and department',
            'Operational pain points and success metrics'
          ]
        },
        {
          title: 'Step 2: Review & Audit of Existing Systems',
          description: 'We take a deep dive into your current systems and workflows to identify inefficiencies, risks, and opportunities for improvement.',
          deliverables: [
            'System audit report',
            'Audit of related systems (email, docs, payments, support, etc.)',
            'List of missing connections or data gaps'
          ]
        },
        {
          title: 'Step 3: Process Mapping & Blueprint',
          description: 'We document your operational workflows and create a blueprint for an integrated system that centralizes everything in one place.',
          deliverables: [
            'Visual workflow map to guide future system design',
            'Data flow architecture between systems',
            'Tailored tool recommendations based on your needs'
          ]
        },
        {
          title: 'Step 4: Alignment & Planning',
          description: 'We present the solution concept, finalize the tech stack, and align on timelines, milestones, and priorities to ensure we're on track for success.',
          deliverables: [
            'Full project roadmap',
            'Agreed scope & milestones',
            'Finalized tech stack, tool selection, and implementation timeline'
          ]
        },
        {
          title: 'Step 5: Validation, Testing & Rollout',
          description: 'We start with a limited-scope pilot CRM integration — to test assumptions, validate logic, and refine as needed.',
          deliverables: [
            'Pilot version of the CRM',
            'Feedback loop & rapid adjustments',
            'Go/no-go validation checkpoint'
          ]
        },
        {
          title: 'Step 6: Full CRM System Build',
          description: 'We build a robust CRM system and integrate it with your selected tools and data — using platforms like Make, Zapier, n8n, or custom APIs.',
          deliverables: [
            'Fully configured CRM setup',
            'Error handling & fallback logic',
            'Process automations across tools'
          ]
        },
        {
          title: 'Step 7: Testing, QA & Launch',
          description: 'Before go-live, we run thorough tests and prepare your team for the rollout.',
          deliverables: [
            'QA and issue resolution',
            'Production launch of CRM',
            'Final bug fixes & adjustments'
          ]
        },
        {
          title: 'Step 8: Team Enablement & Knowledge Transfer',
          description: 'We equip your team with all the training they need to hit the ground running — from video tutorials to detailed guides and support documentation.',
          deliverables: [
            'Loom-videos',
            'Step-by-step SOPs and user guides',
            'Support documentation'
          ]
        },
        {
          title: 'Step 9: Ongoing Monitoring & Optimization',
          description: 'We keep an eye on everything after launch — ready to adjust, improve, and scale as your business evolves.',
          deliverables: [
            'On-demand support',
            'Recommendations for ongoing optimization',
            'Continuous system monitoring for optimal performance'
          ]
        }
      ]
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'See how our solutions have helped businesses streamline operations and improve efficiency.',
      filterTag: 'CRM Integration'
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'Which CRM systems do you build?',
          answer: 'We work with all leading CRM platforms — including Monday.com, Salesforce, HubSpot, Zoho, Pipedrive, and Microsoft Dynamics. Our approach is tool-agnostic: we select the best system based on your workflows, tech stack, and long-term goals.'
        },
        {
          question: 'Will building a new CRM disrupt our operations?',
          answer: 'No, we take a step-by-step approach — using sandbox environments, careful data migration, and thorough testing to ensure smooth rollout with zero downtime.'
        },
        {
          question: 'How long does it take to build a full CRM system from scratch?',
          answer: 'Most full CRM implementations take 4–8 weeks. The exact timing depends on complexity, but you'll receive a clear, milestone-based roadmap after our initial discovery.'
        },
        {
          question: 'Can we bring data from spreadsheets and disconnected systems?',
          answer: 'Absolutely. We transform scattered spreadsheets, shared drives, and outdated tools into structured, searchable CRM data — cleaned, migrated, and ready for action.'
        },
        {
          question: 'Can you integrate custom or legacy systems?',
          answer: 'Yes, we specialize in complex integrations, including custom-built and legacy systems. As long as the system provides some form of data access (API, database, file exports), we can develop a solution to integrate it with a CRM.'
        },
        {
          question: 'What if we already have a CRM, but it's not working well?',
          answer: 'We can audit and optimize your current system, or recommend a new platform that better suits your business. Either way, our goal is to build a system that actually works for you.'
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