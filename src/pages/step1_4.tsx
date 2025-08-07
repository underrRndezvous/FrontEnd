import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import Overlay from "@/shared/ui/overlay";
import SelectionOverlay from "@/widgets/common/selectionOverlay";
import type { SelectionOption } from "@/shared/ui/selection";
import { useMeetingStore } from "@/store/meetingStore";
import React, { useState, useEffect } from "react";
import IconRestaurant from "@/shared/asset/icon/restaurant.svg?react";
import IconCafe from "@/shared/asset/icon/cafe.svg?react";
import IconActivity from "@/shared/asset/icon/activity.svg?react";
import IconBar from "@/shared/asset/icon/bar.svg?react";

import IconPasta from "@/shared/asset/icon/pasta.svg?react";
import IconChinaFood from "@/shared/asset/icon/chinafood.svg?react";
import IconJapanFood from "@/shared/asset/icon/japanfood.svg?react";
import IconKoreaFood from "@/shared/asset/icon/koreafood.svg?react";

import IconIzakaya from "@/shared/asset/icon/izakaya.svg?react";
import IconKor from "@/shared/asset/icon/kor.svg?react";
import IconBeer from "@/shared/asset/icon/beer.svg?react";
import IconWine from "@/shared/asset/icon/wine.svg?react";

const placeTypeOptions: SelectionOption[] = [
  { id: "restaurant", label: "음식점", IconComponent: IconRestaurant },
  { id: "cafe", label: "카페", IconComponent: IconCafe },
  { id: "activity", label: "액티비티", IconComponent: IconActivity },
  { id: "bar", label: "술집", IconComponent: IconBar },
];
const foodTypeOptions: SelectionOption[] = [
  { id: "western", label: "양식", IconComponent: IconPasta },
  { id: "chinese", label: "중식", IconComponent: IconChinaFood },
  { id: "japanese", label: "일식", IconComponent: IconJapanFood },
  { id: "korean", label: "한식", IconComponent: IconKoreaFood },
];
const barTypeOptions: SelectionOption[] = [
  { id: "izakaya", label: "이자카야", IconComponent: IconIzakaya },
  { id: "kor-bar", label: "한식주점", IconComponent: IconKor },
  { id: "beer", label: "맥주", IconComponent: IconBeer },
  { id: "wine", label: "와인/위스키", IconComponent: IconWine },
];

const Step1_4Page = () => {
  const navigate = useNavigate();
  const { places, setPlaces } = useMeetingStore();
  const [editingPlaceId, setEditingPlaceId] = useState<number | null>(null);
  const [overlayData, setOverlayData] = useState<{
    title: string;
    buttonText: string;
    options: SelectionOption[];
    step: "main" | "sub";
  } | null>(null);

  useEffect(() => {
    if (!places || places.length === 0) {
      setPlaces([{ id: Date.now(), type: null, subType: null }]);
    }
  }, [places, setPlaces]);

  const handleNext = () => {
    navigate("/Plaza/step1_5");
  };
  const handlePrev = () => {
    navigate(-1);
  };

  const handleItemClick = (id: number) => {
    setEditingPlaceId(id);
    setOverlayData({
      title: "모임 장소 유형을 선택해주세요",
      buttonText: "다음",
      options: placeTypeOptions,
      step: "main",
    });
  };

  const handleAddPlace = () => {
    if (places.length >= 5) return;
    setPlaces([...places, { id: Date.now(), type: null, subType: null }]);
  };

  const handleRemovePlace = (idToRemove: number) => {
    if (places.length <= 1) return;
    setPlaces(places.filter((p) => p.id !== idToRemove));
  };

  const handleConfirm = (selectedId: string) => {
    const isMainStep = overlayData?.step === "main";

    const currentPlaces = useMeetingStore.getState().places;
    const wasLastAndEmpty =
      !currentPlaces.find((p) => p.id === editingPlaceId)?.type &&
      currentPlaces.length - 1 ===
        currentPlaces.findIndex((p) => p.id === editingPlaceId);

    let newPlaces = currentPlaces.map((p) =>
      p.id === editingPlaceId
        ? {
            ...p,
            [isMainStep ? "type" : "subType"]: selectedId,
            ...(isMainStep && { subType: null }),
          }
        : p
    );

    if (wasLastAndEmpty && newPlaces.length < 5) {
      newPlaces.push({ id: Date.now(), type: null, subType: null });
    }
    setPlaces(newPlaces);

    if (isMainStep) {
      if (selectedId === "restaurant") {
        setOverlayData({
          title: "음식점 유형을 선택해주세요",
          buttonText: "선택하기",
          options: foodTypeOptions,
          step: "sub",
        });
      } else if (selectedId === "bar") {
        setOverlayData({
          title: "술집 유형을 선택해주세요",
          buttonText: "선택하기",
          options: barTypeOptions,
          step: "sub",
        });
      } else {
        setOverlayData(null);
      }
    } else {
      setOverlayData(null);
    }
  };

  const isNextDisabled = places.filter((p) => p.type !== null).length === 0;

  return (
    <>
      <StepFormLayout
        title="어떤 장소 유형이 필요한가요?"
        subtitle="모임에 필요한 장소 유형과 순서를 정해주세요"
        onNext={handleNext}
        onPrev={handlePrev}
        isNextDisabled={isNextDisabled}
        contentAlignment="start"
      >
        <div className="flex h-full w-full flex-col justify-start pt-4">
          <PlaceTypeForm
            places={places || []}
            setPlaces={setPlaces}
            onItemClick={handleItemClick}
            onAdd={handleAddPlace}
            onRemove={handleRemovePlace}
          />
        </div>
      </StepFormLayout>
      <Overlay
        isOpen={overlayData !== null}
        onClose={() => setOverlayData(null)}
      >
        {overlayData && (
          <SelectionOverlay
            title={overlayData.title}
            buttonText={overlayData.buttonText}
            options={overlayData.options}
            onConfirm={handleConfirm}
            onClose={() => setOverlayData(null)}
          />
        )}
      </Overlay>
    </>
  );
};

export default Step1_4Page;
