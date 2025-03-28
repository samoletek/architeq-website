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
  // Основные преимущества
  const benefits = [
    {
      title: "Faster Implementation",
      description: "Get up and running in weeks instead of months with pre-built components and workflows tailored for your industry.",
      icon: "rocket"
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

  // Отраслевые решения
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
      icon: "truck",
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
      icon: "furniture",
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
      icon: "music",
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
      icon: "home",
      caseId: "real-estate-solution"
    }
  ];

  // Процесс внедрения
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

  // Кейсы
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

  // FAQ
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

  // Содержимое для секции обзора
  const overviewSideContent = (
    <>
      <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
      <ul className="space-y-4">
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Faster Implementation</h4>
            <p className="text-light-gray">Get up and running in weeks instead of months with pre-built components and workflows.</p>
          </div>
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Industry-Specific Functionality</h4>
            <p className="text-light-gray">Solutions designed for your industry's unique challenges and requirements.</p>
          </div>
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold">Proven Results</h4>
            <p className="text-light-gray">Benefit from solutions that have already delivered measurable results for similar businesses.</p>
          </div>
        </li>
      </ul>
    </>
  );

  // Дополнительная секция (для примера)
  const customSolutionsSection = (
    <section className="py-20 bg-site-bg">
      <div className="container mx-auto px-4">
        <div className="bg-dark-gradient rounded-xl p-8 md:p-12 border border-medium-gray">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Don't See Your Industry?</h2>
              <p className="text-light-gray mb-6">
                If you don't see a boxed solution for your specific industry, don't worry. We also offer custom automation solutions tailored to your unique business needs.
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

  // Функция для рендеринга иконок
  function renderIcon(icon: string) {
    switch (icon) {
      case 'truck':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'furniture':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'music':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'rocket':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        );
      case 'check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'dollar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
    }
  }

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
            <p className="text-light-gray mb-4">
              Boxed solutions are pre-configured automation packages designed specifically for particular industries. They combine our expertise in business process automation with deep industry knowledge to address the unique challenges of different sectors.
            </p>
            <p className="text-light-gray mb-4">
              Each solution includes a set of optimized workflows, integrations, and templates that can be quickly implemented and customized for your specific business needs.
            </p>
            <p className="text-light-gray">
              Our boxed solutions provide faster implementation times, lower costs, and proven results compared to building automation solutions from scratch, while still allowing for the customization needed to match your unique business processes.
            </p>
          </>
        ),
        sideContent: overviewSideContent
      }}
      benefits={benefits}
      features={industrySolutions}
      processes={processes}
      caseStudies={caseStudies}
      faqs={faqs}
      additionalSections={customSolutionsSection}
      primaryColor="primary"
      accentColor="primary"
      iconRenderer={renderIcon}
    />
  );
}