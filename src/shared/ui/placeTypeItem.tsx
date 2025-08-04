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
    </div>
  );
};

export default SortablePlaceItem;
