import { useState, useMemo, useCallback } from 'react';
import regionData from '@/shared/asset/json/region.json';

export interface RegionItem {
  code: number;
  sido: string;
  gu: string;
  dong: string;
  lat: number;
  lng: number;
  fullAddress: string;
}

export interface UseRegionSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRegions: RegionItem[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  selectRegion: (region: RegionItem) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearSearch: () => void;
}

interface UseRegionSearchProps {
  onSelect: (region: RegionItem) => void;
  maxResults?: number;
}

export const useRegionSearch = ({ 
  onSelect, 
  maxResults = 10 
}: UseRegionSearchProps): UseRegionSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // 지역 데이터를 fullAddress 포함해서 가공
  const processedRegions = useMemo(() => {
    return regionData.map(region => ({
      ...region,
      fullAddress: `${region.sido} ${region.gu} ${region.dong}`
    }));
  }, []);

  // 검색 필터링
  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    
    return processedRegions
      .filter(region => {
        const fullAddress = region.fullAddress.toLowerCase();
        const sido = region.sido.toLowerCase();
        const gu = region.gu.toLowerCase();
        const dong = region.dong.toLowerCase();
        
        return (
          fullAddress.includes(query) ||
          sido.includes(query) ||
          gu.includes(query) ||
          dong.includes(query)
        );
      })
      .slice(0, maxResults);
  }, [searchQuery, processedRegions, maxResults]);

  // 지역 선택
  const selectRegion = useCallback((region: RegionItem) => {
    onSelect(region);
    setSearchQuery(region.fullAddress);
    setSelectedIndex(-1);
  }, [onSelect]);

  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!filteredRegions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredRegions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredRegions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredRegions[selectedIndex]) {
          selectRegion(filteredRegions[selectedIndex]);
        }
        break;
      case 'Escape':
        setSelectedIndex(-1);
        break;
    }
  }, [filteredRegions, selectedIndex, selectRegion]);

  // 검색 초기화
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedIndex(-1);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filteredRegions,
    selectedIndex,
    setSelectedIndex,
    selectRegion,
    handleKeyDown,
    clearSearch,
  };
};
