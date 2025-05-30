// src/components/ui/tags/EnhancedTags.tsx
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/utils';
import { 
  TagConfig,  
  generateCaseTags, 
  getTagTypeClass,
  DEFAULT_CARD_TAG_CONFIG,
  TagDisplayConfig 
} from '@/lib/utils/tag-utils';
import { CaseStudy } from '@/lib/data/case-studies';

export interface EnhancedTagsProps {
  caseStudy: CaseStudy;
  config?: TagDisplayConfig;
  onTagClick?: (tag: TagConfig) => void;
  showTypeIcons?: boolean;
  animated?: boolean;
  className?: string;
}

export function EnhancedTags({
  caseStudy,
  config = DEFAULT_CARD_TAG_CONFIG,
  onTagClick,
  showTypeIcons = false,
  animated = true,
  className
}: EnhancedTagsProps) {
  const tags = generateCaseTags(caseStudy, config);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const TagContainer = animated ? motion.div : 'div';
  const TagItem = animated ? motion.span : 'span';
  
  return (
    <TagContainer
      className={cn("flex flex-wrap gap-2", className)}
      {...(animated && {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible"
      })}
    >
      {tags.map((tag, index) => (
        <TagItem
          key={`${tag.type}-${tag.value}-${index}`}
          className={cn(
            "inline-flex items-center text-xs px-2 py-1 rounded-md border transition-all duration-200",
            "bg-black/60 backdrop-blur-sm text-white border-white/10",
            onTagClick && "cursor-pointer hover:scale-105 hover:shadow-lg",
            getTagTypeClass(tag.type)
          )}
          onClick={() => onTagClick?.(tag)}
          {...(animated && {
            variants: tagVariants,
            whileHover: onTagClick ? { scale: 1.05 } : undefined,
            whileTap: onTagClick ? { scale: 0.95 } : undefined
          })}
        >
          {showTypeIcons && (
            <span className="mr-1" role="img" aria-label={tag.type}>
            </span>
          )}
          {tag.displayName}
        </TagItem>
      ))}
    </TagContainer>
  );
}

/**
 * Простая версия тегов для обратной совместимости
 */
export interface SimpleTagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  animated?: boolean;
  className?: string;
}

export function SimpleTags({
  tags,
  onTagClick,
  animated = true,
  className
}: SimpleTagsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const TagContainer = animated ? motion.div : 'div';
  const TagItem = animated ? motion.span : 'span';
  
  return (
    <TagContainer
      className={cn("flex flex-wrap gap-2", className)}
      {...(animated && {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible"
      })}
    >
      {tags.map((tag, index) => (
        <TagItem
          key={`${tag}-${index}`}
          className={cn(
            "bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10",
            "transition-all duration-200",
            onTagClick && "cursor-pointer hover:scale-105 hover:shadow-lg"
          )}
          onClick={() => onTagClick?.(tag)}
          {...(animated && {
            variants: tagVariants,
            whileHover: onTagClick ? { scale: 1.05 } : undefined,
            whileTap: onTagClick ? { scale: 0.95 } : undefined
          })}
        >
          {tag}
        </TagItem>
      ))}
    </TagContainer>
  );
}