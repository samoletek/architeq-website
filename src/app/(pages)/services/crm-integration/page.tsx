import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { getCaseStudyById } from '@/lib/data/case-studies';
import { getServiceDetails } from '@/lib/data/services';

// Получаем метаданные из централизованного источника
const serviceDetails = getServiceDetails('crm-integration');
export const metadata = generateServiceMetadata({
  title: serviceDetails?.seoTitle || 'CRM System Integration',
  description: serviceDetails?.seoDescription || 'CRM integration services',
  keywords: serviceDetails?.seoKeywords || ['CRM integration'],
  path: '/services/crm-integration'
});

export default function CRMIntegrationPage() {
  // Получаем все данные из централизованного источника
  const serviceDetails = getServiceDetails('crm-integration');
  
  if (!serviceDetails) {
    throw new Error('CRM Integration service data not found');
  }

  // Данные для кейсов из центрального источника
  const caseStudies = serviceDetails.relatedCaseIds
    .map(id => getCaseStudyById(id))
    .filter(Boolean);


  const integrationHubSection = (
    <section className="pt-48 pb-48 bg-dark-gray relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Integration Hub
          </h2>
          <p className="text-light-gray text-xl md:text-2xl max-w-3xl mx-auto">
            Connect your CRM with hundreds of popular business tools. We specialize in creating seamless data flows between systems, eliminating manual work and ensuring real-time synchronization.
          </p>
        </div>

        {/* Main Integration Diagram */}
        <div className="mb-20">
          {/* Central CRM Hub */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="w-32 h-32 bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-full border-2 border-primary/40 flex items-center justify-center relative z-10">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <div className="text-white font-bold text-sm">Your CRM</div>
                </div>
              </div>
              
              {/* Animated Ring */}
              <div className="absolute inset-0 w-32 h-32 rounded-full border border-primary/30 animate-pulse"></div>
              <div className="absolute -inset-4 w-40 h-40 rounded-full border border-primary/20 animate-ping"></div>
            </div>
          </div>

          {/* Integration Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Communication Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group md:hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Communication</h4>
              <p className="text-base text-light-gray">Slack, Teams, Email, SMS</p>
            </div>

            {/* Financial Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group md:hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Financial</h4>
              <p className="text-base text-light-gray">QuickBooks, Stripe, Xero</p>
            </div>

            {/* Document Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group md:hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Documents</h4>
              <p className="text-base text-light-gray">DocuSign, Google Drive, OneDrive</p>
            </div>

            {/* Marketing Tools */}
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-6 border border-primary/20 text-center group md:hover:border-primary/40 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Marketing</h4>
              <p className="text-base text-light-gray">Mailchimp, Google Ads, Facebook</p>
            </div>
          </div>
        </div>

        {/* Popular Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
          {[
            { name: 'Monday.com', category: 'Project Management' },
            { name: 'Slack', category: 'Communication' },
            { name: 'QuickBooks', category: 'Accounting' },
            { name: 'DocuSign', category: 'E-Signatures' },
            { name: 'Google Workspace', category: 'Productivity' },
            { name: 'Stripe', category: 'Payments' },
            { name: 'Zapier', category: 'Automation' },
            { name: 'HubSpot', category: 'Marketing' },
            { name: 'Salesforce', category: 'CRM' },
            { name: 'Trello', category: 'Project Management' },
            { name: 'Zoom', category: 'Video Conferencing' },
            { name: 'Pipedrive', category: 'Sales' }
          ].map((tool, index) => (
            <div 
              key={index}
              className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-lg p-4 border border-primary/20 text-center md:hover:border-primary/40 transition-all duration-300 group cursor-default"
            >
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center mx-auto mb-2 md:group-hover:bg-primary/30 transition-colors duration-300">
                <div className="w-4 h-4 rounded bg-primary"></div>
              </div>
              <div className="text-white font-medium text-sm mb-1">{tool.name}</div>
              <div className="text-light-gray text-xs">{tool.category}</div>
            </div>
          ))}
        </div>

        {/* ROI Stats */}
        <div className="bg-dark-gray rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white"
                style={{
                  textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                }}>
              Integration Impact
            </h3>
            <p className="text-light-gray text-xl md:text-2xl">
              See the measurable benefits our CRM integrations deliver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">80%</div>
              <div className="text-white font-semibold mb-2 text-lg">Time Saved</div>
              <div className="text-light-gray text-base">on manual data entry and system switching</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">95%</div>
              <div className="text-white font-semibold mb-2 text-lg">Error Reduction</div>
              <div className="text-light-gray text-base">in data transfer between systems</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">3x</div>
              <div className="text-white font-semibold mb-2 text-lg">Faster Workflows</div>
              <div className="text-light-gray text-base">with automated cross-platform processes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">100%</div>
              <div className="text-white font-semibold mb-2 text-lg">Data Visibility</div>
              <div className="text-light-gray text-base">across all connected business systems</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  return (
    <ServiceTemplate
      serviceId="crm-integration"
      serviceTitle={serviceDetails.serviceTitle}
      serviceDescription={serviceDetails.serviceDescription}
      breadcrumbTitle={serviceDetails.breadcrumbTitle}
      overview={serviceDetails.overview}
      benefits={serviceDetails.benefits}
      features={serviceDetails.features}
      processes={serviceDetails.processes}
      caseStudies={caseStudies}
      faqs={serviceDetails.faqs}
      additionalSections={integrationHubSection}
    />
  );
}