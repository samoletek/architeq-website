// src/lib/data/case-studies.ts

// Фильтры по отраслям (By Industry) - горизонтальные белые теги
export const INDUSTRY_CATEGORIES = {
  'your-industry': 'Your Industry',
  'financial-services': 'Financial Services',
  'dispatching-services': 'Dispatching Services', 
  'car-hauling': 'Car Hauling',
  'commercial-music': 'Music Production',
  'healthcare-medical': 'Healthcare & Medical',
  'cabinetry-coatings': 'Cabinetry & Coatings'
} as const;

// Фильтры по функциям (By Function) - вертикальные фиолетовые теги
export const FUNCTION_CATEGORIES = {
  'custom-solutions': 'Custom Solutions',
  'crm-integrations': 'CRM Integrations',
  'documents-forms': 'Documents & Web Forms',
  'system-infrastructure': 'System Integrations',
  'ai-powered': 'AI-Powered Solutions',
  'industry-specific': 'Industry-Specific',
  'finance-accounting': 'Finance & Accounting'
} as const;

/**
 * ТИПЫ
 */
export type IndustryCategory = keyof typeof INDUSTRY_CATEGORIES;
export type FunctionCategory = keyof typeof FUNCTION_CATEGORIES;

/**
 * Обновленная структура данных для кейса
 */
export interface CaseStudy {
  id: string;                  // Уникальный идентификатор/slug для URL
  title: string;               // Название кейса
  company: string;             // Название компании-клиента
  location: string;            // Местоположение клиента
  
  // ПОЛЯ ДЛЯ ФИЛЬТРАЦИИ
  industryCategory: IndustryCategory;  // Категория отрасли
  functionCategory: FunctionCategory;  // Категория функции
  
  // СТАРЫЕ ПОЛЯ (для обратной совместимости)
  industry: string;            // Отрасль (будет заполняться из industryCategory)
  solutionType: string;        // Тип решения (будет заполняться из functionCategory)
  
  description: string;         // Краткое описание (для карточек и списков)
  image?: string;              // Путь к изображению
  technologies: string[];      // Фактически использованные технологии
  alternativeTechnologies?: string[]; // Альтернативные технологии
  results: string[];           // Достигнутые результаты
  featured?: boolean;          // Флаг для отображения на главной странице
  
  // НОВЫЕ ПОЛЯ ДЛЯ КЛИКАБЕЛЬНЫХ ТЕГОВ
  clickableTags?: {
    companies: string[];       // Кликабельные теги компаний
    technologies: string[];    // Кликабельные теги технологий
    locations: string[];       // Кликабельные теги локаций
  };
  
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
  isSpecialCard?: boolean;     // Флаг для специальных карточек (например, Contact Us)
}

/**
 * СПЕЦИАЛЬНАЯ КАРТОЧКА "CONTACT US"
 */
export const CONTACT_CASE_CARD: CaseStudy = {
  id: 'contact-us-card',
  title: 'Create Your Custom Solution',
  company: 'Your Company',
  location: 'Your Location',
  industryCategory: 'your-industry',
  functionCategory: 'custom-solutions',
  industry: 'Your Industry',
  solutionType: 'Custom Solutions',
  description: 'Tell us about your business challenges, and we\'ll create a tailored automation solution that fits your specific needs and goals.',
  shortDescription: 'Get a custom solution designed specifically for your business challenges and goals.',
  technologies: ['Consultation', 'Custom Development', 'Integration'],
  results: [
    'Personalized solution design',
    'Consultation included',
    'Tailored to your specific needs'
  ],
  clickableTags: {
    companies: ['Your Company'],
    technologies: ['Custom Development', 'Consultation'],
    locations: ['Your Location']
  },
  isSpecialCard: true,
  featured: true
};

