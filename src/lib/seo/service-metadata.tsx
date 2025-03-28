// src/lib/seo/service-metadata.ts
import { Metadata } from "next";
import { siteMetadata } from "./metadata";

interface ServiceMetadataProps {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export function generateServiceMetadata({
  title,
  description,
  keywords,
  path
}: ServiceMetadataProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | §78`,
      description,
      url: `${siteMetadata.siteUrl}${path}`,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.defaultLocale,
      type: 'website',
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}${path}`,
    },
  };
}