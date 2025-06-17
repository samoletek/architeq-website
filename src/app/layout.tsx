// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/lib/seo/metadata'
import { generateFaviconMetadata } from '@/lib/seo/favicon-metadata'

// Определяем шрифты с подмножествами
const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: true,
})

// Настройки viewport
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
    { media: '(prefers-color-scheme: light)', color: '#121212' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

// Метаданные по умолчанию для всего сайта
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
  publisher: siteMetadata.siteName,
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
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
    images: [siteMetadata.defaultOgImage],
    creator: '@yourhandle',
    site: '@yourhandle'
  },
  icons: generateFaviconMetadata().icons,
  manifest: generateFaviconMetadata().manifest,
  appleWebApp: generateFaviconMetadata().appleWebApp,
  other: generateFaviconMetadata().other,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/images/logo.png" 
          as="image" 
          type="image/png"
          />
          <link 
            rel="preload" 
            as="font" 
            type="font/woff2" 
            crossOrigin="anonymous"
          />
                {/* Скрипт для предотвращения мигания при загрузке */}
                <script 
          dangerouslySetInnerHTML={{ 
            __html: `
              document.documentElement.classList.add('is-loading');
              window.addEventListener('load', function() {
                setTimeout(function() {
                  document.documentElement.classList.remove('is-loading');
                  document.documentElement.classList.add('is-ready');
                }, 100);
              });
              
              // Определяем поддержку анимаций
              const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              if (reducedMotion) {
                document.documentElement.classList.add('reduced-motion');
              }
            `
          }}
        />
              </head>
      <body className="font-mono bg-background text-white antialiased">
        {/* Skip Navigation для доступности */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-white"
        >
          Skip to main content
        </a>
        
        {/* Основное содержимое */}
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}