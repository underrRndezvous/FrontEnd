import React from "react";
import clsx from "clsx";
import Button from '@/shared/ui/Button';
// SVG 아이콘을 직접 정의합니다.
const IconMinus = () => ( /* ... SVG 코드 ... */ );
const IconDragHandle = () => ( /* 위/아래 화살표 SVG 코드 */ );
const IconPlus = () => ( /* '+' 아이콘 SVG 코드 */);

interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

interface PlaceTypeFormProps {
  places: Place[];
  onItemClick: (id: number) => void;
  onRemove: (id: number) => void; 
  onAdd: () => void;// ✅ 삭제 함수를 props로 받습니다.
}

const PlaceTypeForm = ({
  places,
  onItemClick,
  onRemove,
}: PlaceTypeFormProps) => {
  const getPlaceTypeText = (place: Place): string => {
    if (!place.type) return "장소 유형 추가";

    const typeMap: { [key: string]: string } = {
      restaurant: "음식점",
      cafe: "카페",
      activity: "액티비티",
      bar: "술집",
    };

    // ✅ 모든 subType에 대한 텍스트를 추가합니다.
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
        // 👇 button 대신 div로 변경하여 중첩 버튼 문제를 방지합니다.
        <div
          key={place.id}
          className="flex w-full items-center rounded-lg border-2 bg-white p-3 text-left"
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

          {/* ✅ 삭제 버튼을 추가하고, places가 1개 이상일 때만 보이도록 합니다. */}
          {places.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // 오버레이가 뜨는 것을 방지
                onRemove(place.id);
              }}
              className="ml-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
            >
              <IconMinus />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlaceTypeForm;
