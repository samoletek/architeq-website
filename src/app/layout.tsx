// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/lib/seo/metadata'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
    { media: '(prefers-color-scheme: light)', color: '#121212' }
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteMetadata.defaultTitle,
    template: `%s | ${siteMetadata.siteName}`
  },
  description: siteMetadata.defaultDescription,
  metadataBase: new URL(siteMetadata.siteUrl),
  keywords: siteMetadata.defaultKeywords,
  authors: [
    {
      name: siteMetadata.siteName,
      url: siteMetadata.siteUrl
    }
  ],
  creator: siteMetadata.siteName,
  openGraph: {
    type: 'website',
    locale: siteMetadata.defaultLocale,
    url: siteMetadata.siteUrl,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: siteMetadata.defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.defaultTitle
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    images: [siteMetadata.defaultOgImage]
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/favicon/site.webmanifest',
  appleWebApp: {
    title: siteMetadata.siteName,
    statusBarStyle: 'black-translucent'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-mono bg-background text-white`}>
        {children}
      </body>
    </html>
  )
}