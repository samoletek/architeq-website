// src/lib/seo/schema.tsx
import React from 'react';
import { siteMetadata } from './metadata';

/**
 * Общие свойства для всех Schema компонентов
 */
interface BaseSchemaProps {
  url: string;
}

/**
 * Свойства для ArticleSchema (кейсы, блоги и т.д.)
 */
interface ArticleSchemaProps extends BaseSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  authorName: string;
  authorUrl: string;
  organization: string;
  category: string;
}

/**
 * Схема данных для статьи (кейса)
 */
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  authorName,
  authorUrl,
  organization,
  category
}: ArticleSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl || `${siteMetadata.siteUrl}/images/og-image.jpg`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": authorUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": organization,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteMetadata.siteUrl}/images/logo.png`
      }
    },
    "url": url,
    "articleSection": category,
    "isAccessibleForFree": "True"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Свойства для ServiceSchema
 */
interface ServiceSchemaProps extends BaseSchemaProps {
  name: string;
  description: string;
  provider: string;
  imageUrl?: string;
  serviceType: string;
  areaServed?: string[];
}

/**
 * Схема данных для услуги
 */
export function ServiceSchema({
  name,
  description,
  url,
  provider,
  imageUrl,
  serviceType,
  areaServed
}: ServiceSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteMetadata.siteUrl}/images/logo.png`
      },
      "url": siteMetadata.siteUrl
    },
    "serviceType": serviceType,
    "url": url,
    "category": "Technology Services",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Small and Medium Businesses"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": url,
      "serviceType": "Online Service"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${name} - Service Offerings`
    },
    "brand": {
      "@type": "Brand",
      "name": "Architeq"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "url": url
    },
    ...(imageUrl && { "image": imageUrl }),
    ...(areaServed && { 
      "areaServed": areaServed.map(area => ({
        "@type": "Country",
        "name": area
      }))
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Свойства для OrganizationSchema
 */
interface OrganizationSchemaProps extends BaseSchemaProps {
  name: string;
  description: string;
  logo?: string;
  foundingDate?: string;
  founders?: string[];
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
  sameAs?: string[]; // Social links
}

/**
 * Схема данных для организации (для страницы О нас)
 */
export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  foundingDate,
  founders,
  address,
  contactPoint,
  sameAs
}: OrganizationSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "description": description,
    "url": url,
    "logo": logo || `${siteMetadata.siteUrl}/images/logo.png`,
    "slogan": "Architect your workflow. Scale with confidence",
    "knowsAbout": [
      "Business Process Automation",
      "CRM Integration",
      "Document Automation", 
      "AI Solutions",
      "Workflow Optimization",
      "API Integration",
      "No-Code Solutions",
      "Business Intelligence",
      "AI Agents",
      "Voice Automation",
      "Predictive Analytics"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "Canada"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      }
    ],
    "serviceType": "Technology Consulting",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Integration Services",
            "description": "Custom CRM integration and automation solutions"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "AI-Powered Solutions",
            "description": "Artificial intelligence implementation for business automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Document Automation",
            "description": "Automated document generation and processing systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Business Process Automation",
            "description": "End-to-end workflow automation and optimization"
          }
        }
      ]
    },
    ...(foundingDate && { "foundingDate": foundingDate }),
    ...(founders && {
      "founders": founders.map(founder => ({
        "@type": "Person",
        "name": founder
      }))
    }),
    ...(address && {
      "address": {
        "@type": "PostalAddress",
        ...(address.streetAddress && { "streetAddress": address.streetAddress }),
        ...(address.addressLocality && { "addressLocality": address.addressLocality }),
        ...(address.addressRegion && { "addressRegion": address.addressRegion }),
        ...(address.postalCode && { "postalCode": address.postalCode }),
        ...(address.addressCountry && { "addressCountry": address.addressCountry })
      }
    }),
    ...(contactPoint && {
      "contactPoint": {
        "@type": "ContactPoint",
        ...(contactPoint.telephone && { "telephone": contactPoint.telephone }),
        ...(contactPoint.email && { "email": contactPoint.email }),
        ...(contactPoint.contactType && { "contactType": contactPoint.contactType || "customer service" })
      }
    }),
    ...(sameAs && { "sameAs": sameAs })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Свойства для FAQSchema
 */
interface FAQPageSchemaProps extends BaseSchemaProps {
  mainEntity: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Схема данных для страницы вопросов и ответов
 */
export function FAQPageSchema({
  mainEntity
}: FAQPageSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Свойства для BreadcrumbSchema
 */
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Схема данных для хлебных крошек
 */
export function BreadcrumbSchema({
  items
}: BreadcrumbSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Свойства для ProfessionalServiceSchema
 */
interface ProfessionalServiceSchemaProps extends BaseSchemaProps {
  name: string;
  description: string;
  serviceOutput?: string;
  serviceArea?: string[];
  provider: string;
  hoursAvailable?: {
    opens: string;
    closes: string;
    dayOfWeek: string[];
  };
}

/**
 * Схема данных для профессиональных услуг (улучшенная для AI)
 */
export function ProfessionalServiceSchema({
  name,
  description,
  url,
  serviceOutput,
  serviceArea,
  provider,
  hoursAvailable
}: ProfessionalServiceSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": siteMetadata.siteUrl
    },
    "serviceType": "Business Automation",
    "category": ["Technology Consulting", "Business Process Automation", "AI Implementation"],
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Small and Medium Businesses",
      "geographicArea": "United States"
    },
    "additionalType": "https://schema.org/TechnicalService",
    "potentialAction": {
      "@type": "ContactAction",
      "target": `${siteMetadata.siteUrl}/contacts`
    },
    ...(serviceOutput && { "serviceOutput": serviceOutput }),
    ...(serviceArea && {
      "serviceArea": serviceArea.map(area => ({
        "@type": "State",
        "name": area
      }))
    }),
    ...(hoursAvailable && {
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "opens": hoursAvailable.opens,
        "closes": hoursAvailable.closes,
        "dayOfWeek": hoursAvailable.dayOfWeek
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Свойства для WebpageSchema
 */
interface WebpageSchemaProps extends BaseSchemaProps {
  title: string;
  description: string;
  lastReviewed?: string;
}

/**
 * Схема данных для обычной веб-страницы
 */
export function WebpageSchema({
  title,
  description,
  url,
  lastReviewed
}: WebpageSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    ...(lastReviewed && { "lastReviewed": lastReviewed })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}