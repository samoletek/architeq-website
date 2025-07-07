import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';

export const metadata = generateServiceMetadata({
  title: 'Industry-Specific Boxed Solutions',
  description: 'Ready-to-implement automation packages tailored for specific industries like logistics, manufacturing, real estate, and more. Get industry-optimized automation quickly.',
  keywords: ['boxed solutions', 'industry solutions', 'pre-configured automation', 'industry-specific automation', 'ready-to-use solutions', 'vertical solutions'],
  path: '/services/boxed-solutions'
});

export default function BoxedSolutionsPage() {
  const benefits = [
    {
      title: "Faster Implementation",
      description: "Get up and running in weeks instead of months with pre-built components and workflows tailored for your industry.",
      icon: "clock"
    },
    {
      title: "Industry Best Practices",
      description: "Our solutions incorporate industry-specific best practices based on our experience with multiple businesses in your sector.",
      icon: "check"
    },
    {
      title: "Cost Efficiency",
      description: "Reduce implementation costs by leveraging pre-configured solutions that require minimal customization.",
      icon: "dollar"
    },
    {
      title: "Proven Results",
      description: "Our boxed solutions have delivered measurable results for similar businesses in your industry.",
      icon: "chart"
    }
  ];

  const industrySolutions = [
    {
      title: "Car Hauling Companies",
      description: "Complete solution for vehicle transportation companies with order management, payment control, factoring, and logistics optimization.",
      benefits: [
        "Unified CRM for order management",
        "Automatic delivery cost calculation",
        "Integration with QuickBooks and factoring",
        "Automated document flow",
        "Transportation cost calculations"
      ],
      icon: "workflow",
      caseId: "car-hauling-solution"
    },
    {
      title: "Cabinetry Manufacturers",
      description: "Centralized system for kitchen furniture manufacturing companies to manage orders, designs, production, and inventory.",
      benefits: [
        "Integration with design software",
        "Production task automation",
        "Material tracking system",
        "Interactive project dashboards",
        "Automated document flow"
      ],
      icon: "map",
      caseId: "kitchen-cabinetry-solution"
    },
    {
      title: "Music Production Company",
      description: "Comprehensive solution for music production to manage assets, calculate royalties, control copyright, and automate reporting.",
      benefits: [
        "Centralized music asset management",
        "Automatic royalty calculations",
        "Document generation system",
        "Copyright control",
        "Vendor payment automation"
      ],
      icon: "analysis",
      caseId: "music-label-solution"
    },
    {
      title: "Roofing Companies",
      description: "Comprehensive solution for roofing companies with AI components for client communication, cost estimation, and project management.",
      benefits: [
        "AI voice agent for client applications",
        "Automated cost calculation system",
        "Salesperson time optimization",
        "Automatic client progress notifications",
        "Warranty service management"
      ],
      icon: "workflow",
      caseId: "roofing-business-solution"
    }
  ];

  const processes = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "We evaluate your current workflows and business requirements to identify the specific customizations needed for your boxed solution."
    },
    {
      step: 2,
      title: "Solution Customization",
      description: "We adjust the pre-built components of our boxed solution to match your specific business processes, terminology, and integration requirements."
    },
    {
      step: 3,
      title: "Data Migration & Integration",
      description: "We transfer your existing data into the new system and connect it with your other business tools to ensure seamless information flow."
    },
    {
      step: 4,
      title: "Training & Deployment",
      description: "We provide comprehensive training to your team and deploy the solution with minimal disruption to your ongoing operations."
    },
    {
      step: 5,
      title: "Support & Optimization",
      description: "We provide ongoing support and regularly review the solution's performance, making adjustments as your business evolves."
    }
  ];

  const caseStudies = [
    {
      id: "car-hauling-solution",
      title: "Boxed Solution for Car Hauling Companies",
      company: "LaneWise",
      description: "Unified system for vehicle transportation companies including order management and payment control.",
      results: [
        "60% reduction in order processing time",
        "Elimination of errors in calculations",
        "Automated accounts receivable control"
      ]
    },
    {
      id: "music-label-solution",
      title: "Boxed Solution for Music Labels",
      company: "SUQEAK E CLEAN STUDIOS",
      description: "Comprehensive system for music labels to manage assets, royalty calculations, and copyright control.",
      results: [
        "75% reduction in administrative work",
        "Accurate and timely royalty calculations",
        "Catalog expansion without increasing staff"
      ]
    },
    {
      id: "roofing-business-solution",
      title: "Boxed Solution for Roofing Business with AI Components",
      company: "Up-Struct LLC",
      description: "Comprehensive solution for roofing companies with AI components for client communication and cost estimation.",
      results: [
        "40% increase in project cost estimation accuracy",
        "25% reduction in project completion time",
        "Automation of client call reception"
      ]
    }
  ];

  const faqs = [
    {
      question: "How much customization is possible with boxed solutions?",
      answer: "While our boxed solutions come pre-configured, they are highly customizable. We can adapt them to your specific workflows, terminology, and processes while maintaining the core functionality that makes them efficient."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation time for boxed solutions is typically 3-6 weeks, depending on the complexity of your business and any customizations needed. This is significantly faster than building custom solutions from scratch."
    },
    {
      question: "Can boxed solutions integrate with our existing systems?",
      answer: "Yes, our boxed solutions are designed to integrate with common industry tools and software. We handle all aspects of integration to ensure seamless data flow between your existing systems and the new solution."
    },
    {
      question: "What if my industry is not listed?",
      answer: "If you don't see a boxed solution for your specific industry, we can still help. We can either adapt an existing solution or develop a custom solution tailored to your industry's unique requirements."
    }
  ];

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
                      className="group p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-default bg-white/5 hover:bg-white/10"
                    >
                      <div>
                        <h4 className="text-white font-semibold text-sm group-hover:text-secondary transition-colors duration-300">
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
      serviceTitle="Industry-Specific Boxed Solutions"
      serviceDescription="Ready-to-implement automation packages tailored for specific industries, solving unique challenges with proven, customizable workflows."
      breadcrumbTitle="Industry-Specific Boxed Solutions"
      overview={{
        title: "What Are Boxed Solutions?",
        description: (
          <>
            <p className="mb-4">
              Boxed solutions are pre-configured automation packages designed specifically for particular industries. They combine our expertise in business process automation with deep industry knowledge to address the unique challenges of different sectors.
            </p>
            <p className="mb-4">
              Each solution includes a set of optimized workflows, integrations, and templates that can be quickly implemented and customized for your specific business needs.
            </p>
            <p>
              Our boxed solutions provide faster implementation times, lower costs, and proven results compared to building automation solutions from scratch, while still allowing for the customization needed to match your unique business processes.
            </p>
          </>
        ),
        features: [
          "Faster Implementation",
          "Industry-Specific Functionality",
          "Proven Results",
          "Cost Efficiency",
          "Customizable Workflows",
          "Expert Support"
        ],
        featuresTitle: "Solution Benefits"
      }}
      benefits={benefits}
      features={industrySolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={customSolutionsSection}
      additionalSectionsPosition="before-cta"
    />
  );
}