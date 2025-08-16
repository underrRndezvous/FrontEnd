import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRegionSearch } from '@/shared/hooks/useRegionSearch';
import type { RegionItem } from '@/shared/hooks/useRegionSearch';

interface RegionAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (region: RegionItem) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const RegionAutocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder = "지역을 입력하세요",
  className,
  disabled,
  onKeyDown,
}: RegionAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleRegionSelect = (region: RegionItem) => {
    onChange(region.fullAddress);
    onSelect?.(region);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const {
    searchQuery,
    setSearchQuery,
    filteredRegions,
    selectedIndex,
    setSelectedIndex,
    selectRegion,
    handleKeyDown: handleRegionKeyDown,
  } = useRegionSearch({
    onSelect: handleRegionSelect,
    maxResults: 8,
  });

  // value와 searchQuery 동기화
  useEffect(() => {
    if (value !== searchQuery) {
      setSearchQuery(value);
    }
  }, [value, searchQuery, setSearchQuery]);

  // selectedIndex 변경 시 스크롤 조정
  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSearchQuery(newValue);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 지역 선택 키보드 핸들링
    handleRegionKeyDown(e);
    
    // 외부에서 전달된 키보드 핸들러도 실행
    onKeyDown?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (filteredRegions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // 약간의 지연을 두어 클릭 이벤트가 처리될 수 있도록 함
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 150);
  };

  const handleItemClick = (region: RegionItem, index: number) => {
    setSelectedIndex(index);
    selectRegion(region);
  };

  // 검색어가 있을 때만 드롭다운 표시
  const shouldShowDropdown = isOpen && isFocused && filteredRegions.length > 0 && searchQuery.trim();

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          className
        )}
        autoComplete="off"
      />
      
      {shouldShowDropdown && (
        <ul
          ref={listRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {filteredRegions.map((region, index) => (
            <li
              key={region.code}
              onClick={() => handleItemClick(region, index)}
              className={clsx(
                "cursor-pointer px-4 py-3 text-sm hover:bg-gray-50",
                "border-b border-gray-100 last:border-b-0",
                selectedIndex === index && "bg-blue-50 text-blue-700"
              )}
            >
              <div className="flex flex-col">
                <span className="font-medium">{region.fullAddress}</span>
                <span className="text-xs text-gray-500">
                  {region.sido} · {region.gu} · {region.dong}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegionAutocomplete;
