<<<<<<< HEAD
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconMinus, IconDragHandle } from "@/shared/ui/svg";
import clsx from "clsx";

interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

interface SortablePlaceItemProps {
  place: Place;
  index: number;
  displayText: string;
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void;
  isOnlyItem: boolean;
}

const SortablePlaceItem = ({
  place,
  index,
  displayText,
  onItemClick,
  onRemove,
  isOnlyItem,
}: SortablePlaceItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: place.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center gap-x-2 touch-none"
    >
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 text-gray-400 cursor-grab"
      >
        <IconDragHandle />
      </button>
      {/* ✅ 1. 테두리 스타일을 수정합니다. */}
      <div
        className={clsx(
          "flex flex-grow items-center rounded-md border-[2px] bg-white p-3 text-left",
          place.type ? "border-main" : "border-gray-200"
        )}
      >
        {/* ✅ 2. 숫자 박스의 배경색을 조건부로 변경합니다. */}
        <div
          className={clsx(
            "mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-sm",
            place.type ? "bg-main text-white" : "bg-gray1 text-black"
          )}
        >
          {index + 1}
        </div>
        <button
          onClick={() => onItemClick(place.id)}
          className="flex-grow text-left"
        >
          <span
            className={clsx(
              "body-02",
              place.type ? "text-black" : "text-gray3"
            )}
          >
            {displayText}
          </span>
        </button>
        {!isOnlyItem && (
          <button
            onClick={() => onRemove(place.id)}
            className="ml-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
          >
            <IconMinus />
          </button>
        )}
      </div>
=======
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
>>>>>>> main
    </div>
  );
};

<<<<<<< HEAD
export default SortablePlaceItem;
=======
export default PlaceTypeItem;
>>>>>>> main
