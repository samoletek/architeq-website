// src/lib/seo/breadcrumb-helper.ts
import { siteMetadata } from './metadata';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Генерирует breadcrumb структуру на основе пути
 */
export function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'Home',
      url: siteMetadata.siteUrl
    }
  ];

  // Удаляем начальный "/" и разбиваем на части
  const pathParts = path.replace(/^\//, '').split('/').filter(Boolean);
  
  let currentPath = '';
  
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    
    // Преобразуем slug в читаемый заголовок
    const name = formatBreadcrumbName(part, pathParts, index);
    
    breadcrumbs.push({
      name,
      url: `${siteMetadata.siteUrl}${currentPath}`
    });
  });

  return breadcrumbs;
}

/**
 * Форматирует имя breadcrumb элемента
 */
function formatBreadcrumbName(slug: string, pathParts: string[], index: number): string {
  // Специальные случаи для известных путей
  const specialCases: Record<string, string> = {
    'services': 'Services',
    'cases': 'Case Studies',
    'about': 'About Us',
    'contacts': 'Contact',
    'ai-solutions': 'AI-Powered Solutions',
    'crm-integration': 'CRM Integration',
    'business-process': 'Business Process Automation',
    'boxed-solutions': 'Boxed Solutions',
    'documentation': 'Documentation Services',
    'finance': 'Finance Automation',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'cookies': 'Cookie Policy'
  };

  if (specialCases[slug]) {
    return specialCases[slug];
  }

  // Преобразуем kebab-case в Title Case
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Генерирует breadcrumbs для страниц услуг
 */
export function generateServiceBreadcrumbs(serviceSlug: string): BreadcrumbItem[] {
  return generateBreadcrumbs(`/services/${serviceSlug}`);
}

/**
 * Генерирует breadcrumbs для кейсов
 */
export function generateCaseBreadcrumbs(caseSlug: string): BreadcrumbItem[] {
  return generateBreadcrumbs(`/cases/${caseSlug}`);
}