"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SiteLayout from '@/components/layout/site-layout';
import CaseStudyTemplate from '@/components/templates/case-study-template';
import { Button } from '@/components/ui/button';
import { getCaseStudyById, getRelatedCases, type CaseStudy } from '@/lib/data/case-studies';

export default function CaseStudyPage() {
  // Используем хук usePathname для получения URL
  const pathname = usePathname();
  const slug = pathname?.split('/').pop() || '';
  
  // Состояния для данных кейса
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedCases, setRelatedCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Загрузка данных кейса при монтировании компонента
  useEffect(() => {
    if (slug) {
      const foundCaseStudy = getCaseStudyById(slug);
      
      if (foundCaseStudy) {
        setCaseStudy(foundCaseStudy);
        const relatedCasesData = getRelatedCases(slug);
        setRelatedCases(relatedCasesData);
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
      
      // Обновляем метаданные динамически
      if (foundCaseStudy) {
        document.title = `${foundCaseStudy.title} | Architeq Case Study`;
      }
    }
  }, [slug]);
  
  // Возвращаем загрузочный UI пока данные загружаются
  if (loading) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-light-gray">Loading case study...</p>
        </div>
      </SiteLayout>
    );
  }
  
  // Обработка ситуации, когда кейс не найден
  if (notFound) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
          <p className="text-light-gray mb-8">We could not find the case study you are looking for.</p>
          <Link href="/cases">
            <Button variant="primary">View All Case Studies</Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // Если у нас есть данные кейса, используем новый CaseStudyTemplate
  if (!caseStudy) return null;

  return (
    <SiteLayout>
      <CaseStudyTemplate 
        caseStudy={caseStudy} 
        relatedCases={relatedCases} 
      />
    </SiteLayout>
  );
}