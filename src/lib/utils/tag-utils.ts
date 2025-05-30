// src/lib/utils/tag-utils.ts

import { 
    INDUSTRY_CATEGORIES, 
    FUNCTION_CATEGORIES, 
    CaseStudy 
  } from '@/lib/data/case-studies';
  
  /**
   * Типы тегов для карточек (убираем дублирование - используем только необходимые)
   */
  export type TagType = 'function' | 'industry' | 'technology';
  
  export interface TagConfig {
    value: string;
    type: TagType;
    displayName: string;
    priority: number; // Приоритет отображения (меньше = выше приоритет)
  }
  
  /**
   * Конфигурация отображения тегов
   */
  export interface TagDisplayConfig {
    maxTags: number;
    priorityTypes: TagType[]; // Приоритетные типы тегов
  }
  
  /**
   * Дефолтная конфигурация для карточек
   */
  export const DEFAULT_CARD_TAG_CONFIG: TagDisplayConfig = {
    maxTags: 3,
    priorityTypes: ['function', 'technology', 'industry']
  };
  
  /**
   * Расширенная конфигурация для детальных страниц
   */
  export const DETAILED_TAG_CONFIG: TagDisplayConfig = {
    maxTags: 5,
    priorityTypes: ['function', 'industry', 'technology']
  };
  
  /**
   * Маппинг для сокращенных названий тегов
   */
  export const TAG_DISPLAY_NAMES: Record<string, string> = {
    // Functions - используем сокращения
    'CRM Integrations': 'CRM',
    'Documents & Web Forms': 'Documents',
    'System & Infrastructure Integrations': 'Systems',
    'AI-Powered Solutions': 'AI',
    'Industry-Specific Products': 'Industry',
    'Finance & Accounting': 'Finance',
    'Custom Solutions': 'Custom',
    
    // Industries - используем сокращения
    'Financial Services': 'Finance',
    'Dispatching Services': 'Dispatching',
    'Car Hauling': 'Automotive',
    'Commercial Music Production': 'Music',
    'Healthcare & Medical Supplies': 'Healthcare',
    'Cabinetry & Coatings': 'Cabinetry',
    'Furniture Manufacturing Industry': 'Manufacturing',
    'Your Industry': 'Custom',
    
    // Technologies - сокращения для популярных
    'Monday CRM': 'Monday',
    'API integrations': 'API',
    'Google Workspace API': 'Google API',
    'Google Data Studio': 'Analytics',
    'Google Docs API': 'Docs API',
    'Google Sheets': 'Sheets',
    'GoogleSheets': 'Sheets',
    'GoogleDrive': 'Drive',
    'Tailwind CSS': 'Tailwind',
    'Iron Session': 'Sessions',
    'React Select': 'React',
    'QuickBooks': 'QB',
    'Email API': 'Email',
    'OpenAI Whisper': 'Whisper',
    'Google Speech-to-Text API': 'Speech API',
    'ElevenLabs': 'Voice AI',
    'CabinetVision': 'CAD',
    'Next.js': 'Next.js',
    'TypeScript': 'TS',
    'JavaScript': 'JS',
    
    // Дополнительные сокращения
    'Make': 'Make',
    'Zapier': 'Zapier',
    'Stripe': 'Stripe',
    'DocuSign': 'DocuSign',
    'JotForm': 'JotForm',
    'Twilio': 'Twilio',
    'Slack': 'Slack',
    'Telegram': 'Telegram'
  };
  
  /**
   * Функция для получения отображаемого имени тега
   */
  export function getTagDisplayName(originalName: string): string {
    return TAG_DISPLAY_NAMES[originalName] || originalName;
  }
  
  /**
   * Генерация тегов для кейса (упрощенная версия без clickableTags)
   */
  export function generateCaseTags(
    caseStudy: CaseStudy, 
    config: TagDisplayConfig = DEFAULT_CARD_TAG_CONFIG
  ): TagConfig[] {
    const tags: TagConfig[] = [];
    
    // 1. Function tag (высший приоритет)
    if (caseStudy.functionCategory && caseStudy.functionCategory !== 'custom-solutions') {
      const functionName = FUNCTION_CATEGORIES[caseStudy.functionCategory];
      tags.push({
        value: functionName,
        type: 'function',
        displayName: getTagDisplayName(functionName),
        priority: 1
      });
    }
    
    // 2. Industry tag (второй приоритет)
    if (caseStudy.industryCategory && caseStudy.industryCategory !== 'your-industry') {
      const industryName = INDUSTRY_CATEGORIES[caseStudy.industryCategory];
      tags.push({
        value: industryName,
        type: 'industry',
        displayName: getTagDisplayName(industryName),
        priority: 2
      });
    }
    
    // 3. Technology tags (третий приоритет)
    caseStudy.technologies.slice(0, 3).forEach((tech, index) => {
      tags.push({
        value: tech,
        type: 'technology',
        displayName: getTagDisplayName(tech),
        priority: 3 + index * 0.1 // 3.0, 3.1, 3.2
      });
    });
    
    // Фильтрация по приоритетным типам
    const filteredTags = tags.filter(tag => 
      config.priorityTypes.includes(tag.type)
    );
    
    // Сортировка по приоритету и ограничение количества
    return filteredTags
      .sort((a, b) => a.priority - b.priority)
      .slice(0, config.maxTags);
  }
  
  /**
   * Преобразование тегов в формат для карточек (обратная совместимость)
   */
  export function tagsToCardFormat(tags: TagConfig[]): string[] {
    return tags.map(tag => tag.displayName);
  }
  
  /**
   * Получение CSS класса для типа тега
   */
  export function getTagTypeClass(type: TagType): string {
    const classMap: Record<TagType, string> = {
      function: 'bg-secondary/20 text-secondary border-secondary/30',
      industry: 'bg-primary/20 text-primary border-primary/30',
      technology: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    
    return classMap[type] || 'bg-medium-gray/20 text-light-gray border-medium-gray/30';
  }
  
  /**
   * Обновленная функция для формирования тегов карточки (замена для toCaseCardFormat)
   */
  export function generateCardTags(caseStudy: CaseStudy): string[] {
    const tags = generateCaseTags(caseStudy, DEFAULT_CARD_TAG_CONFIG);
    return tagsToCardFormat(tags);
  }