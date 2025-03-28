// src/lib/seo/service-metadata.ts
import { Metadata } from "next";
import { siteMetadata } from "./metadata";
import { generateMetadata } from "./metadata";

interface ServiceMetadataProps {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  imageUrl?: string;
}

/**
 * Генерирует метаданные для страниц услуг
 * @param props - свойства метаданных для услуги
 * @returns объект метаданных Next.js
 */
export function generateServiceMetadata({
  title,
  description,
  keywords,
  path,
  imageUrl
}: ServiceMetadataProps): Metadata {
  // Используем унифицированную функцию generateMetadata
  return generateMetadata({
    title,
    description,
    keywords: [...keywords, 'services', 'business automation'],
    path,
    ogImage: imageUrl,
  });
}

/**
 * Получает структурированные данные Schema.org для услуги
 * Используется для добавления JSON-LD разметки
 */
export function getServiceSchemaData({
  title,
  description,
  path,
}: Omit<ServiceMetadataProps, 'keywords' | 'imageUrl'>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": siteMetadata.siteName,
      "url": siteMetadata.siteUrl
    },
    "serviceType": "Business Automation",
    "url": `${siteMetadata.siteUrl}${path}`
  };
}

/**
 * Создает метаданные для страницы с FAQs (часто задаваемыми вопросами)
 * @param faqs - массив вопросов и ответов
 * @param baseMetadata - базовые метаданные для страницы
 * @returns объект метаданных Next.js и данные Schema.org
 */
export function createServiceWithFAQMetadata(
  faqs: { question: string; answer: string }[],
  baseMetadata: ServiceMetadataProps
) {
  // Генерируем основные метаданные
  const metadata = generateServiceMetadata(baseMetadata);
  
  // Создаем FAQPage Schema.org разметку
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  // Создаем Service Schema.org разметку
  const serviceSchema = getServiceSchemaData({
    title: baseMetadata.title,
    description: baseMetadata.description,
    path: baseMetadata.path
  });
  
  return {
    metadata,
    schemas: [serviceSchema, faqSchema]
  };
}