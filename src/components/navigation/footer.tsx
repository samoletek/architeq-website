import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Footer data - can be moved to a separate file
const services = [
  { name: 'Business Process Automation', href: '/services/business-process' },
  { name: 'CRM System Integration', href: '/services/crm-integration' },
  { name: 'Boxed Solutions', href: '/services/boxed-solutions' },
  { name: 'AI Solutions', href: '/services/ai-solutions' },
  { name: 'Documentation & Forms', href: '/services/documentation' },
  { name: 'Financial Systems', href: '/services/finance' },
]

const cases = [
  { name: 'Financial Automation', href: '/cases/finance' },
  { name: 'Documents & Forms', href: '/cases/documents' },
  { name: 'CRM Integration', href: '/cases/crm' },
  { name: 'Industry Solutions', href: '/cases/industry' },
  { name: 'AI Solutions', href: '/cases/ai' },
]

const about = [
  { name: 'Company History', href: '/about#history' },
  { name: 'Team', href: '/about#team' },
  { name: 'Methodology', href: '/about#methodology' },
  { name: 'Technologies', href: '/about#tech' },
]

const legal = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'Terms of Use', href: '/terms' },
]

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'GitHub', href: '#', icon: 'github' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-gray pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and slogan */}
          <div className="md:col-span-4">
            <div className="text-4xl font-bold">§78</div>
            <p className="mt-4 text-light-gray">
              Business process automation to optimize your company's operations
            </p>
            <div className="mt-6">
              <Button variant="primary">Contact Us</Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-light-gray hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Case Studies</h3>
            <ul className="space-y-2">
              {cases.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-light-gray hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              {about.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-light-gray hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-light-gray">hello@78.com</p>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-light-gray hover:text-primary transition-colors duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" 
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-medium-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-light-gray">© 2025 §78. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-light-gray hover:text-white text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}