import React from "react";
import clsx from "clsx";
import { IconMinus, IconDragHandle, IconPlus } from "@/shared/ui/svg";

interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

interface PlaceTypeFormProps {
  places: Place[];
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

const PlaceTypeForm = ({
  places,
  onItemClick,
  onRemove,
  onAdd,
}: PlaceTypeFormProps) => {
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
    };

    const mainText = typeMap[place.type] || "장소 유형";
    const subText = place.subType ? ` - ${subTypeMap[place.subType]}` : "";
    return `${mainText}${subText}`;
  };

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

      {places[places.length - 1]?.type && places.length < 5 && (
        <button
          onClick={onAdd}
          className="flex w-full items-center rounded-lg border-2 border-gray-200 bg-white p-3 text-left"
        >
          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
            {places.length + 1}
          </div>
          <span className="body-02 text-gray3">장소 유형 추가</span>
        </button>
      )}
    </div>
  );
};

export default PlaceTypeForm;
