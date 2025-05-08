"use client";

import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Простая версия без анимаций и эффектов
  return <>{children}</>;
};

export default PageTransition;