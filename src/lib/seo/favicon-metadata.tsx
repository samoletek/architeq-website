// src/lib/seo/favicon-metadata.tsx
import React from 'react';
import { Metadata } from 'next';

interface FaviconConfig {
  backgroundColor?: string;
  titleBar?: string;
}

/**
 * Компонент для вставки всех необходимых ссылок на фавиконки в head
 * Используется в cтарой версии с кастомным _document.tsx
 */
export function FaviconMetadata({
  backgroundColor = '#121212',
  titleBar = '#ff4500'
}: FaviconConfig = {}) {
  return (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color={titleBar} />
      <meta name="msapplication-TileColor" content={backgroundColor} />
    </>
  );
}

/**
 * Функция для генерации метаданных фавиконок для использования в app router
 * Возвращает объект, совместимый с Next.js Metadata
 * Примечание: themeColor перенесен в viewport в layout.tsx
 */
export function generateFaviconMetadata({
  backgroundColor = '#121212',
}: Omit<FaviconConfig, 'titleBar'> = {}): Partial<Metadata> {
  return {
    icons: {
      icon: [
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
      ],
      apple: [
        { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      other: [
        { 
          rel: 'mask-icon', 
          url: '/favicon/safari-pinned-tab.svg',
          // @ts-ignore - Ignore because the color attribute is not in the TypeScript definitions
          color: '#ff4500'
        }
      ]
    },
    manifest: '/favicon/site.webmanifest',
    appleWebApp: {
      title: '§78',
      statusBarStyle: 'black-translucent',
    },
    other: {
      'msapplication-TileColor': backgroundColor,
    }
  };
}

/**
 * Функция для определения правильных paths для фавиконок
 * Используется при генерации manifest.json
 */
export function getFaviconPaths(basePath: string = '') {
  return {
    favicon16: `${basePath}/favicon/favicon-16x16.png`,
    favicon32: `${basePath}/favicon/favicon-32x32.png`,
    appleTouchIcon: `${basePath}/favicon/apple-touch-icon.png`,
    androidChrome192: `${basePath}/favicon/android-chrome-192x192.png`,
    androidChrome512: `${basePath}/favicon/android-chrome-512x512.png`,
    safariPinnedTab: `${basePath}/favicon/safari-pinned-tab.svg`,
    manifest: `${basePath}/favicon/site.webmanifest`
  };
}