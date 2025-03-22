import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Industry-Specific Boxed Solutions',
  description: 'Ready-to-implement automation packages tailored for specific industries like logistics, manufacturing, real estate, and more. Get industry-optimized automation quickly.',
  keywords: ['boxed solutions', 'industry solutions', 'pre-configured automation', 'industry-specific automation', 'ready-to-use solutions', 'vertical solutions'],
  openGraph: {
    title: 'Industry-Specific Boxed Solutions | §78',
    description: 'Ready-to-implement automation packages tailored for specific industries like logistics, manufacturing, real estate, and more. Get industry-optimized automation quickly.',
    url: `${siteMetadata.siteUrl}/services/boxed-solutions`,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.defaultLocale,
    type: 'website',
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services/boxed-solutions`,
  },
};

export default function BoxedSolutionsPage() {
  const industrySolutions = [
    {
      id: "car-hauling",
      title: "Car Hauling Companies",
      description: "Complete solution for vehicle transportation companies with order management, payment control, factoring, and logistics optimization.",
      features: [
        "Unified CRM for order management",
        "Automatic delivery cost calculation",
        "Integration with QuickBooks and factoring",
        "Automated document flow",
        "Transportation cost calculations"
      ],
      icon: "truck",
      caseStudy: {
        company: "LaneWise",
        location: "State College, PA, USA",
        results: [
          "60% reduction in order processing time",
          "Elimination of errors in calculations",
          "Automated accounts receivable control"
        ]
      }
    },
    {
      id: "kitchen-cabinetry",
      title: "Kitchen Cabinetry Manufacturers",
      description: "Centralized system for kitchen furniture manufacturing companies to manage orders, designs, production, and inventory.",
      features: [
        "Integration with design software",
        "Production task automation",
        "Material tracking system",
        "Interactive project dashboards",
        "Automated document flow"
      ],
      icon: "furniture",
      caseStudy: {
        company: "AllWood Design",
        location: "San Diego, CA, USA",
        results: [
          "30% reduction in order fulfillment cycle",
          "85% reduction in specification errors",
          "20-25% increase in project profitability"
        ]
      }
    },
    {
      id: "music-label",
      title: "Music Labels",
      description: "Comprehensive solution for music labels to manage assets, calculate royalties, control copyright, and automate reporting.",
      features: [
        "Centralized music asset management",
        "Automatic royalty calculations",
        "Document generation system",
        "Copyright control",
        "Vendor payment automation"
      ],
      icon: "music",
      caseStudy: {
        company: "SUQEAK E CLEAN STUDIOS",
        location: "USA, Australia",
        results: [
          "75% reduction in administrative work",
          "Accurate and timely royalty calculations",
          "Catalog expansion without increasing staff"
        ]
      }
    },
    {
      id: "real-estate",
      title: "Real Estate Companies",
      description: "Solution for real estate agencies to coordinate showings, prepare documents, track deals, and generate analytics.",
      features: [
        "Lead capture and qualification automation",
        "Calendar integration for showings",
        "Automatic client reminders",
        "Document flow management",
        "Agent and property analytics"
      ],
      icon: "home",
      caseStudy: {
        company: "Ameriland Capital",
        location: "Fayetteville, AR, USA",
        results: [
          "55% increase in processed leads",
          "40% reduction in deal closing time",
          "35% increase in successful deals"
        ]
      }
    },
    {
      id: "roofing-business",
      title: "Roofing Business",
      description: "Comprehensive solution for roofing companies with AI components for client communication and cost estimation.",
      features: [
        "Automated application collection",
        "AI-voice bot for client intake",
        "Cost calculator based on roof parameters",
        "Salesperson scheduling optimization",
        "Automatic client notifications"
      ],
      icon: "roof",
      caseStudy: {
        company: "Up-Struct LLC",
        location: "Lynnwood, WA, USA",
        results: [
          "40% increase in cost estimation accuracy",
          "25% reduction in project completion time",
          "Improved customer satisfaction ratings"
        ]
      }
    }
  ];

  // Function to render icons
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
      case 'roof':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  }

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
              <span className="text-white">Industry-Specific Boxed Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry-Specific Boxed Solutions</h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl">
              Ready-to-implement automation packages tailored for specific industries, solving unique challenges with proven, customizable workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/contacts">
                Book a Free Consultation
              </Button>
              <Button variant="secondary" size="lg" href="/cases">
                View Related Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What Are Boxed Solutions?</h2>
              <p className="text-light-gray mb-4">
                Boxed solutions are pre-configured automation packages designed specifically for particular industries. They combine our expertise in business process automation with deep industry knowledge to address the unique challenges of different sectors.
              </p>
              <p className="text-light-gray mb-4">
                Each solution includes a set of optimized workflows, integrations, and templates that can be quickly implemented and customized for your specific business needs.
              </p>
              <p className="text-light-gray">
                Our boxed solutions provide faster implementation times, lower costs, and proven results compared to building automation solutions from scratch, while still allowing for the customization needed to match your unique business processes.
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-xl">
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
                    <p className="text-light-gray">Solutions designed for your industry unique challenges and requirements.</p>
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
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Customizable Core</h4>
                    <p className="text-light-gray">While pre-built, our solutions can be tailored to your specific business processes and requirements.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Industry Solutions</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Explore our range of boxed solutions designed for specific industries and their unique operational challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {industrySolutions.map((solution, index) => (
              <div 
                key={index}
                className="bg-dark-gradient rounded-xl overflow-hidden border border-medium-gray hover:border-primary/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left column - 8 units */}
                  <div className="lg:col-span-8 p-8">
                    <div className="flex items-start">
                      <div className="rounded-full w-16 h-16 flex items-center justify-center mr-6 bg-medium-gray text-primary">
                        {renderIcon(solution.icon)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">Boxed Solution for {solution.title}</h3>
                        <p className="text-light-gray mb-6">{solution.description}</p>
                        
                        <h4 className="text-sm font-semibold mb-3 text-primary">Key Features:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                          {solution.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span className="text-light-gray">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Link href={`/cases/${solution.id}-solution`}>
                          <Button variant="secondary" className="mt-2">
                            View Case Study
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-2"
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
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - 4 units */}
                  <div className="lg:col-span-4 bg-medium-gray p-6">
                    <h4 className="text-lg font-semibold mb-3">Success Story</h4>
                    <p className="text-white font-medium mb-1">{solution.caseStudy.company}</p>
                    <p className="text-light-gray text-sm mb-4">{solution.caseStudy.location}</p>
                    
                    <h5 className="text-sm font-medium mb-2 text-primary">Results:</h5>
                    <ul className="text-light-gray space-y-2">
                      {solution.caseStudy.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Implementation Process</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Our streamlined approach ensures quick, efficient implementation of boxed solutions with minimal disruption to your operations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative space-y-12">
              {/* Vertical line */}
              <div className="absolute left-5 top-5 bottom-0 w-0.5 bg-primary" />
              
              {/* Step 1 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">1</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Initial Assessment</h3>
                  <p className="text-light-gray">
                    We evaluate your current workflows and business requirements to identify the specific customizations needed for your boxed solution.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">2</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Solution Customization</h3>
                  <p className="text-light-gray">
                    We adjust the pre-built components of our boxed solution to match your specific business processes, terminology, and integration requirements.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">3</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Data Migration & Integration</h3>
                  <p className="text-light-gray">
                    We transfer your existing data into the new system and connect it with your other business tools to ensure seamless information flow.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">4</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Training & Deployment</h3>
                  <p className="text-light-gray">
                    We provide comprehensive training to your team and deploy the solution with minimal disruption to your ongoing operations.
                  </p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="font-bold">5</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">Support & Optimization</h3>
                  <p className="text-light-gray">
                    We provide ongoing support and regularly review the solutions performance, making adjustments as your business evolves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-light-gray max-w-3xl mx-auto">
              Hear from businesses that have transformed their operations with our industry-specific boxed solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark-gradient rounded-xl p-8 border border-medium-gray relative">
              <div className="absolute top-8 left-8 text-5xl text-primary opacity-20"></div>
              <div className="relative z-10">
                <p className="text-lg mb-6 text-light-gray">
                  The boxed solution for our car hauling business has streamlined every aspect of our operations. From order intake to delivery and payment, everything is now connected and automated. We have eliminated the administrative bottlenecks that were holding back our growth.
                </p>
                <div>
                  <p className="font-bold">Mark Johnson</p>
                  <p className="text-light-gray text-sm">Operations Director at LaneWise</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 text-5xl text-primary opacity-20"></div>
            </div>

            <div className="bg-dark-gradient rounded-xl p-8 border border-medium-gray relative">
              <div className="absolute top-8 left-8 text-5xl text-primary opacity-20"></div>
              <div className="relative z-10">
                <p className="text-lg mb-6 text-light-gray">
                  As a music label operating across two continents, our administrative challenges were significant. The boxed solution from §78 has centralized all our operations, from release management to royalty calculations. Our artists are happier with the timely and accurate reporting, and our team can focus on creative work instead of administrative tasks.
                </p>
                <div>
                  <p className="font-bold">Emma Wilson</p>
                  <p className="text-light-gray text-sm">Label Manager at SUQEAK E CLEAN STUDIOS</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 text-5xl text-primary opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions CTA section */}
      <section className="py-20 bg-site-bg">
        <div className="container mx-auto px-4">
          <div className="bg-dark-gradient rounded-xl p-8 md:p-12 border border-medium-gray">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Do Not See Your Industry?</h2>
                <p className="text-light-gray mb-6">
                  If you do not see a boxed solution for your specific industry, do not worry. We also offer custom automation solutions tailored to your unique business needs.
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
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional Services</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Construction Companies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Industry-Specific Operations?</h2>
          <p className="text-light-gray max-w-2xl mx-auto mb-8">
            Book a free consultation to discuss how our boxed solutions can help streamline your operations and boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" href="/contacts">
              Book a Free Consultation
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              View Our Case Studies
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}