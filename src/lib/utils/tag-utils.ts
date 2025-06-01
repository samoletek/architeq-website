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
   * ИСПРАВЛЕННЫЙ маппинг для сокращенных названий тегов
   */
  export const TAG_DISPLAY_NAMES: Record<string, string> = {
    // Functions - используем сокращения
    'CRM Integrations': 'CRM',
    'Documents & Web Forms': 'Web Forms', // ИСПРАВЛЕНО: Documents → Web Forms
    'System & Infrastructure Integrations': 'Custom',
    'AI-Powered Solutions': 'AI',
    'Industry-Specific Products': 'Custom',
    'Finance & Accounting': 'Finance', // ВОЗВРАЩАЕМ Finance
    'Custom Solutions': 'Custom',
    
    // Industries - используем сокращения, УБИРАЕМ Automotive
    'Financial Services': 'Finance',
    'Dispatching Services': 'Dispatching',
    'Car Hauling': 'Car Hauling', // ИСПРАВЛЕНО: убрали Automotive
    'Commercial Music Production': 'Music',
    'Healthcare & Medical Supplies': 'Healthcare',
    'Cabinetry & Coatings': 'Cabinetry',
    'Furniture Manufacturing Industry': 'Manufacturing',
    'Your Industry': 'Custom',
    
    // Technologies - ИСПРАВЛЕННЫЕ сокращения
    'Monday CRM': 'CRM',
    'Monday': 'CRM',
    'API integrations': 'API',
    'Google Workspace API': 'Google API',
    'Google Data Studio': 'Dashboards',
    'Google Docs API': 'Docs API',
    'Tailwind CSS': 'Tailwind',
    'Iron Session': 'Sessions',
    'React Select': 'React',
    'QuickBooks': 'QB',
    'Email API': 'Email',
    'OpenAI': 'AI',
    'Google Speech-to-Text API': 'Speech API',
    'ElevenLabs': 'Voice AI',
    'CabinetVision': 'CAD',
    'TypeScript': 'TS',
    'JavaScript': 'JS',
    'JotForm': 'Web Forms', // ИСПРАВЛЕНО: Web Form → Web Forms
    'DocuSign': 'E-Sign',
    'Twilio': 'VoIP',
    
    // УБИРАЕМ эти теги (не отображаем)
    'Make': '',
    'Drive': '',
    'Sheets': '',
    'GoogleSheets': '',
    'GoogleDrive': '',
    'Analytics': '',
    'Industry': '',
    'Whisper': '',
    'OpenAI Whisper': '',
    'Systems': '',
    'Next.js': '', // УБИРАЕМ Next.js
    
    // Дополнительные теги остаются
    'Zapier': 'Zapier',
    'Stripe': 'Stripe',
    'Slack': 'Slack',
    'Telegram': 'Telegram'
  };
  
  /**
   * ИСПРАВЛЕННЫЕ СПЕЦИАЛЬНЫЕ ТЕГИ ПО КЕЙСАМ
   */
  export const SPECIAL_CASE_TAGS: Record<string, string[]> = {
    // Finance теги (УБРАЛИ Accounting)
    'stripe-invoicing': ['Finance', 'Invoice'],
    'quickbooks-integration': ['Finance'],
    'financial-calculations': ['Finance'],
    
    // Transport Quote
    'broker-calculator': ['Transport Quote'],
    
    // Factoring
    'factoring-automation': ['Factoring'],
    
    // VoIP
    'telephony-integration': ['VoIP'],
    
    // E-Sign
    'electronic-signatures': ['E-Sign'],
    
    // Web Forms (ИСПРАВЛЕНО)
    'web-forms-integration': ['Web Forms'],
    
    // Dashboards
    'dashboards-creation': ['Dashboards']
  };
  
  /**
   * Функция для получения отображаемого имени тега
   */
  export function getTagDisplayName(originalName: string): string {
    const displayName = TAG_DISPLAY_NAMES[originalName];
    
    // Если displayName пустая строка, скрываем тег
    if (displayName === '') {
      return '';
    }
    
    return displayName || originalName;
  }
  
  /**
   * Проверка, должен ли тег быть скрыт
   */
  export function shouldHideTag(originalName: string): boolean {
    return TAG_DISPLAY_NAMES[originalName] === '';
  }
  
  /**
   * УЛУЧШЕННАЯ генерация тегов для кейса с предотвращением дублирования
   */
  export function generateCaseTags(
    caseStudy: CaseStudy, 
    config: TagDisplayConfig = DEFAULT_CARD_TAG_CONFIG
  ): TagConfig[] {
    const tags: TagConfig[] = [];
    const usedDisplayNames = new Set<string>(); // Для предотвращения дублирования
    
    // 1. Function tag (высший приоритет)
    if (caseStudy.functionCategory && caseStudy.functionCategory !== 'custom-solutions') {
      const functionName = FUNCTION_CATEGORIES[caseStudy.functionCategory];
      const displayName = getTagDisplayName(functionName);
      if (displayName && !usedDisplayNames.has(displayName)) {
        tags.push({
          value: functionName,
          type: 'function',
          displayName,
          priority: 1
        });
        usedDisplayNames.add(displayName);
      }
    }
    
    // 2. Специальные теги для конкретных кейсов (второй приоритет)
    if (SPECIAL_CASE_TAGS[caseStudy.id]) {
      SPECIAL_CASE_TAGS[caseStudy.id].forEach((specialTag, index) => {
        if (!usedDisplayNames.has(specialTag)) {
          tags.push({
            value: specialTag,
            type: 'technology',
            displayName: specialTag,
            priority: 1.5 + index * 0.1
          });
          usedDisplayNames.add(specialTag);
        }
      });
    }
    
    // 3. Industry tag (третий приоритет)
    if (caseStudy.industryCategory && caseStudy.industryCategory !== 'your-industry') {
      const industryName = INDUSTRY_CATEGORIES[caseStudy.industryCategory];
      const displayName = getTagDisplayName(industryName);
      if (displayName && !usedDisplayNames.has(displayName)) {
        tags.push({
          value: industryName,
          type: 'industry',
          displayName,
          priority: 2
        });
        usedDisplayNames.add(displayName);
      }
    }
    
    // 4. Technology tags (четвертый приоритет) - фильтруем скрытые и дубли
    const filteredTechnologies = caseStudy.technologies
      .map(tech => ({ original: tech, display: getTagDisplayName(tech) }))
      .filter(({ display }) => display && !shouldHideTag(display) && !usedDisplayNames.has(display))
      .slice(0, 3);
    
    filteredTechnologies.forEach(({ original, display }, index) => {
      // Проверяем конфликты тегов
      const hasDocuSign = caseStudy.technologies.includes('DocuSign');
      const hasMonday = caseStudy.technologies.some(t => t.includes('Monday'));
      
      // Скипаем Web Forms если есть DocuSign
      if (display === 'Web Forms' && hasDocuSign) {
        return;
      }
      
      // Скипаем CRM если есть Monday (кроме самого Monday)
      if (display === 'CRM' && hasMonday && original !== 'Monday CRM' && !original.includes('Monday')) {
        return;
      }
      
      if (!usedDisplayNames.has(display)) {
        tags.push({
          value: original,
          type: 'technology',
          displayName: display,
          priority: 3 + index * 0.1
        });
        usedDisplayNames.add(display);
      }
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
    return tags.map(tag => tag.displayName).filter(name => name);
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