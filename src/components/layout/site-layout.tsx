// src/components/layout/site-layout.tsx
"use client";

import Header from '@/components/navigation/header'
import Footer from '@/components/navigation/footer'
import PageTransition from '@/components/ui/page-transition'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}