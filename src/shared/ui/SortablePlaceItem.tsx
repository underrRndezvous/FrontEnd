import { useSortable } from "@dnd-kit/sortable";
import React from "react";
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
  isEditPage?: boolean;
}

const SortablePlaceItem = ({
  place,
  index,
  displayText,
  onItemClick,
  onRemove,
  isOnlyItem,
  isEditPage,
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
      <div
        className={clsx(
          "flex flex-grow items-center rounded-md border-[1px] bg-white p-3 text-left",
          isEditPage || !place.type ? "border-gray2" : "border-main"
        )}
      >
        <div
          className={clsx(
            "mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-sm",
            isEditPage
              ? "bg-gray2 text-white"
              : place.type
              ? "bg-main text-black"
              : "bg-gray2 text-white"
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
              isEditPage
                ? "text-gray3"
                : place.type
                ? "text-black"
                : "text-gray3"
            )}
          >
            {displayText}
          </span>
        </button>

        {place.type && !isOnlyItem && (
          <button
            onClick={() => onRemove(place.id)}
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
