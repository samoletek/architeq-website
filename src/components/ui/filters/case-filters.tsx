import { useState } from 'react';

interface CaseFiltersProps {
  allTags: string[];
  allIndustries: string[];
  selectedTags: string[];
  selectedIndustries: string[];
  searchQuery: string;
  onTagChange: (tag: string) => void;
  onIndustryChange: (industry: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export function CaseFilters({
  allTags,
  allIndustries,
  selectedTags,
  selectedIndustries,
  searchQuery,
  onTagChange,
  onIndustryChange,
  onSearchChange,
  onClearFilters
}: CaseFiltersProps) {
  const [isTagsOpen, setIsTagsOpen] = useState(true);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(true);

  return (
    <div className="bg-dark-gray rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      
      {/* Search input */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-light-gray mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-medium-gray border border-medium-gray rounded-lg py-2 pl-3 pr-10 text-white placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="Search cases..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tags filter */}
      <div className="mb-6 border-b border-medium-gray pb-6">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => setIsTagsOpen(!isTagsOpen)}
        >
          <h3 className="text-lg font-medium">Categories</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isTagsOpen ? 'transform rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isTagsOpen && (
          <div className="mt-4 space-y-2">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onTagChange(tag)}
                  className="form-checkbox h-4 w-4 text-primary rounded border-medium-gray bg-medium-gray focus:ring-primary"
                />
                <span className="ml-2 text-light-gray">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Industries filter */}
      <div className="mb-6 border-b border-medium-gray pb-6">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
        >
          <h3 className="text-lg font-medium">Industries</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isIndustriesOpen ? 'transform rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isIndustriesOpen && (
          <div className="mt-4 space-y-2">
            {allIndustries.map((industry) => (
              <label key={industry} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(industry)}
                  onChange={() => onIndustryChange(industry)}
                  className="form-checkbox h-4 w-4 text-primary rounded border-medium-gray bg-medium-gray focus:ring-primary"
                />
                <span className="ml-2 text-light-gray">{industry}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Clear filters button */}
      <button
        onClick={onClearFilters}
        className="w-full bg-medium-gray hover:bg-primary text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Clear All Filters
      </button>
    </div>
  );
}