// src/components/navigation/footer.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { SectionAnimation } from '@/components/ui/section-animation';
import { motion } from 'framer-motion';

// Тип для группы ссылок футера
export interface FooterLinkGroup {
  title: string;
  links: Array<{
    name: string;
    href: string;
    isExternal?: boolean;
  }>;
}

// Тип для социальных ссылок
export interface SocialLink {
  name: string;
  href: string;
  icon: string | React.ReactNode;
}

// Интерфейс для параметров футера
export interface FooterProps {
  logo?: React.ReactNode;
  slogan?: string;
  linkGroups?: FooterLinkGroup[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyrightText?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
  ctaButton?: {
    text: string;
    href: string;
  };
  className?: string;
  animateLinks?: boolean;
  variant?: 'default' | 'minimal' | 'centered';
}

// Данные по умолчанию для групп ссылок
const defaultLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Services',
    links: [
      { name: 'Business Process Automation', href: '/services/business-process' },
      { name: 'CRM System Integration', href: '/services/crm-integration' },
      { name: 'Boxed Solutions', href: '/services/boxed-solutions' },
      { name: 'AI Solutions', href: '/services/ai-solutions' },
      { name: 'Documentation & Forms', href: '/services/documentation' },
      { name: 'Financial Systems', href: '/services/finance' },
    ]
  },
  {
    title: 'Case Studies',
    links: [
      { name: 'Financial Automation', href: '/cases/finance' },
      { name: 'Documents & Forms', href: '/cases/documents' },
      { name: 'CRM Integration', href: '/cases/crm' },
      { name: 'Industry Solutions', href: '/cases/industry' },
      { name: 'AI Solutions', href: '/cases/ai' },
    ]
  },
  {
    title: 'About Us',
    links: [
      { name: 'Company History', href: '/about#history' },
      { name: 'Team', href: '/about#team' },
      { name: 'Methodology', href: '/about#methodology' },
      { name: 'Technologies', href: '/about#tech' },
    ]
  }
];

// Данные по умолчанию для юридических ссылок
const defaultLegalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'Terms of Use', href: '/terms' },
];

// Данные по умолчанию для социальных ссылок
const defaultSocialLinks: SocialLink[] = [
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'GitHub', href: '#', icon: 'github' },
];

export default function Footer({
  logo,
  slogan = "Business process automation to optimize your company's operations",
  linkGroups = defaultLinkGroups,
  socialLinks = defaultSocialLinks,
  contactInfo = {
    email: "hello@78.com",
  },
  copyrightText = "© 2025 §78. All rights reserved.",
  legalLinks = defaultLegalLinks,
  ctaButton = {
    text: "Contact Us",
    href: "/contacts"
  },
  className,
  animateLinks = true,
  variant = 'default'
}: FooterProps) {
  
  // Рендеринг иконки социальной сети
  const renderSocialIcon = (icon: string | React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    
    // Встроенные иконки
    if (typeof icon === 'string') {
      switch (icon) {
        case 'linkedin':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          );
        case 'twitter':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          );
        case 'github':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          );
        default:
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          );
      }
    }
    
    // По умолчанию
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    );
  };
  
  // Выбор макета для разных вариантов
  if (variant === 'minimal') {
    return (
      <footer className={cn("bg-dark-gray py-8", className)}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                {logo || "§78"}
              </Link>
            </div>
            
            <div className="flex space-x-6 items-center">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-light-gray hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
            
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-light-gray text-sm">
                {copyrightText}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  if (variant === 'centered') {
    return (
      <footer className={cn("bg-dark-gray pt-16 pb-8", className)}>
        <div className="container mx-auto px-4">
          <SectionAnimation className="text-center mb-12">
            <Link href="/" className="inline-block text-4xl font-bold mb-4">
              {logo || "§78"}
            </Link>
            <p className="text-light-gray max-w-2xl mx-auto mb-6">
              {slogan}
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-light-gray hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
            <Link href={ctaButton.href}>
              <Button variant="primary">{ctaButton.text}</Button>
            </Link>
          </SectionAnimation>
          
          <div className="border-t border-medium-gray mt-12 pt-8 text-center">
            <div className="mb-6">
              <ul className="flex flex-wrap justify-center gap-6">
                {legalLinks.map((item) => (
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
            <div className="text-light-gray text-sm">
              {copyrightText}
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Вариант по умолчанию
  return (
    <footer className={cn("bg-dark-gray pt-16 pb-8", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Логотип и слоган */}
          <div className="md:col-span-4">
            <SectionAnimation>
              <Link href="/" className="text-4xl font-bold inline-block">
                {logo || "§78"}
              </Link>
              <p className="mt-4 text-light-gray">
                {slogan}
              </p>
              <div className="mt-6">
                <Link href={ctaButton.href}>
                  <Button variant="primary">{ctaButton.text}</Button>
                </Link>
              </div>
            </SectionAnimation>
          </div>

          {/* Группы ссылок */}
          {linkGroups.map((group, groupIndex) => (
            <div key={group.title} className={cn(
              "md:col-span-2",
              // Если групп три, то добавляем дополнительную колонку для последней группы
              linkGroups.length === 3 && groupIndex === 2 ? "md:col-span-3" : ""
            )}>
              <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={animateLinks ? { opacity: 0, y: 10 } : {}}
                    animate={animateLinks ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.1 + (index * 0.05) + (groupIndex * 0.1)
                    }}
                  >
                    <Link 
                      href={item.href} 
                      className="text-light-gray hover:text-white transition-colors duration-300"
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Контактная информация */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            {contactInfo.email && (
              <p className="text-light-gray mb-2">{contactInfo.email}</p>
            )}
            {contactInfo.phone && (
              <p className="text-light-gray mb-2">{contactInfo.phone}</p>
            )}
            {contactInfo.address && (
              <p className="text-light-gray mb-4">{contactInfo.address}</p>
            )}
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-light-gray hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Нижний колонтитул */}
        <div className="border-t border-medium-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-light-gray">{copyrightText}</div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              {legalLinks.map((item) => (
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
  );
}