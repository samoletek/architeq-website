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
    technologies: ['Next.js', 'TypeScript', 'API integrations', 'Tailwind CSS', 'EmailJS', 'Iron Session'],
    clickableTags: {
      companies: ['Car Haul Direct'],
      technologies: ['React', 'TypeScript', 'API integrations'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
    results: [
      '68% reduction in time spent creating quotes',
      '34% increase in quote request conversion rate',
      'Complete elimination of calculation errors',
      'Improved customer experience with transparent pricing',
      '27% increase in service add-ons selection due to clear visualization'
    ],
    testimonial: {
      quote: 'The calculator has transformed our quoting process. What used to take our team 15-20 minutes per quote now happens in seconds. Customers love the transparency of seeing exactly what factors influence their shipping cost, and our team appreciates the accuracy and consistency. The visual route mapping and weather analysis gives us a major advantage over competitors. Really amazing app',
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
    technologies: ['Monday CRM', 'QuickBooks', 'Stripe', 'Make', 'API integrations'],
    alternativeTechnologies: ['Hubspot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n', 'PayPal', 'Bill'],
    clickableTags: {
      companies: ['EclipseGroup'],
      technologies: ['Monday CRM', 'QuickBooks', 'Stripe', 'Make'],
      locations: ['Miami, FL, USA', 'Florida', 'USA']
    },
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
    technologies: ['QuickBooks', 'Make', 'Monday', 'GoogleSheets'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Hubspot', 'Pipedrive', 'Zoho', 'Telegram', 'Slack'],
    clickableTags: {
      companies: ['485 Logistics'],
      technologies: ['QuickBooks', 'Make', 'Monday'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
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
    technologies: ['Monday CRM', 'Make', 'Google Docs API', 'PandaDoc'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Hubspot', 'Pipedrive', 'Zoho', 'DocuSign', 'SignNow', 'eSignatures'],
    clickableTags: {
      companies: ['Affiliated Medical Supplies'],
      technologies: ['Monday CRM', 'Make', 'Google Docs API'],
      locations: ['Atlanta, GA, USA', 'Georgia', 'USA']
    },
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
    technologies: ['GoogleDrive', 'GoogleSheets', 'Make', 'Monday CRM', 'Telegram', 'Slack'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Box', 'DropBox', 'Hubspot', 'Pipedrive', 'Zoho'],
    clickableTags: {
      companies: ['LaneWise'],
      technologies: ['GoogleDrive', 'GoogleSheets', 'Make', 'Monday CRM'],
      locations: ['State College, PA, USA', 'Pennsylvania', 'USA']
    },
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
    technologies: ['DocuSign', 'Monday', 'Make', 'GoogleDrive'],
    alternativeTechnologies: ['PandaDoc', 'SignNow', 'eSignatures', 'Pipedrive', 'HubSpot', 'Zoho', 'Zapier', 'n8n', 'Box', 'DropBox'],
    clickableTags: {
      companies: ['485 Logistics'],
      technologies: ['DocuSign', 'Monday', 'Make', 'GoogleDrive'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
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
    alternativeTechnologies: ['Typeform', 'GoogleForms', 'Cognito', 'Zapier', 'n8n', 'Hubspot', 'Zoho', 'Pipedrive'],
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
      quote: 'The web form integration has transformed how we collect information from clients. Before, we would chase documents and manually enter data. Now clients complete JotForm online, and all information automatically appears in our CRM. Very cool!',
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
    technologies: ['Monday', 'Make', 'Slack', 'Google Workspace API'],
    alternativeTechnologies: ['Hubspot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n', 'Telegram'],
    clickableTags: {
      companies: ['New Age Cabinetry & Coatings'],
      technologies: ['Monday', 'Make', 'Slack', 'Google Workspace API'],
      locations: ['Phoenix, AZ, USA', 'Arizona', 'USA']
    },
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
    technologies: ['Monday', 'Make', 'Twilio', 'Slack', 'Email API'],
    alternativeTechnologies: ['Hubspot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n', 'OpenPhone', 'AirCall', 'Telegram'],
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
    technologies: ['Monday', 'Google Data Studio', 'Make', 'API integrations'],
    alternativeTechnologies: ['Hubspot', 'Zapier', 'n8n', 'Pipedrive', 'Zoho'],
    clickableTags: {
      companies: ['DreamLine'],
      technologies: ['Monday', 'Google Data Studio', 'Make'],
      locations: ['Vancouver, WA, USA', 'Washington', 'USA']
    },
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
  {
    id: 'car-hauling-solution',
    title: 'Boxed Solution for Car Hauling Company',
    company: 'LaneWise',
    location: 'State College, PA, USA',
    industryCategory: 'car-hauling',
    functionCategory: 'industry-specific',
    industry: 'Car Hauling',
    solutionType: 'Industry-Specific Products',
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
    technologies: ['QuickBooks', 'Make', 'Google Sheets', 'Monday', 'Stripe', 'Telegram', 'DocuSign'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'PayPal', 'Slack', 'PandaDoc', 'eSignature', 'SignNow'],
    clickableTags: {
      companies: ['LaneWise'],
      technologies: ['QuickBooks', 'Make', 'Google Sheets', 'Monday'],
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
    title: 'Boxed Solution for Kitchen Cabinetry Manufacturer',
    company: 'AllWood Design',
    location: 'San Diego, CA, USA',
    industryCategory: 'cabinetry-coatings',
    functionCategory: 'industry-specific',
    industry: 'Cabinetry & Coatings',
    solutionType: 'Industry-Specific Products',
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
    technologies: ['Monday', 'CabinetVision', 'Make', 'GoogleSheets', 'QuickBooks'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Hubspot', 'Pipedrive', 'Zoho', 'Stripe', 'PayPal', 'Bill'],
    clickableTags: {
      companies: ['AllWood Design'],
      technologies: ['Monday', 'CabinetVision', 'Make', 'GoogleSheets'],
      locations: ['San Diego, CA, USA', 'California', 'USA']
    },
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
    title: 'Boxed Solution for Music Production Company',
    company: 'SUQEAK E CLEAN STUDIOS',
    location: 'USA, Australia',
    industryCategory: 'commercial-music',
    functionCategory: 'industry-specific',
    industry: 'Music Production',
    solutionType: 'Industry-Specific Products',
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
    technologies: ['Monday', 'Make', 'GoogleSheets', 'Stripe', 'Bill'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Hubspot', 'Pipedrive', 'Zoho', 'PayPal', 'QuickBooks', 'AirTable'],
    clickableTags: {
      companies: ['SUQEAK E CLEAN STUDIOS'],
      technologies: ['Monday', 'Make', 'GoogleSheets', 'Stripe'],
      locations: ['USA', 'Australia']
    },
    results: [
      'Aggregation of all tools used in one place',
      '75% reduction in administrative work',
      'Accurate and timely calculation and payment of royalties',
      'Catalog expansion without increasing administrative personnel'
    ],
    testimonial: {
      quote: 'We are currently collecting feedback from our colleagues regarding this project implementation.',
      author: 'Client Testimonial',
      position: 'Coming Soon'
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
    solutionType: 'Industry-Specific Products',
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
    technologies: ['Monday', 'Make', 'Google Workspace', 'Twilio', 'ElevenLabs', 'PlayHT'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Hubspot', 'Pipedrive', 'Zoho', 'OpenAI', 'Claude', 'OpenPhone', 'AirCall'],
    clickableTags: {
      companies: ['Up-Struct LLC'],
      technologies: ['Monday', 'Make', 'Google Workspace', 'Twilio'],
      locations: ['Lynnwood, WA, USA', 'Washington', 'USA']
    },
    results: [
      '40% increase in project cost estimation accuracy',
      '25% reduction in project completion time',
      'Automation of client call reception',
      'Improved customer experience and increased positive reviews'
    ],
    testimonial: {
      quote: 'The AI components in our roofing business solution have been a game-changer. The voice agent handles initial client inquiries 24/7, our cost estimations are more accurate, and clients love the automatic progress updates. We have increased our capacity without adding administrative staff.',
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
    technologies: ['OpenAI', 'ElevenLabs', 'Twilio', 'Monday'],
    alternativeTechnologies: ['Claude', 'OpenPhone', 'AirCall', 'Hubspot', 'Pipedrive', 'Zoho', 'Make', 'Zapier', 'n8n'],
    clickableTags: {
      companies: ['Up-Struct LLC'],
      technologies: ['OpenAI', 'ElevenLabs', 'Twilio'],
      locations: ['Lynnwood, WA, USA', 'Washington', 'USA']
    },
    results: [
      'Automation of 60-70% of incoming requests',
      'Reduction of waiting time to minimum',
      '24/7 operation mode without increasing staff',
      'Significant savings on support team expansion',
      '90% reduction in communication errors'
    ],
    testimonial: {
      quote: 'The AI voice agent has completely transformed our client intake process. It handles most routine inquiries automatically, schedules appointments, and only routes complex issues to our specialists. Our clients are impressed with the fast response times, and we have been able to scale our operations without expanding our support team.',
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
    technologies: ['OpenAI', 'Monday', 'Retool', 'Make'],
    alternativeTechnologies: ['Claude', 'Hubspot', 'Pipedrive', 'Zoho', 'Zapier', 'n8n'],
    results: [
      '90% reduction in information search time',
      'Fast adaptation of new employees',
      'Increased efficiency of working with clients',
      'More informed decisions based on complete data'
    ],
    testimonial: {
      quote: 'We are currently collecting feedback from our colleagues regarding this project implementation.',
      author: 'Client Testimonial',
      position: 'Coming Soon'
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
    technologies: ['Google Sheets', 'Make', 'Monday', 'Stripe'],
    alternativeTechnologies: ['Zapier', 'n8n', 'HubSpot', 'Pipedrive', 'Zoho', 'PayPal', 'QuickBooks', 'Bill', 'AirTable'],
    clickableTags: {
      companies: ['SUQEAK E CLEAN STUDIOS'],
      technologies: ['Google Sheets', 'Make', 'Monday'],
      locations: ['USA', 'Australia']
    },
    results: [
      '90% increase in calculation accuracy',
      '75% reduction in time spent on payment calculations',
      'Pricing optimization and increased margin',
      'Unification of calculations within company'
    ],
    testimonial: {
      quote: 'We are currently collecting feedback from our colleagues regarding this project implementation.',
      author: 'Client Testimonial',
      position: 'Coming Soon'
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
      'Integration with Google Sheets for event logging (+logging in Make)',
      'Sending SMS/Telegram alerts for especially important messages'
    ],
    technologies: ['Slack', 'Make', 'Monday', 'Google Workspace', 'Jira', 'Twilio'],
    alternativeTechnologies: ['Zapier', 'n8n', 'Hubspot', 'Pipedrive', 'Zoho', 'Telegram', 'OpenPhone', 'AirCall'],
    clickableTags: {
      companies: ['MC Keeper'],
      technologies: ['Slack', 'Make', 'Monday', 'Google Workspace'],
      locations: ['West Chester, OH, USA', 'Ohio', 'USA']
    },
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
    alternativeTechnologies: ['AirCall', 'OpenPhone', 'Hubspot', 'Zoho', 'Pipedrive', 'Zapier', 'n8n', 'OpenAI', 'Claude'],
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
      quote: 'The telephony integration has given us a complete view of all client interactions. Our sales team no longer wastes time logging calls, and managers can see the full communication history with each client. The automatic transcription feature has been invaluable for training and quality assurance.',
      author: 'Eugene Gourevitch',
      position: 'SEO at EclipseGroup'
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
 * Маппинг для красивого отображения тегов
 */
const tagDisplayNames: Record<string, string> = {
  // Solution Types - все возможные варианты из твоих кейсов
  'Custom Solutions': 'Custom',
  'CRM Integrations': 'CRM',
  'Documents & Web Forms': 'Documents',
  'System Integrations': 'Systems',
  'System & Infrastructure Integrations': 'Systems',
  'AI-Powered Solutions': 'AI',
  'Industry-Specific': 'Industry',
  'Industry-Specific Products': 'Industry',
  'Finance & Accounting': 'Finance',
  
  // Technologies
  'Monday CRM': 'Monday',
  'Monday': 'Monday',
  'API integrations': 'API',
  'QuickBooks': 'QB',
  'Make': 'Make',
  'Zapier': 'Zapier',
  'OpenAI': 'OpenAI',
  'Twilio': 'Twilio',
  'Stripe': 'Stripe',
  'Next.js': 'Next.js',
  'TypeScript': 'TypeScript',
  'DocuSign': 'DocuSign',
  'JotForm': 'JotForm',
  'Slack': 'Slack',
  'Google Sheets': 'Sheets',
  'GoogleSheets': 'Sheets',
  'Google Workspace API': 'Google API',
  'Google Data Studio': 'Analytics',
  'Google Docs API': 'Google API',
  'Google API': 'Google API',
  'ElevenLabs': 'Voice AI',
  'CabinetVision': 'CAD',
  'GoogleDrive': 'Drive',
  'Google Workspace': 'Google',
  'PlayHT': 'Voice AI',
  'Retool': 'Retool',
  'OpenAI Whisper': 'AI Speech',
  'Email API': 'Email',
  'Jira': 'Jira',
  'Bill': 'Bill',
  'PandaDoc': 'PandaDoc'
};

/**
 * Функция для форматирования тегов для отображения
 */
function formatTagForDisplay(tag: string): string {
  return tagDisplayNames[tag] || tag;
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
    tags: [
      formatTagForDisplay(caseStudy.solutionType), 
      ...caseStudy.technologies.slice(0, 2).map(formatTagForDisplay)
    ],
    isSpecialCard: caseStudy.isSpecialCard
  };
}