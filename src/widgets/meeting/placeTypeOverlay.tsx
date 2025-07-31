import React, { useState } from "react";
import SelectionGrid from "@/shared/ui/selection";
import type { SelectionOption } from "@/shared/ui/selection";
import Button from "@/shared/ui/Button";

// 아이콘 import (경로는 실제 파일 위치에 맞게 확인해주세요)
import IconRestaurant from "@/shared/asset/icon/restaurant.svg?react";
import IconCafe from "@/shared/asset/icon/cafe.svg?react";
import IconActivity from "@/shared/asset/icon/activity.svg?react";
import IconBar from "@/shared/asset/icon/bar.svg?react";

// 오버레이에 표시될 데이터
const placeTypeOptions: SelectionOption[] = [
  { id: "restaurant", label: "음식점", IconComponent: IconRestaurant },
  { id: "cafe", label: "카페", IconComponent: IconCafe },
  { id: "activity", label: "액티비티", IconComponent: IconActivity },
  { id: "bar", label: "술집", IconComponent: IconBar },
];

interface PlaceTypeOverlayProps {
  onSelect: (id: string) => void; // 선택 완료 시 호출될 함수
  onClose: () => void; // 닫기 버튼 클릭 시 호출될 함수
}

const PlaceTypeOverlay = ({ onSelect, onClose }: PlaceTypeOverlayProps) => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedPlace) {
      onSelect(selectedPlace); // 선택한 값을 부모에게 전달
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="title-02 text-black">모임 장소 유형을 선택해주세요</h2>
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
      </div>

      <SelectionGrid
        options={placeTypeOptions}
        selectedId={selectedPlace}
        onSelect={setSelectedPlace}
      />

      <div className="mt-8">
        <Button
          format="Button1"
          color="primary"
          onClick={handleConfirm}
          disabled={!selectedPlace}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PlaceTypeOverlay;
