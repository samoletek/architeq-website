"use client"

import { usePathname } from 'next/navigation';
import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Клиентский компонент страницы кейса
export default function CaseStudyPage() {
  // Используем хук usePathname для получения URL
  const pathname = usePathname();
  const slug = pathname?.split('/').pop() || '';
  
  // Простой placeholder для демонстрации
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Case Study: {slug}</h1>
        <p className="text-light-gray mb-6">
          This is a simplified placeholder page for case studies.
        </p>
        <Link href="/cases">
          <Button variant="primary">Back to Cases</Button>
        </Link>
      </div>
    </SiteLayout>
  );
}