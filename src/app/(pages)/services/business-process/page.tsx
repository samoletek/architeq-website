import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { getCaseStudyById } from '@/lib/data/case-studies';
import { getServiceDetails } from '@/lib/data/services';

// Получаем метаданные из централизованного источника
const serviceDetails = getServiceDetails('business-process');
export const metadata = generateServiceMetadata({
  title: serviceDetails?.seoTitle || 'Business Process Automation',
  description: serviceDetails?.seoDescription || 'Business process automation services',
  keywords: serviceDetails?.seoKeywords || ['business process automation'],
  path: '/services/business-process'
});

export default function BusinessProcessPage() {
  // Получаем все данные из централизованного источника
  const serviceDetails = getServiceDetails('business-process');
  
  if (!serviceDetails) {
    throw new Error('Business Process service data not found');
  }

  // Данные для кейсов из центрального источника
  const caseStudies = serviceDetails.relatedCaseIds
    .map(id => getCaseStudyById(id))
    .filter(Boolean);

  // Дополнительная секция технологий (пока оставим как было)
  const technologiesSection = (
    <section className="pt-48 pb-48 bg-dark-gray relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center section-content-spacing">
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Automation Technology Stack
          </h2>
          <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            We leverage cutting-edge automation platforms and technologies to create powerful, scalable business process solutions that integrate seamlessly with your existing systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Automation Platforms */}
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-8 border border-primary/20 relative group md:hover:border-primary/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-6 text-white">Automation Platforms</h3>
              <div className="space-y-4">
                {[
                  { name: 'Make (Integromat)', desc: 'Visual automation builder' },
                  { name: 'n8n', desc: 'Open-source workflow automation' },
                  { name: 'Zapier', desc: 'Cloud-based integration platform' },
                  { name: 'Microsoft Power Automate', desc: 'Enterprise automation solution' },
                  { name: 'Custom APIs', desc: 'Tailored integration solutions' }
                ].map((tech, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg md:hover:bg-white/5 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium text-base">{tech.name}</div>
                      <div className="text-light-gray text-sm">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Systems */}
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-8 border border-primary/20 relative group md:hover:border-primary/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-6 text-white">Business Systems</h3>
              <div className="space-y-4">
                {[
                  { name: 'Monday.com', desc: 'Project management & CRM' },
                  { name: 'HubSpot', desc: 'Marketing & sales automation' },
                  { name: 'QuickBooks', desc: 'Financial management' },
                  { name: 'Google Workspace', desc: 'Productivity & collaboration' },
                  { name: 'Airtable', desc: 'Database & workflow management' }
                ].map((tech, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg md:hover:bg-white/5 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium text-sm">{tech.name}</div>
                      <div className="text-light-gray text-xs">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Document & Communication */}
          <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-8 border border-primary/20 relative group md:hover:border-primary/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-6 text-white">Document & Communication</h3>
              <div className="space-y-4">
                {[
                  { name: 'DocuSign', desc: 'Electronic signatures' },
                  { name: 'JotForm', desc: 'Form automation & collection' },
                  { name: 'Slack', desc: 'Team communication & alerts' },
                  { name: 'Stripe', desc: 'Payment processing' },
                  { name: 'Twilio', desc: 'SMS & voice automation' }
                ].map((tech, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg md:hover:bg-white/5 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium text-sm">{tech.name}</div>
                      <div className="text-light-gray text-xs">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technology Philosophy */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                }}>
              Our Technology Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-3">Best Tool for the Job</h4>
                <p className="text-light-gray text-base">We choose technologies based on your specific needs, not our preferences.</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-3">Security First</h4>
                <p className="text-light-gray text-base">Enterprise-grade security and compliance built into every solution.</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-3">Future-Proof</h4>
                <p className="text-light-gray text-base">Scalable solutions that grow and evolve with your business.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  return (
    <ServiceTemplate
      serviceId="business-process"
      serviceTitle={serviceDetails.serviceTitle}
      serviceDescription={serviceDetails.serviceDescription}
      breadcrumbTitle={serviceDetails.breadcrumbTitle}
      overview={serviceDetails.overview}
      benefits={serviceDetails.benefits}
      features={serviceDetails.features}
      processes={serviceDetails.processes}
      caseStudies={caseStudies}
      faqs={serviceDetails.faqs}
      additionalSections={technologiesSection}
    />
  );

}