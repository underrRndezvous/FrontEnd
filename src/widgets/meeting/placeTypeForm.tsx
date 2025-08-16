// import React from "react";
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
// import { IconPlus } from "@/shared/ui/svg";
import type {
  PlaceRequest,
  PlaceType,
  AtmosphereType,
} from "@/store/meetingStore";

interface PlaceTypeFormProps {
  places: PlaceRequest[];
  setPlaces: (places: PlaceRequest[]) => void;
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
  isEditPage?: boolean;
  displaySubTypes?: { [key: number]: string };
}

const PlaceTypeForm = ({
  places,
  setPlaces,
  onItemClick,
  onRemove,
  // onAdd,
  isEditPage = false,
  displaySubTypes = {},
}: PlaceTypeFormProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const getPlaceTypeText = (place: PlaceRequest): string => {
    if (!place.placeType) return "장소 유형 추가";

    const typeMap: { [key in PlaceType]: string } = {
      RESTAURANT: "음식점",
      CAFE: "카페",
      ACTIVITY: "액티비티",
      BAR: "술집",
    };

    const atmosphereMap: { [key in AtmosphereType]: string } = {
      PRODUCTIVE: "작업하기 좋은",
      AESTHETIC: "사진찍기 좋은",
      SOCIABLE: "대화하기 좋은",
      INDULGENT: "디저트가 맛있는",
    };

    const displaySubTypeMap: { [key: string]: string } = {
      western: "양식",
      chinese: "중식",
      japanese: "일식",
      korean: "한식",
      izakaya: "이자카야",
      "kor-bar": "한식주점",
      beer: "맥주",
      wine: "와인/위스키",
    };

    const mainText = typeMap[place.placeType];
    let subText = "";

    if (place.placeType === "CAFE" && place.atmosphere) {
      subText = ` - ${atmosphereMap[place.atmosphere]}`;
    } else {
      const displaySubTypeKey = displaySubTypes[place.id];
      if (displaySubTypeKey && displaySubTypeMap[displaySubTypeKey]) {
        subText = ` - ${displaySubTypeMap[displaySubTypeKey]}`;
      }
    }

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

  const filledPlaces = places.filter((p) => p.placeType !== null);
  const emptyPlace = places.find((p) => p.placeType === null);

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
      </div>
    </DndContext>
  );
};

export default PlaceTypeForm;
