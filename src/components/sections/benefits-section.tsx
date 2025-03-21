"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BenefitCard from '@/components/ui/benefit-card';

// Данные о преимуществах
const benefits = [
  {
    title: 'Time Efficiency',
    description: 'Automate routine tasks and save up to 80% of time spent on manual operations.',
    icon: 'clock',
  },
  {
    title: 'Cost Reduction',
    description: 'Reduce operational costs by eliminating human errors and optimizing processes.',
    icon: 'chart',
  },
  {
    title: 'Scalability',
    description: 'Scale your business without proportionally increasing administrative staff.',
    icon: 'growth',
  },
  {
    title: 'Integration',
    description: 'Connect all your business tools into a single unified ecosystem.',
    icon: 'connection',
  },
];

export default function BenefitsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Solutions</h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            Our approach to business process automation delivers measurable results and tangible benefits.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BenefitCard 
                title={benefit.title} 
                description={benefit.description} 
                icon={benefit.icon} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}