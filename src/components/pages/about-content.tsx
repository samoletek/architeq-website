import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GradientText } from '@/components/ui/gradient-text';
import { ScrollReveal } from '@/components/ui/animations/scroll-reveal';
import { GlowEffect } from '@/components/ui/animations/glow-effect';
import { Parallax } from '@/components/effects/parallax';
import { GradientBackground } from '@/components/effects/gradient-background';
import { TeamMemberCard } from '@/components/ui/cards/team-member-card';

const AboutContent = () => {
  const teamMembers = [
    {
      id: 'andrew-serhiienko',
      name: 'Andrew Serhiienko',
      position: 'Founder & Business Analyst',
      description: 'Andrew acts as the system architect between business needs and tech implementation, turning complex operational challenges into structured, scalable automation plans that engineers can execute without rework or ambiguity.',
      image: '/images/team/andrew-serhiienko.jpg',
    },
    {
      id: 'gennady-myazin',
      name: 'Gennady Myazin',
      position: 'Lead Integration Engineer',
      description: 'Gennady builds precise, logic-driven integrations between tools and CRMs, ensuring that every platform speaks the same language and that data flows without friction or loss.',
      image: '/images/team/gennady-myazin.jpg',
    },
    {
      id: 'yakov-saveliev',
      name: 'Yakov Saveliev',
      position: 'AI Solutions Developer',
      description: 'Yakov designs applied AI systems that go beyond hype—automating decisions, predicting behavior, and solving real problems for growing businesses.',
      image: '/images/team/yakov-saveliev.jpg',
    },
    {
      id: 'daniil-apanasov',
      name: 'Daniil Apanasov',
      position: 'Integration Engineer',
      description: 'Daniil specializes in stitching together disconnected systems into unified workflows, eliminating manual tasks and ensuring reliable data flow across tools.',
      image: '/images/team/daniil-apanasov.jpg',
    },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero relative overflow-hidden bg-dark-deeper py-24 md:py-32">
        <GradientBackground variant="about" className="opacity-20" />
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <GradientText variant="primary" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About
            </GradientText>
            
            <p className="text-light text-lg md:text-xl max-w-3xl mb-12">
              We architect digital systems that flex, scale, and adapt — for companies across industries.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <GradientText variant="secondary" className="text-3xl md:text-4xl font-bold mb-6">
                  Our Story
                </GradientText>
                
                <div className="space-y-6 text-light-muted">
                  <p>
                    Architeq emerged in 2023 when we spotted what was holding back promising companies from reaching their potential. We saw founders and their teams drowning in day-to-day operations instead of charting their growth strategy. These scaling businesses were caught in a trap - spending up to 70% of their time firefighting operational issues while their strategic vision gathered dust.
                  </p>
                  <p>
                    We built Architeq to break this cycle. Before jumping into solutions, we first map every process in your business - an approach that delivers immediate clarity and efficiency gains. Our team becomes your digital architects, helping you avoid costly experiments with tools that don't fit your industry or growth stage. Instead of fragmented tech stacks and temporary fixes, we create cohesive digital ecosystems that evolve as you scale.
                  </p>
                </div>
              </div>
              
              <Parallax speed={0.15}>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image 
                    src="/images/graphics/3d/digital-architect.jpg" 
                    alt="Digital Architecture" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark/80 to-transparent"></div>
                </div>
              </Parallax>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <ScrollReveal animation="fade-up">
              <GlowEffect color="blue-accent">
                <div className="p-8 rounded-xl bg-dark bg-opacity-40 border border-blue-accent/20 h-full">
                  <div className="mb-6">
                    <GradientText variant="blue" className="text-3xl font-bold mb-4">
                      Our Mission
                    </GradientText>
                  </div>
                  
                  <p className="text-light-muted">
                    We're on a mission to liberate ambitious businesses from operational quicksand. By crafting intelligent automation systems, we redirect human talent toward what matters most - strategic thinking and innovation. Our solutions don't just make today more efficient.
                  </p>
                </div>
              </GlowEffect>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={200}>
              <GlowEffect color="primary">
                <div className="p-8 rounded-xl bg-dark bg-opacity-40 border border-primary/20 h-full">
                  <div className="mb-6">
                    <GradientText variant="primary" className="text-3xl font-bold mb-4">
                      Our Vision
                    </GradientText>
                  </div>
                  
                  <p className="text-light-muted">
                    We're building toward a world where growing businesses operate through seamlessly integrated systems, not spreadsheets and manual workarounds. Where leadership teams spend Monday mornings discussing market opportunities, not fixing broken processes.
                  </p>
                  <p className="text-light-muted mt-4">
                    Architeq isn't just implementing software - we're your strategic digital ally, creating living, breathing ecosystems that adapt and grow alongside your business. Because when operational friction disappears, there's no limit to how far your vision can take you.
                  </p>
                </div>
              </GlowEffect>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Meet Our Team Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <GradientText variant="primary" className="text-3xl md:text-4xl font-bold mb-6">
                Meet Our Team
              </GradientText>
              
              <p className="text-light-muted max-w-3xl mx-auto">
                Behind every successful automation is a team that understands both technology and business. 
                Our experts don't just code solutions—they architect digital transformations.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal 
                key={member.id} 
                animation="fade-up" 
                delay={100 * index}
              >
                <TeamMemberCard 
                  name={member.name}
                  position={member.position}
                  description={member.description}
                  image={member.image}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Methodology Section */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <GradientText variant="secondary" className="text-3xl md:text-4xl font-bold mb-6">
                Our Methodology
              </GradientText>
              
              <p className="text-light-muted max-w-3xl mx-auto">
                We don't believe in cookie-cutter solutions or automation for automation's sake. 
                Our battle-tested approach is focused on meaningful outcomes—no fluff, no wasted time 
                or budget—just systems built to solve real business problems and drive measurable impact.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-10">
              {[1, 2, 3, 4].map((step, index) => (
                <ScrollReveal 
                  key={`step-${step}`} 
                  animation="fade-right" 
                  delay={100 * index}
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-accent flex items-center justify-center text-light font-bold">
                        {step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-light mb-2">
                        {step === 1 && "Discovery & Alignment"}
                        {step === 2 && "Solution Design & Planning"}
                        {step === 3 && "Implementation & Integration"}
                        {step === 4 && "Training, Support & Optimization"}
                      </h3>
                      <p className="text-light-muted">
                        {step === 1 && "We kick things off by aligning on objectives, expectations, and success criteria. Through stakeholder interviews, in-depth workshops, and data analysis, we map your current workflows, uncover inefficiencies, and identify automation opportunities."}
                        {step === 2 && "Based on our insights, we design a custom solution tailored to your business needs, improving efficiency and reducing complexity. We create a detailed implementation plan with clear timelines, milestones, and resource allocation."}
                        {step === 3 && "We deploy your solution in a phased approach, rigorously testing each component before going live. We ensure seamless integration with existing systems and workflows, handling data migration and system syncing with no disruption."}
                        {step === 4 && "Once live, we provide comprehensive training to your team and offer ongoing support. We continuously optimize the system, adapting to your evolving business needs and ensuring long-term success."}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <Parallax speed={0.2}>
              <div className="relative h-full flex items-center">
                <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/graphics/3d/methodology-illustration.jpg" 
                    alt="Our Methodology" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark/90 via-dark/50 to-transparent"></div>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>
      
      {/* Our Technology Stack Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <GradientText variant="primary" className="text-3xl md:text-4xl font-bold mb-6">
                Our Technology Stack
              </GradientText>
              
              <p className="text-light-muted max-w-3xl mx-auto">
                We build scalable automations on trusted, industry-leading platforms—tailored to your 
                workflows and tech stack—and continuously explore new tools, adopting only those that 
                prove their reliability, performance, and real business value through rigorous testing.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[
              { title: "CRM & Project Management", tools: ["Monday.com", "HubSpot", "Zoho", "Pipedrive"] },
              { title: "Automation", tools: ["Make (Integromat)", "Zapier", "n8n"] },
              { title: "Productivity & Collaboration", tools: ["Google Workspace", "Notion", "Miro"] },
              { title: "Finance & Payments", tools: ["QuickBooks", "Bill.com", "Chaser", "Stripe", "PayPal"] },
              { title: "Verification & Security", tools: ["Plaid", "Veriff"] },
              { title: "Document Management", tools: ["DocuSign", "SignNow", "eSignatures", "Google Docs"] },
              { title: "Forms & Data Collection", tools: ["JotForm", "Typeform", "Cognito", "Google Forms"] },
              { title: "AI", tools: ["OpenAI", "Claude", "Deepseek", "Gemini", "Grok"] },
              { title: "Communications", tools: ["Twilio", "AirCall", "Slack", "Telegram", "OpenPhone"] },
              { title: "Database", tools: ["Airtable", "Google Sheets", "MySQL", "PostgreSQL"] },
              { title: "Industry-Specific Tools", tools: ["BestPass", "SuperDispatch", "CentralDispatch"] },
              { title: "Tracking", tools: ["Hubstaff"] }
            ].map((category, categoryIndex) => (
              <ScrollReveal
                key={`category-${categoryIndex}`}
                animation="fade-up"
                delay={50 * categoryIndex}
              >
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <li key={`tool-${categoryIndex}-${toolIndex}`} className="text-light-muted">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-dark-deeper relative overflow-hidden">
        <GradientBackground variant="cta" className="opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              <GradientText variant="primary" className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Streamline the Flow?
              </GradientText>
              
              <p className="text-light text-lg mb-10">
                Trust our team to map your processes and uncover automation potential.
              </p>
              
              <GlowEffect color="primary">
                <Link href="/contact" className="inline-block">
                  <button className="bg-gradient-to-r from-primary to-blue-accent text-light font-medium py-3 px-8 rounded-lg hover:shadow-glow transition-all duration-300">
                    See How It Works
                  </button>
                </Link>
              </GlowEffect>
              
              <Link href="/cases" className="inline-block ml-4">
                <button className="border border-light/30 text-light font-medium py-3 px-8 rounded-lg hover:bg-light/10 transition-all duration-300">
                  View Our Case Studies
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;