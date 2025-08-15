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
  onChange,
  ...props
}: DepartureInputProps) => {
  const Icon = variant === "leader" ? IconCrown : IconPerson;
  const hasValue = value && String(value).length > 0;

  // IME 상태 추적
  const [isComposing, setIsComposing] = React.useState(false);

  // 키 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 부모에서 전달된 onKeyDown이 있으면 실행
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // IME 조합 시작
  const handleCompositionStart = () => {
    console.log("🔍 Composition started");
    setIsComposing(true);
  };

  // IME 조합 끝
  const handleCompositionEnd = () => {
    console.log("🔍 Composition ended");
    setIsComposing(false);
  };

  // onChange 이벤트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🔍 Input changed:", e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      className={clsx(
        "group flex w-11/12 mx-auto items-stretch rounded-lg border-[1.5px] bg-white transition-colors",
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
      <input
        className={clsx(
          "w-full flex-grow bg-transparent body-02 py-3 pr-3 outline-none placeholder:text-gray3 whitespace-pre-wrap",
          hasValue ? "text-black" : "text-gray3"
        )}
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        {...props}
      />
      {variant === "member" && hasValue && onRemove && (
        <button
          onClick={onRemove}
          className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 self-center"
        >
          <IconMinus />
        </button>
      )}
    </div>
  );
};

export default DepartureInput;
