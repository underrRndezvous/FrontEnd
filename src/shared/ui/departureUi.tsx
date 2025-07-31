import React from "react";
import clsx from "clsx";

import IconCrown from "@/shared/asset/icon/crown.svg?react";
import IconPerson from "@/shared/asset/icon/person.svg?react";

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
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "leader" | "member";
  onRemove?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DepartureInput = ({
  variant,
  value,
  onRemove,
  onKeyDown,
  ...props
}: DepartureInputProps) => {
  const Icon = variant === "leader" ? IconCrown : IconPerson;
  const hasValue = value && String(value).length > 0;

  return (
    <div
      className={clsx(
        "group flex w-11/12 mx-auto items-stretch rounded-lg border-[0.8px] bg-white transition-colors",
        // 값이 있으면 mian컬러, 없으면 포커스 시에만 main컬러로 설정
        hasValue ? "border-main" : "border-gray2 focus-within:border-main"
      )}
    >
      <div
        className={clsx(
          "mr-3 flex flex-shrink-0 items-center justify-center rounded-l-md px-2",
          // 아이콘 영역도 마찬가지로 값이 있으면 main, 없으면 포커스 시 main
          hasValue ? "bg-main/60" : "bg-gray1 group-focus-within:bg-main/60"
        )}
      >
        <Icon className="h-8 w-7" />
      </div>

      <input
        className={clsx(
          "w-full flex-grow bg-transparent body-02 py-2 pr-3 outline-none placeholder:text-gray3",
          hasValue ? "text-black" : "text-gray3"
        )}
        value={value}
        onKeyDown={onKeyDown}
        {...props}
      />
      {variant === "member" && hasValue && onRemove && (
        <button
          onClick={onRemove}
          className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray2 self-center"
        >
          <IconMinus />
        </button>
      )}
    </div>
  );
};

export default DepartureInput;
