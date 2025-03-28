// src/components/templates/service-template.tsx
"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Icon, IconName } from '@/components/ui/icons/icon';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import Link from 'next/link';

interface ServiceFeature {
  title: string;
  description: string;
  icon?: IconName;
}

interface ServiceCase {
  id: string;
  title: string;
  description: string;
  company: string;
  image?: string;
}

interface ServiceTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
  features: ServiceFeature[];
  cases: ServiceCase[];
  technologies?: string[];
  process?: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  faq?: {
    question: string;
    answer: ReactNode;
  }[];
}

export default function ServiceTemplate({
  title,
  subtitle,
  description,
  icon,
  features,
  cases,
  technologies,
  process,
  faq
}: ServiceTemplateProps) {
  return (
    <>
      {/* Hero section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-medium-gray rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Icon name={icon} className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-light-gray mb-6">{subtitle}</p>
              <Button variant="primary" size="lg" href="/contacts">
                Book a Consultation
              </Button>
            </div>
            <div className="relative">
              <div className="bg-medium-gray rounded-lg p-8 relative z-10">
                <p className="text-light-gray text-lg">{description}</p>
              </div>
              <div className="absolute top-8 left-8 w-full h-full bg-primary/10 rounded-lg -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-gray rounded-lg p-6"
              >
                {feature.icon && (
                  <div className="bg-medium-gray rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Icon name={feature.icon} className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-light-gray">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section (if available) */}
      {process && (
        <section className="py-16 bg-dark-gray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{process.title}</h2>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2 z-0"></div>
              
              {process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative z-10 flex mb-16 last:mb-0 ${
                    index % 2 === 0
                      ? 'md:flex-row flex-col'
                      : 'md:flex-row-reverse flex-col'
                  }`}
                >
                  <div className="md:w-1/2 flex flex-col items-center md:items-end md:pr-12 pb-6 md:pb-0">
                    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center md:text-right">{step.title}</h3>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-medium-gray rounded-lg p-6">
                      <p className="text-light-gray">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case studies section */}
      {cases.length > 0 && (
        <section className="py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Related Case Studies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-gray rounded-lg overflow-hidden"
                >
                  {/* Placeholder for image */}
                  <div className="h-48 bg-medium-gray">
                    {caseItem.image && (
                      <ImageWithFallback
                        src={caseItem.image}
                        alt={caseItem.title}
                        width={400}
                        height={200}
                        category="case"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{caseItem.title}</h3>
                    <p className="text-light-gray mb-4">{caseItem.description}</p>
                    <p className="text-sm text-primary mb-4">{caseItem.company}</p>
                    <Link href={`/cases/${caseItem.id}`}>
                      <Button variant="secondary" size="sm">
                        View Case Study
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/cases">
                <Button variant="secondary">
                  View All Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Technologies section (if available) */}
      {technologies && technologies.length > 0 && (
        <section className="py-16 bg-dark-gray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Technologies We Use</h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-medium-gray rounded-lg px-6 py-3 text-light-gray"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ section (if available) */}
      {faq && faq.length > 0 && (
        <section className="py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-gray rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                  <div className="text-light-gray">{item.answer}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your {title}?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation with our experts to discover how we can help automate and streamline your business processes.
          </p>
          <Button variant="primary" size="lg" href="/contacts">
            Schedule a Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}