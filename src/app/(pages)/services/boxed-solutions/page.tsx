import { generateServiceMetadata } from '@/lib/seo/service-metadata';
import ServiceTemplate from '@/components/templates/service-template';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
      title: "Kitchen Cabinetry Manufacturers",
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
      title: "Music Labels",
      description: "Comprehensive solution for music labels to manage assets, calculate royalties, control copyright, and automate reporting.",
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
      title: "Real Estate Companies",
      description: "Solution for real estate agencies to coordinate showings, prepare documents, track deals, and generate analytics.",
      benefits: [
        "Lead capture and qualification automation",
        "Calendar integration for showings",
        "Automatic client reminders",
        "Document flow management",
        "Agent and property analytics"
      ],
      icon: "dashboard",
      caseId: "real-estate-solution"
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
      id: "real-estate-solution",
      title: "Boxed Solution for Real Estate Companies",
      company: "Ameriland Capital",
      description: "Automation solution for real estate agencies to coordinate showings, prepare documents, and track deals.",
      results: [
        "55% increase in processed leads",
        "40% reduction in deal closing time",
        "35% increase in successful deals"
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
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="bg-[linear-gradient(to_bottom,_#170A24_0%,_#150920_50%,_#12071A_100%)] rounded-xl p-8 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4"
                  style={{
                    textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(178,75,243,0.4)'
                  }}>
                Don&apos;t See Your Industry?
              </h2>
              <p className="text-light-gray mb-6">
                If you don&apos;t see a boxed solution for your specific industry, don&apos;t worry. We also offer custom automation solutions tailored to your unique business needs.
              </p>
              <p className="text-light-gray mb-6">
                Our team of experts will analyze your workflows, identify automation opportunities, and develop a solution that addresses your specific challenges.
              </p>
              <Link href="/services/business-process">
                <Button variant="secondary">
                  Learn About Custom Solutions
                </Button>
              </Link>
            </div>
            <div className="bg-dark-gray rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">We Have Built Custom Solutions For:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Healthcare Providers</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Law Firms</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Educational Institutions</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>E-commerce Brands</span>
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
        ]
      }}
      benefits={benefits}
      features={industrySolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={customSolutionsSection}
    />
  );
}