/**
* Все кейсы в едином массиве
*/
export const allCaseStudies: CaseStudy[] = [
  // Добавляем специальную карточку в начало
  CONTACT_CASE_CARD,
  
  // Financial Automations
  {
    id: 'broker-calculator',
    title: 'Interactive Vehicle Transport Price Calculator',
    company: 'Car Haul Direct',
    location: 'West Chester, OH, USA',
    industryCategory: 'car-hauling',
    functionCategory: 'custom-solutions',
    industry: 'Car Hauling',
    solutionType: 'Custom Solutions',
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
    technologies: ['Next.js', 'TypeScript', 'Google Workspace API', 'EIA API', 'Tailwind CSS', 'EmailJS'],
    clickableTags: {
      companies: ['Car Haul Direct'],
      technologies: ['React', 'TypeScript', 'Google Workspace API', 'EIA API'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
    results: [
      '~45% reduction in time spent creating quotes',
      '30-35% increase in quote request conversion rate',
      'Complete elimination of calculation errors',
      'Improved customer experience with transparent pricing',
      '25-30% increase in service add-ons selection due to clear visualization'
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
    title: "Stripe Invoicing and Financial Control Automation", 
    company: 'EclipseGroup',
    location: 'Miami, FL, USA',
    industryCategory: 'financial-services',
    functionCategory: 'finance-accounting',
    industry: 'Financial Services',
    solutionType: 'Finance & Accounting',
    description: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
    shortDescription: 'Integration of CRM with financial systems for automatic invoice creation and payment tracking.',
    problem: 'Companies spend dozens of hours monthly on manual invoicing, payment tracking, and sending reminders. Accountants are forced to duplicate data between CRM and financial systems, leading to errors and payment delays.',
    solution: [
      'Integration of CRM with financial systems QuickBooks, Stripe',
      'Automatic creation of invoices in Stripe when deal status changes in CRM',
      'Instant delivery of invoices to customers with online payment options',
      'Automatic monitoring of payment status with CRM data updates',
      'Reminder system for unpaid invoices',
      'Automatic generation of financial reports (Dashboards)'
    ],
    technologies: ['Monday', 'QuickBooks', 'Stripe', 'Make', 'BestPass', 'Google Workspace API'],
    alternativeTechnologies: ['HubSpot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n', 'PayPal', 'Bill', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['EclipseGroup'],
      technologies: ['Monday', 'QuickBooks', 'Stripe', 'Make', 'BestPass', 'Google Workspace API'],
      locations: ['Miami, FL, USA', 'Florida', 'USA']
    },
    results: [
      '55% reduction in time spent on invoicing',
      '~30% acceleration in receiving payments',
      'Elimination of errors in data transfer',
      '25-30% improvement in cash flow'
    ],
    testimonial: {
      quote: 'Before this implementation, our accounting team spent several days each month on invoicing. Now everything happens automatically. The integration between our CRM and financial systems has not only saved us time but has significantly improved our cash flow.',
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
    industryCategory: 'dispatching-services',
    functionCategory: 'finance-accounting',
    industry: 'Dispatching Services',
    solutionType: 'Finance & Accounting',
    description: 'Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.',
    shortDescription: 'Bidirectional synchronization between CRM and QuickBooks for seamless financial data management.',
    problem: 'Companies use disparate systems for customer and financial management. Data must be transferred manually, leading to errors, double entry, and discrepancies in reporting.',
    solution: [
      'Bidirectional synchronization between Monday and QuickBooks',
      'Synchronization of customers, products, and transactions with Monday',
      'Automatic matching of payments with invoices',
      'Additional Telegram/Slack notifications'
    ],
    technologies: ['QuickBooks', 'Make', 'Monday', 'Google Workspace API'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'Bill', 'Telegram', 'Slack'],
    clickableTags: {
      companies: ['485 Logistics'],
      technologies: ['QuickBooks', 'Make', 'Monday'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
    results: [
      '50% reduction in time spent on financial reporting',
      'Elimination of double data entry',
      'Increased accuracy of financial reports',
      'Automation of routine accounting operations'
    ],
    testimonial: {
      quote: 'Manual data entry used to consume nearly 30 hours per month of our accounting team\'s time. Since implementing this integration, that work happens automatically. The accuracy of our financial reporting has dramatically improved and we can make business decisions based on real-time financial data.',
      author: 'Ananai Abdyldaeva',
      position: 'Operations Lead at 485 Logistics'
    },
    relatedCases: ['stripe-invoicing', 'financial-calculations', 'factoring-automation'],
    featured: true,
    image: '/images/cases/quickbooks-integration.jpg'
  },
  {
    id: 'document-generation',
    title: 'Document Generation from CRM Status Changes',
    company: 'Affiliated Medical Supplies',
    location: 'Atlanta, GA, USA',
    industryCategory: 'healthcare-medical',
    functionCategory: 'documents-forms',
    industry: 'Healthcare & Medical',
    solutionType: 'Documents & Web Forms',
    description: 'Automatic document generation system that creates documents based on CRM data changes.',
    shortDescription: 'Automatic document generation system that creates documents based on CRM data changes.',
    problem: 'Companies spend hours creating standardized documents, filling them with CRM data. The process is prone to human error and takes significant employee time.',
    solution: [
      'Setting up triggers in CRM for automatic document generation initiation',
      'Automatic filling of templates with CRM data',
      'Document version management system',
      'Automatic conversion to various formats (PDF, DOCX)'
    ],
    technologies: ['Monday', 'Make', 'Google Workspace API', 'PandaDoc'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'DocuSign', 'SignNow', 'eSignature'],
    clickableTags: {
      companies: ['Affiliated Medical Supplies'],
      technologies: ['Monday', 'Make', 'Google Workspace API'],
      locations: ['Atlanta, GA, USA', 'Georgia', 'USA']
    },
    results: [
      'Document creation time reduced from 35 minutes to 10 minutes',
      'Complete elimination of data errors',
      'Standardization of all company documents',
      'Saving 20-30 hours per month on routine legal department work'
    ],
    testimonial: {
      quote: 'Creating custom documents used to be a major bottleneck for us, especially when we needed to generate hundreds of documents for our medical supplies clients. Now it happens with just a few clicks. This automation has completely changed our document management processes.',
      author: 'Elena Pak',
      position: 'Operations Manager at Affiliated Medical Supplies'
    },
    relatedCases: ['electronic-signatures', 'web-forms-integration'],
    featured: true,
    image: '/images/cases/document-generation.jpg'
  },
  {
    id: 'factoring-automation',
    title: 'Factoring Data Submission Automation',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    industryCategory: 'financial-services',
    functionCategory: 'finance-accounting',
    industry: 'Financial Services',
    solutionType: 'Finance & Accounting',
    description: 'Automatic calculation and submission of accounts receivable data to factoring companies.',
    shortDescription: 'Automatic calculation and submission of accounts receivable data to factoring companies.',
    problem: 'Companies using factoring are forced to manually collect accounts receivable data, calculate financing amounts, and transfer information to factoring companies. This leads to delays, errors, and additional labor costs.',
    solution: [
      'Automatic calculation of total invoices eligible for factoring every 2 days',
      'Formation of detailed invoice reports',
      'Integration with factoring platform for data transfer',
      'Sending status notifications to Telegram or/and Slack'
    ],
    technologies: ['Google Workspace API', 'Make', 'Monday', 'Telegram', 'Slack'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Box', 'DropBox', 'HubSpot', 'Pipedrive', 'Zoho'],
    clickableTags: {
      companies: ['LaneWise'],
      technologies: ['Google Workspace API', 'Make', 'Monday'],
      locations: ['State College, PA, USA', 'Pennsylvania', 'USA']
    },
    results: [
      'Reduction of process from several hours to several minutes',
      'Elimination of human errors in calculations',
      'Improved transparency of factoring process',
      'Faster receipt of financing'
    ],
    testimonial: {
      quote: 'Cash flow management used to involve a painful multi-hour process every few days. Now everything happens automatically. We receive our financing faster and can focus on growing our business instead of paperwork. It\'s been a game-changer.',
      author: 'Alexandra Shafran',
      position: 'Co-CEO at LaneWise'
    },
    relatedCases: ['stripe-invoicing', 'quickbooks-integration', 'car-hauling-solution'],
    featured: false,
    image: '/images/cases/factoring-automation.jpg'
  },
  {
    id: 'electronic-signatures',
    title: 'Sending and Receiving Documents for Signature',
    company: '485 Logistics',
    location: 'West Chester, OH, USA',
    industryCategory: 'dispatching-services',
    functionCategory: 'documents-forms',
    industry: 'Dispatching Services',
    solutionType: 'Documents & Web Forms',
    description: 'Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.',
    shortDescription: 'Complete document signing cycle with automatic status updates in CRM and cloud storage archiving.',
    problem: 'The document signing process often delays deal closures. Managers spend time sending, controlling signature receipt, and updating statuses in CRM.',
    solution: [
      'Integration of CRM with electronic signature system',
      'Automatic sending of documents for signature when status changes',
      'Reminder system for clients about the need to sign',
      'Automatic status update in CRM after receiving all signatures',
      'Archiving signed documents in cloud storage'
    ],
    technologies: ['DocuSign', 'Monday', 'Make', 'Google Workspace API'],
    alternativeTechnologies: ['PandaDoc', 'SignNow', 'eSignature', 'Pipedrive', 'HubSpot', 'Zoho', 'Zapier', 'n8n', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['485 Logistics'],
      technologies: ['DocuSign', 'Monday', 'Make', 'Google Workspace API'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
    results: [
      '70% reduction in document signing cycle time',
      '20% increase in completed deal percentage',
      'Instant access to signing status for all process participants',
      'Automatic auditing of all signed documents'
    ],
    testimonial: {
      quote: 'Our contract closing time has shortened dramatically since implementing electronic signatures. Clients appreciate the streamlined process, and our team no longer has to constantly check whether documents have been signed. Real-time updates in our CRM keep everyone informed automatically.',
      author: 'Joseph Echano',
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
    industryCategory: 'cabinetry-coatings',
    functionCategory: 'documents-forms',
    industry: 'Cabinetry & Coatings',
    solutionType: 'Documents & Web Forms',
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
    technologies: ['JotForm', 'Make', 'Monday'],
    alternativeTechnologies: ['Typeform', 'Google Workspace API', 'Cognito', 'Zapier', 'n8n', 'HubSpot', 'Zoho', 'Pipedrive'],
    clickableTags: {
      companies: ['New Age Cabinetry & Coatings'],
      technologies: ['JotForm', 'Make', 'Monday'],
      locations: ['Phoenix, AZ, USA', 'Arizona', 'USA']
    },
    results: [
      'Increase in form completion conversion to 60%',
      'Reduction of application processing time by 35%',
      'Elimination of errors in data transfer',
      'Improvement of customer experience'
    ],
    testimonial: {
      quote: 'The web form integration has transformed how we collect information from clients. Before, we would chase documents and manually enter data. Now clients complete forms online, and all information automatically appears in our CRM. It has streamlined our entire intake process.',
      author: 'Jonathan Martinez',
      position: 'Team Lead at New Age Cabinetry & Coatings'
    },
    relatedCases: ['document-generation', 'electronic-signatures', 'real-estate-solution'],
    featured: false,
    image: '/images/cases/web-forms-integration.jpg'
  },
  {
    id: 'monday-integration',
    title: 'Monday Integration with External Systems',
    company: 'New Age Cabinetry & Coatings',
    location: 'Phoenix, AZ, USA',
    industryCategory: 'cabinetry-coatings',
    functionCategory: 'crm-integrations',
    industry: 'Cabinetry & Coatings',
    solutionType: 'CRM Integrations',
    description: 'Comprehensive integration of Monday with multiple external systems for unified data management.',
    shortDescription: 'Comprehensive integration of Monday with multiple external systems for unified data management.',
    problem: 'Companies use multiple different services not connected to each other. Information is fragmented, managers spend time transferring data between systems, synchronization problems arise, frequent errors and confusion due to manual entry by people.',
    solution: [
      'Using Monday as a central hub for all business processes',
      'Two-way integration with communication services (Email, Slack)',
      'Synchronization with calendars (Google Calendar, Calendly)',
      'Integration with cloud storage (Google Drive, Box)',
      'Automation of task creation and status updates',
      'Creation of database (e.g. licensing)'
    ],
    technologies: ['Monday', 'Make', 'Slack', 'Google Workspace API', 'AutoCAD'],
    alternativeTechnologies: ['HubSpot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n', 'Telegram', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['New Age Cabinetry & Coatings'],
      technologies: ['Monday', 'Make', 'Slack', 'Google Workspace API', 'AutoCAD'],
      locations: ['Phoenix, AZ, USA', 'Arizona', 'USA']
    },
    results: [
      'Single center for managing all business processes',
      '60% reduction in time spent switching between systems',
      'Increased transparency of all processes',
      'Ability to easily create clear data visualizations (Dashboards)',
      'Automation of up to 45% of routine operations'
    ],
    testimonial: {
      quote: 'Project tracking and team collaboration were major challenges with tools scattered across different platforms. Monday.com became our central hub, giving us a single source of truth for all information. Automation now handles data transfer between systems, which has fundamentally changed how we operate as a business.',
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
    industryCategory: 'financial-services',
    functionCategory: 'crm-integrations',
    industry: 'Financial Services',
    solutionType: 'CRM Integrations',
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
    technologies: ['Monday', 'Make', 'Twilio', 'Slack'],
    alternativeTechnologies: ['HubSpot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n', 'OpenPhone', 'AirCall', 'Telegram'],
    clickableTags: {
      companies: ['MC Keeper'],
      technologies: ['Monday', 'Make', 'Twilio', 'Slack'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
    results: [
      '75% reduction in reaction time to project changes',
      '40% increase in customer service satisfaction',
      'Reduction of missed updates and deadlines to zero',
      'Improvement of internal team communication'
    ],
    testimonial: {
      quote: 'Important updates used to get buried in emails or missed entirely, causing delays in our response times. Now, critical information is automatically routed to the right people through their preferred channels. Our clients have noticed the improvement in our responsiveness and communication.',
      author: 'Konstantin Maers',
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
    industryCategory: 'dispatching-services',
    functionCategory: 'crm-integrations',
    industry: 'Dispatching Services',
    solutionType: 'CRM Integrations',
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
    technologies: ['Monday', 'Make'],
    alternativeTechnologies: ['HubSpot', 'Zapier', 'n8n', 'Pipedrive', 'Zoho'],
    clickableTags: {
      companies: ['DreamLine'],
      technologies: ['Monday', 'Make'],
      locations: ['Vancouver, WA, USA', 'Washington', 'USA']
    },
    results: [
      '55% reduction in time spent on reporting',
      'Decision-making based on up-to-date data',
      '~35% increase in management efficiency',
      'Transparency of all business processes for management'
    ],
    testimonial: {
      quote: 'Management decisions used to rely on reports that took days to compile. Now our team has instant access to key metrics and can drill down to identify trends or issues in real-time. The custom dashboards have revolutionized our decision-making process.',
      author: 'Roman Vasilchuk',
      position: 'CEO at DreamLine'
    },
    relatedCases: ['monday-integration', 'notification-system', 'financial-calculations'],
    featured: false,
    image: '/images/cases/dashboards-creation.jpg'
  },
  {
    id: 'car-hauling-solution',
    title: 'Boxed Solution for Car Hauling Company',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    industryCategory: 'car-hauling',
    functionCategory: 'industry-specific',
    industry: 'Car Hauling',
    solutionType: 'Industry-Specific',
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
    technologies: ['QuickBooks', 'Make', 'Google Workspace API', 'Monday', 'Stripe', 'Telegram', 'DocuSign'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'PayPal', 'Bill', 'Slack', 'PandaDoc', 'eSignature', 'SignNow'],
    clickableTags: {
      companies: ['LaneWise'],
      technologies: ['QuickBooks', 'Make', 'Google Workspace API', 'Monday'],
      locations: ['State College, PA, USA', 'Pennsylvania', 'USA']
    },
    results: [
      '60% reduction in order processing time',
      'Elimination of errors in calculations and invoicing',
      'Automated accounts receivable control',
      'Increased transparency of logistics and payments',
      'Increased customer loyalty through Quality Control department integration and automations'
    ],
    testimonial: {
      quote: 'Growth was being limited by administrative bottlenecks throughout our operation. Every step from order intake to delivery and payment required manual intervention. The boxed solution connected and automated all these processes, streamlining every aspect of our operations.',
      author: 'Alex Marar',
      position: 'Operations Director at LaneWise'
    },
    relatedCases: ['factoring-automation', 'telephony-integration', 'quickbooks-integration'],
    featured: false,
    image: '/images/cases/car-hauling-solution.jpg'
  },
  {
    id: 'kitchen-cabinetry-solution',
    title: 'Boxed Solution for Kitchen Cabinetry Manufacturer',
    company: 'AllWood Design',
    location: 'San Diego, CA, USA',
    industryCategory: 'cabinetry-coatings',
    functionCategory: 'industry-specific',
    industry: 'Cabinetry & Coatings',
    solutionType: 'Industry-Specific',
    description: 'Centralized system for kitchen furniture manufacturing companies to manage orders, design, and production.',
    shortDescription: 'Centralized system for kitchen furniture manufacturing companies to manage orders, design, and production.',
    problem: 'Kitchen furniture manufacturing companies use disparate tools for order management, design, and production. This leads to errors in specifications, information loss, and delays in project completion.',
    solution: [
      'Centralization of all data in Monday',
      'CRM setup with custom template specifically for this industry (columns, boards, connects)',
      'Integration of CabinetVision with CRM for automatic specification transfer',
      'Automatic creation of production tasks',
      'Material tracking system and procurement automation',
      'Interactive dashboards for project status visualization',
      'Automated document flow (contracts, estimates, acts)'
    ],
    technologies: ['Monday', 'CabinetVision', 'Make', 'Google Workspace API', 'QuickBooks'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'Stripe', 'PayPal', 'Bill', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['AllWood Design'],
      technologies: ['Monday', 'CabinetVision', 'Make', 'Google Workspace API'],
      locations: ['San Diego, CA, USA', 'California', 'USA']
    },
    results: [
      '~30% reduction in order fulfillment cycle',
      '55% reduction in specification errors',
      '20-25% increase in project profitability',
      'Increased team productivity',
      'Increased customer loyalty'
    ],
    testimonial: {
      quote: 'Specification errors used to cause costly rework and unpredictable production timelines. The integration between our design software and production scheduling has eliminated these issues completely. Our manufacturing operations now run seamlessly from design to delivery.',
      author: 'Vody Pavluyk',
      position: 'Co-CEO at AllWood Design'
    },
    relatedCases: ['monday-integration', 'document-generation', 'dashboards-creation'],
    featured: false,
    image: '/images/cases/kitchen-cabinetry-solution.jpg'
  },
  {
    id: 'music-label-solution',
    title: 'Boxed Solution for Music Production Company',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industryCategory: 'commercial-music',
    functionCategory: 'industry-specific',
    industry: 'Music Production',
    solutionType: 'Industry-Specific',
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
    technologies: ['Monday', 'Make', 'Google Workspace API', 'Stripe', 'Bill'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'PayPal', 'QuickBooks', 'AirTable', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['SUQEAK E CLEAN STUDIOS'],
      technologies: ['Monday', 'Make', 'Google Workspace API', 'Stripe'],
      locations: ['USA', 'Australia']
    },
    results: [
      'Aggregation of all tools used in one place',
      '50% reduction in administrative work',
      'Accurate and timely calculation and payment of royalties',
      'Catalog expansion without increasing administrative personnel'
    ],
    testimonial: {
      quote: 'Project completed successfully, testimonial pending.',
      author: 'Project Status',
      position: 'Verified Results'
    },
    relatedCases: ['ai-crm-agent', 'financial-calculations', 'monday-integration'],
    featured: false,
    image: '/images/cases/music-label-solution.jpg'
  },
  {
    id: 'roofing-business-solution',
    title: 'Boxed Solution for Roofing Business with AI Components',
    company: 'Up-Struct LLC',
    location: 'Lynnwood, WA, USA',
    industryCategory: 'cabinetry-coatings',
    functionCategory: 'industry-specific',
    industry: 'Cabinetry & Coatings',
    solutionType: 'Industry-Specific',
    description: 'Comprehensive solution for roofing companies with AI components for client communication and cost estimation.',
    shortDescription: 'Comprehensive solution for roofing companies with AI components for client communication and cost estimation.',
    problem: 'Roofing companies face difficulties in project management, cost estimation, resource planning, and client communication, leading to delays and budget overruns.',
    solution: [
      'Automated system for collecting applications and qualifying clients',
      'Development of AI voice agent for receiving client applications and booking roof inspections',
      'Cost calculator based on roof parameters and materials',
      'Planning and optimization of Salespersons time',
      'Automatic client notifications about work progress',
      'Warranty service management system'
    ],
    technologies: ['Monday', 'Make', 'Google Workspace API', 'Twilio', 'ElevenLabs', 'PlayHT'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'ChatGPT', 'Claude', 'OpenPhone', 'AirCall', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['Up-Struct LLC'],
      technologies: ['Monday', 'Make', 'Google Workspace API', 'Twilio'],
      locations: ['Lynnwood, WA, USA', 'Washington', 'USA']
    },
    results: [
      '40% increase in project cost estimation accuracy',
      '25% reduction in project completion time',
      'Automation of client call reception',
      'Improved customer experience and increased positive reviews'
    ],
    testimonial: {
      quote: 'Client inquiries used to overwhelm our small team, especially outside business hours. The AI voice agent now handles initial inquiries 24/7, our cost estimations are more accurate, and clients receive automatic progress updates. We\'ve increased our capacity without adding administrative staff.',
      author: 'Alex A.',
      position: 'CEO at Up-Struct LLC'
    },
    relatedCases: ['ai-voice-agent', 'notification-system', 'telephony-integration'],
    featured: false,
    image: '/images/cases/roofing-business-solution.jpg'
  },
  {
    id: 'ai-voice-agent',
    title: 'AI Voice Agent for Client Request Processing',
    company: 'Up-Struct LLC',
    location: 'Lynnwood, WA, USA',
    industryCategory: 'cabinetry-coatings',
    functionCategory: 'ai-powered',
    industry: 'Cabinetry & Coatings',
    solutionType: 'AI-Powered Solutions',
    description: 'Multi-level intelligent voice agent for processing client requests without operator participation.',
    shortDescription: 'Multi-level intelligent voice agent for processing client requests without operator participation.',
    problem: 'Companies cannot handle the growing volume of calls from clients, leading to long waiting times and customer dissatisfaction. Also, errors in operator communication and deviation from scripts lead to lead loss.',
    solution: [
      'Multi-level intelligent voice agent based on AI',
      'Integration with CRM for uploading obtained data to lead database',
      'Recognition and processing of typical requests without operator participation',
      'Smart routing of complex requests to specialists',
      'Booking appointments/showings without Salesperson participation',
      'Personalized recommendations based on client history'
    ],
    technologies: ['Claude', 'ElevenLabs', 'Twilio', 'Monday'],
    alternativeTechnologies: ['ChatGPT', 'OpenPhone', 'AirCall', 'HubSpot', 'Pipedrive', 'Zoho', 'Make', 'Zapier', 'n8n'],
    clickableTags: {
      companies: ['Up-Struct LLC'],
      technologies: ['Claude', 'ElevenLabs', 'Twilio'],
      locations: ['Lynnwood, WA, USA', 'Washington', 'USA']
    },
    results: [
      'Automation of 60-70% of incoming requests',
      'Reduction of waiting time to minimum',
      '24/7 operation mode without increasing staff',
      'Significant savings on support team expansion',
      '55% reduction in communication errors'
    ],
    testimonial: {
      quote: 'Our client intake process was a bottleneck - routine inquiries took up specialist time, and response times were inconsistent. The AI voice agent now handles most inquiries automatically, schedules appointments, and only escalates complex issues. Clients are impressed with the fast response times, and we\'ve scaled operations without expanding our support team.',
      author: 'Elena Wang',
      position: 'Customer Service Manager at Up-Struct LLC'
    },
    relatedCases: ['roofing-business-solution', 'telephony-integration'],
    featured: true,
    image: '/images/cases/ai-voice-agent.jpg'
  },
  {
    id: 'ai-crm-agent',
    title: 'AI Agent for CRM Information Search',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industryCategory: 'commercial-music',
    functionCategory: 'ai-powered',
    industry: 'Music Production',
    solutionType: 'AI-Powered Solutions',
    description: 'Integration of AI agent into CRM interface for natural language data search and summarization.',
    shortDescription: 'Integration of AI agent into CRM interface for natural language data search and summarization.',
    problem: 'Employees spend a lot of time searching for necessary information in CRM system, especially newcomers who find it difficult to navigate the data structure and aggregate information on previous clients.',
    solution: [
      'Integration of AI agent directly into CRM interface with custom convenient widget',
      'Processing employees natural language requests',
      'Smart search across all related records in CRM',
      'Automatic summarization of information from different sources'
    ],
    technologies: ['ChatGPT', 'Monday', 'Retool', 'Make'],
    alternativeTechnologies: ['Claude', 'HubSpot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n'],
    results: [
      '50% reduction in information search time',
      'Fast adaptation of new employees',
      'Increased efficiency of working with clients',
      'More informed decisions based on complete data'
    ],
    testimonial: {
      quote: 'Project completed successfully, testimonial pending.',
      author: 'Project Status',
      position: 'Verified Results'
    },
    relatedCases: ['music-label-solution', 'dashboards-creation'],
    featured: false,
    image: '/images/cases/ai-crm-assistant.jpg'
  },
  {
    id: 'financial-calculations',
    title: 'Complex Calculations for Financial Computations',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industryCategory: 'commercial-music',
    functionCategory: 'system-infrastructure',
    industry: 'Music Production',
    solutionType: 'System Integrations',
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
    technologies: ['Google Workspace API', 'Make', 'Monday', 'Stripe'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'PayPal', 'QuickBooks', 'Bill', 'AirTable', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['SUQEAK E CLEAN STUDIOS'],
      technologies: ['Google Workspace API', 'Make', 'Monday'],
      locations: ['USA', 'Australia']
    },
    results: [
      '50% increase in calculation accuracy',
      '45% reduction in time spent on payment calculations',
      'Pricing optimization and increased margin',
      'Unification of calculations within company'
    ],
    testimonial: {
      quote: 'Project completed successfully, testimonial pending.',
      author: 'Project Status',
      position: 'Verified Results'
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
    industryCategory: 'financial-services',
    functionCategory: 'system-infrastructure',
    industry: 'Financial Services',
    solutionType: 'System Integrations',
    description: 'Complex automatic notification system in Slack with filtering, routing, and priority management.',
    shortDescription: 'Complex automatic notification system in Slack with filtering, routing, and priority management.',
    problem: 'Teams drown in the flow of messages and notifications, critical information gets lost, there is no structured approach to communication, no prioritization of notifications.',
    solution: [
      'Filtering messages by keywords, senders, and importance',
      'Automatic routing of messages to appropriate channels or private chats',
      'Integration with CRM, task managers (Jira, Trello, Monday.com) for creating tasks from messages',
      'Priority notifications (division into critical, important, secondary)',
      'Integration with Google Workspace API for event logging (+logging in Make)',
      'Sending SMS/Telegram alerts for especially important messages'
    ],
    technologies: ['Slack', 'Make', 'Monday', 'Google Workspace API', 'Jira', 'Twilio'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'Telegram', 'OpenPhone', 'AirCall'],
    clickableTags: {
      companies: ['MC Keeper'],
      technologies: ['Slack', 'Make', 'Monday', 'Google Workspace API'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
    results: [
      '55% reduction in missed notifications',
      '~30% increase in team work efficiency',
      'Centralization of communications and reduction of meaningless notifications',
      'Automation of information exchange between departments'
    ],
    testimonial: {
      quote: 'Important messages used to get lost in the noise of our busy Slack channels. Team members would miss critical updates, causing delays in cross-departmental coordination. Now important messages stand out, and everyone receives exactly the information they need. The problem of missed communications has been eliminated.',
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
    industryCategory: 'financial-services',
    functionCategory: 'system-infrastructure',
    industry: 'Financial Services',
    solutionType: 'System Integrations',
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
    technologies: ['Twilio', 'Monday', 'Make'],
    alternativeTechnologies: ['AirCall', 'OpenPhone', 'HubSpot', 'Zoho', 'Pipedrive', 'Zapier', 'n8n'],
    clickableTags: {
      companies: ['EclipseGroup'],
      technologies: ['Twilio', 'Monday', 'Make'],
      locations: ['Miami, FL, USA', 'Florida', 'USA']
    },
    results: [
      '60% increase in call processing efficiency',
      'Saving complete history of client communications',
      'AI analysis of conversations to improve service quality',
      'Automation of post-call activities (sending materials, follow-up)'
    ],
    testimonial: {
      quote: 'Our sales team was spending valuable time manually logging calls, and managers had no visibility into client communication history. The telephony integration changed everything - we now have a complete view of all client interactions, and the automatic transcription feature has been invaluable for training and quality assurance.',
      author: 'Eugene G.',
      position: 'CEO at EclipseGroup'
    },
    relatedCases: ['ai-voice-agent', 'notification-system'],
    featured: false,
    image: '/images/cases/telephony-integration.jpg'
  }
];

/**
 * ФУНКЦИИ ДЛЯ РАБОТЫ С СИСТЕМОЙ ФИЛЬТРАЦИИ
 */

/**
 * Получение данных для фильтров с подсчетом количества кейсов
 */
export function getFilterCounts(): {
  industries: Array<{ id: IndustryCategory; label: string; count: number }>;
  functions: Array<{ id: FunctionCategory; label: string; count: number }>;
} {
  const industries = Object.entries(INDUSTRY_CATEGORIES).map(([id, label]) => ({
    id: id as IndustryCategory,
    label,
    count: allCaseStudies.filter(cs => cs.industryCategory === id).length
  }));

  const functions = Object.entries(FUNCTION_CATEGORIES).map(([id, label]) => ({
    id: id as FunctionCategory,
    label,
    count: allCaseStudies.filter(cs => cs.functionCategory === id).length
  }));

  return { industries, functions };
}

/**
 * Получение кейсов по матричной логике фильтрации
 * Industry (ИЛИ) × Function (ИЛИ) = И между группами
 */
export function filterCasesByMatrix({
  searchQuery = '',
  industries = [],
  functions = []
}: {
  searchQuery?: string;
  industries?: IndustryCategory[];
  functions?: FunctionCategory[];
}): CaseStudy[] {
  return allCaseStudies.filter(caseStudy => {
    // Поиск по строке
    const matchesSearch = !searchQuery || [
      caseStudy.title,
      caseStudy.description,
      caseStudy.company,
      caseStudy.location,
      ...caseStudy.technologies,
      ...(caseStudy.alternativeTechnologies || []),
      ...caseStudy.results,
      ...(caseStudy.clickableTags?.companies || []),
      ...(caseStudy.clickableTags?.technologies || []),
      ...(caseStudy.clickableTags?.locations || [])
    ].some(field => field.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Фильтр по индустриям (ИЛИ)
    const matchesIndustry = industries.length === 0 || 
      industries.includes(caseStudy.industryCategory) ||
      industries.includes('your-industry'); // "Your Industry" показывает все
    
    // Фильтр по функциям (ИЛИ)
    const matchesFunction = functions.length === 0 || 
      functions.includes(caseStudy.functionCategory) ||
      functions.includes('custom-solutions'); // "Custom Solutions" показывает все
    
    // Матричная логика: И между группами
    return matchesSearch && matchesIndustry && matchesFunction;
  });
}

/**
 * Получение кейса по ID
 */
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return allCaseStudies.find(caseStudy => caseStudy.id === id);
}

/**
 * Получение связанных кейсов
 */
export function getRelatedCases(caseId: string, limit: number = 3): CaseStudy[] {
  const currentCase = getCaseStudyById(caseId);

  if (!currentCase || !currentCase.relatedCases || currentCase.relatedCases.length === 0) {
    return allCaseStudies
      .filter(cs => cs.id !== caseId && cs.functionCategory === currentCase?.functionCategory)
      .slice(0, limit);
  }

  return allCaseStudies
    .filter(cs => currentCase.relatedCases?.includes(cs.id))
    .slice(0, limit);
}

/**
 * Получение избранных кейсов
 */
export function getFeaturedCases(limit: number = 3): CaseStudy[] {
  const featuredCases = allCaseStudies.filter(cs => cs.featured && !cs.isSpecialCard);
  
  if (featuredCases.length === 0) {
    return allCaseStudies.filter(cs => !cs.isSpecialCard).slice(0, limit);
  }

  return featuredCases.slice(0, limit);
}


/**
 * Преобразование кейса в формат карточки для featured секции
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
    tags: caseStudy.technologies.filter(tech => tech !== 'Google Workspace API').slice(0, 3),
    isSpecialCard: caseStudy.isSpecialCard
  };
}