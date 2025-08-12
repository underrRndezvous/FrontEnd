import { useState, useMemo, useEffect } from 'react';

export interface Region {
  code: number;
  sido: string;
  gu: string;
  dong: string;
  lat: number;
  lng: number;
}

export interface RegionSearchResult extends Region {
  displayText: string;
}

export const useRegionSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionData, setRegionData] = useState<Region[]>([]);

  useEffect(() => {
    // JSON 파일을 동적으로 로드
    const loadRegionData = async () => {
      try {
        const response = await fetch('/src/shared/asset/json/region.json');
        const data = await response.json();
        setRegionData(data);
      } catch (error) {
        console.error('지역 데이터 로드 실패:', error);
      }
    };

    loadRegionData();
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < 1 || regionData.length === 0) {
      return [];
    }

    const results = regionData
      .filter((region: Region) => {
        const searchText = searchTerm.toLowerCase().trim();
        const fullAddress = `${region.sido} ${region.gu} ${region.dong}`.toLowerCase();
        const sidoMatch = region.sido.toLowerCase().includes(searchText);
        const guMatch = region.gu.toLowerCase().includes(searchText);
        const dongMatch = region.dong.toLowerCase().includes(searchText);
        const fullMatch = fullAddress.includes(searchText);
        
        return sidoMatch || guMatch || dongMatch || fullMatch;
      })
      .slice(0, 10) // 최대 10개 결과만 표시
      .map((region: Region) => ({
        ...region,
        displayText: `${region.sido} ${region.gu} ${region.dong}`
      }));

    return results;
  }, [searchTerm, regionData]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    clearSearch: () => setSearchTerm('')
  };
};
