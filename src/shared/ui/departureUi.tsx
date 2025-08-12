import React from "react";
import clsx from "clsx";

import IconCrown from "@/shared/asset/icon/crown.svg?react";
import IconPerson from "@/shared/asset/icon/person.svg?react";
import RegionAutocomplete from "@/shared/ui/RegionAutocomplete";
import type { RegionItem } from "@/shared/hooks/useRegionSearch";

const IconMinus = () => (
  <svg
    className="h-5 w-5 stroke-current text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

interface DepartureInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant: "leader" | "member";
  onRemove?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegionSelect?: (region: RegionItem) => void;
}

const DepartureInput = ({
  variant,
  value,
  onRemove,
  onKeyDown,
  onChange,
  onRegionSelect,
  ...props
}: DepartureInputProps) => {
  const Icon = variant === "leader" ? IconCrown : IconPerson;
  const hasValue = value && String(value).length > 0;

  const handleChange = (newValue: string) => {
    // RegionAutocomplete의 onChange는 string을 받으므로 이를 이벤트 객체로 변환
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue },
        currentTarget: { value: newValue },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="relative w-11/12 mx-auto">
      <div
        className={clsx(
          "group flex items-stretch rounded-lg border-[1.5px] bg-white transition-colors",
          hasValue ? "border-main" : "border-gray-200 focus-within:border-main"
        )}
      >
        <div
          className={clsx(
            "mr-3 flex flex-shrink-0 items-center justify-center rounded-l-md px-3",
            hasValue ? "bg-main" : "bg-gray1 group-focus-within:bg-main"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-grow relative">
          <RegionAutocomplete
            value={String(value || '')}
            onChange={handleChange}
            onSelect={onRegionSelect}
            onKeyDown={onKeyDown}
            className={clsx(
              "w-full bg-transparent body-02 py-3 pr-3 border-none outline-none placeholder:text-gray3",
              hasValue ? "text-black" : "text-gray3"
            )}
            {...props}
          />
        </div>
        {variant === "member" && hasValue && onRemove && (
          <button
            onClick={onRemove}
            className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 self-center z-10"
          >
            <IconMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default DepartureInput;
