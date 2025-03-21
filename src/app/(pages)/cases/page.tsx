"use client";

import { useState, useEffect } from 'react';
import SiteLayout from '@/components/layout/site-layout';
import { CaseCard } from '@/components/ui/cards/case-card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our successful business automation case studies across various industries. See real results of our CRM integration, AI solutions, and document automation.',
  keywords: ['case studies', 'business automation examples', 'success stories', 'automation results', 'automation projects'],
  openGraph: {
    title: 'Case Studies | §78',
    description: 'Explore our successful business automation case studies across various industries. See real results of our CRM integration, AI solutions, and document automation.',
    url: `${siteMetadata.siteUrl}/cases`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/cases`,
  },
};

// Данные кейсов из документации - 20 кейсов
const allCases = [
  // Financial Automations
  {
    id: 'stripe-invoicing',
    title: 'Stripe Invoicing and Financial Control',
    description: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
    industry: 'Financial Management',
    solutionType: 'Financial Automation',
    company: 'EclipseGroup',
    location: 'Miami, FL, USA',
    results: [
      '85% reduction in time spent on invoicing',
      '30% acceleration in receiving payments',
      'Elimination of errors in data transfer',
      '25-30% improvement in cash flow'
    ],
    image: '/images/cases/stripe-invoicing.jpg',
    technologies: ['Monday CRM', 'QuickBooks', 'Stripe', 'Make']
  },
  {
    id: 'quickbooks-integration',
    title: 'QuickBooks Integration for Automatic Accounting',
    description: 'Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.',
    industry: 'Financial Management',
    solutionType: 'Financial Automation',
    company: '485 Logistics',
    location: 'West Chester, OH, USA',
    results: [
      '75% reduction in time spent on financial reporting',
      'Elimination of double data entry',
      'Increased accuracy of financial reports',
      'Automation of routine accounting operations'
    ],
    image: '/images/cases/quickbooks-integration.jpg',
    technologies: ['QuickBooks', 'Make', 'Monday CRM', 'Google Sheets']
  },
  {
    id: 'factoring-automation',
    title: 'Factoring Data Submission Automation',
    description: 'Automatic calculation and submission of accounts receivable data to factoring companies.',
    industry: 'Financial Management',
    solutionType: 'Financial Automation',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    results: [
      'Reduction of process from several hours to several minutes',
      'Elimination of human errors in calculations',
      'Improved transparency of factoring process',
      'Faster receipt of financing'
    ],
    image: '/images/cases/factoring-automation.jpg',
    technologies: ['Google Drive', 'Google Sheets', 'Make', 'Monday CRM', 'Telegram', 'Slack']
  },
  
  // Documents and Forms
  {
    id: 'document-generation',
    title: 'Document Generation from CRM Status Changes',
    description: 'Automatic document generation system that creates documents based on CRM data changes.',
    industry: 'Document Management',
    solutionType: 'Documents & Forms',
    company: 'Affiliated Medical Supplies',
    location: 'Atlanta, GA, USA',
    results: [
      'Document creation time reduced from 35 minutes to 2-3 minutes',
      'Complete elimination of data errors',
      'Standardization of all company documents',
      'Saving 20-30 hours per month on routine legal department work'
    ],
    image: '/images/cases/document-generation.jpg',
    technologies: ['Monday CRM', 'Make', 'Google Docs API', 'DocuSign']
  },
  {
    id: 'electronic-signatures',
    title: 'Electronic Signature Integration',
    description: 'Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.',
    industry: 'Document Management',
    solutionType: 'Documents & Forms',
    company: '485 Logistics',
    location: 'West Chester, OH, USA',
    results: [
      '70% reduction in document signing cycle time',
      '20% increase in completed deal percentage',
      'Instant access to signing status for all process participants',
      'Automatic auditing of all signed documents'
    ],
    image: '/images/cases/electronic-signatures.jpg',
    technologies: ['DocuSign', 'Monday CRM', 'Make', 'Google Drive']
  },
  {
    id: 'web-forms-integration',
    title: 'Web Forms with CRM Integration',
    description: 'Creation and integration of web forms with direct CRM integration for efficient data collection.',
    industry: 'Lead Generation',
    solutionType: 'Documents & Forms',
    company: 'Ameriland Capital',
    location: 'Fayetteville, AR, USA',
    results: [
      'Increase in form completion conversion to 60%',
      'Reduction of application processing time by 35%',
      'Elimination of errors in data transfer',
      'Improvement of customer experience'
    ],
    image: '/images/cases/web-forms-integration.jpg',
    technologies: ['JotForm', 'Make', 'Monday CRM']
  },
  
  // CRM System Integrations
  {
    id: 'monday-integration',
    title: 'Comprehensive Monday Integration',
    description: 'Comprehensive integration of Monday CRM with multiple external systems for unified data management.',
    industry: 'CRM Integration',
    solutionType: 'CRM System Integration',
    company: 'New Age Cabinetry & Coatings',
    location: 'Phoenix, AZ, USA',
    results: [
      'Single center for managing all business processes',
      '60% reduction in time spent switching between systems',
      'Increased transparency of all processes',
      'Automation of up to 70% of routine operations'
    ],
    image: '/images/cases/monday-integration.jpg',
    technologies: ['Monday CRM', 'Make', 'Slack', 'Google Workspace API']
  },
  {
    id: 'notification-system',
    title: 'Deep Notification Tree by Triggers',
    description: 'Complex automatic notification system with conditional triggers based on CRM actions.',
    industry: 'Communications',
    solutionType: 'CRM System Integration',
    company: 'MC Keeper',
    location: 'West Chester, OH, USA',
    results: [
      '75% reduction in reaction time to project changes',
      '40% increase in customer service satisfaction',
      'Reduction of missed updates and deadlines to zero',
      'Improvement of internal team communication'
    ],
    image: '/images/cases/notification-system.jpg',
    technologies: ['Monday CRM', 'Make', 'Twilio', 'Slack', 'Telegram', 'Email API']
  },
  {
    id: 'dashboards-creation',
    title: 'Creating Informative Dashboards',
    description: 'Development of customized interactive dashboards for real-time business monitoring.',
    industry: 'Analytics',
    solutionType: 'CRM System Integration',
    company: 'DreamLine',
    location: 'Vancouver, WA, USA',
    results: [
      '80% reduction in time spent on reporting',
      'Decision-making based on up-to-date data',
      '35% increase in management efficiency',
      'Transparency of all business processes for management'
    ],
    image: '/images/cases/dashboards-creation.jpg',
    technologies: ['Monday CRM', 'Google Data Studio', 'Make', 'API Integrations']
  },
  
  // Industry Solutions (5 cases)
  {
    id: 'car-hauling-solution',
    title: 'Boxed Solution for Car Hauling Companies',
    description: 'Unified system for vehicle transportation companies including order management and payment control.',
    industry: 'Vehicle Transportation',
    solutionType: 'Industry Solution',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    results: [
      '60% reduction in order processing time',
      'Elimination of errors in calculations and invoicing',
      'Automated accounts receivable control',
      'Increased transparency of logistics and payments'
    ],
    image: '/images/cases/car-hauling-solution.jpg',
    technologies: ['QuickBooks', 'Make', 'Google Sheets', 'Monday CRM', 'Stripe', 'DocuSign']
  },
  {
    id: 'kitchen-cabinetry-solution',
    title: 'Boxed Solution for Kitchen Cabinetry Manufacturers',
    description: 'Centralized system for kitchen furniture manufacturing companies to manage orders, design, and production.',
    industry: 'Manufacturing',
    solutionType: 'Industry Solution',
    company: 'AllWood Design',
    location: 'San Diego, CA, USA',
    results: [
      '30% reduction in order fulfillment cycle',
      '85% reduction in specification errors',
      '20-25% increase in project profitability',
      'Increased team productivity'
    ],
    image: '/images/cases/kitchen-cabinetry-solution.jpg',
    technologies: ['Monday CRM', 'CabinetVision', 'Make', 'Google Sheets', 'QuickBooks']
  },
  {
    id: 'music-label-solution',
    title: 'Boxed Solution for Music Labels',
    description: 'Centralized system for managing music assets, royalty calculations, and copyright control.',
    industry: 'Music Industry',
    solutionType: 'Industry Solution',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    results: [
      'Aggregation of all tools used in one place',
      '75% reduction in administrative work',
      'Accurate and timely calculation and payment of royalties',
      'Catalog expansion without increasing administrative personnel'
    ],
    image: '/images/cases/music-label-solution.jpg',
    technologies: ['Monday CRM', 'AirTable', 'Make', 'Music Platform APIs', 'Google Sheets', 'Stripe']
  },
  {
    id: 'real-estate-solution',
    title: 'Boxed Solution for Real Estate Companies',
    description: 'Automation solution for real estate agencies to coordinate showings, prepare documents, and track deals.',
    industry: 'Real Estate',
    solutionType: 'Industry Solution',
    company: 'Ameriland Capital',
    location: 'Fayetteville, AR, USA',
    results: [
      '55% increase in number of leads processed',
      '40% reduction in deal closing time',
      'Increase in successful deal indicator to 35%',
      'Automation of up to 60% of administrative work'
    ],
    image: '/images/cases/real-estate-solution.jpg',
    technologies: ['Monday CRM', 'Calendly', 'DocuSign', 'Make', 'Google Workspace']
  },
  {
    id: 'roofing-business-solution',
    title: 'Boxed Solution for Roofing Business with AI',
    description: 'Comprehensive solution for roofing companies with AI components for client communication and cost estimation.',
    industry: 'Construction',
    solutionType: 'Industry Solution',
    company: 'Up-Struct LLC',
    location: 'Lynnwood, WA, USA',
    results: [
      '40% increase in project cost estimation accuracy',
      '25% reduction in project completion time',
      'Automation of client call reception',
      'Improved customer experience and increased positive reviews'
    ],
    image: '/images/cases/roofing-business-solution.jpg',
    technologies: ['Monday CRM', 'Make', 'Google Workspace', 'Twilio', 'ElevenLabs', 'PlayHT']
  },
  
  // AI Solutions
  {
    id: 'ai-voice-bot',
    title: 'AI-Voice Bot for Client Request Processing',
    description: 'Multi-level interactive voice assistant for processing client requests without operator participation.',
    industry: 'Customer Service',
    solutionType: 'AI Solution',
    company: 'Up-Struct LLC',
    location: 'Lynnwood, WA, USA',
    results: [
      'Automation of 60-70% of incoming requests',
      'Reduction of waiting time to minimum',
      '24/7 operation mode without increasing staff',
      '90% reduction in communication errors'
    ],
    image: '/images/cases/ai-voice-bot.jpg',
    technologies: ['OpenAI', 'ElevenLabs', 'Twilio', 'Monday CRM']
  },
  {
    id: 'ai-crm-assistant',
    title: 'AI Assistant for CRM Information Search',
    description: 'Integration of AI assistant into CRM interface for natural language data search and summarization.',
    industry: 'Data Management',
    solutionType: 'AI Solution',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    results: [
      '90% reduction in information search time',
      'Fast adaptation of new employees',
      'Increased efficiency of working with clients',
      'More informed decisions based on complete data'
    ],
    image: '/images/cases/ai-crm-assistant.jpg',
    technologies: ['OpenAI', 'Claude', 'Monday CRM', 'Retool']
  },
  {
    id: 'speech-to-text-analysis',
    title: 'AI Speech-to-Text Parser for Communication Analysis',
    description: 'System for automatic transcription and analysis of client conversations to improve service quality.',
    industry: 'Customer Service',
    solutionType: 'AI Solution',
    company: 'Various Companies',
    location: 'Multiple Locations',
    results: [
      '90% automation of conversation analysis',
      '75% reduction in time spent on call quality control',
      'Identification of deviations from scripts and problem areas',
      'Improvement of customer service quality and sales conversion'
    ],
    image: '/images/cases/speech-to-text-analysis.jpg',
    technologies: ['OpenAI Whisper', 'Google Speech-to-Text API', 'Make', 'Monday CRM']
  },
  
  // Integrations and Automations
  {
    id: 'financial-calculations',
    title: 'Complex Calculations for Financial Computations',
    description: 'Automated financial calculation system for handling complex payment structures with multiple variables.',
    industry: 'Financial Management',
    solutionType: 'Integration & Automation',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    results: [
      '90% increase in calculation accuracy',
      '75% reduction in time spent on payment calculations',
      'Pricing optimization and increased margin',
      'Unification of calculations within company'
    ],
    image: '/images/cases/financial-calculations.jpg',
    technologies: ['Google Sheets', 'Make', 'Monday CRM', 'QuickBooks', 'Stripe']
  },
  {
    id: 'slack-notifications',
    title: 'Slack Notification Automation',
    description: 'Complex automatic notification system in Slack with filtering, routing, and priority management.',
    industry: 'Corporate Communications',
    solutionType: 'Integration & Automation',
    company: 'MC Keeper',
    location: 'West Chester, OH, USA',
    results: [
      '80% reduction in missed notifications',
      '30% increase in team work efficiency',
      'Centralization of communications',
      'Automation of information exchange between departments'
    ],
    image: '/images/cases/slack-notifications.jpg',
    technologies: ['Slack', 'Make', 'Monday CRM', 'Google Workspace', 'Jira', 'Twilio']
  },
  {
    id: 'telephony-integration',
    title: 'Telephony Setup and CRM Integration',
    description: 'Integration of telephony systems with CRM for automatic call logging and customer data management.',
    industry: 'Sales & Customer Service',
    solutionType: 'Integration & Automation',
    company: 'EclipseGroup',
    location: 'Miami, FL, USA',
    results: [
      '60% increase in call processing efficiency',
      'Saving complete history of client communications',
      'AI analysis of conversations to improve service quality',
      'Automation of post-call activities'
    ],
    image: '/images/cases/telephony-integration.jpg',
    technologies: ['Twilio', 'AirCall', 'Monday CRM', 'Make']
  }
];

// Получаем уникальные значения для фильтров
const allIndustries = Array.from(new Set(allCases.map(caseItem => caseItem.industry)));
const allSolutionTypes = Array.from(new Set(allCases.map(caseItem => caseItem.solutionType)));
const allTechnologies = Array.from(new Set(allCases.flatMap(caseItem => caseItem.technologies)));

export default function CasesPage() {
  // Состояние для фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSolutionTypes, setSelectedSolutionTypes] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [activeFilterTab, setActiveFilterTab] = useState<string>('all');
  const [showFilterSection, setShowFilterSection] = useState<string | null>(null);

  // Умный поиск по всем полям
  const performSearch = (item: any, query: string) => {
    if (!query) return true;
    
    const searchIn = [
      item.title,
      item.description,
      item.company,
      item.industry,
      item.solutionType,
      item.location,
      ...item.technologies,
      ...item.results
    ].join(' ').toLowerCase();
    
    return query.toLowerCase().split(' ').every(word => searchIn.includes(word));
  };
  
  // Фильтрация кейсов
  const filteredCases = allCases.filter(caseItem => {
    // Фильтр по поисковому запросу (умный поиск)
    const matchesSearch = performSearch(caseItem, searchQuery);
    
    // Фильтр по индустрии
    const matchesIndustries = selectedIndustries.length === 0 || 
      selectedIndustries.includes(caseItem.industry);
    
    // Фильтр по типу решения
    const matchesSolutionTypes = selectedSolutionTypes.length === 0 || 
      selectedSolutionTypes.includes(caseItem.solutionType);
    
    // Фильтр по технологиям
    const matchesTechnologies = selectedTechnologies.length === 0 || 
      caseItem.technologies.some(tech => selectedTechnologies.includes(tech));
    
    return matchesSearch && matchesIndustries && matchesSolutionTypes && matchesTechnologies;
  });

  // Временная заглушка для изображения
  const placeholderStyle = {
    background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)',
    height: '200px'
  };
  
  // Переключение вкладок фильтров
  const handleTabChange = (tab: string) => {
    setActiveFilterTab(tab);
    if (tab !== 'all') {
      setShowFilterSection(tab);
    } else {
      setShowFilterSection(null);
    }
  };
  
  // Обработчик для выбора фильтра по индустрии
  const toggleIndustryFilter = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };
  
  // Обработчик для выбора фильтра по типу решения
  const toggleSolutionTypeFilter = (type: string) => {
    setSelectedSolutionTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };
  
  // Обработчик для выбора фильтра по технологии
  const toggleTechnologyFilter = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };
  
  // Сброс всех фильтров
  const clearAllFilters = () => {
    setSelectedIndustries([]);
    setSelectedSolutionTypes([]);
    setSelectedTechnologies([]);
    setSearchQuery('');
  };

  return (
    <SiteLayout>
      {/* Hero section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-light-gray mb-6">
              Explore how we've helped businesses across various industries optimize their processes and achieve significant results.
            </p>
            <Button variant="primary" size="lg" href="/contacts">
              Book a Similar Solution
            </Button>
          </div>
        </div>
      </section>

      {/* Filters section - компактная версия */}
      <section className="py-8 bg-dark-gray border-b border-medium-gray">
        <div className="container mx-auto px-4">
          {/* Поисковая строка */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Search Case Studies</h2>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-medium-gray border border-medium-gray rounded-lg py-3 pl-4 pr-10 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Search by title, description, or company..."
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Табы для переключения фильтров */}
          <div className="flex justify-center border-b border-medium-gray">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-5 py-3 font-medium transition-colors ${activeFilterTab === 'all' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-light-gray hover:text-white'}`}
            >
              All Filters
            </button>
            <button
              onClick={() => handleTabChange('industry')}
              className={`px-5 py-3 font-medium transition-colors ${activeFilterTab === 'industry' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-light-gray hover:text-white'}`}
            >
              By Industry
            </button>
            <button
              onClick={() => handleTabChange('solutionType')}
              className={`px-5 py-3 font-medium transition-colors ${activeFilterTab === 'solutionType' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-light-gray hover:text-white'}`}
            >
              By Solution Type
            </button>
            <button
              onClick={() => handleTabChange('technology')}
              className={`px-5 py-3 font-medium transition-colors ${activeFilterTab === 'technology' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-light-gray hover:text-white'}`}
            >
              By Technology
            </button>
          </div>
          
          {/* Секции фильтров */}
          {showFilterSection === 'industry' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="py-4"
            >
              <h3 className="text-lg font-medium mb-3">Filter by Industry</h3>
              <div className="flex flex-wrap gap-2">
                {allIndustries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => toggleIndustryFilter(industry)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedIndustries.includes(industry) 
                        ? 'bg-primary text-white' 
                        : 'bg-medium-gray text-light-gray hover:bg-dark-gray hover:text-white'
                    } transition-colors`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          {showFilterSection === 'solutionType' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="py-4"
            >
              <h3 className="text-lg font-medium mb-3">Filter by Solution Type</h3>
              <div className="flex flex-wrap gap-2">
                {allSolutionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleSolutionTypeFilter(type)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedSolutionTypes.includes(type) 
                        ? 'bg-primary text-white' 
                        : 'bg-medium-gray text-light-gray hover:bg-dark-gray hover:text-white'
                    } transition-colors`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          {showFilterSection === 'technology' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="py-4"
            >
              <h3 className="text-lg font-medium mb-3">Filter by Technology</h3>
              <div className="flex flex-wrap gap-2">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTechnologyFilter(tech)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedTechnologies.includes(tech) 
                        ? 'bg-primary text-white' 
                        : 'bg-medium-gray text-light-gray hover:bg-dark-gray hover:text-white'
                    } transition-colors`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Активные фильтры и сброс */}
          {(selectedIndustries.length > 0 || selectedSolutionTypes.length > 0 || selectedTechnologies.length > 0) && (
            <div className="flex justify-between items-center pt-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-light-gray">Active filters:</span>
                
                {selectedIndustries.map(industry => (
                  <span 
                    key={`ind-${industry}`}
                    className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs flex items-center"
                  >
                    {industry}
                    <button 
                      onClick={() => toggleIndustryFilter(industry)}
                      className="ml-1 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                
                {selectedSolutionTypes.map(type => (
                  <span 
                    key={`sol-${type}`}
                    className="bg-neon-blue/20 text-neon-blue rounded-full px-3 py-1 text-xs flex items-center"
                  >
                    {type}
                    <button 
                      onClick={() => toggleSolutionTypeFilter(type)}
                      className="ml-1 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                
                {selectedTechnologies.map(tech => (
                  <span 
                    key={`tech-${tech}`}
                    className="bg-neon-purple/20 text-neon-purple rounded-full px-3 py-1 text-xs flex items-center"
                  >
                    {tech}
                    <button 
                      onClick={() => toggleTechnologyFilter(tech)}
                      className="ml-1 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              
              <button
                onClick={clearAllFilters}
                className="text-primary hover:text-white transition-colors text-sm"
              >
                Clear All
              </button>
            </div>
          )}
          
          {/* Количество найденных кейсов */}
          <div className="mt-4 text-sm text-light-gray">
            {filteredCases.length} case {filteredCases.length === 1 ? 'study' : 'studies'} found
          </div>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="py-16 bg-site-bg">
        <div className="container mx-auto px-4">
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem) => (
                <CaseCard 
                  key={caseItem.id}
                  title={caseItem.title}
                  description={caseItem.description}
                  industry={caseItem.industry}
                  company={caseItem.company}
                  results={caseItem.results}
                  image={caseItem.image}
                  tags={[caseItem.solutionType, ...caseItem.technologies.slice(0, 2)]}
                  href={`/cases/${caseItem.id}`}
                  style={placeholderStyle}
                />
              ))}
            </div>
          ) : (
            <div className="bg-dark-gray rounded-lg p-8 text-center max-w-2xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No Case Studies Found</h3>
              <p className="text-light-gray mb-4">
                We couldn't find any case studies matching your current filters.
              </p>
              <Button variant="secondary" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Achieve Similar Results?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our automation solutions can help your business achieve optimal efficiency and growth.
          </p>
          <Button variant="primary" size="lg" href="/contacts">
            Schedule a Free Consultation
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}