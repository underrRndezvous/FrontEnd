import React from "react";
import clsx from "clsx";

// SVG 아이콘들을 직접 정의합니다.
const IconMinus = () => (
  <svg
    className="h-4 w-4 stroke-current text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);
const IconDragHandle = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-gray-400"
  >
    <path
      d="M9 8L12 5L15 8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 16L12 19L9 16"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
interface PlaceTypeItemProps {
  index: number;
  placeType: string | null;
  onItemClick: () => void;
  onRemove: () => void;
}

const PlaceTypeItem = ({
  index,
  placeType,
  onItemClick,
  onRemove,
}: PlaceTypeItemProps) => {
  const displayText = placeType ? placeType : "장소 유형 추가"; // TODO: 실제 텍스트 매핑 필요

  return (
    <div className="flex w-full items-center gap-x-2">
      <button className="flex-shrink-0">
        <IconDragHandle />
      </button>

      <button
        onClick={onItemClick}
        className="flex flex-grow items-center rounded-lg border-2 bg-white p-3 text-left"
      >
        <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
          {index + 1}
        </div>
        <span
          className={clsx("body-02", placeType ? "text-black" : "text-gray3")}
        >
          {displayText}
        </span>
      </button>

      <button onClick={onRemove} className="flex-shrink-0">
        <IconMinus />
      </button>
    </div>
  );
};

export default PlaceTypeItem;
