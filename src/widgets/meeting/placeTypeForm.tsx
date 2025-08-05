import React from "react";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
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
import SortablePlaceItem from "@/shared/ui/placeTypeItem";
<<<<<<< HEAD
=======
=======
import clsx from "clsx";
import { IconMinus, IconDragHandle, IconPlus } from "@/shared/ui/svg";
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359

interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

interface PlaceTypeFormProps {
  places: Place[];
<<<<<<< HEAD
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
=======
<<<<<<< HEAD
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
=======
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

const PlaceTypeForm = ({
  places,
<<<<<<< HEAD
  setPlaces,
=======
<<<<<<< HEAD
  setPlaces,
=======
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
  onItemClick,
  onRemove,
  onAdd,
}: PlaceTypeFormProps) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

<<<<<<< HEAD
  const getPlaceTypeText = (place: Place): string => {
    if (!place.type) return "장소 유형 추가";
=======
  const getPlaceTypeText = (place: Place): string => {
    if (!place.type) return "장소 유형 추가";
=======
  const getPlaceTypeText = (place: Place): string => {
    if (!place.type) return "장소 유형 추가";

>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
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
    };
<<<<<<< HEAD
    const mainText = typeMap[place.type];
=======
<<<<<<< HEAD
    const mainText = typeMap[place.type];
=======

    const mainText = typeMap[place.type] || "장소 유형";
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
    const subText = place.subType ? ` - ${subTypeMap[place.subType]}` : "";
    return `${mainText}${subText}`;
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = places.findIndex((p) => p.id === active.id);
      const newIndex = places.findIndex((p) => p.id === over.id);
      setPlaces((currentPlaces) =>
        arrayMove(currentPlaces, oldIndex, newIndex)
      );
    }
  };
<<<<<<< HEAD
=======

  // 값이 있는 항목과 없는 항목(마지막 추가 버튼)을 분리합니다.
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
          {filledPlaces.map((place, index) => (
            <SortablePlaceItem
              key={place.id}
              place={place}
              index={index}
              displayText={getPlaceTypeText(place)}
              onItemClick={onItemClick}
              onRemove={onRemove}
              isOnlyItem={filledPlaces.length === 1 && !emptyPlace}
            />
          ))}
        </SortableContext>

        {/* 값이 없는 마지막 항목은 드래그가 불가능한 추가 버튼으로 렌더링합니다. */}
        {emptyPlace && places.length < 5 && (
          <div className="flex w-full items-center gap-x-2">
            {/* 빈 공간을 차지하여 정렬을 맞추기 위한 핸들 */}
            <div className="w-[24px] flex-shrink-0" />
            <button
              onClick={() => onItemClick(emptyPlace.id)}
              className="flex flex-grow items-center rounded-md border border-gray-200 bg-white p-3 text-left"
            >
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
                {filledPlaces.length + 1}
              </div>
              <span className="body-02 text-gray3">장소 유형 추가</span>
            </button>
          </div>
        )}
      </div>
    </DndContext>
=======
  return (
    <div className="w-full flex flex-col gap-y-3">
      {places.map((place, index) => (
        <div key={place.id} className="flex w-full items-center gap-x-2">
          <button className="flex-shrink-0 text-gray-400">
            <IconDragHandle />
          </button>
          <div
            className={clsx(
              "flex flex-grow items-center rounded-lg border-2 bg-white p-3 text-left",
              place.type ? "border-main" : "border-gray-200"
            )}
          >
            <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
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
                {getPlaceTypeText(place)}
              </span>
            </button>
            {places.length > 1 && (
              <button
                onClick={(e) => {
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
      ))}
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359

  // 값이 있는 항목과 없는 항목(마지막 추가 버튼)을 분리합니다.
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
          {filledPlaces.map((place, index) => (
            <SortablePlaceItem
              key={place.id}
              place={place}
              index={index}
              displayText={getPlaceTypeText(place)}
              onItemClick={onItemClick}
              onRemove={onRemove}
              isOnlyItem={filledPlaces.length === 1 && !emptyPlace}
            />
          ))}
        </SortableContext>

        {/* 값이 없는 마지막 항목은 드래그가 불가능한 추가 버튼으로 렌더링합니다. */}
        {emptyPlace && places.length < 5 && (
          <div className="flex w-full items-center gap-x-2">
            {/* 빈 공간을 차지하여 정렬을 맞추기 위한 핸들 */}
            <div className="w-[24px] flex-shrink-0" />
            <button
              onClick={() => onItemClick(emptyPlace.id)}
              className="flex flex-grow items-center rounded-md border border-gray-200 bg-white p-3 text-left"
            >
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
                {filledPlaces.length + 1}
              </div>
              <span className="body-02 text-gray3">장소 유형 추가</span>
            </button>
          </div>
<<<<<<< HEAD
        )}
      </div>
    </DndContext>
=======
          <span className="body-02 text-gray3">장소 유형 추가</span>
        </button>
      )}
    </div>
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
  );
};

export default PlaceTypeForm;
