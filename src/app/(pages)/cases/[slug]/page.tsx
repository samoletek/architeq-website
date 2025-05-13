"use client"

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SiteLayout from '@/components/layout/site-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GCSVideo } from '@/components/ui/gcs-video';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
  
  // Функция для открытия видео в полноэкранном режиме
  const handleFullscreen = () => {
    const videoElement = document.querySelector('video');
    if (videoElement && videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    }
  };
  
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

  // Если у нас есть данные кейса, отображаем полный интерфейс
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-dark-gray relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Тип решения сверху */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                {caseStudy?.solutionType}
              </span>
            </div>
            
            {/* Главный заголовок */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {caseStudy?.title}
            </h1>
            
            {/* Описание */}
            <p className="text-xl text-light-gray mb-6 max-w-2xl mx-auto">
              {caseStudy?.shortDescription || caseStudy?.description}
            </p>
            
            {/* Основные кнопки действий */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Button variant="primary" size="lg" href="/contacts">
                Book a Similar Solution
              </Button>
              <Button variant="secondary" size="lg" onClick={handleFullscreen}>
                See Results
              </Button>
            </div>
            
            {/* Информация о компании */}
            <div className="text-center">
              <div className="flex items-center justify-center text-light-gray mb-2">
                <span className="font-medium text-white">{caseStudy?.company}</span>
                <span className="mx-2">•</span>
                <span>{caseStudy?.location}</span>
              </div>
              {/* Индустрия внизу */}
              <div className="text-light-gray">
                Industry: <span className="text-white">{caseStudy?.industry}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Центральная видео секция с фиолетовым свечением */}
      <section className="py-12 bg-site-bg" id="video-section">
        <div className="container mx-auto px-4">
          {/* Видео плеер - центрированный и большой */}
          <div className="max-w-6xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-dark-gray/50 video-purple-glow">
              <GCSVideo 
                caseId={caseStudy?.id || ''} 
                autoPlay={true}
                loop={true}
                muted={true}
                controls={false}
                placeholder={
                  <div className="h-full flex items-center justify-center bg-gradient-to-b from-dark-gray to-medium-gray">
                    <div className="text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-light-gray mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg text-light-gray">Loading case study visualization...</p>
                    </div>
                  </div>
                }
                onError={() => console.log(`Failed to load video for case: ${caseStudy?.id}`)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16 bg-site-bg">
        <div className="container mx-auto px-4">
          {/* Problem на всю ширину */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-red-900/20 to-dark-gray rounded-xl p-8 border border-red-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">Problem</h2>
              </div>
              <p className="text-lg text-light-gray leading-relaxed">
                {caseStudy?.problem}
              </p>
            </div>
          </div>
          
          {/* Solution (80%) и Technologies (20%) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Solution section - 80% */}
            <div className="lg:col-span-4">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Solution</h2>
              </div>
              
              <ul className="space-y-4">
                {caseStudy?.solution?.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-light-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Technologies - 20% */}
            <div className="lg:col-span-1">
              <div className="bg-dark-gray rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <div className="space-y-3">
                  {caseStudy?.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-light-gray text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results - на всю ширину */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Results</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy?.results.map((result, index) => (
                <div 
                  key={index} 
                  className="bg-dark-gray rounded-lg p-5 border border-medium-gray hover:border-secondary transition-colors"
                >
                  <p className="text-light-gray" dangerouslySetInnerHTML={{
                    __html: result.replace(/(\d+%|\d+x|\d+\s*hours?|\d+\s*minutes?|\d+\s*days?)/g, '<span class="text-secondary font-semibold">$1</span>')
                  }} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonial и CTA справа */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Пустое пространство слева */}
            <div className="lg:w-2/3"></div>
            
            {/* Правая колонка с Testimonial и CTA */}
            <div className="lg:w-1/3">
              {/* Testimonial */}
              {caseStudy?.testimonial && (
                <div className="bg-dark-gradient rounded-lg p-8 relative mb-8">
                  <div className="absolute top-4 left-4 text-4xl text-primary opacity-20">"</div>
                  <div className="relative z-10">
                    <p className="text-base mb-6 italic text-light-gray">
                      {caseStudy.testimonial.quote}
                    </p>
                    <div>
                      <p className="font-bold">{caseStudy.testimonial.author}</p>
                      <p className="text-light-gray text-sm">{caseStudy.testimonial.position}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-4xl text-primary opacity-20">"</div>
                </div>
              )}
              
              {/* CTA Block */}
              <div className="bg-dark-gradient rounded-lg p-6 border border-medium-gray">
                <h3 className="text-lg font-semibold mb-3">Need a Similar Solution?</h3>
                <p className="text-light-gray mb-4">
                  Let us discuss how we can implement a similar automation solution tailored to your business needs.
                </p>
                <Button variant="primary" className="w-full" href="/contacts">
                  Book a Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Cases - на всю ширину */}
      {relatedCases.length > 0 && (
        <section className="py-16 bg-dark-gray">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-8 text-center">Related Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((relatedCase) => (
                <Link 
                  key={relatedCase.id}
                  href={`/cases/${relatedCase.id}`}
                  className="block p-6 bg-medium-gray rounded-lg hover:bg-medium-gray/80 transition-colors"
                >
                  <h4 className="font-medium text-lg mb-2">{relatedCase.title}</h4>
                  <p className="text-light-gray text-sm mb-1">{relatedCase.company}</p>
                  <div className="flex items-center text-primary text-sm">
                    <span>Read Case Study</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business Operations?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our automation solutions can help streamline your operations and boost efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" href="/contacts">
              Book a Free Consultation
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              View More Case Studies
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}