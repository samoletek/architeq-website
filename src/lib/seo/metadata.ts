
export interface PageMetadata {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonicalUrl?: string;
  }
  
  // Основные метаданные для сайта
  export const siteMetadata = {
    siteName: '§78',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://78.com',
    defaultTitle: '§78 | Business Process Automation',
    defaultDescription: 'Business process automation for small and medium businesses. Expertise in CRM integration, document and form creation, AI solutions.',
    defaultKeywords: ['business automation', 'CRM integration', 'document automation', 'AI solutions', 'business process'],
    defaultOgImage: '/images/og-image.jpg',
    defaultLocale: 'en',
  };
  
  // Функция для получения оптимизированных метаданных страницы
  export function getPageMetadata(pageMetadata: Partial<PageMetadata>): PageMetadata {
    return {
      title: pageMetadata.title ? `${pageMetadata.title} | ${siteMetadata.siteName}` : siteMetadata.defaultTitle,
      description: pageMetadata.description || siteMetadata.defaultDescription,
      keywords: [...(pageMetadata.keywords || []), ...siteMetadata.defaultKeywords],
      ogImage: pageMetadata.ogImage || siteMetadata.defaultOgImage,
      canonicalUrl: pageMetadata.canonicalUrl || siteMetadata.siteUrl,
    };
  }