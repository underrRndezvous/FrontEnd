import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import Overlay from "@/shared/ui/overlay";
import PlaceTypeOverlay from "@/widgets/meeting/placeTypeOverlay";
import AtmosphereOverlay from "@/widgets/meeting/atmosphereOverlay";

interface Place {
  id: number;
  type: string | null;
  atmosphere: string | null;
}

const Step1_4Page = () => {
  const navigate = useNavigate();
  // ✅ 1. 현재 어떤 오버레이를 띄울지 관리하는 상태
  const [activeOverlay, setActiveOverlay] = useState<
    "placeType" | "atmosphere" | null
  >(null);
  const [places, setPlaces] = useState<Place[]>([
    { id: 1, type: null, atmosphere: null },
  ]);

  const handleNext = () => {
    /* ... */
  };
  const handlePrev = () => {
    navigate(-1);
  };

  const handlePlaceTypeSelect = (type: string) => {
    const updatedPlaces = places.map((p) => (p.id === 1 ? { ...p, type } : p));
    setPlaces(updatedPlaces);
    // ✅ 2. 장소 유형 선택이 끝나면, 'atmosphere' 오버레이를 띄우도록 상태를 변경합니다.
    setActiveOverlay("atmosphere");
  };

  const handleAtmosphereSelect = (atmosphere: string) => {
    const updatedPlaces = places.map((p) =>
      p.id === 1 ? { ...p, atmosphere } : p
    );
    setPlaces(updatedPlaces);
    setActiveOverlay(null);
  };

  return (
    <>
      <StepFormLayout
        title="어떤 장소 유형이 필요한가요?"
        subtitle="모임에 필요한 장소 유형과 순서를 정해주세요"
        onNext={handleNext}
        onPrev={handlePrev}
        isNextDisabled={!places[0].type}
      >
        <PlaceTypeForm
          places={places}
          onInputClick={() => setActiveOverlay("placeType")}
        />
      </StepFormLayout>

      <Overlay
        isOpen={activeOverlay === "placeType"}
        onClose={() => setActiveOverlay(null)}
      >
        <PlaceTypeOverlay
          onSelect={handlePlaceTypeSelect}
          onClose={() => setActiveOverlay(null)}
        />
      </Overlay>

      {/* ✅ 3. 이 오버레이의 isOpen 조건이 'atmosphere'로 되어있는지 확인합니다. */}
      <Overlay
        isOpen={activeOverlay === "atmosphere"}
        onClose={() => setActiveOverlay(null)}
      >
        <AtmosphereOverlay
          onSelect={handleAtmosphereSelect}
          onClose={() => setActiveOverlay(null)}
        />
      </Overlay>
    </>
  );
};

export default Step1_4Page;
