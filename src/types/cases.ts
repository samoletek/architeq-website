// Интерфейс для отзыва о кейсе
export interface CaseTestimonial {
    quote: string;
    author: string;
    position: string;
    image: string;
  }
  
  // Интерфейс для кейса
  export interface Case {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    category: string;
    tags: string[];
    image: string;
    image_hero?: string;
    problem: string;
    solution: string[];
    technologies: string[];
    results: string[];
    testimonial: CaseTestimonial;
    related_cases: string[];
  }
  
  // Интерфейс для категории
  export interface Category {
    id: string;
    name: string;
    description?: string;
  }
  
  // Интерфейс для тега
  export interface Tag {
    id: string;
    name: string;
  }
  
  // Интерфейс для опции сортировки
  export interface SortOption {
    id: string;
    name: string;
  }
  
  // Интерфейс для фильтров
  export interface CaseFilters {
    search: string;
    categories: string[];
    tags: string[];
    sort: string;
  }