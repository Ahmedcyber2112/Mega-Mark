"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DataSmart, DataFood, DataImg } from '../Components/Constent';

interface SearchResult {
  id: string;
  title?: string;
  dish?: string;
  img: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  reviews?: number;
  category: 'smart' | 'food' | 'category';
  type: 'product' | 'category';
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  recentSearches: string[];
  isSearching: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
  addToRecentSearches: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recent-searches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results: SearchResult[] = [];
    const searchLower = query.toLowerCase();

    // Enhanced search in DataSmart (electronics, smart devices)
    DataSmart.forEach(item => {
      const titleLower = item.title?.toLowerCase() || '';
      if (
        titleLower.includes(searchLower) ||
        // Add keyword matching for better search
        (searchLower.includes('smartphone') && (titleLower.includes('galaxy') || titleLower.includes('phone'))) ||
        (searchLower.includes('phone') && titleLower.includes('galaxy')) ||
        (searchLower.includes('mobile') && titleLower.includes('galaxy')) ||
        (searchLower.includes('electronics') && titleLower.includes('galaxy'))
      ) {
        results.push({
          id: item.id,
          title: item.title,
          img: item.img,
          price: item.price,
          originalPrice: item.price2,
          discount: item.save,
          category: 'smart',
          type: 'product'
        });
      }
    });

    // Enhanced search in DataFood (food items)
    DataFood.forEach(item => {
      const dishLower = item.dish?.toLowerCase() || '';
      const titleLower = item.title?.toLowerCase() || '';
      if (
        dishLower.includes(searchLower) || 
        titleLower.includes(searchLower) ||
        // Add keyword matching for better search
        (searchLower.includes('essentials') && dishLower.includes('daily')) ||
        (searchLower.includes('fruits') && (dishLower.includes('fruits') || dishLower.includes('mango') || dishLower.includes('cherry') || dishLower.includes('strowberry'))) ||
        (searchLower.includes('vegetables') && dishLower.includes('vegitables')) ||
        (searchLower.includes('groceries') && (dishLower.includes('daily') || dishLower.includes('vegitables') || dishLower.includes('fruits'))) ||
        (searchLower.includes('fashion') && dishLower.includes('daily')) || // Temporary mapping
        (searchLower.includes('beauty') && dishLower.includes('daily')) || // Temporary mapping
        (searchLower.includes('home kitchen') && dishLower.includes('daily')) // Temporary mapping
      ) {
        results.push({
          id: item.id,
          title: item.dish || item.title,
          img: item.img,
          price: "₹299", // Default price for food items
          originalPrice: "₹499",
          discount: "40% OFF",
          category: 'food',
          type: 'product'
        });
      }
    });

    // Enhanced search in DataImg (categories)
    DataImg.forEach(item => {
      const titleLower = item.title?.toLowerCase() || '';
      if (
        titleLower.includes(searchLower) ||
        // Add keyword matching for better search
        (searchLower.includes('fashion') && (titleLower.includes('accessories') || titleLower.includes('cosmetics'))) ||
        (searchLower.includes('beauty') && titleLower.includes('cosmetics')) ||
        (searchLower.includes('home kitchen') && (titleLower.includes('furniture') || titleLower.includes('decor'))) ||
        (searchLower.includes('home improvement') && (titleLower.includes('furniture') || titleLower.includes('decor'))) ||
        (searchLower.includes('sports toys') && titleLower.includes('accessories')) ||
        (searchLower.includes('electronics') && (titleLower.includes('electronics') || titleLower.includes('mobile') || titleLower.includes('watches'))) ||
        (searchLower.includes('categories') && titleLower.length > 0) || // Show all categories when searching for "categories"
        (searchLower.includes('products') && titleLower.length > 0) // Show all categories when searching for "products"
      ) {
        results.push({
          id: item.id,
          title: item.title,
          img: item.img,
          category: 'category',
          type: 'category'
        });
      }
    });

    // If no results found, provide some default suggestions
    if (results.length === 0) {
      // Add some popular items as fallback
      const popularItems = [
        {
          id: "popular-1",
          title: "Popular Smartphones",
          img: "/phone1-removebg-preview.webp",
          price: "₹25,999",
          originalPrice: "₹35,999",
          discount: "Save ₹10,000",
          category: 'smart' as const,
          type: 'product' as const
        },
        {
          id: "popular-2",
          title: "Daily Essentials Pack",
          img: "/ss1-removebg-preview.webp",
          price: "₹299",
          originalPrice: "₹499",
          discount: "40% OFF",
          category: 'food' as const,
          type: 'product' as const
        }
      ];
      
      results.push(...popularItems);
    }

    setSearchResults(results);
    setIsSearching(false);
    setSearchQuery(query);
  }, []); // Empty dependency array since we're not using any external variables that change

  const addToRecentSearches = (query: string) => {
    if (!query.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, 5); // Keep only last 5 searches
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    recentSearches,
    isSearching,
    performSearch,
    clearSearch,
    addToRecentSearches
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};