import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortablePlaceItem from "@/shared/ui/SortablePlaceItem";
import { IconPlus } from "@/shared/ui/svg";
import type { Place } from "@/store/meetingStore";

interface PlaceTypeFormProps {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
  isEditPage?: boolean;
}

const PlaceTypeForm = ({
  places,
  setPlaces,
  onItemClick,
  onRemove,
  onAdd,
  isEditPage = false,
}: PlaceTypeFormProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const getPlaceTypeText = (place: Place): string => {
    if (!place.type) return "장소 유형 추가";
    const typeMap: { [key: string]: string } = {
      restaurant: "음식점",
      cafe: "카페",
      activity: "액티비티",
      bar: "술집",
    };

    const subTypeMap: { [key: string]: string } = {
      western: "양식",
      chinese: "중식",
      japanese: "일식",
      korean: "한식",
      izakaya: "이자카야",
      "kor-bar": "한식주점",
      beer: "맥주",
      wine: "와인/위스키",
      note: "작업하기 좋은",
      photo: "사진찍기 좋은",
      talk: "대화하기 좋은",
      desert: "디저트가 맛있는",
    };

    const mainText = typeMap[place.type];
    const subText = place.subType ? ` - ${subTypeMap[place.subType]}` : "";
    return `${mainText}${subText}`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = places.findIndex((p) => p.id === active.id);
      const newIndex = places.findIndex((p) => p.id === over.id);
      const newPlaces = arrayMove(places, oldIndex, newIndex);
      setPlaces(newPlaces);
    }
  };

  const filledPlaces = places.filter((p) => p.type !== null);
  const emptyPlace = places.find((p) => p.type === null);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full flex flex-col gap-y-3">
        <SortableContext
          items={filledPlaces.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          {places.map((place, index) => (
            <SortablePlaceItem
              key={place.id}
              place={place}
              index={index}
              displayText={getPlaceTypeText(place)}
              onItemClick={onItemClick}
              onRemove={onRemove}
              isOnlyItem={filledPlaces.length === 1 && !emptyPlace}
              isEditPage={isEditPage}
            />
          ))}
        </SortableContext>

        {/* {emptyPlace && places.length < 5 && (
          <div className="flex w-full items-center">
            <div className="w-[32px] flex-shrink-0" />
            <button
              onClick={onAdd}
              className="flex flex-grow items-center rounded-md border border-dashed border-gray-300 bg-white bg-opacity-50 p-3 text-left"
            >
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
                <IconPlus />
              </div>
              <span className="body-02 text-gray3">장소 유형 추가</span>
            </button>
          </div>
        )} */}
      </div>
    </DndContext>
  );
};

export default PlaceTypeForm;
