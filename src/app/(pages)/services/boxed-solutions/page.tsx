import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { getCaseStudyById } from '@/lib/data/case-studies';
import { getServiceDetails } from '@/lib/data/services';

// Получаем метаданные из централизованного источника
const serviceDetails = getServiceDetails('boxed-solutions');
export const metadata = generateServiceMetadata({
  title: serviceDetails?.seoTitle || 'Industry-Specific Boxed Solutions',
  description: serviceDetails?.seoDescription || 'Ready-to-implement automation packages',
  keywords: serviceDetails?.seoKeywords || ['boxed solutions'],
  path: '/services/boxed-solutions'
});

export default function BoxedSolutionsPage() {
  // Получаем все данные из централизованного источника
  const serviceDetails = getServiceDetails('boxed-solutions');
  
  if (!serviceDetails) {
    throw new Error('Boxed Solutions service data not found');
  }

  // Данные для кейсов из централизованного источника
  const caseStudies = serviceDetails.relatedCaseIds
    .map(id => getCaseStudyById(id))
    .filter(Boolean);


  const customSolutionsSection = (
    <section className="pt-48 pb-48 bg-dark-gray relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center section-content-spacing">
          <h2 className="section-title-medium font-bold section-title-spacing"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
              }}>
            Don&apos;t See Your Industry?
          </h2>
          <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Every industry has unique challenges. If you don&apos;t see a boxed solution for your specific sector, we create custom automation architectures tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white"
                  style={{
                    textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                  }}>
                Custom Solution Development
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Our team of automation experts will analyze your workflows, identify opportunities, and develop a comprehensive solution that addresses your specific industry challenges and requirements.
              </p>
              
              <div className="space-y-4">
                {[
                  "Comprehensive workflow analysis and mapping",
                  "Industry-specific automation design",
                  "Compliance and regulatory considerations", 
                  "Scalable architecture for future growth"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    </div>
                    <span className="text-white text-lg leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side - Industries Grid */}
          <div className="relative">
            <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-2xl p-8 border border-primary/20 relative overflow-hidden">
              
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-secondary"></div>
                <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-primary"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-secondary"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-primary"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center"
                    style={{
                      textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(178,75,243,0.4)'
                    }}>
                  Industries We&apos;ve Automated
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: "Transportation & Logistics", desc: "Vehicle hauling & delivery management" },
                    { name: "Manufacturing & Production", desc: "Kitchen cabinetry & custom manufacturing" },
                    { name: "Entertainment & Media", desc: "Music labels & content management" },
                    { name: "Real Estate & Property", desc: "Property management & sales automation" },
                    { name: "Healthcare & Medical", desc: "Patient management & compliance tracking" },
                    { name: "Financial Services", desc: "Payment processing & accounting automation" },
                    { name: "Professional Services", desc: "Client management & project workflows" },
                    { name: "E-commerce & Retail", desc: "Order fulfillment & inventory management" }
                  ].map((industry, index) => (
                    <div 
                      key={index}
                      className="group p-4 rounded-lg border border-primary/20 md:hover:border-primary/40 transition-all duration-300 cursor-default bg-white/5 md:hover:bg-white/10"
                    >
                      <div>
                        <h4 className="text-white font-semibold text-sm md:group-hover:text-secondary transition-colors duration-300">
                          {industry.name}
                        </h4>
                        <p className="text-light-gray text-xs mt-1 leading-relaxed">
                          {industry.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  return (
    <ServiceTemplate
      serviceId="boxed-solutions"
      serviceTitle={serviceDetails.serviceTitle}
      serviceDescription={serviceDetails.serviceDescription}
      breadcrumbTitle={serviceDetails.breadcrumbTitle}
      overview={serviceDetails.overview}
      benefits={serviceDetails.benefits}
      features={serviceDetails.features}
      processes={serviceDetails.processes}
      caseStudies={caseStudies}
      faqs={serviceDetails.faqs}
      additionalSections={customSolutionsSection}
      additionalSectionsPosition="before-cta"
    />
  );
}