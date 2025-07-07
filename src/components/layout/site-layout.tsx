// src/components/layout/site-layout.tsx
"use client";

import Footer from '@/components/navigation/footer'
import PageTransition from '@/components/ui/page-transition'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}