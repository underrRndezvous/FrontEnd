import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { IconMinus, IconDragHandle } from "@/shared/ui/svg";
import clsx from "clsx";
import type { PlaceRequest } from "@/store/meetingStore";

interface SortablePlaceItemProps {
  place: PlaceRequest;
  index: number;
  displayText: string;
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void;
  isOnlyItem: boolean;
  isEditPage?: boolean;
}

const SortablePlaceItem = ({
  place,
  index,
  displayText,
  onItemClick,
  onRemove,
  isOnlyItem,
  isEditPage = false,
}: SortablePlaceItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: place.id,
      disabled: isEditPage, // 편집 페이지에서는 드래그 비활성화
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onItemClick(place.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center gap-x-2 touch-none"
    >
      {/* 편집 페이지가 아닐 때만 드래그 핸들 표시 */}
      {!isEditPage && (
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 text-gray-400 cursor-grab"
        >
          <IconDragHandle />
        </button>
      )}

      <div
        className={clsx(
          "flex flex-grow items-center rounded-md border-[1px] bg-white p-3 text-left",
          place.placeType ? "border-main" : "border-gray2",
          // 편집 페이지에서는 좌측 여백 조정
          isEditPage && "ml-0"
        )}
      >
        <div
          className={clsx(
            "mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-sm",
            place.placeType ? "bg-main text-black" : "bg-gray2 text-white"
          )}
        >
          {index + 1}
        </div>

        <button
          onClick={handleItemClick}
          className="flex-grow text-left cursor-pointer"
        >
          <span
            className={clsx(
              "body-02",
              place.placeType ? "text-black" : "text-gray3"
            )}
          >
            {displayText}
          </span>
        </button>

        {/* 삭제 버튼: 장소가 선택되어 있고, 유일한 아이템이 아닐 때만 표시 */}
        {place.placeType && !isOnlyItem && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(place.id);
            }}
            className="ml-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
          >
            <IconMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default SortablePlaceItem;
