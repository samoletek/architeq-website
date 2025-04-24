import { type NextRequest, NextResponse } from 'next/server';
import { allCaseStudies } from '@/lib/data/case-studies';

// Типы результатов поиска
interface SearchResult {
  id: string;
  title: string;
  type: 'case' | 'service' | 'page';
  url: string;
  description?: string;
  tags?: string[];
}

// Предопределенные результаты поиска
const SERVICES = [
  { id: 'business-process', title: 'Business Process Automation', type: 'service' as const, url: '/services/business-process', description: 'Automate complex business processes by connecting different systems, eliminating manual data entry, and creating workflows.' },
  { id: 'crm-integration', title: 'CRM Integration', type: 'service' as const, url: '/services/crm-integration', description: 'Connect your CRM system with other business tools to create a unified information environment.' },
  { id: 'boxed-solutions', title: 'Boxed Solutions', type: 'service' as const, url: '/services/boxed-solutions', description: 'Industry-specific automation packages that address unique challenges in various sectors.' },
  { id: 'ai-solutions', title: 'AI Solutions', type: 'service' as const, url: '/services/ai-solutions', description: 'Leverage artificial intelligence to automate complex tasks, analyze data, and provide intelligent insights.' },
  { id: 'documentation', title: 'Documentation', type: 'service' as const, url: '/services/documentation', description: 'Automate document creation, processing, and management to reduce administrative burden.' },
  { id: 'finance', title: 'Financial Systems', type: 'service' as const, url: '/services/finance', description: 'Streamline financial operations by automating invoicing, payment tracking, and reconciliation.' },
];

const PAGES = [
  { id: 'home', title: 'Home', type: 'page' as const, url: '/' },
  { id: 'about', title: 'About Us', type: 'page' as const, url: '/about', description: 'Learn about our team, mission, and technology stack.' },
  { id: 'cases', title: 'Case Studies', type: 'page' as const, url: '/cases', description: 'Explore our successful client projects and solutions.' },
  { id: 'contacts', title: 'Contact Us', type: 'page' as const, url: '/contacts', description: 'Get in touch with our team for a consultation.' },
];

// Функция для преобразования кейсов в результаты поиска
function casesToSearchResults(): SearchResult[] {
  return allCaseStudies.map(cs => ({
    id: cs.id,
    title: cs.title,
    type: 'case',
    url: `/cases/${cs.id}`,
    description: cs.description,
    tags: [cs.solutionType, ...cs.technologies.slice(0, 2)]
  }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  
  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }
  
  const lowerCaseQuery = query.toLowerCase();
  
  // Создаем массив всех доступных данных
  const allCases = casesToSearchResults();
  const allServices = [...SERVICES];
  const allPages = [...PAGES];
  
  // Функция для проверки, соответствует ли элемент запросу
  const matches = (item: SearchResult) => {
    const titleMatch = item.title.toLowerCase().includes(lowerCaseQuery);
    const descriptionMatch = item.description?.toLowerCase().includes(lowerCaseQuery) || false;
    const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) || false;
    
    return titleMatch || descriptionMatch || tagsMatch;
  };
  
  // Фильтруем и объединяем результаты
  const matchingServices = allServices.filter(matches);
  const matchingCases = allCases.filter(matches);
  const matchingPages = allPages.filter(matches);
  
  // Объединяем все результаты, начиная с наиболее релевантных
  const results = [
    ...matchingServices,
    ...matchingCases,
    ...matchingPages,
  ];
  
  return NextResponse.json({ results });
}