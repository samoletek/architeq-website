import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { getCaseStudyById } from '@/lib/data/case-studies';
import { getServiceDetails } from '@/lib/data/services';

// Получаем метаданные из централизованного источника
const serviceDetails = getServiceDetails('documentation');
export const metadata = generateServiceMetadata({
  title: serviceDetails?.seoTitle || 'Documentation & Forms',
  description: serviceDetails?.seoDescription || 'Documentation automation services',
  keywords: serviceDetails?.seoKeywords || ['documentation automation'],
  path: '/services/documentation'
});

export default function DocumentationPage() {
  // Получаем все данные из централизованного источника
  const serviceDetails = getServiceDetails('documentation');
  
  if (!serviceDetails) {
    throw new Error('Documentation service data not found');
  }

  // Данные для кейсов из централизованного источника
  const caseStudies = serviceDetails.relatedCaseIds
    .map(id => getCaseStudyById(id))
    .filter(Boolean);


  const integrationSection = (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Integration Options
          </h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            Our document and form solutions integrate with a wide range of business tools and platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">CRM Systems</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Monday.com</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>HubSpot</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Salesforce</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pipedrive</span>
              </li>
            </ul>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">E-Signature Platforms</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>DocuSign</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>PandaDoc</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>SignNow</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Adobe Sign</span>
              </li>
            </ul>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Form & Document Tools</h3>
            <ul className="text-light-gray space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>JotForm</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Typeform</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Google Forms</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Google Docs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  const roiSection = (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Return on Investment
          </h2>
          <p className="text-light-gray max-w-3xl mx-auto">
            Document and form automation delivers measurable benefits and significant ROI across various business metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">80%</div>
            <h3 className="text-xl font-semibold mb-2">Time Savings</h3>
            <p className="text-light-gray">
              Reduce document creation and processing time by up to 80%, freeing staff for higher-value activities.
            </p>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <h3 className="text-xl font-semibold mb-2">Error Reduction</h3>
            <p className="text-light-gray">
              Nearly eliminate errors in document content through automated data population and validation.
            </p>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">70%</div>
            <h3 className="text-xl font-semibold mb-2">Faster Cycle Times</h3>
            <p className="text-light-gray">
              Accelerate document approval and signing processes by an average of 70% using electronic signatures.
            </p>
          </div>

          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-primary mb-2">50%</div>
            <h3 className="text-xl font-semibold mb-2">Cost Reduction</h3>
            <p className="text-light-gray">
              Cut document-related costs by up to 50% through reduced labor, paper, and storage expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ServiceTemplate
      serviceId="documentation"
      serviceTitle={serviceDetails.serviceTitle}
      serviceDescription={serviceDetails.serviceDescription}
      breadcrumbTitle={serviceDetails.breadcrumbTitle}
      overview={serviceDetails.overview}
      benefits={serviceDetails.benefits}
      features={serviceDetails.features}
      processes={serviceDetails.processes}
      caseStudies={caseStudies}
      faqs={serviceDetails.faqs}
      additionalSections={<>{integrationSection}{roiSection}</>}
    />
  );
}