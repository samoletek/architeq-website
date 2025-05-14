// src/components/templates/service-template.tsx

import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

// Типы для описания секций страницы услуги
export interface ServiceBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  benefits?: string[];
  icon?: string;
  caseId?: string;
}

export interface ServiceCaseStudy {
  id: string;
  title: string;
  company: string;
  description: string;
  results: string[];
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceTemplateProps {
  // Основные данные
  serviceId: string;
  serviceTitle: string;
  serviceDescription: string;
  breadcrumbTitle: string;
  
  // Секции
  overview?: {
    title: string;
    description: ReactNode;
    sideContent?: ReactNode;
  };
  benefits?: ServiceBenefit[];
  features?: ServiceFeature[];
  processes?: ServiceProcess[];
  caseStudies?: ServiceCaseStudy[];
  faqs?: ServiceFAQ[];
  
  // Дополнительные блоки, если нужно
  additionalSections?: ReactNode;
  
  // Стилизация и настройки
  primaryColor?: string;
  accentColor?: string;
  iconRenderer?: (icon: string) => ReactNode;
}

export default function ServiceTemplate({
  serviceId,
  serviceTitle,
  serviceDescription,
  breadcrumbTitle,
  overview,
  benefits,
  features,
  processes,
  caseStudies,
  faqs,
  additionalSections,
  primaryColor = 'primary',
  accentColor = 'primary',
  iconRenderer
}: ServiceTemplateProps) {
  // Функция для рендеринга иконок с использованием предоставленной функции или запасным вариантом
  const renderIcon = (icon: string) => {
    if (iconRenderer) {
      return iconRenderer(icon);
    }
    
    // Запасной рендер иконки
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  };

  // Определение цветового класса для соответствующих компонентов

  const accentColorClass = {
    primary: 'text-primary',
    'neon-blue': 'text-neon-blue',
    'neon-purple': 'text-neon-purple'
  }[accentColor] || 'text-primary';

  return (
    <SiteLayout>
      {/* Hero section */}
      <section className="py-20 md:py-28 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center text-light-gray mb-4">
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{breadcrumbTitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{serviceTitle}</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              {serviceDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacts">
                <Button variant="primary" size="lg">
                  Book a Free Consultation
                </Button>
              </Link>
              <Link href="/cases">
                <Button variant="secondary" size="lg">
                  View Related Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview section */}
      {overview && (
        <section className="py-20 bg-site-bg">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{overview.title}</h2>
                {typeof overview.description === 'string' ? (
                  <p className="text-light-gray mb-4">{overview.description}</p>
                ) : (
                  overview.description
                )}
              </div>
              {overview.sideContent && (
                <div className="bg-dark-gray p-8 rounded-xl">
                  {overview.sideContent}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Benefits section */}
      {benefits && benefits.length > 0 && (
        <section className="py-20 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits</h2>
              <p className="text-light-gray max-w-3xl mx-auto">
                Our solutions deliver tangible benefits that directly impact your organizations efficiency and bottom line.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`bg-dark-gradient rounded-xl p-6 border border-transparent hover:border-${primaryColor}/20 transition-all duration-300 hover:shadow-neon-glow`}
                >
                  <div className={`w-16 h-16 flex items-center justify-center mb-4 bg-medium-gray ${accentColorClass}`}>
                    {renderIcon(benefit.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-light-gray">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features/Solutions section */}
      {features && features.length > 0 && (
        <section className="py-20 bg-site-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Solutions</h2>
              <p className="text-light-gray max-w-3xl mx-auto">
                We offer a comprehensive range of solutions to address your specific business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-dark-gradient rounded-xl p-6 border border-medium-gray hover:border-${primaryColor}/30 transition-all duration-300 hover:shadow-neon-glow`}
                >
                  <div className="flex items-start">
                    {feature.icon && (
                      <div className={`w-16 h-16 flex items-center justify-center mr-6 bg-medium-gray ${accentColorClass}`}>
                        {renderIcon(feature.icon)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-light-gray mb-4">{feature.description}</p>
                      
                      {feature.benefits && feature.benefits.length > 0 && (
                        <>
                          <h4 className={`text-sm font-medium mb-2 ${accentColorClass}`}>Key Benefits:</h4>
                          <ul className="text-light-gray space-y-1 mb-4">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start">
                                <span className={accentColorClass + " mr-2"}>•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {feature.caseId && (
                        <Link href={`/cases/${feature.caseId}`} className={`${accentColorClass} font-medium text-sm flex items-center mt-2`}>
                          View Related Case Study
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
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process section */}
      {processes && processes.length > 0 && (
        <section className="py-20 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Process</h2>
              <p className="text-light-gray max-w-3xl mx-auto">
                We follow a proven methodology to ensure successful implementation tailored to your business needs.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative space-y-12">
                {/* Vertical line */}
                <div className={`absolute left-5 top-5 bottom-0 w-0.5 bg-${primaryColor}`} />
                
                {processes.map((process) => (
                  <div key={process.step} className="relative flex">
                    <div className={`flex-shrink-0 w-10 h-10 bg-${primaryColor} flex items-center justify-center z-10`}>
                      <span className="font-bold">{process.step}</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                      <p className="text-light-gray">
                        {process.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Studies section */}
      {caseStudies && caseStudies.length > 0 && (
        <section className="py-20 bg-site-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-light-gray max-w-3xl mx-auto">
                See how our solutions have helped businesses streamline operations and improve efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <div 
                  key={index}
                  className={`bg-dark-gradient rounded-xl overflow-hidden border border-medium-gray hover:border-${primaryColor}/30 transition-all duration-300`}
                >
                  <div style={{ height: '200px', background: 'linear-gradient(135deg, #333 0%, #1E1E1E 100%)' }} className="relative">
                    <div className="absolute top-3 left-3">
                      <span className="bg-medium-gray/80 text-white text-xs px-2 py-1 rounded">{serviceId}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
                    <p className="text-light-gray text-sm mb-4">{caseStudy.company}</p>
                    <p className="text-light-gray mb-4">{caseStudy.description}</p>
                    
                    <h4 className={`text-sm font-semibold mb-2 ${accentColorClass}`}>Key Results:</h4>
                    <ul className="text-light-gray text-sm space-y-1 mb-4">
                      {caseStudy.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start">
                          <span className={accentColorClass + " mr-2"}>•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={`/cases/${caseStudy.id}`} className={`${accentColorClass} font-medium text-sm flex items-center`}>
                      View Case Study
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
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/cases">
                <Button variant="secondary">
                  View All Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ section */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-dark-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-light-gray max-w-3xl mx-auto">
                Common questions about our services and solutions.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-medium-gray rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-light-gray">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Any additional custom sections */}
      {additionalSections}
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation to discuss how our solutions can help your business save time, reduce errors, and improve efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contacts">
              <Button variant="primary" size="lg">
                Book a Free Consultation
              </Button>
            </Link>
            <Link href="/cases">
              <Button variant="secondary" size="lg">
                View Our Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}