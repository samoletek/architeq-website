"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CloudinaryVideo } from '@/components/ui/cloudinary-video';

// Определение структуры кейса
interface CaseStudy {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  solutionType: string;
  shortDescription: string;
  problem: string;
  solution: string[];
  technologies: string[];
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  relatedCases: string[];
}

// Массив со всеми кейсами
const caseStudies: CaseStudy[] = [
  // Financial Automations
  {
    id: 'stripe-invoicing',
    title: 'Stripe Invoicing and Financial Control Automation',
    company: 'EclipseGroup',
    location: 'Miami, FL, USA',
    industry: 'Financial Management',
    solutionType: 'Financial Automation',
    shortDescription: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
    problem: `Companies spend dozens of hours monthly on manual invoicing, payment tracking, and sending reminders. Accountants are forced to duplicate data between CRM and financial systems, leading to errors and payment delays.`,
    solution: [
      'Integration of CRM (Monday/Hubspot/Zoho/etc) with financial systems (QuickBooks/Stripe)',
      'Automatic creation of invoices in Stripe when deal status changes in CRM',
      'Instant delivery of invoices to customers with online payment options',
      'Automatic monitoring of payment status with CRM data updates',
      'Reminder system for unpaid invoices',
      'Automatic generation of financial reports (Dashboards)'
    ],
    technologies: ['Monday CRM', 'QuickBooks', 'Stripe', 'Make/Zapier/n8n', 'API integrations'],
    results: [
      '85% reduction in time spent on invoicing',
      '30% acceleration in receiving payments',
      'Elimination of errors in data transfer',
      '25-30% improvement in cash flow'
    ],
    testimonial: {
      quote: "The automation solution Architeq implemented completely transformed our invoicing process. What used to take our accounting team several days each month now happens automatically. The integration between our CRM and financial systems has not only saved us time but has significantly improved our cash flow.",
      author: "Uliana Pak",
      position: "CFO at EclipseGroup"
    },
    relatedCases: ['quickbooks-integration', 'financial-calculations', 'factoring-automation']
  },
  {
    id: 'quickbooks-integration',
    title: 'QuickBooks Integration for Automatic Accounting',
    company: '485 Logistics',
    location: 'West Chester, OH, USA',
    industry: 'Financial Management',
    solutionType: 'Financial Automation',
    shortDescription: 'Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.',
    problem: `Companies use disparate systems for customer and financial management. Data must be transferred manually, leading to errors, double entry, and discrepancies in reporting.`,
    solution: [
      'Bidirectional synchronization between Monday and QuickBooks',
      'Synchronization of customers, products, and transactions with Monday',
      'Automatic matching of payments with invoices',
      'Additional Telegram/Slack notifications'
    ],
    technologies: ['QuickBooks', 'Make', 'Monday/n8n', 'GoogleSheets'],
    results: [
      '75% reduction in time spent on financial reporting',
      'Elimination of double data entry',
      'Increased accuracy of financial reports',
      'Automation of routine accounting operations'
    ],
    testimonial: {
      quote: "After implementing this integration, our accounting department saved nearly 30 hours per month that was previously spent on manual data entry. The accuracy of our financial reporting has dramatically improved and we are able to make business decisions based on real-time financial data.",
      author: "Ananai A.",
      position: "Operations Lead at 485 Logistics"
    },
    relatedCases: ['stripe-invoicing', 'financial-calculations', 'factoring-automation']
  },
  {
    id: 'factoring-automation',
    title: 'Factoring Data Submission Automation',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    industry: 'Financial Management',
    solutionType: 'Financial Automation',
    shortDescription: 'Automatic calculation and submission of accounts receivable data to factoring companies.',
    problem: `Companies using factoring are forced to manually collect accounts receivable data, calculate financing amounts, and transfer information to factoring companies. This leads to delays, errors, and additional labor costs.`,
    solution: [
      'Automatic calculation of total invoices eligible for factoring every 2 days',
      'Formation of detailed invoice reports',
      'Integration with factoring platform for data transfer',
      'Sending status notifications to Telegram/Slack'
    ],
    technologies: ['GoogleDrive', 'GoogleSheets', 'Make/Zapier/n8n', 'Monday CRM', 'Telegram', 'Slack'],
    results: [
      'Reduction of process from several hours to several minutes',
      'Elimination of human errors in calculations',
      'Improved transparency of factoring process',
      'Faster receipt of financing'
    ],
    testimonial: {
      quote: "The factoring automation solution has been a game-changer for our cash flow management. What used to be a painful multi-hour process now happens automatically. We receive our financing faster and can focus on growing our business instead of paperwork.",
      author: "Alexandra Shafran",
      position: "Co-CEO at LaneWise"
    },
    relatedCases: ['stripe-invoicing', 'quickbooks-integration', 'car-hauling-solution']
  },
  
  // Documents and Forms
  {
    id: 'document-generation',
    title: 'Document Generation from CRM Status Changes',
    company: 'Affiliated Medical Supplies',
    location: 'Atlanta, GA, USA',
    industry: 'Document Management',
    solutionType: 'Documents & Forms',
    shortDescription: 'Automatic document generation system that creates documents based on CRM data changes.',
    problem: `Companies spend hours creating standardized documents, filling them with CRM data. The process is prone to human error and takes significant employee time.`,
    solution: [
      'Setting up triggers in CRM for automatic document generation initiation',
      'Automatic filling of templates with CRM data',
      'Document version management system',
      'Automatic conversion to various formats (PDF, DOCX)'
    ],
    technologies: ['Monday CRM', 'Make', 'Google Docs API', 'PandaDoc/SignNow/DocuSign/eSignatures'],
    results: [
      'Document creation time reduced from 35 minutes to 2-3 minutes',
      'Complete elimination of data errors',
      'Standardization of all company documents',
      'Saving 20-30 hours per month on routine legal department work'
    ],
    testimonial: {
      quote: "This automation has been transformative for our document management processes. Creating custom documents used to be a major bottleneck, especially when we needed to generate hundreds of documents for our medical supplies clients. Now it happens with just a few clicks.",
      author: "Elena Pak",
      position: "Operations Manager at Affiliated Medical Supplies"
    },
    relatedCases: ['electronic-signatures', 'web-forms-integration']
  },
  {
    id: 'electronic-signatures',
    title: 'Sending and Receiving Documents for Signature',
    company: '485 Logistics',
    location: 'West Chester, OH, USA',
    industry: 'Document Management',
    solutionType: 'Documents & Forms',
    shortDescription: 'Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.',
    problem: `The document signing process often delays deal closures. Managers spend time sending, controlling signature receipt, and updating statuses in CRM.`,
    solution: [
      'Integration of any CRM with electronic signature systems (DocuSign, PandaDoc etc)',
      'Automatic sending of documents for signature when status changes',
      'Reminder system for clients about the need to sign',
      'Automatic status update in CRM after receiving all signatures',
      'Archiving signed documents in cloud storage'
    ],
    technologies: ['DocuSign/PandaDoc', 'Monday/Pipedrive/HubSpot', 'Make/Zapier/n8n', 'GoogleDrive/Box/DropBox'],
    results: [
      '70% reduction in document signing cycle time',
      '20% increase in completed deal percentage',
      'Instant access to signing status for all process participants',
      'Automatic auditing of all signed documents'
    ],
    testimonial: {
      quote: "The electronic signature integration has shortened our contract closing time dramatically. Our clients appreciate the streamlined process, and our team is no longer constantly checking whether documents have been signed. It all happens automatically with real-time updates in our CRM.",
      author: "Joseph S.",
      position: "Head of Quality Control at 485 Logistics"
    },
    relatedCases: ['document-generation', 'web-forms-integration', 'quickbooks-integration']
  },
  {
    id: 'web-forms-integration',
    title: 'Creating and Integrating Web Forms',
    company: 'Ameriland Capital',
    location: 'Fayetteville, AR, USA',
    industry: 'Lead Generation',
    solutionType: 'Documents & Forms',
    shortDescription: 'Creation and integration of web forms with direct CRM integration for efficient data collection.',
    problem: `Companies use inefficient methods for collecting information from clients, often requiring manual document completion or sending data via email. This leads to information loss and the need for manual data transfer to CRM.`,
    solution: [
      'Creating customized web forms with data validation',
      'Direct integration of forms with CRM system',
      'Automatic processing of attached files',
      'Instant notifications to responsible persons',
      'Automatic creation of tasks and client cards in CRM'
    ],
    technologies: ['JotForm/Typeform/GoogleForms/Cognito', 'Make/Zapier/n8n', 'Monday/Hubspot/Zoho/Pipedrive'],
    results: [
      'Increase in form completion conversion to 60%',
      'Reduction of application processing time by 35%',
      'Elimination of errors in data transfer',
      'Improvement of customer experience'
    ],
    testimonial: {
      quote: "The web form integration has transformed how we collect information from clients. Before, we would chase documents and manually enter data. Now clients complete forms online, and all information automatically appears in our CRM. It is faster, more accurate, and provides a much better experience for our customers.",
      author: "Josh Willams",
      position: "CEO at Ameriland Capital"
    },
    relatedCases: ['document-generation', 'electronic-signatures', 'real-estate-solution']
  },
  
  // CRM System Integrations
  {
    id: 'monday-integration',
    title: 'Comprehensive Monday Integration with External Systems',
    company: 'New Age Cabinetry & Coatings',
    location: 'Phoenix, AZ, USA',
    industry: 'CRM Integration',
    solutionType: 'CRM System Integration',
    shortDescription: 'Comprehensive integration of Monday CRM with multiple external systems for unified data management.',
    problem: `Companies use multiple different services not connected to each other. Information is fragmented, managers spend time transferring data between systems, synchronization problems arise, frequent errors and confusion due to manual entry by people.`,
    solution: [
      'Using Monday as a central hub for all business processes',
      'Two-way integration with communication services (Email, Slack)',
      'Synchronization with calendars (Google Calendar, Calendly)',
      'Integration with cloud storage (Google Drive, Box)',
      'Automation of task creation and status updates',
      'Creation of database (e.g. licensing)'
    ],
    technologies: ['Monday/Hubspot/Pipedrive/Zoho', 'Make/Zapier/n8n', 'Slack', 'Google Workspace API'],
    results: [
      'Single center for managing all business processes',
      '60% reduction in time spent switching between systems',
      'Increased transparency of all processes',
      'Ability to easily create clear data visualizations (Dashboards)',
      'Automation of up to 70% of routine operations'
    ],
    testimonial: {
      quote: "Architeq unified all our disparate tools into a seamless ecosystem with Monday.com at the center. Our team now has a single source of truth for all information, and automation handles the transfer of data between systems. This has completely changed how we operate as a business.",
      author: "Victor Martinez",
      position: "CEO at New Age Cabinetry & Coatings"
    },
    relatedCases: ['notification-system', 'dashboards-creation', 'kitchen-cabinetry-solution']
  },
  {
    id: 'notification-system',
    title: 'Deep Notification Tree by Triggers',
    company: 'MC Keeper',
    location: 'West Chester, OH, USA',
    industry: 'Communications',
    solutionType: 'CRM System Integration',
    shortDescription: 'Complex automatic notification system with conditional triggers based on CRM actions.',
    problem: `Inefficient communication between team and clients. Delays in notifications, missed status updates, lack of transparency in project progress.`,
    solution: [
      'Creating a branched system of automatic notifications',
      'Setting up conditional triggers based on actions in CRM',
      'Multi-channel approach (email, SMS, Slack, mobile pushes)',
      'Personalization of notifications depending on recipient role',
      'Analytics of communication effectiveness through dashboard creation'
    ],
    technologies: ['Monday/Hubspot/Pipedrive/Zoho', 'Make/Zapier/n8n', 'Twilio/OpenPhone/AirCall', 'Slack/Telegram', 'Email API'],
    results: [
      '75% reduction in reaction time to project changes',
      '40% increase in customer service satisfaction',
      'Reduction of missed updates and deadlines to zero',
      'Improvement of internal team communication'
    ],
    testimonial: {
      quote: "The notification system has transformed our team responsiveness. Before, important updates would get buried in emails or missed entirely. Now, critical information is automatically routed to the right people through their preferred channels. Our clients are impressed with how quickly we respond to their needs.",
      author: "K. Maers",
      position: "PM at MC Keeper"
    },
    relatedCases: ['monday-integration', 'slack-notifications', 'dashboards-creation']
  },
  {
    id: 'dashboards-creation',
    title: 'Creating Informative Dashboards',
    company: 'DreamLine',
    location: 'Vancouver, WA, USA',
    industry: 'Analytics',
    solutionType: 'CRM System Integration',
    shortDescription: 'Development of customized interactive dashboards for real-time business monitoring.',
    problem: `It is difficult for managers to get up-to-date summary information about business status. Creating reports takes a lot of time, data often becomes outdated by the time of presentation.`,
    solution: [
      'Development of customized interactive dashboards',
      'Automatic data collection from multiple sources',
      'Real-time KPI visualization',
      'Customizable filters and data slices',
      'Automatic scheduled report distribution'
    ],
    technologies: ['Monday/Hubspot', 'Google Data Studio', 'Make/Zapier/n8n', 'API integrations'],
    results: [
      '80% reduction in time spent on reporting',
      'Decision-making based on up-to-date data',
      '35% increase in management efficiency',
      'Transparency of all business processes for management'
    ],
    testimonial: {
      quote: "The custom dashboards created by Architeq have revolutionized our decision-making process. Our management team now has instant access to key metrics and can drill down to identify trends or issues. Reports that used to take days to compile are now available at the click of a button.",
      author: "Roman S.",
      position: "CEO at DreamLine"
    },
    relatedCases: ['monday-integration', 'notification-system', 'financial-calculations']
  },
  
  // Industry Solutions
  {
    id: 'car-hauling-solution',
    title: 'Boxed Solution for Car Hauling Companies',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    industry: 'Vehicle Transportation',
    solutionType: 'Industry Solution',
    shortDescription: 'Unified system for vehicle transportation companies including order management and payment control.',
    problem: `Companies engaged in vehicle transportation use disparate tools for order management, payment control, factoring, and calculations. This leads to data loss, payment delays, and inefficiency in organizing transportation.`,
    solution: [
      'Unified CRM for order management with automatic delivery cost calculation',
      'CRM setup with custom template specifically for this industry (columns, boards, connects)',
      'Integration with QuickBooks and factoring for automatic payment control',
      'Automated document flow (contracts, estimates, acts)',
      'Automatic calculation of transportation costs (fuel, commissions, payments)',
      'Automatic creation and sending of invoices by triggers',
      'Slack/Telegram notifications about order and payment status'
    ],
    technologies: ['QuickBooks', 'Make/Zapier', 'Google Sheets', 'Monday/HubSpot', 'Stripe/PayPal', 'Telegram/Slack API', 'DocuSign/eSignature/SignNow'],
    results: [
      '60% reduction in order processing time',
      'Elimination of errors in calculations and invoicing',
      'Automated accounts receivable control',
      'Increased transparency of logistics and payments',
      'Increased customer loyalty through Quality Control department integration and automations'
    ],
    testimonial: {
      quote: "The boxed solution for our car hauling business has streamlined every aspect of our operations. From order intake to delivery and payment, everything is now connected and automated. We have eliminated the administrative bottlenecks that were holding back our growth.",
      author: "Alex Marar",
      position: "Operations Director at LaneWise"
    },
    relatedCases: ['factoring-automation', 'telephony-integration', 'quickbooks-integration']
  },
  {
    id: 'kitchen-cabinetry-solution',
    title: 'Boxed Solution for Kitchen Cabinetry Manufacturers',
    company: 'AllWood Design',
    location: 'San Diego, CA, USA',
    industry: 'Manufacturing',
    solutionType: 'Industry Solution',
    shortDescription: 'Centralized system for kitchen furniture manufacturing companies to manage orders, design, and production.',
    problem: `Kitchen furniture manufacturing companies use disparate tools for order management, design, and production. This leads to errors in specifications, information loss, and delays in project completion.`,
    solution: [
      'Centralization of all data in Monday CRM',
      'CRM setup with custom template specifically for this industry (columns, boards, connects)',
      'Integration of CabinetVision/AutoCAD with CRM for automatic specification transfer',
      'Automatic creation of production tasks',
      'Material tracking system and procurement automation',
      'Interactive dashboards for project status visualization',
      'Automated document flow (contracts, estimates, acts)'
    ],
    technologies: ['Monday', 'CabinetVision', 'Make/Zapier/n8n', 'GoogleSheets', 'QuickBooks/Stripe'],
    results: [
      '30% reduction in order fulfillment cycle',
      '85% reduction in specification errors',
      '20-25% increase in project profitability',
      'Increased team productivity',
      'Increased customer loyalty'
    ],
    testimonial: {
      quote: "The cabinetry solution has transformed how we run our manufacturing operations. The integration between our design software and production scheduling is seamless. We have eliminated specification errors that used to cause costly rework, and our production timeline has become much more predictable.",
      author: "Vody Pavluyk",
      position: "Co-CEO at AllWood Design"
    },
    relatedCases: ['monday-integration', 'document-generation', 'dashboards-creation']
  },
  {
    id: 'music-label-solution',
    title: 'Boxed Solution for Music Labels',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industry: 'Music Industry',
    solutionType: 'Industry Solution',
    shortDescription: 'Centralized system for managing music assets, royalty calculations, and copyright control.',
    problem: `Music labels face multiple manual processes and a variety of different tools: release management, royalty calculation, track marketing, license tracking happens on different websites and in different programs, which takes time away from creative work, reduces efficiency and engagement.`,
    solution: [
      'Centralized system for managing music assets',
      'CRM setup with custom template specifically for this industry (columns, boards, connects)',
      'Automatic royalty calculation for various contracts',
      'Document generation for the entire project cycle',
      'Generation and sending of reports to artists',
      'Copyright control system',
      'End-to-end calculation of payments and rewards to vendors'
    ],
    technologies: ['Monday', 'AirTable', 'Zapier/Make/n8n', 'Music platform APIs', 'GoogleSheets', 'Stripe'],
    results: [
      'Aggregation of all tools used in one place',
      '75% reduction in administrative work',
      'Accurate and timely calculation and payment of royalties',
      'Catalog expansion without increasing administrative personnel'
    ],
    testimonial: {
      quote: "As a music label operating across two continents, our administrative challenges were significant. The boxed solution from Architeq has centralized all our operations, from release management to royalty calculations. Our artists are happier with the timely and accurate reporting, and our team can focus on creative work instead of administrative tasks.",
      author: "Max Taylor and Angelina Phengpong",
      position: "Lead Producers at SUQEAK E CLEAN STUDIOS"
    },
    relatedCases: ['ai-crm-assistant', 'financial-calculations', 'monday-integration']
  },
  {
    id: 'real-estate-solution',
    title: 'Boxed Solution for Real Estate Companies',
    company: 'Ameriland Capital',
    location: 'Fayetteville, AR, USA',
    industry: 'Real Estate',
    solutionType: 'Industry Solution',
    shortDescription: 'Automation solution for real estate agencies to coordinate showings, prepare documents, and track deals.',
    problem: `Real estate agencies spend significant time coordinating showings, preparing documents, tracking deals, and communicating with clients.`,
    solution: [
      'Automation of lead capture and qualification from different channels',
      'CRM setup with custom template specifically for this industry (columns, boards, connects)',
      'Calendar integration for planning showings',
      'Automatic reminder system for clients',
      'Deal document flow management with electronic signatures',
      'Analytics of agent and property effectiveness (Dashboards)'
    ],
    technologies: ['Monday/Pipedrive/Zoho', 'Calendly', 'DocuSign', 'Make/Zapier/n8n', 'Google Workspace'],
    results: [
      '55% increase in number of leads processed',
      '40% reduction in deal closing time',
      'Increase in successful deal indicator to 35%',
      'Automation of up to 60% of administrative work'
    ],
    testimonial: {
      quote: "The real estate solution has transformed our agency operations. Our agents now spend more time with clients and less time on paperwork. The automated lead qualification and showing scheduling have increased our conversion rates, and the electronic signature integration has shortened our closing cycles dramatically.",
      author: "Josh Willams",
      position: "CEO Ameriland Capital"
    },
    relatedCases: ['electronic-signatures', 'web-forms-integration', 'dashboards-creation']
  },
  {
    id: 'roofing-business-solution',
    title: 'Boxed Solution for Roofing Business with AI Components',
    company: 'Up-Struct LLC',
    location: 'Lynnwood, WA, USA',
    industry: 'Construction',
    solutionType: 'Industry Solution',
    shortDescription: 'Comprehensive solution for roofing companies with AI components for client communication and cost estimation.',
    problem: `Roofing companies face difficulties in project management, cost estimation, resource planning, and client communication, leading to delays and budget overruns.`,
    solution: [
      'Automated system for collecting applications and qualifying clients',
      'Development of AI-voice bot for receiving client applications and booking roof inspections',
      'Cost calculator based on roof parameters and materials',
      'Planning and optimization of Salespersons time',
      'Automatic client notifications about work progress',
      'Warranty service management system'
    ],
    technologies: ['Monday CRM', 'Make/Zapier/n8n', 'Google Workspace', 'Twilio', 'ElevenLabs', 'PlayHT'],
    results: [
      '40% increase in project cost estimation accuracy',
      '25% reduction in project completion time',
      'Automation of client call reception',
      'Improved customer experience and increased positive reviews'
    ],
    testimonial: {
      quote: "The AI components in our roofing business solution have been a game-changer. The voice bot handles initial client inquiries 24/7, our cost estimations are more accurate, and clients love the automatic progress updates. We have increased our capacity without adding administrative staff.",
      author: "Alex A.",
      position: "Owner at Up-Struct LLC"
    },
    relatedCases: ['ai-voice-bot', 'notification-system', 'telephony-integration']
  },
  
  // AI Solutions
  {
    id: 'ai-voice-bot',
    title: 'AI-Voice Bot for Client Request Processing',
    company: 'Up-Struct LLC',
    location: 'Lynnwood, WA, USA',
    industry: 'Customer Service',
    solutionType: 'AI Solution',
    shortDescription: 'Multi-level interactive voice assistant for processing client requests without operator participation.',
    problem: `Companies cannot handle the growing volume of calls from clients, leading to long waiting times and customer dissatisfaction. Also, errors in operator communication and deviation from scripts lead to lead loss.`,
    solution: [
      'Multi-level interactive voice assistant based on AI',
      'Integration with CRM for uploading obtained data to lead database',
      'Recognition and processing of typical requests without operator participation',
      'Smart routing of complex requests to specialists',
      'Booking appointments/showings without Salesperson participation',
      'Personalized recommendations based on client history'
    ],
    technologies: ['OpenAI', 'ElevenLabs', 'Twilio', 'Monday'],
    results: [
      'Automation of 60-70% of incoming requests',
      'Reduction of waiting time to minimum',
      '24/7 operation mode without increasing staff',
      'Significant savings on support team expansion',
      '90% reduction in communication errors'
    ],
    testimonial: {
      quote: "The AI voice bot has completely transformed our client intake process. It handles most routine inquiries automatically, schedules appointments, and only routes complex issues to our specialists. Our clients are impressed with the fast response times, and we have been able to scale our operations without expanding our support team.",
      author: "Elena Wang",
      position: "Customer Service Manager at Up-Struct LLC"
    },
    relatedCases: ['roofing-business-solution', 'telephony-integration', 'speech-to-text-analysis']
  },
  {
    id: 'ai-crm-assistant',
    title: 'AI Assistant for CRM Information Search',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industry: 'Data Management',
    solutionType: 'AI Solution',
    shortDescription: 'Integration of AI assistant into CRM interface for natural language data search and summarization.',
    problem: `Employees spend a lot of time searching for necessary information in CRM system, especially newcomers who find it difficult to navigate the data structure and aggregate information on previous clients.`,
    solution: [
      'Integration of AI assistant directly into CRM interface with custom convenient widget',
      'Processing employees natural language requests',
      'Smart search across all related records in CRM',
      'Automatic summarization of information from different sources'
    ],
    technologies: ['OpenAI/Claude', 'Monday/Hubspot', 'Retool'],
    results: [
      '90% reduction in information search time',
      'Fast adaptation of new employees',
      'Increased efficiency of working with clients',
      'More informed decisions based on complete data'
    ],
    testimonial: {
      quote: "The AI assistant for our CRM has made information retrieval incredibly efficient. Our team can ask questions in natural language and get comprehensive answers drawn from across our entire database. New team members get up to speed much faster, and everyone saves time that used to be spent digging through records.",
      author: "David Gaddie",
      position: "CEO at SUQEAK E CLEAN STUDIOS"
    },
    relatedCases: ['music-label-solution', 'speech-to-text-analysis', 'dashboards-creation']
  },
  {
    id: 'speech-to-text-analysis',
    title: 'AI Speech-to-Text Parser for Client Communication Analysis',
    company: 'Various Companies',
    location: 'Multiple Locations',
    industry: 'Customer Service',
    solutionType: 'AI Solution',
    shortDescription: 'System for automatic transcription and analysis of client conversations to improve service quality.',
    problem: `Companies do not have an accurate way to track and analyze operator interactions with clients. Manual listening to calls takes a lot of time, and identifying problem areas and script compliance is difficult.`,
    solution: [
      'Automatic speech recognition of operators and clients',
      'Converting conversations to text with speaker markup',
      'Analysis of key phrases and deviations from scripts',
      'Identifying emotional tone and determining problematic calls',
      'Creating reports with main metrics and identified problems',
      'Integration with CRM for automatic saving of transcripts'
    ],
    technologies: ['OpenAI Whisper', 'Google Speech-to-Text API', 'Make/Zapier', 'Monday'],
    results: [
      '90% automation of conversation analysis',
      '75% reduction in time spent on call quality control',
      'Identification of deviations from scripts and problem areas',
      'Improvement of customer service quality and sales conversion'
    ],
    testimonial: {
      quote: "The speech-to-text analysis system has transformed our quality control process. We are now able to analyze 100% of customer interactions rather than just a small sample. We have identified patterns in successful calls, coached our team based on data rather than intuition, and significantly improved our conversion rates.",
      author: "NDA",
      position: "NDA"
    },
    relatedCases: ['ai-voice-bot', 'telephony-integration', 'notification-system']
  },
  
  // Integrations and Automations
  {
    id: 'financial-calculations',
    title: 'Complex Calculations for Financial Computations',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industry: 'Financial Management',
    solutionType: 'Integration & Automation',
    shortDescription: 'Automated financial calculation system for handling complex payment structures with multiple variables.',
    problem: `Companies face difficulties in calculating payments for different categories of employees and contractors. The process includes many variables, such as taxes, bonuses, deductions, rates for external and internal specialists. Errors in calculations lead to discrepancies, payment delays, and additional costs for corrections.`,
    solution: [
      'Automatic calculation of payments based on entered data',
      'Accounting for fixed and variable payments, including taxes, bonuses, and deductions',
      'Separate calculations for internal employees and external contractors',
      'Generation of payroll and automatic sending to payment systems (QuickBooks, Bill)',
      'Reports and visualization of calculations for transparency and control (Dashboards)'
    ],
    technologies: ['Google Sheets', 'Make/Zapier/n8n', 'Monday/HubSpot', 'Stripe/PayPal/QuickBooks/Bill'],
    results: [
      '90% increase in calculation accuracy',
      '75% reduction in time spent on payment calculations',
      'Pricing optimization and increased margin',
      'Unification of calculations within company'
    ],
    testimonial: {
      quote: "The financial computation system has eliminated the errors and inconsistencies that used to plague our payment process. Calculations that used to take days now happen automatically, and we have been able to implement more complex payment structures without adding administrative burden.",
      author: "Jaqueline Gaddie",
      position: "Financial Director at SUQEAK E CLEAN STUDIOS"
    },
    relatedCases: ['quickbooks-integration', 'stripe-invoicing', 'dashboards-creation']
  },
  {
    id: 'slack-notifications',
    title: 'Slack Notification Automation',
    company: 'MC Keeper',
    location: 'West Chester, OH, USA',
    industry: 'Corporate Communications',
    solutionType: 'Integration & Automation',
    shortDescription: 'Complex automatic notification system in Slack with filtering, routing, and priority management.',
    problem: `Teams drown in the flow of messages and notifications, critical information gets lost, there is no structured approach to communication, no prioritization of notifications.`,
    solution: [
      'Filtering messages by keywords, senders, and importance',
      'Automatic routing of messages to appropriate channels or private chats',
      'Integration with CRM, task managers (Jira, Trello, Monday.com) for creating tasks from messages',
      'Priority notifications (division into critical, important, secondary)',
      'Integration with Google Sheets for event logging (+logging in Make)',
      'Sending SMS/Telegram alerts for especially important messages'
    ],
    technologies: ['Slack', 'Make/Zapier/n8n', 'Monday', 'Google Workspace', 'Jira', 'Twilio/OpenPhone/AirCall'],
    results: [
      '80% reduction in missed notifications',
      '30% increase in team work efficiency',
      'Centralization of communications and reduction of meaningless notifications',
      'Automation of information exchange between departments'
    ],
    testimonial: {
      quote: "The Slack notification system has transformed our internal communications. Important messages now stand out, and team members receive exactly the information they need without the noise. We have eliminated the problem of not seeing important messages, and cross-departmental coordination has improved dramatically.",
      author: "Michael Fox-Rabinovitz",
      position: "Financial Consultant at MC Keeper"
    },
    relatedCases: ['notification-system', 'monday-integration', 'telephony-integration']
  },
  {
    id: 'telephony-integration',
    title: 'Telephony Setup and CRM Integration',
    company: 'EclipseGroup',
    location: 'Miami, FL, USA',
    industry: 'Sales & Customer Service',
    solutionType: 'Integration & Automation',
    shortDescription: 'Integration of telephony systems with CRM for automatic call logging and customer data management.',
    problem: `Companies lose valuable information about customer interactions by phone, spend time on manual entry of call data into CRM.`,
    solution: [
      'Integration of telephony (Twilio/AirCall/OpenPhone) with CRM',
      'Registration of A2P campaigns for SMS distribution',
      'Automatic creation of call records in CRM',
      'Client identification on incoming calls',
      'Recording and automatic transcription of conversations using AI'
    ],
    technologies: ['Twilio/AirCall/OpenPhone', 'Monday/Hubspot/Zoho', 'Make/Zapier/n8n'],
    results: [
      '60% increase in call processing efficiency',
      'Saving complete history of client communications',
      'AI analysis of conversations to improve service quality',
      'Automation of post-call activities (sending materials, follow-up)'
    ],
    testimonial: {
      quote: "The telephony integration has given us a complete view of all client interactions. Our sales team no longer wastes time logging calls, and managers can see the full communication history with each client. The automatic transcription feature has been invaluable for training and quality assurance.",
      author: "Eugene Gourevitch",
      position: "SEO at EclipseGroup"
    },
    relatedCases: ['speech-to-text-analysis', 'ai-voice-bot', 'notification-system']
  }
];

