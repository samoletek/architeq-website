"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-dark-gradient z-0"></div>
      
      {/* Декоративные элементы */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-[100px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue rounded-full opacity-5 blur-[100px]"
        animate={{ 
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Контент */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Business Operations?
          </motion.h2>
          
          <motion.p 
            className="text-light-gray text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Book a free consultation to discover how we can help automate and streamline your business processes. Our experts will analyze your current workflow and suggest personalized solutions.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/contacts">
              <Button variant="primary" size="lg">
                Book a Free Consultation
              </Button>
            </Link>
            <Link href="/cases">
              <Button variant="secondary" size="lg">
                Explore Case Studies
              </Button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-sm text-light-gray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            No obligations. We&apos;ll show you how automation can work for your specific business.
          </motion.p>
        </div>
      </div>
    </section>
  );
}