"use client";

import React from 'react';
import Link from 'next/link';

// Компонент-обертка для безопасного использования Link
export const SafeLinkWrapper = ({ 
  href, 
  children,
  ...props 
}: { 
  href: string | undefined; 
  children: React.ReactNode;
  [key: string]: any;
}) => {
  if (!href) {
    console.warn('Link received undefined href, rendering button instead');
    return <button {...props}>{children}</button>;
  }
  
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default SafeLinkWrapper;