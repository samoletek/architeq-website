import { ServiceContent } from '@/components/templates/service-template'

export const AiSolutionsContent: ServiceContent = {
  meta: {
    title: 'AI-Powered Solutions | Architeq',
    description: 'Use AI to automate what truly matters — from client comms to operations logic, only where it drives real value.'
  },
  hero: {
    title: 'AI-Powered Solutions',
    description: 'Use AI to automate what truly matters — from client comms to operations logic, only where it drives real value.',
    primaryButton: { text: 'See How It Works', href: '#how-it-works' },
    secondaryButton: { text: 'View Related Case Studies', href: '/cases?tag=AI-Voice%20Bot' }
  },
  sections: [
    {
      id: 'what-are-ai-solutions',
      title: 'What Are AI-Powered Solutions?',
      content: 'AI-powered solutions are not just about automation — they're about targeted intelligence embedded directly into your workflows. We apply AI tools where they bring real value: saving time, reducing errors, and surfacing insights that drive better decisions.',
      fullContent: 'AI-powered solutions are not just about automation — they're about targeted intelligence embedded directly into your workflows. We apply AI tools where they bring real value: saving time, reducing errors, and surfacing insights that drive better decisions.\n\nOur approach isn't about replacing people — it's about removing repetitive work, structuring unstructured data, and giving your team tools to act faster and smarter.'
    },
    {
      id: 'ai-tools',
      title: 'AI Tools We Use',
      content: 'We tailor our tech stack to each project — the tools below are just a snapshot of what we work with.',
      logoCards: [
        { name: 'Play.ht', logo: '/images/tools/play-ht.svg' },
        { name: 'Eleven Labs', logo: '/images/tools/eleven-labs.svg' },
        { name: 'OpenAI', logo: '/images/tools/openai.svg' },
        { name: 'Claude', logo: '/images/tools/claude.svg' },
        { name: 'Retool', logo: '/images/tools/retool.svg' },
        { name: 'Perplexity', logo: '/images/tools/perplexity.svg' }
      ]
    },
    {
      id: 'business-outcomes',
      title: 'Business Outcomes',
      cards: [
        {
          title: 'Time Efficiency',
          description: 'Automate complex tasks that would take humans hours to complete, freeing up your team for high-value activities.'
        },
        {
          title: 'Data Analysis',
          description: 'Process and analyze large volumes of data to uncover patterns and insights that humans might miss.'
        },
        {
          title: '24/7 Availability',
          description: 'AI systems can work around the clock without breaks, ensuring continuous service for your customers.'
        },
        {
          title: 'Scalability',
          description: 'Handle fluctuating workloads without needing to hire additional staff during peak periods.'
        }
      ]
    },
    {
      id: 'solutions',
      title: 'Our Solutions',
      cards: [
        {
          title: 'AI Voice Bots',
          description: 'Interactive voice assistants that handle customer inquiries, route and resolve calls, book appointments, and collect information — all without human intervention.',
          features: [
            '24/7 automated call handling',
            'Reduction in staff workload',
            'Consistent customer experience',
            'Scalable to handle volume fluctuations'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=AI-Voice%20Bot'
        },
        {
          title: 'CRM AI Assistants',
          description: 'Your personal assistant inside the CRM — answers questions, finds data, explains processes, and makes your team faster without adding headcount.',
          features: [
            'Instant answers to any CRM-related query',
            'Improved decision making with complete data',
            'Speeds up onboarding reducing training time',
            'Secure, permission-based access to sensitive data'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=AI%20Assistant'
        },
        {
          title: 'Communication Analysis',
          description: 'Get full visibility into every conversation. Our AI transcribes, analyzes, and highlights what matters — so you can act fast.',
          features: [
            'Quality control automation',
            'Identification of script deviations',
            'Recognition of emotional tone',
            'Auto-generated insights for training and QA'
          ],
          cta: 'View Related Case Study',
          href: '/cases?tag=Communication%20Analysis'
        },
        {
          title: 'Predictive Analytics',
          description: 'AI-powered forecasting tools that analyze historical data to predict customer behavior, sales trends, and business opportunities.',
          features: [
            'More accurate sales forecasting',
            'Proactive customer retention',
            'Inventory optimization',
            'Data-driven strategic planning'
          ]
        }
      ]
    },
    {
      id: 'how-it-works',
      title: 'How We Work Through Your Workflow',
      description: 'From process discovery to system design — we break down complex operations into clear, actionable steps and build automations that bring measurable value.',
      workflow: [
        {
          title: 'Step 0: NDA & Kickoff',
          description: 'We start with alignment — a quick kickoff and NDA so we can dive deep into your business context with full confidentiality.',
          deliverables: [
            'NDA signed',
            'Initial project overview',
            'Checklist of materials & accesses needed'
          ]
        },
        {
          title: 'Step 1: Stakeholder Interviews & Insight Gathering',
          description: 'We run short interviews with your team to map pain points, uncover inefficiencies, and identify where AI can bring real value.',
          deliverables: [
            'Pain point map',
            'Process overview',
            'Opportunities for AI impact'
          ]
        },
        {
          title: 'Step 2: AI Opportunity Mapping & Feasibility',
          description: 'We identify where AI is a good fit — and where it's not. Together, we prioritize use cases that will make a measurable impact.',
          deliverables: [
            'List of viable AI use cases',
            'Prioritization by effort vs. value',
            'Risk & feasibility notes'
          ]
        },
        {
          title: 'Step 3: Solution Design & Data Prep',
          description: 'We design the solution logic, select tools, and prepare data for fine-tuning or API integration.',
          deliverables: [
            'AI solution blueprint',
            'Data mapping',
            'Tool & integration architecture'
          ]
        },
        {
          title: 'Step 4: Pilot & Feedback Loop',
          description: 'We launch a controlled pilot of the AI feature — with a limited audience or use case — to validate value and refine logic.',
          deliverables: [
            'Working MVP (voice bot, assistant, dashboard, etc.)',
            'Feedback session with stakeholders',
            'Adjustment plan based on real usage'
          ]
        },
        {
          title: 'Step 5: Full Implementation & Rollout',
          description: 'We expand the pilot into full-scale production, integrating with your tools and ensuring reliability and compliance.',
          deliverables: [
            'Final deployed solution',
            'Admin & usage documentation',
            'Error handling'
          ]
        },
        {
          title: 'Step 6: Enablement & Training',
          description: 'We train your team and document the system to ensure confidence and adoption.',
          deliverables: [
            'Training sessions',
            'Video tutorials',
            'Ownership plan'
          ]
        },
        {
          title: 'Step 7: Monitoring, Optimization & Next Steps',
          description: 'We track how the AI performs and where it can go next — helping you scale intelligently.',
          deliverables: [
            'Ongoing fine-tuning',
            'Recommendations for next use cases',
            'Fine-tuning recommendations'
          ]
        }
      ]
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'See how our solutions have helped businesses streamline operations and improve efficiency.',
      filterTag: 'AI' // This will filter all cases with tags related to AI
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How long does it take to implement an AI solution?',
          answer: 'Most AI solutions can be implemented within 4-8 weeks, depending on complexity and scope. We will provide a detailed timeline during our initial consultation.'
        },
        {
          question: 'Do I need a large dataset to use AI?',
          answer: 'While more data generally leads to better results, we can work with smaller datasets.'
        },
        {
          question: 'How are AI solutions maintained?',
          answer: 'We provide ongoing maintenance and monitoring to ensure your AI solution continues to perform optimally. This includes regular performance reviews, model retraining, and updates as needed.'
        },
        {
          question: 'How secure is my data with AI solutions?',
          answer: 'Data security is a top priority. We implement industry-standard security measures and can design solutions that keep your data within your own environment if required.'
        }
      ]
    }
  ],
  cta: {
    title: 'Ready to Streamline the Flow?',
    description: 'Trust our team to map your processes and uncover automation potential.',
    buttons: [
      { text: 'See How It Works', href: '/schedule-call', isPrimary: true }
    ]
  }
}