import React, { useState } from "react";
import SelectionGrid from "@/shared/ui/selection";
import type { SelectionOption } from "@/shared/ui/selection";
import Button from "@/shared/ui/Button";

import IconQuiet from "@/shared/asset/icon/quiet.svg?react";
import IconEmotional from "@/shared/asset/icon/emotional.svg?react";
import IconEnergetic from "@/shared/asset/icon/energetic.svg?react";
import IconNature from "@/shared/asset/icon/nature.svg?react";

// 2. import한 아이콘 컴포넌트를 사용하여 데이터 배열을 완성합니다.
const atmosphereOptions: SelectionOption[] = [
  { id: "quiet", label: "조용한", IconComponent: IconQuiet },
  { id: "emotional", label: "감성적인", IconComponent: IconEmotional },
  { id: "energetic", label: "활기찬", IconComponent: IconEnergetic },
  { id: "nature", label: "자연친화적", IconComponent: IconNature },
];

interface AtmosphereOverlayProps {
  onSelect: (atmosphereId: string) => void;
  onClose: () => void;
}

const AtmosphereOverlay = ({ onSelect, onClose }: AtmosphereOverlayProps) => {
  const [selectedAtmo, setSelectedAtmo] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedAtmo) {
      onSelect(selectedAtmo);
      onClose();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="title-02 text-black">
          선호하는 분위기를 모두 선택해주세요
        </h2>
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
      </div>

      <SelectionGrid
        options={atmosphereOptions}
        selectedId={selectedAtmo}
        onSelect={setSelectedAtmo}
      />

      <div className="mt-8">
        <Button
          format="Button1"
          color="primary"
          onClick={handleConfirm}
          disabled={!selectedAtmo}
        >
          선택하기
        </Button>
      </div>
    </div>
  );
};

export default AtmosphereOverlay;
