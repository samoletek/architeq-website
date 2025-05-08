import React, { useState, useEffect } from 'react';
import { CaseFiltersComponent } from '@/components/ui/filters/case-filters';
import { CaseCard } from '@/components/ui/cards/case-card';
import ScrollReveal from '@/components/ui/animations/scroll-reveal';
import { GradientText } from '@/components/ui/gradient-text';
import { Case, CaseFilters, Category, Tag, SortOption } from '@/types/cases';

interface CasesListProps {
  cases: Case[];
  categories: Category[];
  tags: Tag[];
  sortOptions: SortOption[];
}

export const CasesList: React.FC<CasesListProps> = ({
  cases,
  categories,
  tags,
  sortOptions,
}) => {
  const [filters, setFilters] = useState<CaseFilters>({
    search: '',
    categories: [],
    tags: [],
    sort: sortOptions[0]?.id || 'newest',
  });
  
  const [filteredCases, setFilteredCases] = useState<Case[]>(cases);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Фильтрация кейсов при изменении фильтров
  useEffect(() => {
    let result = [...cases];
    
    // Фильтр по поиску
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(search) ||
          caseItem.description.toLowerCase().includes(search) ||
          caseItem.company.toLowerCase().includes(search) ||
          caseItem.location.toLowerCase().includes(search)
      );
    }
    
    // Фильтр по категориям
    if (filters.categories.length > 0) {
      result = result.filter((caseItem) =>
        filters.categories.includes(caseItem.category)
      );
    }
    
    // Фильтр по тегам
    if (filters.tags.length > 0) {
      result = result.filter((caseItem) =>
        caseItem.tags.some((tag) => 
          filters.tags.includes(tag.toLowerCase())
        )
      );
    }
    
    // Сортировка
    switch (filters.sort) {
      case 'newest':
        // Предполагается, что первые в массиве - самые новые
        break;
      case 'oldest':
        result = [...result].reverse();
        break;
      case 'alphabetical':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    setFilteredCases(result);
    setVisibleCount(6); // Сбрасываем количество отображаемых кейсов при изменении фильтров
  }, [filters, cases]);
  
  // Обработчик клика по тегу в карточке кейса
  const handleTagClick = (tagName: string) => {
    const tagId = tags.find((t) => t.name === tagName)?.id;
    if (tagId && !filters.tags.includes(tagId)) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, tagId],
      }));
    }
  };
  
  // Функция для загрузки большего количества кейсов
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredCases.length));
  };
  
  // Данные для отображения
  const casesToShow = filteredCases.slice(0, visibleCount);
  const hasMoreToLoad = visibleCount < filteredCases.length;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText variant="primary" animated>
              Case Studies
            </GradientText>
          </h1>
          <p className="text-xl text-light-muted max-w-3xl mx-auto">
            See how smart automation reshapes operations and unlocks measurable results.
          </p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-up" delay={100}>
        <CaseFiltersComponent
          categories={categories}
          tags={tags}
          sortOptions={sortOptions}
          onFilterChange={setFilters}
          className="mb-8"
        />
      </ScrollReveal>
      
      <div className="mb-6 text-light-muted">
        Showing {casesToShow.length} of {filteredCases.length} case studies
      </div>
      
      {filteredCases.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No case studies found</h3>
          <p className="text-light-muted">
            Try adjusting your filters or search for something else.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {casesToShow.map((caseItem, index) => (
              <ScrollReveal
                key={caseItem.id}
                animation="fade-up"
                delay={100 + index * 50}
              >
                <CaseCard
                  caseItem={caseItem}
                  onTagClick={handleTagClick}
                />
              </ScrollReveal>
            ))}
          </div>
          
          {hasMoreToLoad && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                Load More Case Studies
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CasesList;