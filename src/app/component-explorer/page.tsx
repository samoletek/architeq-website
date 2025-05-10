// src/app/component-explorer/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ComponentInfo {
  type: string;
  isExported: boolean;
  size: number;
  dependencies: string[];
  props: string[];
}

type ComponentStructure = {
  [key: string]: ComponentInfo | ComponentStructure;
};

export default function ComponentExplorer() {
  const [structure, setStructure] = useState<ComponentStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadComponentStructure() {
      try {
        const response = await fetch('/api/component-structure');
        if (!response.ok) {
          throw new Error('Failed to load component structure');
        }
        
        const data = await response.json();
        setStructure(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadComponentStructure();
  }, []);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderComponentStructure = (data: ComponentStructure, parentPath = '') => {
    return (
      <ul className="pl-4 border-l border-gray-300">
        {Object.entries(data).map(([key, value]) => {
          const isComponent = 'type' in value;
          const currentPath = parentPath ? `${parentPath}/${key}` : key;
          const isExpanded = expandedItems.has(currentPath);
          
          return (
            <li key={key} className="py-2">
              <div className="flex items-center">
                {!isComponent && (
                  <button 
                    onClick={() => toggleExpand(currentPath)}
                    className="mr-2 w-5 h-5 flex items-center justify-center text-gray-500"
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                )}
                
                <span 
                  className={`font-medium ${isComponent ? 'text-blue-500' : 'text-purple-500'}`}
                >
                  {key}
                </span>
                
                {isComponent && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                    {value.type}
                  </span>
                )}
              </div>
              
              {isComponent && isExpanded && (
                <div className="mt-2 pl-7">
                  <div className="text-sm text-gray-600">
                    <div><span className="font-semibold">Size:</span> {(value.size / 1024).toFixed(2)} KB</div>
                    
                    {value.dependencies.length > 0 && (
                      <div className="mt-1">
                        <span className="font-semibold">Dependencies:</span>
                        <ul className="pl-4 mt-1 list-disc">
                          {value.dependencies.map((dep, i) => (
                            <li key={i} className="text-xs">{dep}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {value.props.length > 0 && (
                      <div className="mt-1">
                        <span className="font-semibold">Props:</span>
                        <ul className="pl-4 mt-1 list-disc">
                          {value.props.map((prop, i) => (
                            <li key={i} className="text-xs">{prop}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {!isComponent && isExpanded && renderComponentStructure(value as ComponentStructure, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Component Explorer</h1>
        <p className="text-gray-600 mt-2">Explore your project&apos;s component structure</p>
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="bg-white shadow-md rounded-lg p-6">
        {loading && <div className="text-gray-500">Loading component structure...</div>}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {structure && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Components Structure</h2>
              <button
                onClick={() => setExpandedItems(new Set(
                  Array.from(expandedItems).length ? [] : Object.keys(structure)
                ))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700"
              >
                {Array.from(expandedItems).length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
            
            {renderComponentStructure(structure)}
          </div>
        )}
      </main>
    </div>
  );
}