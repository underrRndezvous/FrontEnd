import React from "react";

// 페이지로부터 받을 props 타입
interface Place {
  id: number;
  type: string | null;
  atmosphere: string | null;
}
interface PlaceTypeFormProps {
  places: Place[];
  onInputClick: () => void;
}

const PlaceTypeForm = ({ places, onInputClick }: PlaceTypeFormProps) => {
  // 선택된 값에 따라 표시될 텍스트를 결정하는 함수
  const getPlaceTypeText = (type: string | null) => {
    if (type === "restaurant") return "음식점";
    if (type === "cafe") return "카페";
    // ...
    return "장소 유형 추가";
  };

  return (
    <div className="w-full flex flex-col gap-y-3">
      {places.map((place, index) => (
        <button
          key={place.id}
          onClick={onInputClick}
          className="flex w-full items-center rounded-lg border-2 bg-white p-3 text-left"
        >
          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
            {index + 1}
          </div>
          <span
            className={place.type ? "text-black body-02" : "text-gray3 body-02"}
          >
            {getPlaceTypeText(place.type)}
          </span>
          {/* TODO: 마이너스 버튼 추가 */}
        </button>
      ))}
    </div>
  );
};

export default PlaceTypeForm;
