"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SolutionSwitcher from '@/components/ui/solution-switcher';
import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/icons/icon';

// Определение типов
interface SolutionTab {
  id: string;
  label: string;
  description: string;
  icon: IconName;
}

interface Solution {
  id: string;
  label: string;
  icon: IconName;
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
                  <Icon name={activeSolution.icon} className="h-8 w-8" />
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