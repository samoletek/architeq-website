"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const [showSocialTooltip, setShowSocialTooltip] = useState<string | null>(null);

  // Обработчик для соцсетей которые еще не активны
  const handleInactiveSocial = (e: React.MouseEvent, network: string) => {
    e.preventDefault();
    setShowSocialTooltip(network);
  };

  return (
    <footer className="bg-dark-gray pt-20 pb-12 relative overflow-hidden">
      {/* Градиентный фон для красоты */}
      <div className="absolute inset-0 bg-gradient-to-b from-site-bg via-dark-gray to-dark-purple opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        {/* Верхняя часть с колонками */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
          {/* Our Services */}
          <div>
            <Link href="/services" className="text-lg font-bold mb-4 block hover:text-primary transition-colors">
              Our Services
            </Link>
            <ul className="space-y-3">
              <li>
                <Link href="/services/business-process" className="text-light-gray hover:text-white transition-colors text-sm">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services/crm-integration" className="text-light-gray hover:text-white transition-colors text-sm">
                  CRM Integrations
                </Link>
              </li>
              <li>
                <Link href="/services/boxed-solutions" className="text-light-gray hover:text-white transition-colors text-sm">
                  Boxed Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/ai-solutions" className="text-light-gray hover:text-white transition-colors text-sm">
                  AI-Powered Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/documentation" className="text-light-gray hover:text-white transition-colors text-sm">
                  Automated Document Flow
                </Link>
              </li>
              <li>
                <Link href="/services/finance" className="text-light-gray hover:text-white transition-colors text-sm">
                  Finance Automations
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Cases */}
          <div>
            <Link href="/cases" className="text-lg font-bold mb-4 block hover:text-primary transition-colors">
              Our Cases
            </Link>
            <ul className="space-y-3">
              <li>
                <Link href="/cases/broker-calculator" className="text-light-gray hover:text-white transition-colors text-sm">
                  Custom web-app
                </Link>
              </li>
              <li>
                <Link href="/cases/stripe-invoicing" className="text-light-gray hover:text-white transition-colors text-sm">
                  Stripe Invoicing
                </Link>
              </li>
              <li>
                <Link href="/cases/document-generation" className="text-light-gray hover:text-white transition-colors text-sm">
                  Documents Generation
                </Link>
              </li>
              <li>
                <Link href="/cases/kitchen-cabinetry-solution" className="text-light-gray hover:text-white transition-colors text-sm">
                  Kitchen company Solution
                </Link>
              </li>
              <li>
                <Link href="/cases/ai-crm-assistant" className="text-light-gray hover:text-white transition-colors text-sm">
                  AI custom solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <Link href="/about" className="text-lg font-bold mb-4 block hover:text-primary transition-colors">
              About Us
            </Link>
            <ul className="space-y-3">
              <li>
                <Link href="/about#history" className="text-light-gray hover:text-white transition-colors text-sm">
                  Company
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="text-light-gray hover:text-white transition-colors text-sm">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="text-light-gray hover:text-white transition-colors text-sm">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/about#tech" className="text-light-gray hover:text-white transition-colors text-sm">
                  Techstack
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal docs */}
          <div>
            <div className="text-lg font-bold mb-4">
              Legal docs
            </div>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-light-gray hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-light-gray hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-light-gray hover:text-white transition-colors text-sm">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <Link href="/contacts" className="text-lg font-bold mb-4 block hover:text-primary transition-colors">
              Contact us
            </Link>
            <ul className="space-y-3">
              <li>
                <Link href="/contacts" className="text-light-gray hover:text-white transition-colors text-sm">
                  Schedule a Call
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-light-gray hover:text-white transition-colors text-sm">
                  Fill out onboarding
                </Link>
              </li>
              <li>
                <Link href="/about#faq" className="text-light-gray hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть - без разделительной линии */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Левая часть - среднего размера логотип */}
          <div className="pb-12">
            <Link 
              href="/" 
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-9xl md:text-9xl lg:text-9xl font-bold tracking-tight leading-none"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                architeq
              </motion.div>
            </Link>
          </div>

          {/* Правая часть - с улучшенным UX/UI */}
          <div className="space-y-6 text-left lg:text-right">
            {/* Слоган */}
            <div>
              <p className="text-xl font-medium">Architect your workflow.</p>
              <p className="text-xl font-medium">Scale with confidence.</p>
            </div>

            {/* Контакты */}
            <div className="space-y-3">
              {/* Email и кнопка на одной линии */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-3">
                <a 
                  href="mailto:hi@architeq.io" 
                  className="text-light-gray hover:text-white transition-colors text-base"
                >
                  hi@architeq.io
                </a>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 justify-start lg:justify-end relative items-center">
                {/* Twitter/X (неактивный) */}
                <div className="relative">
                  <button
                    className="text-light-gray hover:text-primary transition-colors relative"
                    onMouseEnter={(e) => handleInactiveSocial(e, 'twitter')}
                    onMouseLeave={() => setShowSocialTooltip(null)}
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                </div>

                {/* Facebook (неактивный) */}
                <div className="relative">
                  <button
                    className="text-light-gray hover:text-primary transition-colors"
                    onMouseEnter={(e) => handleInactiveSocial(e, 'facebook')}
                    onMouseLeave={() => setShowSocialTooltip(null)}
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>

                {/* Instagram (неактивный) */}
                <div className="relative">
                  <button
                    className="text-light-gray hover:text-primary transition-colors"
                    onMouseEnter={(e) => handleInactiveSocial(e, 'instagram')}
                    onMouseLeave={() => setShowSocialTooltip(null)}
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                </div>

                {/* Tooltip для неактивных соцсетей */}
                {showSocialTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 right-0 bg-dark-gray backdrop-blur-md border border-medium-gray rounded-lg px-4 py-2 text-sm text-light-gray whitespace-nowrap shadow-lg"
                  >
                    Sorry, we don&apos;t do social media yet, but we plan to.
                  </motion.div>
                )}
              </div>
            </div>

            {/* Копирайт - справа в самом низу */}
            <div className="pt-4">
              <p className="text-light-gray text-sm">
                © 2025 Architeq. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}