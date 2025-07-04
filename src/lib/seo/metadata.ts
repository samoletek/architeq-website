// src/lib/seo/metadata.ts
import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  path?: string; // относительный путь для канонической ссылки
}

// Основные метаданные для сайта
export const siteMetadata = {
  siteName: 'Architeq',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://architeq.io',
  defaultTitle: 'Architeq | Business Process Automation',
  defaultDescription: 'Business process automation for small and medium businesses. Expertise in CRM integration, document and form creation, AI solutions.',
  defaultKeywords: [
    'business automation', 
    'CRM integration', 
    'document automation', 
    'AI solutions', 
    'business process',
    'workflow optimization',
    'AI agents',
    'process automation',
    'business intelligence',
    'no-code solutions',
    'API integration',
    'voice automation',
    'predictive analytics'
  ],
  defaultOgImage: '/images/og-image.jpg',
  defaultLocale: 'en',
};

/**
 * Генерирует полные метаданные страницы на основе предоставленных данных
 * @param pageMetadata - Метаданные конкретной страницы
 * @returns Полные метаданные страницы с значениями по умолчанию
 */
export function getPageMetadata(pageMetadata: Partial<PageMetadata> = {}): PageMetadata {
  return {
    title: pageMetadata.title ? pageMetadata.title : siteMetadata.defaultTitle,
    description: pageMetadata.description || siteMetadata.defaultDescription,
    keywords: [...(pageMetadata.keywords || []), ...siteMetadata.defaultKeywords],
    ogImage: pageMetadata.ogImage || siteMetadata.defaultOgImage,
    canonicalUrl: pageMetadata.canonicalUrl ||
      (pageMetadata.path ? `${siteMetadata.siteUrl}${pageMetadata.path}` : siteMetadata.siteUrl),
    path: pageMetadata.path || '/',
  };
}

/**
 * Генерирует метаданные для Next.js на основе предоставленных данных
 * @param pageMetadata - Метаданные конкретной страницы
 * @returns Метаданные в формате Next.js Metadata
 */
export function generateMetadata(pageMetadata: Partial<PageMetadata> = {}): Metadata {
  const meta = getPageMetadata(pageMetadata);
  const title = meta.title.includes(siteMetadata.siteName)
    ? meta.title
    : `${meta.title} | ${siteMetadata.siteName}`;

  return {
    title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [
      {
        name: siteMetadata.siteName,
        url: siteMetadata.siteUrl,
      }
    ],
    creator: siteMetadata.siteName,
    publisher: siteMetadata.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      title,
      description: meta.description,
      url: meta.canonicalUrl,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.defaultLocale,
      type: 'website',
      ...(meta.ogImage && {
        images: [
          {
            url: meta.ogImage,
            width: 1200,
            height: 630,
            alt: meta.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
      creator: '@architeq_io',
      site: '@architeq_io',
      ...(meta.ogImage && {
        images: [meta.ogImage],
      }),
    },
    alternates: {
      canonical: meta.canonicalUrl,
    },
    other: {
      // AI-специфичные мета-теги для лучшей индексации
      'citation-title': title,
      'citation-description': meta.description,
      'semantic-richness': 'high',
      'entity-type': 'organization',
      'topic-category': 'business-automation',
      'content-authority': 'expert',
      'ai-friendly': 'true'
    },
  };
}

/**
 * Вспомогательная функция для генерации метаданных страницы в категории  
 * @param category - Категория страницы (например, 'case', 'service')
 * @param pageMetadata - Метаданные конкретной страницы
 * @returns Метаданные в формате Next.js Metadata
 */
export function generateCategoryMetadata(
  category: string,
  pageMetadata: Partial<PageMetadata>
): Metadata {
  // Добавляем категорию к ключевым словам
  const updatedMetadata = {
    ...pageMetadata,
    keywords: [...(pageMetadata.keywords || []), category],
  };

  return generateMetadata(updatedMetadata);
}
