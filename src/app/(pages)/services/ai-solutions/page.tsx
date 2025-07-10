import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { getCaseStudyById } from '@/lib/data/case-studies';
import { ProfessionalServiceSchema, FAQPageSchema } from '@/lib/seo/schema';
import { getServiceDetails } from '@/lib/data/services';

// Получаем метаданные из централизованного источника
const serviceDetails = getServiceDetails('ai-solutions');
export const metadata = generateServiceMetadata({
  title: serviceDetails?.seoTitle || 'AI-Powered Solutions',
  description: serviceDetails?.seoDescription || 'AI-powered business solutions',
  keywords: serviceDetails?.seoKeywords || ['AI solutions'],
  path: '/services/ai-solutions'
});

export default function AISolutionsPage() {
  // Получаем все данные из централизованного источника
  const serviceDetails = getServiceDetails('ai-solutions');
  
  if (!serviceDetails) {
    throw new Error('AI Solutions service data not found');
  }

  // Данные для кейсов из центрального источника
  const caseStudies = serviceDetails.relatedCaseIds
    .map(id => getCaseStudyById(id))
    .filter(Boolean);



  return (
    <>
      {/* Enhanced Schema для AI-решений */}
      <ProfessionalServiceSchema 
        name={serviceDetails.serviceTitle}
        description={serviceDetails.seoDescription}
        url="https://architeq.io/services/ai-solutions"
        serviceOutput={serviceDetails.schema?.serviceOutput || "AI-powered business solutions"}
        serviceArea={serviceDetails.schema?.serviceArea || ["United States", "Canada", "United Kingdom"]}
        provider="Architeq"
        hoursAvailable={serviceDetails.schema?.hoursAvailable || {
          opens: "09:00",
          closes: "17:00", 
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }}
      />
      
      {/* FAQ Schema для лучшей видимости в AI поиске */}
      <FAQPageSchema 
        url="https://architeq.io/services/ai-solutions"
        mainEntity={serviceDetails.faqs}
      />
      
      <ServiceTemplate
        serviceId="ai-solutions"
        serviceTitle={serviceDetails.serviceTitle}
        serviceDescription={serviceDetails.serviceDescription}
        breadcrumbTitle={serviceDetails.breadcrumbTitle}
        overview={serviceDetails.overview}
        benefits={serviceDetails.benefits}
        features={serviceDetails.features}
        processes={serviceDetails.processes}
        caseStudies={caseStudies}
        faqs={serviceDetails.faqs}
      />
    </>
  );
}