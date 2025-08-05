import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import Overlay from "@/shared/ui/overlay";
import SelectionOverlay from "@/widgets/common/selectionOverlay";
import type { SelectionOption } from "@/shared/ui/selection";

// 장소 유형 아이콘
import IconRestaurant from "@/shared/asset/icon/restaurant.svg?react";
import IconCafe from "@/shared/asset/icon/cafe.svg?react";
import IconActivity from "@/shared/asset/icon/activity.svg?react";
import IconBar from "@/shared/asset/icon/bar.svg?react";
// 음식점 유형 아이콘
import IconPasta from "@/shared/asset/icon/pasta.svg?react";
import IconChinaFood from "@/shared/asset/icon/chinafood.svg?react";
import IconJapanFood from "@/shared/asset/icon/japanfood.svg?react";
import IconKoreaFood from "@/shared/asset/icon/koreafood.svg?react";
// 술집 유형 아이콘
import IconIzakaya from "@/shared/asset/icon/izakaya.svg?react";
import IconKor from "@/shared/asset/icon/kor.svg?react";
import IconBeer from "@/shared/asset/icon/beer.svg?react";
import IconWine from "@/shared/asset/icon/wine.svg?react";

// --- 데이터 정의 ---
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

interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

const Step1_4Page = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<Place[]>([
    { id: Date.now(), type: null, subType: null },
  ]);
  const [editingPlaceId, setEditingPlaceId] = useState<number | null>(null);
  const [overlayData, setOverlayData] = useState<{
    title: string;
    buttonText: string;
    options: SelectionOption[];
    step: "main" | "sub";
  } | null>(null);

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
    setPlaces((prev) => [
      ...prev,
      { id: Date.now(), type: null, subType: null },
    ]);
  };

  const handleRemovePlace = (idToRemove: number) => {
    if (places.length <= 1) return;
    setPlaces((prev) => prev.filter((p) => p.id !== idToRemove));
  };

  const handleConfirm = (selectedId: string) => {
    const isMainStep = overlayData?.step === "main";
<<<<<<< HEAD
    const wasLastAndEmpty =
      !places.find((p) => p.id === editingPlaceId)?.type &&
      places.length - 1 === places.findIndex((p) => p.id === editingPlaceId);

    // ✅ 상태 업데이트 로직을 명확하게 분리합니다.
    setPlaces((currentPlaces) => {
      // 1. 현재 수정 중인 항목을 먼저 업데이트합니다.
      let newPlaces = currentPlaces.map((p) =>
        p.id === editingPlaceId
          ? {
              ...p,
              [isMainStep ? "type" : "subType"]: selectedId,
              ...(isMainStep && { subType: null }),
            }
          : p
      );

      // 2. 비어있던 마지막 항목을 채웠고, 5개 미만이면 새 항목을 추가합니다.
      if (wasLastAndEmpty && newPlaces.length < 5) {
        newPlaces = [
          ...newPlaces,
          { id: Date.now(), type: null, subType: null },
        ];
      }

      return newPlaces;
    });
=======
<<<<<<< HEAD
    const wasLastAndEmpty =
      !places.find((p) => p.id === editingPlaceId)?.type &&
      places.length - 1 === places.findIndex((p) => p.id === editingPlaceId);

    // ✅ 상태 업데이트 로직을 명확하게 분리합니다.
    setPlaces((currentPlaces) => {
      // 1. 현재 수정 중인 항목을 먼저 업데이트합니다.
      let newPlaces = currentPlaces.map((p) =>
        p.id === editingPlaceId
          ? {
              ...p,
              [isMainStep ? "type" : "subType"]: selectedId,
              ...(isMainStep && { subType: null }),
            }
          : p
      );

      // 2. 비어있던 마지막 항목을 채웠고, 5개 미만이면 새 항목을 추가합니다.
      if (wasLastAndEmpty && newPlaces.length < 5) {
        newPlaces = [
          ...newPlaces,
          { id: Date.now(), type: null, subType: null },
        ];
      }

      return newPlaces;
    });
=======

    // 현재 수정 중인 항목 업데이트
    let newPlaces = places.map((p) =>
      p.id === editingPlaceId
        ? { ...p, [isMainStep ? "type" : "subType"]: selectedId }
        : p
    );
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359

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
<<<<<<< HEAD
  };
  const isNextDisabled = places.some((p) => p.type === null);
=======
<<<<<<< HEAD
  };
  const isNextDisabled = places.some((p) => p.type === null);
=======

    // 마지막 항목이었는지 확인 후 새 항목 추가
    const wasLastItem = places[places.length - 1].id === editingPlaceId;
    if (wasLastItem && places.length < 5) {
      newPlaces = [...newPlaces, { id: Date.now(), type: null, subType: null }];
    }
    setPlaces(newPlaces);
  };
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359

  return (
    <>
      <StepFormLayout
        title="어떤 장소 유형이 필요한가요?"
        subtitle="모임에 필요한 장소 유형과 순서를 정해주세요"
        onNext={handleNext}
        onPrev={handlePrev}
<<<<<<< HEAD
        isNextDisabled={isNextDisabled}
      >
        <PlaceTypeForm
          places={places}
          setPlaces={setPlaces}
=======
<<<<<<< HEAD
        isNextDisabled={isNextDisabled}
      >
        <PlaceTypeForm
          places={places}
          setPlaces={setPlaces}
=======
        isNextDisabled={places.some((p) => p.type === null)}
      >
        <PlaceTypeForm
          places={places}
>>>>>>> main
>>>>>>> 92c2747a42d5828e644bac7abe932af35378f359
          onItemClick={handleItemClick}
          onAdd={handleAddPlace}
          onRemove={handleRemovePlace}
        />
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
