"use client";

import React from 'react';
import Link from 'next/link';

interface SafeLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any; // Для всех других props
}

export const SafeLink: React.FC<SafeLinkProps> = ({ 
  href, 
  children, 
  className = '',
  onClick,
  ...props 
}) => {
  // Если href не определен, возвращаем обычный span вместо Link
  if (!href) {
    console.warn('SafeLink: href is undefined, rendering span instead');
    return <span className={className} {...props}>{children}</span>;
  }
  
  return (
    <Link 
      href={href} 
      className={className} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SafeLink;