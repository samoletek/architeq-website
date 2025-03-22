"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SolutionSwitcher from '@/components/ui/solution-switcher';
import Link from 'next/link';

// Определение типов
interface SolutionTab {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface Solution {
  id: string;
  label: string;
  icon: string;
  description: string;
  features: string[];
  imageUrl: string;
}

// Данные о решениях
const solutions: Solution[] = [
  {
    id: 'business-process',
    label: 'Business Process',
    icon: 'process',
    description: 'Automate complex business processes by connecting different systems, eliminating manual data entry, and creating workflows that save time and reduce errors.',
    features: [
      'Process mapping and optimization',
      'Workflow automation',
      'Integration between systems',
      'Data validation and error prevention',
      'Dashboard creation for process monitoring'
    ],
    imageUrl: '/images/solutions/business-process.jpg'
  },
  {
    id: 'crm-integration',
    label: 'CRM Integration',
    icon: 'crm',
    description: 'Connect your CRM system with other business tools to create a unified information environment that improves decision-making and customer service.',
    features: [
      'Bidirectional data synchronization',
      'Email and messaging integration',
      'Calendar and scheduling synchronization',
      'Document management integration',
      'Custom dashboard creation'
    ],
    imageUrl: '/images/solutions/crm-integration.jpg'
  },
  {
    id: 'boxed-solutions',
    label: 'Boxed Solutions',
    icon: 'industry',
    description: 'Industry-specific automation packages that address unique challenges in various sectors like logistics, manufacturing, real estate, and more.',
    features: [
      'Pre-configured workflows for your industry',
      'Custom fields and data structure',
      'Industry-specific integrations',
      'Best practices implementation',
      'Scalable architecture'
    ],
    imageUrl: '/images/solutions/boxed-solutions.jpg'
  },
  {
    id: 'ai-solutions',
    label: 'AI Solutions',
    icon: 'ai',
    description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights that drive business growth.',
    features: [
      'Voice bots for client communication',
      'Natural language processing for information search',
      'Speech-to-text conversion and analysis',
      'Data pattern recognition',
      'Predictive analytics'
    ],
    imageUrl: '/images/solutions/ai-solutions.jpg'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: 'document',
    description: 'Automate document creation, processing, and management to reduce administrative burden and ensure compliance with regulatory requirements.',
    features: [
      'Automatic document generation from templates',
      'Electronic signature integration',
      'Form creation and data collection',
      'Document version control',
      'Compliance monitoring'
    ],
    imageUrl: '/images/solutions/documentation.jpg'
  },
  {
    id: 'finance',
    label: 'Financial Systems',
    icon: 'finance',
    description: 'Streamline financial operations by automating invoicing, payment tracking, reconciliation, and financial reporting.',
    features: [
      'Invoice automation',
      'Payment tracking and reconciliation',
      'Financial reporting and dashboards',
      'Integration with accounting systems',
      'Multi-currency support'
    ],
    imageUrl: '/images/solutions/finance.jpg'
  }
];

export default function SolutionsSection() {
  const [activeSolution, setActiveSolution] = useState(solutions[0]);

  const handleSolutionChange = (solution: SolutionTab) => {
    setActiveSolution(solutions.find(s => s.id === solution.id) || solutions[0]);
  };

  return (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solutions</h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            We offer a comprehensive range of automation solutions tailored to your business needs. Explore our services below.
          </p>
        </div>

        <SolutionSwitcher
          tabs={solutions.map(s => ({
            id: s.id,
            label: s.label,
            description: s.description,
            icon: s.icon
          }))}
          defaultTab={activeSolution.id}
          onTabChange={handleSolutionChange}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Левая колонка - информация о решении */}
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">{activeSolution.label} Automation</h3>
            <p className="text-light-gray mb-6">{activeSolution.description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {activeSolution.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-light-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href={`/services/${activeSolution.id}`}>
              <Button>
                Learn More About {activeSolution.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          </motion.div>
          
          {/* Правая колонка - визуализация (временный плейсхолдер) */}
          <motion.div
            key={`image-${activeSolution.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-medium-gray rounded-lg overflow-hidden h-80 relative"
          >
            <div className="absolute inset-0 p-8 flex items-center justify-center">
              {/* Будет заменено на реальную визуализацию решения */}
              <div className="text-center">
                <div className={`text-primary mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-dark-gray`}>
                  {renderSolutionIcon(activeSolution.icon, "h-8 w-8")}
                </div>
                <div className="text-light-gray text-sm">
                  Visualization for {activeSolution.label} will be placed here
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Функция для рендеринга иконок
function renderSolutionIcon(icon: string, className: string) {
  switch (icon) {
    case 'process':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'crm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'industry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'finance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}