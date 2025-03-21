import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
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
      <body className={`${manrope.variable} font-sans bg-background text-white`}>
        {children}
      </body>
    </html>
  )
}