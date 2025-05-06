// src/lib/data/case-studies.ts

/**
 * Единая структура данных для кейса
 */
export interface CaseStudy {
    id: string;                  // Уникальный идентификатор/slug для URL
    title: string;               // Название кейса
    company: string;             // Название компании-клиента
    location: string;            // Местоположение клиента
    industry: string;            // Отрасль
    solutionType: string;        // Тип решения
    description: string;         // Краткое описание (для карточек и списков)
    image?: string;              // Путь к изображению
    technologies: string[];      // Использованные технологии
    results: string[];           // Достигнутые результаты
    featured?: boolean;          // Флаг для отображения на главной странице
    
    // Дополнительные поля для детальной страницы
    problem?: string;            // Описание проблемы
    solution?: string[];         // Пошаговое решение
    shortDescription?: string;   // Еще более краткое описание (для карточек)
    testimonial?: {
      quote: string;             // Цитата
      author: string;            // Автор цитаты
      position: string;          // Должность автора
    };
    relatedCases?: string[];     // Связанные кейсы (массив ID)
  }
  
  /**
   * Все кейсы в едином массиве
   */
  export const allCaseStudies: CaseStudy[] = [
    // Financial Automations
    {
      id: 'broker-calculator',
      title: 'Interactive Vehicle Transport Price Calculator',
      company: 'Car Haul Direct',
      location: 'West Chester, OH, USA',
      industry: 'Logistics & Transportation',
      solutionType: 'Web-application',
      description: 'Development of a comprehensive transport pricing calculator with real-time route visualization, weather analysis, and detailed price breakdown.',
      shortDescription: 'Interactive vehicle shipping calculator with dynamic pricing factors, route visualization, and automated quote delivery.',
      problem: 'Vehicle transport brokers spend significant time manually calculating shipping quotes. Each quote requires consideration of multiple factors: distance, vehicle type, transport mode, weather conditions, traffic, and additional services. This manual process is time-consuming, error-prone, and lacks transparency for customers.',
      solution: [
        'Creation of an interactive calculator with Google Maps integration for visual route planning',
        'Dynamic pricing system accounting for vehicle value, transport type, and distance',
        'Real-time weather analysis along the route with price adjustments for adverse conditions',
        'Traffic congestion analysis and impact calculation on delivery time and cost',
        'Auto show event detection near pickup/delivery locations with dynamic pricing',
        'Toll road cost estimation with regional segmentation',
        'Additional services selection with automatic price adjustment',
        'Detailed price breakdown with visualization of all cost components',
        'Email quote delivery system with unique quote tracking',
        'Adaptive, optimized web application for different types of devices'
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Google Maps API', 'Weather API', 'Tailwind CSS', 'EmailJS', 'Iron Session', 'React Select'],
      results: [
        '68% reduction in time spent creating quotes',
        '34% increase in quote request conversion rate',
        'Complete elimination of calculation errors',
        'Improved customer experience with transparent pricing',
        '27% increase in service add-ons selection due to clear visualization'
      ],
      testimonial: {
        quote: 'The calculator has transformed our quoting process. What used to take our team 15-20 minutes per quote now happens in seconds. Customers love the transparency of seeing exactly what factors influence their shipping cost, and our team appreciates the accuracy and consistency. The visual route mapping and weather analysis gives us a major advantage over competitors.',
        author: 'Eugene Gourevitch',
        position: 'CFO at Car Haul Direct'
      },
      relatedCases: ['car-hauling-solution', 'telephony-integration', 'document-generation'],
      featured: true,
      image: '/images/cases/broker-calculator.jpg'
    },
    {
      id: 'stripe-invoicing',
      title: 'Stripe Invoicing and Financial Control Automation',
      company: 'EclipseGroup',
      location: 'Miami, FL, USA',
      industry: 'Financial Management',
      solutionType: 'Financial Automation',
      description: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
      shortDescription: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
      problem: 'Companies spend dozens of hours monthly on manual invoicing, payment tracking, and sending reminders. Accountants are forced to duplicate data between CRM and financial systems, leading to errors and payment delays.',
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
        quote: 'The automation solution Architeq implemented completely transformed our invoicing process. What used to take our accounting team several days each month now happens automatically. The integration between our CRM and financial systems has not only saved us time but has significantly improved our cash flow.',
        author: 'Uliana Pak',
        position: 'CFO at EclipseGroup'
      },
      relatedCases: ['quickbooks-integration', 'financial-calculations', 'factoring-automation'],
      featured: true,
      image: '/images/cases/stripe-invoicing.jpg'
    },
    {
      id: 'quickbooks-integration',
      title: 'QuickBooks Integration for Automatic Accounting',
      company: '485 Logistics',
      location: 'West Chester, OH, USA',
      industry: 'Financial Management',
      solutionType: 'Financial Automation',
      description: 'Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.',
      shortDescription: 'Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.',
      problem: 'Companies use disparate systems for customer and financial management. Data must be transferred manually, leading to errors, double entry, and discrepancies in reporting.',
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
        quote: 'After implementing this integration, our accounting department saved nearly 30 hours per month that was previously spent on manual data entry. The accuracy of our financial reporting has dramatically improved and we are able to make business decisions based on real-time financial data.',
        author: 'Ananai A.',
        position: 'Operations Lead at 485 Logistics'
      },
      relatedCases: ['stripe-invoicing', 'financial-calculations', 'factoring-automation'],
      featured: true,
      image: '/images/cases/quickbooks-integration.jpg'
    },
    {
      id: 'factoring-automation',
      title: 'Factoring Data Submission Automation',
      company: 'LaneWise',
      location: 'State College, PA, USA',
      industry: 'Financial Management',
      solutionType: 'Financial Automation',
      description: 'Automatic calculation and submission of accounts receivable data to factoring companies.',
      shortDescription: 'Automatic calculation and submission of accounts receivable data to factoring companies.',
      problem: 'Companies using factoring are forced to manually collect accounts receivable data, calculate financing amounts, and transfer information to factoring companies. This leads to delays, errors, and additional labor costs.',
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
        quote: 'The factoring automation solution has been a game-changer for our cash flow management. What used to be a painful multi-hour process now happens automatically. We receive our financing faster and can focus on growing our business instead of paperwork.',
        author: 'Alexandra Shafran',
        position: 'Co-CEO at LaneWise'
      },
      relatedCases: ['stripe-invoicing', 'quickbooks-integration', 'car-hauling-solution'],
      featured: false,
      image: '/images/cases/factoring-automation.jpg'
    },
    
    // Documents and Forms
    {
      id: 'document-generation',
      title: 'Document Generation from CRM Status Changes',
      company: 'Affiliated Medical Supplies',
      location: 'Atlanta, GA, USA',
      industry: 'Document Management',
      solutionType: 'Documents & Forms',
      description: 'Automatic document generation system that creates documents based on CRM data changes.',
      shortDescription: 'Automatic document generation system that creates documents based on CRM data changes.',
      problem: 'Companies spend hours creating standardized documents, filling them with CRM data. The process is prone to human error and takes significant employee time.',
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
        quote: 'This automation has been transformative for our document management processes. Creating custom documents used to be a major bottleneck, especially when we needed to generate hundreds of documents for our medical supplies clients. Now it happens with just a few clicks.',
        author: 'Elena Pak',
        position: 'Operations Manager at Affiliated Medical Supplies'
      },
      relatedCases: ['electronic-signatures', 'web-forms-integration'],
      featured: true,
      image: '/images/cases/document-generation.jpg'
    },
    {
      id: 'electronic-signatures',
      title: 'Sending and Receiving Documents for Signature',
      company: '485 Logistics',
      location: 'West Chester, OH, USA',
      industry: 'Document Management',
      solutionType: 'Documents & Forms',
      description: 'Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.',
      shortDescription: 'Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.',
      problem: 'The document signing process often delays deal closures. Managers spend time sending, controlling signature receipt, and updating statuses in CRM.',
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
        quote: 'The electronic signature integration has shortened our contract closing time dramatically. Our clients appreciate the streamlined process, and our team is no longer constantly checking whether documents have been signed. It all happens automatically with real-time updates in our CRM.',
        author: 'Joseph E.',
        position: 'Head of Quality Control at 485 Logistics'
      },
      relatedCases: ['document-generation', 'web-forms-integration', 'quickbooks-integration'],
      featured: false,
      image: '/images/cases/electronic-signatures.jpg'
    },
    {
      id: 'web-forms-integration',
      title: 'Creating and Integrating Web Forms',
      company: 'New Age Cabinetry & Coatings',
      location: 'Phoenix, AZ, USA',
      industry: 'Lead Generation',
      solutionType: 'Documents & Forms',
      description: 'Creation and integration of web forms with direct CRM integration for efficient data collection.',
      shortDescription: 'Creation and integration of web forms with direct CRM integration for efficient data collection.',
      problem: 'Companies use inefficient methods for collecting information from clients, often requiring manual document completion or sending data via email. This leads to information loss and the need for manual data transfer to CRM.',
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
        quote: 'The web form integration has transformed how we collect information from clients. Before, we would chase documents and manually enter data. Now clients complete JotForm online, and all information automatically appears in our CRM. Very cool!',
        author: 'Jonathan Martinez',
        position: 'Team Lead at New Age Cabinetry & Coatings'
      },
      relatedCases: ['document-generation', 'electronic-signatures', 'real-estate-solution'],
      featured: false,
      image: '/images/cases/web-forms-integration.jpg'
    },
    
    // CRM System Integrations
    {
      id: 'monday-integration',
      title: 'Comprehensive Monday Integration with External Systems',
      company: 'New Age Cabinetry & Coatings',
      location: 'Phoenix, AZ, USA',
      industry: 'CRM Integration',
      solutionType: 'CRM System Integration',
      description: 'Comprehensive integration of Monday CRM with multiple external systems for unified data management.',
      shortDescription: 'Comprehensive integration of Monday CRM with multiple external systems for unified data management.',
      problem: 'Companies use multiple different services not connected to each other. Information is fragmented, managers spend time transferring data between systems, synchronization problems arise, frequent errors and confusion due to manual entry by people.',
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
        quote: 'Architeq unified all our disparate tools into a seamless ecosystem with Monday.com at the center. Our team now has a single source of truth for all information, and automation handles the transfer of data between systems. This has completely changed how we operate as a business.',
        author: 'Victor Martinez',
        position: 'CEO at New Age Cabinetry & Coatings'
      },
      relatedCases: ['notification-system', 'dashboards-creation', 'kitchen-cabinetry-solution'],
      featured: false,
      image: '/images/cases/monday-integration.jpg'
    },
    {
      id: 'notification-system',
      title: 'Deep Notification Tree by Triggers',
      company: 'MC Keeper',
      location: 'West Chester, OH, USA',
      industry: 'Communications',
      solutionType: 'CRM System Integration',
      description: 'Complex automatic notification system with conditional triggers based on CRM actions.',
      shortDescription: 'Complex automatic notification system with conditional triggers based on CRM actions.',
      problem: 'Inefficient communication between team and clients. Delays in notifications, missed status updates, lack of transparency in project progress.',
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
        quote: 'The notification system has transformed our team responsiveness. Before, important updates would get buried in emails or missed entirely. Now, critical information is automatically routed to the right people through their preferred channels. Our clients are impressed with how quickly we respond to their needs.',
        author: 'K. Maers',
        position: 'PM at MC Keeper'
      },
      relatedCases: ['monday-integration', 'slack-notifications', 'dashboards-creation'],
      featured: false,
      image: '/images/cases/notification-system.jpg'
    },
    {
      id: 'dashboards-creation',
      title: 'Creating Informative Dashboards',
      company: 'DreamLine',
      location: 'Vancouver, WA, USA',
      industry: 'Analytics',
      solutionType: 'CRM System Integration',
      description: 'Development of customized interactive dashboards for real-time business monitoring.',
      shortDescription: 'Development of customized interactive dashboards for real-time business monitoring.',
      problem: 'It is difficult for managers to get up-to-date summary information about business status. Creating reports takes a lot of time, data often becomes outdated by the time of presentation.',
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
        quote: 'The custom dashboards created by Architeq have revolutionized our decision-making process. Our management team now has instant access to key metrics and can drill down to identify trends or issues. Reports that used to take days to compile are now available at the click of a button.',
        author: 'Roman S.',
        position: 'CEO at DreamLine'
      },
      relatedCases: ['monday-integration', 'notification-system', 'financial-calculations'],
      featured: false,
      image: '/images/cases/dashboards-creation.jpg'
    },
    
    // Industry Solutions
    {
      id: 'car-hauling-solution',
      title: 'Boxed Solution for Car Hauling Companies',
      company: 'LaneWise',
      location: 'State College, PA, USA',
      industry: 'Vehicle Transportation',
      solutionType: 'Industry Solution',
      description: 'Unified system for vehicle transportation companies including order management and payment control.',
      shortDescription: 'Unified system for vehicle transportation companies including order management and payment control.',
      problem: 'Companies engaged in vehicle transportation use disparate tools for order management, payment control, factoring, and calculations. This leads to data loss, payment delays, and inefficiency in organizing transportation.',
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
        quote: 'The boxed solution for our car hauling business has streamlined every aspect of our operations. From order intake to delivery and payment, everything is now connected and automated. We have eliminated the administrative bottlenecks that were holding back our growth.',
        author: 'Alex Marar',
        position: 'Operations Director at LaneWise'
      },
      relatedCases: ['factoring-automation', 'telephony-integration', 'quickbooks-integration'],
      featured: false,
      image: '/images/cases/car-hauling-solution.jpg'
    },
    {
      id: 'kitchen-cabinetry-solution',
      title: 'Boxed Solution for Kitchen Cabinetry Manufacturers',
      company: 'AllWood Design',
      location: 'San Diego, CA, USA',
      industry: 'Manufacturing',
      solutionType: 'Industry Solution',
      description: 'Centralized system for kitchen furniture manufacturing companies to manage orders, design, and production.',
      shortDescription: 'Centralized system for kitchen furniture manufacturing companies to manage orders, design, and production.',
      problem: 'Kitchen furniture manufacturing companies use disparate tools for order management, design, and production. This leads to errors in specifications, information loss, and delays in project completion.',
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
        quote: 'The cabinetry solution has transformed how we run our manufacturing operations. The integration between our design software and production scheduling is seamless. We have eliminated specification errors that used to cause costly rework, and our production timeline has become much more predictable.',
        author: 'Vody Pavluyk',
        position: 'Co-CEO at AllWood Design'
      },
      relatedCases: ['monday-integration', 'document-generation', 'dashboards-creation'],
      featured: false,
      image: '/images/cases/kitchen-cabinetry-solution.jpg'
    },
    {
      id: 'music-label-solution',
      title: 'Boxed Solution for Music Labels',
      company: 'SUQEAK E CLEAN STUDIOS',
      location: 'USA, Australia',
      industry: 'Music Industry',
      solutionType: 'Industry Solution',
      description: 'Centralized system for managing music assets, royalty calculations, and copyright control.',
      shortDescription: 'Centralized system for managing music assets, royalty calculations, and copyright control.',
      problem: 'Music labels face multiple manual processes and a variety of different tools: release management, royalty calculation, track marketing, license tracking happens on different websites and in different programs, which takes time away from creative work, reduces efficiency and engagement.',
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
        quote: 'As a music label operating across two continents, our administrative challenges were significant. The boxed solution from Architeq has centralized all our operations, from release management to royalty calculations. Our artists are happier with the timely and accurate reporting, and our team can focus on creative work instead of administrative tasks.',
        author: 'Max Taylor and Angelina Phengpong',
        position: 'Lead Producers at SUQEAK E CLEAN STUDIOS'
      },
      relatedCases: ['ai-crm-assistant', 'financial-calculations', 'monday-integration'],
      featured: false,
      image: '/images/cases/music-label-solution.jpg'
    },
    {
      id: 'real-estate-solution',
      title: 'Boxed Solution for Real Estate Companies',
      company: 'Ameriland Capital',
      location: 'Fayetteville, AR, USA',
      industry: 'Real Estate',
      solutionType: 'Industry Solution',
      description: 'Automation solution for real estate agencies to coordinate showings, prepare documents, and track deals.',
      shortDescription: 'Automation solution for real estate agencies to coordinate showings, prepare documents, and track deals.',
      problem: 'Real estate agencies spend significant time coordinating showings, preparing documents, tracking deals, and communicating with clients.',
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
        quote: 'The real estate solution has transformed our agency operations. Our agents now spend more time with clients and less time on paperwork. The automated lead qualification and showing scheduling have increased our conversion rates, and the electronic signature integration has shortened our closing cycles dramatically.',
        author: 'Josh Willams',
        position: 'CEO Ameriland Capital'
      },
      relatedCases: ['electronic-signatures', 'web-forms-integration', 'dashboards-creation'],
      featured: false,
      image: '/images/cases/real-estate-solution.jpg'
    },
    {
      id: 'roofing-business-solution',
      title: 'Boxed Solution for Roofing Business with AI Components',
      company: 'Up-Struct LLC',
      location: 'Lynnwood, WA, USA',
      industry: 'Construction',
      solutionType: 'Industry Solution',
      description: 'Comprehensive solution for roofing companies with AI components for client communication and cost estimation.',
      shortDescription: 'Comprehensive solution for roofing companies with AI components for client communication and cost estimation.',
      problem: 'Roofing companies face difficulties in project management, cost estimation, resource planning, and client communication, leading to delays and budget overruns.',
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
        quote: 'The AI components in our roofing business solution have been a game-changer. The voice bot handles initial client inquiries 24/7, our cost estimations are more accurate, and clients love the automatic progress updates. We have increased our capacity without adding administrative staff.',
        author: 'Alex A.',
        position: 'Owner at Up-Struct LLC'
      },
      relatedCases: ['ai-voice-bot', 'notification-system', 'telephony-integration'],
      featured: false,
      image: '/images/cases/roofing-business-solution.jpg'
    },
    
    // AI Solutions
    {
      id: 'ai-voice-bot',
      title: 'AI-Voice Bot for Client Request Processing',
      company: 'Up-Struct LLC',
      location: 'Lynnwood, WA, USA',
      industry: 'Customer Service',
      solutionType: 'AI Solution',
      description: 'Multi-level interactive voice assistant for processing client requests without operator participation.',
      shortDescription: 'Multi-level interactive voice assistant for processing client requests without operator participation.',
      problem: 'Companies cannot handle the growing volume of calls from clients, leading to long waiting times and customer dissatisfaction. Also, errors in operator communication and deviation from scripts lead to lead loss.',
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
        quote: 'The AI voice bot has completely transformed our client intake process. It handles most routine inquiries automatically, schedules appointments, and only routes complex issues to our specialists. Our clients are impressed with the fast response times, and we have been able to scale our operations without expanding our support team.',
        author: 'Elena Wang',
        position: 'Customer Service Manager at Up-Struct LLC'
      },
      relatedCases: ['roofing-business-solution', 'telephony-integration', 'speech-to-text-analysis'],
      featured: true,
      image: '/images/cases/ai-voice-bot.jpg'
    },
    {
      id: 'ai-crm-assistant',
      title: 'AI Assistant for CRM Information Search',
      company: 'SUQEAK E CLEAN STUDIOS',
      location: 'USA, Australia',
      industry: 'Data Management',
      solutionType: 'AI Solution',
      description: 'Integration of AI assistant into CRM interface for natural language data search and summarization.',
      shortDescription: 'Integration of AI assistant into CRM interface for natural language data search and summarization.',
      problem: 'Employees spend a lot of time searching for necessary information in CRM system, especially newcomers who find it difficult to navigate the data structure and aggregate information on previous clients.',
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
        quote: 'The AI assistant for our CRM has made information retrieval incredibly efficient. Our team can ask questions in natural language and get comprehensive answers drawn from across our entire database. New team members get up to speed much faster, and everyone saves time that used to be spent digging through records.',
        author: 'David Gaddie',
        position: 'CEO at SUQEAK E CLEAN STUDIOS'
      },
      relatedCases: ['music-label-solution', 'speech-to-text-analysis', 'dashboards-creation'],
      featured: false,
      image: '/images/cases/ai-crm-assistant.jpg'
    },
    {
      id: 'speech-to-text-analysis',
      title: 'AI Speech-to-Text Parser for Client Communication Analysis',
      company: 'Various Companies',
      location: 'Multiple Locations',
      industry: 'Customer Service',
      solutionType: 'AI Solution',
      description: 'System for automatic transcription and analysis of client conversations to improve service quality.',
      shortDescription: 'System for automatic transcription and analysis of client conversations to improve service quality.',
      problem: 'Companies do not have an accurate way to track and analyze operator interactions with clients. Manual listening to calls takes a lot of time, and identifying problem areas and script compliance is difficult.',
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
        quote: 'The speech-to-text analysis system has transformed our quality control process. We are now able to analyze 100% of customer interactions rather than just a small sample. We have identified patterns in successful calls, coached our team based on data rather than intuition, and significantly improved our conversion rates.',
        author: 'NDA',
        position: 'NDA'
      },
      relatedCases: ['ai-voice-bot', 'telephony-integration', 'notification-system'],
      featured: false,
      image: '/images/cases/speech-to-text-analysis.jpg'
    },
    
    // Integrations and Automations
    {
      id: 'financial-calculations',
      title: 'Complex Calculations for Financial Computations',
      company: 'SUQEAK E CLEAN STUDIOS',
      location: 'USA, Australia',
      industry: 'Financial Management',
      solutionType: 'Integration & Automation',
      description: 'Automated financial calculation system for handling complex payment structures with multiple variables.',
      shortDescription: 'Automated financial calculation system for handling complex payment structures with multiple variables.',
      problem: 'Companies face difficulties in calculating payments for different categories of employees and contractors. The process includes many variables, such as taxes, bonuses, deductions, rates for external and internal specialists. Errors in calculations lead to discrepancies, payment delays, and additional costs for corrections.',
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
        quote: 'The financial computation system has eliminated the errors and inconsistencies that used to plague our payment process. Calculations that used to take days now happen automatically, and we have been able to implement more complex payment structures without adding administrative burden.',
        author: 'Jaqueline Gaddie',
        position: 'Financial Director at SUQEAK E CLEAN STUDIOS'
      },
      relatedCases: ['quickbooks-integration', 'stripe-invoicing', 'dashboards-creation'],
      featured: false,
      image: '/images/cases/financial-calculations.jpg'
    },
    {
      id: 'slack-notifications',
      title: 'Slack Notification Automation',
      company: 'MC Keeper',
      location: 'West Chester, OH, USA',
      industry: 'Corporate Communications',
      solutionType: 'Integration & Automation',
      description: 'Complex automatic notification system in Slack with filtering, routing, and priority management.',
      shortDescription: 'Complex automatic notification system in Slack with filtering, routing, and priority management.',
      problem: 'Teams drown in the flow of messages and notifications, critical information gets lost, there is no structured approach to communication, no prioritization of notifications.',
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
        quote: 'The Slack notification system has transformed our internal communications. Important messages now stand out, and team members receive exactly the information they need without the noise. We have eliminated the problem of not seeing important messages, and cross-departmental coordination has improved dramatically.',
        author: 'Michael Fox-Rabinovitz',
        position: 'Financial Consultant at MC Keeper'
      },
      relatedCases: ['notification-system', 'monday-integration', 'telephony-integration'],
      featured: false,
      image: '/images/cases/slack-notifications.jpg'
    },
    {
      id: 'telephony-integration',
      title: 'Telephony Setup and CRM Integration',
      company: 'EclipseGroup',
      location: 'Miami, FL, USA',
      industry: 'Sales & Customer Service',
      solutionType: 'Integration & Automation',
      description: 'Integration of telephony systems with CRM for automatic call logging and customer data management.',
      shortDescription: 'Integration of telephony systems with CRM for automatic call logging and customer data management.',
      problem: 'Companies lose valuable information about customer interactions by phone, spend time on manual entry of call data into CRM.',
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
        quote: 'The telephony integration has given us a complete view of all client interactions. Our sales team no longer wastes time logging calls, and managers can see the full communication history with each client. The automatic transcription feature has been invaluable for training and quality assurance.',
        author: 'Eugene Gourevitch',
        position: 'SEO at EclipseGroup'
      },
      relatedCases: ['speech-to-text-analysis', 'ai-voice-bot', 'notification-system'],
      featured: false,
      image: '/images/cases/telephony-integration.jpg'
    }
  ];
  
  /**
   * Получает кейс по его ID (slug)
   */
  export function getCaseStudyById(id: string): CaseStudy | undefined {
    return allCaseStudies.find(caseStudy => caseStudy.id === id);
  }
  
  /**
   * Получает связанные кейсы
   */
  export function getRelatedCases(caseId: string, limit: number = 3): CaseStudy[] {
    const currentCase = getCaseStudyById(caseId);
    
    if (!currentCase || !currentCase.relatedCases || currentCase.relatedCases.length === 0) {
      // Если нет указанных связанных кейсов, возвращаем кейсы той же категории
      return allCaseStudies
        .filter(cs => cs.id !== caseId && cs.solutionType === currentCase?.solutionType)
        .slice(0, limit);
    }
    
    return allCaseStudies
      .filter(cs => currentCase.relatedCases?.includes(cs.id))
      .slice(0, limit);
  }
  
  /**
   * Получает избранные кейсы для главной страницы
   */
  export function getFeaturedCases(limit: number = 3): CaseStudy[] {
    // Сначала пробуем взять кейсы с featured = true
    const featuredCases = allCaseStudies.filter(cs => cs.featured);
    
    // Если нет кейсов с featured, берем первые limit кейсов из каждой категории
    if (featuredCases.length === 0) {
      // Группируем кейсы по solutionType
      const casesByType: Record<string, CaseStudy[]> = {};
      allCaseStudies.forEach(cs => {
        if (!casesByType[cs.solutionType]) {
          casesByType[cs.solutionType] = [];
        }
        casesByType[cs.solutionType].push(cs);
      });
      
      // Берем по одному кейсу из каждой категории
      const typeSamples: CaseStudy[] = [];
      Object.values(casesByType).forEach(cases => {
        if (cases.length > 0) {
          typeSamples.push(cases[0]);
        }
      });
      
      return typeSamples.slice(0, limit);
    }
    
    return featuredCases.slice(0, limit);
  }
  
  /**
   * Преобразует CaseStudy в формат, используемый в компоненте CaseCard
   */
  export function toCaseCardFormat(caseStudy: CaseStudy) {
    return {
      id: caseStudy.id,
      title: caseStudy.title,
      description: caseStudy.description,
      industry: caseStudy.industry,
      company: caseStudy.company,
      location: caseStudy.location,
      results: caseStudy.results,
      image: caseStudy.image,
      tags: [caseStudy.solutionType, ...caseStudy.technologies.slice(0, 2)]
    };
  }
  
  /**
   * Получает все уникальные значения указанного поля
   */
  export function getUniqueValues<T extends keyof CaseStudy>(field: T): string[] {
    const values = new Set<string>();
    
    allCaseStudies.forEach(cs => {
      const value = cs[field];
      if (typeof value === 'string') {
        values.add(value);
      }
    });
    
    return Array.from(values);
  }
  
  /**
   * Получает все уникальные технологии
   */
  export function getUniqueTechnologies(): string[] {
    const technologies = new Set<string>();
    
    allCaseStudies.forEach(cs => {
      cs.technologies.forEach(tech => technologies.add(tech));
    });
    
    return Array.from(technologies);
  }
  
  /**
   * Фильтрует кейсы по нескольким критериям
   */
  export function filterCases({
    searchQuery = '',
    industries = [],
    solutionTypes = [],
    technologies = []
  }: {
    searchQuery?: string;
    industries?: string[];
    solutionTypes?: string[];
    technologies?: string[];
  }): CaseStudy[] {
    return allCaseStudies.filter(caseStudy => {
      // Поиск по строке
      const matchesSearch = !searchQuery || [
        caseStudy.title,
        caseStudy.description,
        caseStudy.company,
        caseStudy.industry,
        caseStudy.solutionType,
        caseStudy.location,
        ...caseStudy.technologies,
        ...caseStudy.results
      ].some(field => field.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Фильтр по индустриям
      const matchesIndustry = industries.length === 0 || industries.includes(caseStudy.industry);
      
      // Фильтр по типам решений
      const matchesSolutionType = solutionTypes.length === 0 || solutionTypes.includes(caseStudy.solutionType);
      
      // Фильтр по технологиям
      const matchesTechnology = technologies.length === 0 || 
        caseStudy.technologies.some(tech => technologies.includes(tech));
      
      return matchesSearch && matchesIndustry && matchesSolutionType && matchesTechnology;
    });
  }