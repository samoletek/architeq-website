import SiteLayout from '@/components/layout/site-layout';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';
import UnifiedCTASection from '@/components/sections/unified-cta-section';

export const metadata: Metadata = {
  title: 'About Us | Architeq',
  description: 'Learn about Architeq, our history, team, methodology, and technology stack. We help businesses streamline operations through intelligent automation solutions.',
  keywords: ['about us', 'company history', 'automation team', 'methodology', 'technology stack', 'business automation'],
  openGraph: {
    title: 'About Us | Architeq',
    description: 'Learn about Architeq, our history, team, methodology, and technology stack. We help businesses streamline operations through intelligent automation solutions.',
    url: `${siteMetadata.siteUrl}/about`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Architeq',
    description: 'Learn about Architeq, our history, team, methodology, and technology stack.',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`,
  },
};

export default function AboutPage() {
  // Данные о команде
  const teamMembers = [
    {
      name: 'Andrew Serhiienko',
      position: 'Founder & Business Analyst',
      bio: 'Acts as the system architect between business needs and tech implementation, turning complex operational challenges into structured, scalable automation plans that engineers can execute without rework or ambiguity.',
      image: '/images/team/alex-mercer.jpg'
    },
    {
      name: 'Gennady M.',
      position: 'Lead Integration Engineer',
      bio: 'Builds logic-driven integrations between tools and CRMs, ensuring that every platform speaks the same language and that data flows without friction or loss.',
      image: '/images/team/maria-chen.jpg'
    },
    {
      name: 'Yakov S.',
      position: 'AI Solutions Developer',
      bio: 'Designs applied AI systems that go beyond hype—automating decisions, predicting behavior, and solving real problems for growing businesses.',
      image: '/images/team/david-wilson.jpg'
    },
    {
      name: 'Daniil A.',
      position: 'Integration Engineer',
      bio: 'Specializes in stitching together disconnected systems into unified workflows, eliminating manual tasks and ensuring reliable data flow across tools.',
      image: '/images/team/sophia-park.jpg'
    }
  ];

  // Временная заглушка для изображений команды
  const placeholderStyle = {
    background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)',
    borderRadius: '50%',
    width: '120px',
    height: '120px'
  };

  // Технологический стек
  const technologies = [
    { name: 'Monday.com', category: 'CRM & Project Management' },
    { name: 'HubSpot', category: 'CRM & Project Management' },
    { name: 'Zoho', category: 'CRM & Project Management' },
    { name: 'Pipedrive', category: 'CRM & Project Management' },
    { name: 'Make (Integromat)', category: 'Automation' },
    { name: 'Zapier', category: 'Automation' },
    { name: 'n8n', category: 'Automation' },
    { name: 'Google Workspace', category: 'Productivity & Collaboration' },
    { name: 'Notion', category: 'Productivity & Collaboration' },
    { name: 'Miro', category: 'Productivity & Collaboration' },
    { name: 'QuickBooks', category: 'Finance & Payments' },
    { name: 'Bill.com', category: 'Finance & Payments' },
    { name: 'Chaser', category: 'Finance & Payments' },
    { name: 'Stripe', category: 'Finance & Payments' },
    { name: 'PayPal', category: 'Finance & Payments' },
    { name: 'Plaid', category: 'Verification & Security' },
    { name: 'Veriff', category: 'Verification & Security' },
    { name: 'DocuSign', category: 'Document Management' },
    { name: 'SignNow', category: 'Document Management' },
    { name: 'eSignatures', category: 'Document Management' },
    { name: 'Google Docs', category: 'Document Management' },
    { name: 'JotForm', category: 'Forms & Data Collection' },
    { name: 'Typeform', category: 'Forms & Data Collection' },
    { name: 'Cognito', category: 'Forms & Data Collection' },
    { name: 'Google Forms', category: 'Forms & Data Collection' },
    { name: 'OpenAI', category: 'AI' },
    { name: 'Claude', category: 'AI' },
    { name: 'Deepseek', category: 'AI' },
    { name: 'Gemini', category: 'AI' },
    { name: 'Grok', category: 'AI' },
    { name: 'Twilio', category: 'Communications' },
    { name: 'AirCall', category: 'Communications' },
    { name: 'Slack', category: 'Communications' },
    { name: 'Telegram', category: 'Communications' },
    { name: 'OpenPhone', category: 'Communications' },
    { name: 'Airtable', category: 'Database' },
    { name: 'Google Sheets', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'BestPass', category: 'Specific Tools' },
    { name: 'SuperDispatch', category: 'Specific Tools' },
    { name: 'CentralDispatch', category: 'Specific Tools' },
    { name: 'Hubstaff', category: 'Tracking' }
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="section-hero bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="section-title-large font-bold hero-title-spacing hero-subtitle-spacing">About Architeq</h1>
            <p className="hero-subtitle text-light-gray max-w-3xl mx-auto section-subtitle-medium section-button-spacing">
            We architect digital systems that flex, scale, and adapt — for companies across industries.
            </p>
          </div>
        </div>
      </section>

      {/* History & Mission Section */}
      <section id="history" className="section-benefits bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
            <h2 className="section-title-large font-bold section-title-spacing">Our Story</h2>
            <p className="text-light-gray mb-4">
                Architeq emerged in 2023 when we spotted what was holding back promising companies from reaching their potential. We saw founders and their teams drowning in day-to-day operations instead of charting their growth strategy. These scaling businesses were caught in a trap — spending up to 70% of their time firefighting operational issues while their strategic vision gathered dust.
              </p>
              <p className="text-light-gray mb-4">
                We built Architeq to break this cycle. Before jumping into solutions, we first map every process in your business an approach that delivers immediate clarity and efficiency gains. Our team becomes your digital architects, helping you avoid costly experiments with tools that do not fit your industry or growth stage. Instead of fragmented tech stacks and temporary fixes, we create cohesive digital ecosystems that evolve as you scale.
              </p>
            </div>
            <div>
              <div className="bg-dark-gray rounded-xl p-8 border border-medium-gray">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-light-gray mb-6">
                We&apos;re on a mission to liberate ambitious businesses from operational quicksand. By crafting intelligent automation systems, we redirect human talent toward what matters most - strategic thinking and innovation. Our solutions don&apos;t just make today more efficient.
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-light-gray">
                We&apos;re building toward a world where growing businesses operate through seamlessly integrated systems, not spreadsheets and manual workarounds. Where leadership teams spend Monday mornings discussing market opportunities, not fixing broken processes.
                </p>
                <p className="text-light-gray mt-6">
                Architeq isn&apos;t just implementing software - we&apos;re your strategic digital ally, creating living, breathing ecosystems that adapt and grow alongside your business. Because when operational friction disappears, there&apos;s no limit to how far your vision can take you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-benefits bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title-large font-bold section-title-spacing">Meet Our Team</h2>
            <p className="section-subtitle-large text-light-gray max-w-2xl mx-auto">
              Our team of experts brings together diverse backgrounds in technology, business process optimization,<br />and industry-specific knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-dark-gradient rounded-xl p-6 border border-medium-gray hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Временная заглушка для фото */}
                  <div 
                    style={placeholderStyle} 
                    className="flex items-center justify-center mb-4 text-primary text-2xl font-bold"
                  >
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.position}</p>
                  <p className="text-light-gray text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="section-benefits bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title-large font-bold section-title-spacing">Our Methodology</h2>
            <p className="section-subtitle-large text-light-gray max-w-2xl mx-auto">
            We don&apos;t believe in cookie-cutter solutions or automation for automation&apos;s sake. Our battle-tested approach is focused on meaningful outcomes—no fluff, no wasted time or budget—just systems built to solve real business problems<br />and drive measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Discovery & Alignment</h3>
              <p className="text-light-gray">
                We begin by understanding your current processes, pain points, and objectives through detailed consultations and process mapping.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Solution Design & Planning</h3>
              <p className="text-light-gray">
              We kick things off by aligning on objectives, expectations, and success criteria. Through stakeholder interviews, in-depth workshops, and data analysis, we map your current workflows, uncover inefficiencies, and identify automation opportunities.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Implementation & Integration</h3>
              <p className="text-light-gray">
              We deploy your solution in a phased approach, rigorously testing each component before going live. We ensure seamless integration with existing systems and workflows, handling data migration and system syncing with no disruption.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Training, Support & Optimization</h3>
              <p className="text-light-gray">
              Once live, we provide comprehensive training to your team and offer ongoing support. We continuously optimize the system, adapting to your evolving business needs and ensuring long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="section-benefits bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title-large font-bold section-title-spacing">Our Technology Stack</h2>
            <p className="section-subtitle-large text-light-gray max-w-2xl mx-auto">
            We build scalable automations on trusted, industry-leading platforms—tailored to your workflows and tech stack—and continuously explore new tools, adopting only those that prove their reliability, performance, and real business<br />value through rigorous testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Group technologies by category */}
            {Array.from(new Set(technologies.map(tech => tech.category))).map((category, index) => (
              <div 
                key={index} 
                className="bg-dark-gradient rounded-xl p-6 border border-medium-gray"
              >
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies
                    .filter(tech => tech.category === category)
                    .map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-medium-gray rounded-full px-3 py-1 text-sm"
                      >
                        {tech.name}
                      </span>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* CTA Section */}
<UnifiedCTASection preset="about" />
    </SiteLayout>
  );
}