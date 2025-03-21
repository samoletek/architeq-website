"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/ui/cards/case-card';

// Пример данных для кейсов (позже можно вынести в отдельный файл)
const featuredCases = [
  {
    id: 'stripe-invoicing',
    title: 'Stripe Invoicing Automation',
    description: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
    industry: 'Financial Management',
    company: 'EclipseGroup',
    results: [
      '85% reduction in time spent on invoicing',
      '30% acceleration in receiving payments',
      'Elimination of errors in data transfer'
    ],
    image: '/images/cases/stripe-invoicing.jpg',
    tags: ['Finance', 'CRM', 'Automation']
  },
  {
    id: 'document-generation',
    title: 'Document Generation from CRM',
    description: 'Automatic document generation system that creates documents based on CRM data.',
    industry: 'Document Management',
    company: 'Affiliated Medical Supplies',
    results: [
      'Document creation time reduced from 35 minutes to 2-3 minutes',
      'Complete elimination of data errors',
      'Standardization of all company documents'
    ],
    image: '/images/cases/document-generation.jpg',
    tags: ['Documents', 'CRM', 'Automation']
  },
  {
    id: 'ai-voice-bot',
    title: 'AI-Voice Bot for Client Requests',
    description: 'Multi-level interactive voice assistant for processing client requests without operator participation.',
    industry: 'Customer Service',
    company: 'Up-Struct LLC',
    results: [
      'Automation of 60-70% of incoming requests',
      'Reduction of waiting time to minimum',
      '24/7 operation mode without increasing staff'
    ],
    image: '/images/cases/ai-voice-bot.jpg',
    tags: ['AI', 'Voice', 'Customer Service']
  }
];

export default function FeaturedCasesSection() {
  // Пока изображения нет, используем эффект градиента
  const placeholderStyle = {
    background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)',
    height: '200px'
  };

  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Case Studies</h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            Explore how we've helped companies across various industries optimize their processes and achieve significant results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CaseCard 
                title={caseItem.title}
                description={caseItem.description}
                industry={caseItem.industry}
                company={caseItem.company}
                results={caseItem.results}
                image={caseItem.image}
                tags={caseItem.tags}
                href={`/cases/${caseItem.id}`}
                style={placeholderStyle}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cases">
            <Button variant="secondary" size="lg">
              View All Case Studies
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}