import React, { useState } from "react";
import SelectionGrid from "@/shared/ui/selection";
import type { SelectionOption } from "@/shared/ui/selection";
import Button from "@/shared/ui/Button";

// 1. 요청하신 아이콘들을 import 합니다. (경로는 실제 위치에 맞게 확인해주세요)
import IconPasta from "@/shared/asset/icon/pasta.svg?react";
import IconKoreaFood from "@/shared/asset/icon/koreafood.svg?react";
import IconJapanFood from "@/shared/asset/icon/japanfood.svg?react";
import IconChinaFood from "@/shared/asset/icon/chinafood.svg?react";

// 2. 오버레이에 표시될 음식 유형 데이터를 만듭니다.
const foodTypeOptions: SelectionOption[] = [
  { id: "western", label: "양식", IconComponent: IconPasta },
  { id: "korean", label: "한식", IconComponent: IconKoreaFood },
  { id: "japanese", label: "일식", IconComponent: IconJapanFood },
  { id: "chinese", label: "중식", IconComponent: IconChinaFood },
];

// 3. 닫기(X) 아이콘 SVG를 정의합니다.
const IconClose = () => (
  <svg
    className="h-6 w-6 stroke-current"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface FoodTypeOverlayProps {
  onSelect: (id: string) => void;
  onClose: () => void;
}

const FoodTypeOverlay = ({ onSelect, onClose }: FoodTypeOverlayProps) => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedFood) {
      onSelect(selectedFood);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <button
        onClick={onClose}
        className="absolute top-[-10px] right-[-10px] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full text-gray3 hover:bg-gray-100"
      >
        <IconClose />
      </button>

      <div className="text-center mt-12 mb-4">
        {/* 4. 제목 텍스트를 수정합니다. */}
        <h2 className="title-02 text-black">음식점 유형을 선택해주세요</h2>
      </div>

      <div className="flex-1 flex items-center mb-8">
        <SelectionGrid
          options={foodTypeOptions}
          selectedId={selectedFood}
          onSelect={setSelectedFood}
        />
      </div>

      <div className="px-4 mb-4">
        <Button
          format="Button1"
          color="primary"
          onClick={handleConfirm}
          disabled={!selectedFood}
        >
          {/* 5. 버튼 텍스트를 수정합니다. */}
          선택하기
        </Button>
      </div>
    </div>
  );
};

export default FoodTypeOverlay;
