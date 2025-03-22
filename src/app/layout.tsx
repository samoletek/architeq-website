// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: '§78 | Business Process Automation',
  description: 'Business process automation for small and medium businesses. Expertise in CRM integration, document and form creation, AI solutions.',
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