// Поиск кейса по его идентификатору (slug)
function getCaseStudyBySlug(slug: string) {
  return caseStudies.find(caseStudy => caseStudy.id === slug);
}

// Получение связанных кейсов
function getRelatedCaseStudies(relatedIds: string[]) {
  return caseStudies.filter(caseStudy => relatedIds.includes(caseStudy.id));
}

// Клиентский компонент страницы кейса
export default function CaseStudyPage() {
  // Используем хук usePathname для получения URL
  const pathname = usePathname();
  const slug = pathname?.split('/').pop() || '';
  
  // Состояния для данных кейса
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedCases, setRelatedCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Загрузка данных кейса при монтировании компонента
  useEffect(() => {
    if (slug) {
      const foundCaseStudy = getCaseStudyBySlug(slug);
      
      if (foundCaseStudy) {
        setCaseStudy(foundCaseStudy);
        const relatedCasesData = getRelatedCaseStudies(foundCaseStudy.relatedCases);
        setRelatedCases(relatedCasesData);
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
      
      // Обновляем метаданные динамически
      if (foundCaseStudy) {
        document.title = `${foundCaseStudy.title} | Architeq Case Study`;
      }
    }
  }, [slug]);
  
  // Возвращаем загрузочный UI пока данные загружаются
  if (loading) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-light-gray">Loading case study...</p>
        </div>
      </SiteLayout>
    );
  }
  
  // Обработка ситуации, когда кейс не найден
  if (notFound) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
          <p className="text-light-gray mb-8">We could not find the case study you are looking for.</p>
          <Link href="/cases">
            <Button variant="primary">View All Case Studies</Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // Если у нас есть данные кейса, отображаем полный интерфейс
  return (
    <SiteLayout>
      {/* Breadcrumbs */}
      <div className="bg-dark-gray border-b border-medium-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-light-gray">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/cases" className="hover:text-white transition-colors">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{caseStudy?.title}</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <section className="bg-dark-gray pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                  {caseStudy?.solutionType}
                </span>
                <span className="mx-2 text-light-gray">•</span>
                <span className="text-light-gray">{caseStudy?.industry}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {caseStudy?.title}
              </h1>
              
              <p className="text-xl text-light-gray mb-6">
                {caseStudy?.shortDescription}
              </p>
              
              <div className="flex items-center text-light-gray mb-8">
                <span className="font-medium text-white">{caseStudy?.company}</span>
                <span className="mx-2">•</span>
                <span>{caseStudy?.location}</span>
              </div>
              
              <Button variant="primary" size="lg" href="/contacts">
                Book a Similar Solution
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left column - main content */}
            <div className="md:col-span-2">
              {/* Problem section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Problem</h2>
                </div>
                <p className="text-light-gray">
                  {caseStudy?.problem}
                </p>
              </div>
              
              {/* Solution section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Solution</h2>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {caseStudy?.solution.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-light-gray">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Case Study Video */}
                <div className="rounded-lg overflow-hidden border border-medium-gray">
                  <div className="bg-dark-gray px-4 py-2 flex items-center border-b border-medium-gray">
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex-1 text-center text-sm text-light-gray">
                      Automation Process
                    </div>
                  </div>
                  <div className="bg-medium-gray overflow-hidden">
                    <CloudinaryVideo 
                      publicId={caseStudy?.id || ''} 
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      controls={false}
                      width={800}
                      height={450}
                      placeholder={
                        <div className="h-64 flex items-center justify-center">
                          <div className="text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-light-gray">Loading case study visualization...</p>
                          </div>
                        </div>
                      }
                      onError={() => console.log(`Failed to load video for case: ${caseStudy?.id}`)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Results section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Results</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {caseStudy?.results.map((result, index) => (
                    <div 
                      key={index} 
                      className="bg-dark-gray rounded-lg p-5 border border-medium-gray hover:border-primary/40 transition-colors"
                    >
                      <p className="text-light-gray">{result}</p>
                    </div>
                  ))}
                </div>
                
                {/* Testimonial */}
                {caseStudy?.testimonial && (
                  <div className="bg-dark-gradient rounded-lg p-8 relative">
                    <div className="absolute top-4 left-4 text-5xl text-primary opacity-20"></div>
                    <div className="relative z-10">
                      <p className="text-lg mb-6 italic text-light-gray">
                        {caseStudy.testimonial.quote}
                      </p>
                      <div>
                        <p className="font-bold">{caseStudy.testimonial.author}</p>
                        <p className="text-light-gray text-sm">{caseStudy.testimonial.position}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 text-5xl text-primary opacity-20"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - sidebar */}
            <div className="md:col-span-1">
              {/* Technologies used */}
              <div className="bg-dark-gray rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <div className="space-y-3">
                  {caseStudy?.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-light-gray">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Block */}
              <div className="bg-dark-gradient rounded-lg p-6 mb-8 border border-medium-gray">
                <h3 className="text-lg font-semibold mb-3">Need a Similar Solution?</h3>
                <p className="text-light-gray mb-4">
                  Let us discuss how we can implement a similar automation solution tailored to your business needs.
                </p>
                <Button variant="primary" className="w-full" href="/contacts">
                  Book a Free Consultation
                </Button>
              </div>
              
              {/* Related Cases */}
              {relatedCases.length > 0 && (
                <div className="bg-dark-gray rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Case Studies</h3>
                  <div className="space-y-4">
                    {relatedCases.map((relatedCase) => (
                      <Link 
                        key={relatedCase.id}
                        href={`/cases/${relatedCase.id}`}
                        className="block p-4 bg-medium-gray rounded-lg hover:bg-medium-gray/80 transition-colors"
                      >
                        <p className="font-medium mb-1">{relatedCase.title}</p>
                        <div className="flex items-center text-primary text-sm">
                          <span>Read Case Study</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
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
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business Operations?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our automation solutions can help streamline your operations and boost efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" href="/contacts">
              Book a Free Consultation
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              View More Case Studies
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}