import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'About Us | §78',
  description: 'Learn about §78, our history, team, methodology, and technology stack. We help businesses streamline operations through intelligent automation solutions.',
  keywords: ['about us', 'company history', 'automation team', 'methodology', 'technology stack', 'business automation'],
  openGraph: {
    title: 'About Us | §78',
    description: 'Learn about §78, our history, team, methodology, and technology stack. We help businesses streamline operations through intelligent automation solutions.',
    url: `${siteMetadata.siteUrl}/about`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | §78',
    description: 'Learn about §78, our history, team, methodology, and technology stack.',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`,
  },
};

export default function AboutPage() {
  // Данные о команде
  const teamMembers = [
    {
      name: 'Alex Mercer',
      position: 'Founder & CEO',
      bio: 'Over 10 years of experience in business process automation and system integration.',
      image: '/images/team/alex-mercer.jpg'
    },
    {
      name: 'Maria Chen',
      position: 'Lead Solution Architect',
      bio: 'Expert in CRM systems and workflow optimization with background in enterprise solutions.',
      image: '/images/team/maria-chen.jpg'
    },
    {
      name: 'David Wilson',
      position: 'AI Solutions Developer',
      bio: 'Specializes in artificial intelligence and machine learning solutions for business automation.',
      image: '/images/team/david-wilson.jpg'
    },
    {
      name: 'Sophia Park',
      position: 'Integration Specialist',
      bio: 'Experienced in connecting disparate systems and ensuring seamless data flow between platforms.',
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
    { name: 'Make (Integromat)', category: 'Automation' },
    { name: 'Zapier', category: 'Automation' },
    { name: 'n8n', category: 'Automation' },
    { name: 'Google Workspace', category: 'Productivity & Collaboration' },
    { name: 'QuickBooks', category: 'Finance' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'DocuSign', category: 'Document Management' },
    { name: 'JotForm', category: 'Forms & Data Collection' },
    { name: 'OpenAI', category: 'Artificial Intelligence' },
    { name: 'Twilio', category: 'Communications' },
    { name: 'Airtable', category: 'Database' }
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About §78</h1>
            <p className="text-xl text-light-gray mb-6">
              We help businesses streamline operations, improve efficiency, and focus on what truly matters through intelligent automation solutions.
            </p>
          </div>
        </div>
      </section>

      {/* History & Mission Section */}
      <section id="history" className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-light-gray mb-4">
                §78 was founded in 2020 with a clear mission: to make business process automation accessible to small and medium businesses.
              </p>
              <p className="text-light-gray mb-4">
                Our founders noticed that while enterprise companies benefited from automation, smaller businesses often lacked the resources and expertise to implement these solutions.
              </p>
              <p className="text-light-gray">
                We&apos;ve since grown into a team of automation specialists serving clients across multiple industries in the US, Europe, Australia, and Japan.
              </p>
            </div>
            <div>
              <div className="bg-dark-gray rounded-xl p-8 border border-medium-gray">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-light-gray mb-6">
                  To democratize business process automation by creating tailored, accessible solutions that help small and medium businesses achieve operational excellence.
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-light-gray">
                  A world where businesses of all sizes can leverage automation to eliminate mundane tasks, reduce errors, and focus on innovation and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              Our team of experts brings together diverse backgrounds in technology, business process optimization, and industry-specific knowledge.
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
      <section id="methodology" className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Methodology</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              We follow a proven process to ensure every automation solution delivers optimal results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Discovery</h3>
              <p className="text-light-gray">
                We begin by understanding your current processes, pain points, and objectives through detailed consultations and process mapping.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Solution Design</h3>
              <p className="text-light-gray">
                Our team designs a custom automation solution tailored to your specific business needs, with a focus on scalability and user-friendliness.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Implementation</h3>
              <p className="text-light-gray">
                We implement the solution with minimal disruption to your operations, providing comprehensive testing and validation at each stage.
              </p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Continuous Improvement</h3>
              <p className="text-light-gray">
                We provide ongoing support and regularly review the solution&apos;s performance, making adjustments to optimize efficiency and adapt to changing needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-light-gray max-w-2xl mx-auto">
              We leverage industry-leading tools and platforms to create powerful, reliable automation solutions.
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
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Let&apos;s discuss how our team can help automate and optimize your business processes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contacts">
              <Button variant="primary" size="lg">
                Contact Our Team
              </Button>
            </Link>
            <Link href="/cases">
              <Button variant="secondary" size="lg">
                View Our Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}