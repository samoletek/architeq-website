// src/lib/seo/schema.tsx
import React from 'react';

interface CaseSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  imageUrl?: string;
  authorName: string;
  authorUrl: string;
  organization: string;
  category: string;
}

export function CaseSchema({
  title,
  description,
  url,
  datePublished,
  imageUrl,
  authorName,
  authorUrl,
  organization,
  category
}: CaseSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
    "datePublished": datePublished,
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
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`
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