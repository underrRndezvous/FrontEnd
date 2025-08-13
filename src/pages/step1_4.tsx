import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import Overlay from "@/shared/ui/overlay";
import SelectionOverlay from "@/widgets/common/selectionOverlay";
import type { SelectionOption } from "@/shared/ui/selection";
import {
  useMeetingStore,
  type PlaceType,
  type AtmosphereType,
} from "@/store/meetingStore";

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
import IconNote from "@/shared/asset/icon/note.svg?react";
import IconPhoto from "@/shared/asset/icon/photo.svg?react";
import IconTalk from "@/shared/asset/icon/talk.svg?react";
import IconDesert from "@/shared/asset/icon/desert.svg?react";
const placeTypeOptions: SelectionOption[] = [
  { id: "RESTAURANT", label: "음식점", IconComponent: IconRestaurant },
  { id: "CAFE", label: "카페", IconComponent: IconCafe },
  { id: "ACTIVITY", label: "액티비티", IconComponent: IconActivity },
  { id: "BAR", label: "술집", IconComponent: IconBar },
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
const atmosphereOptions: SelectionOption[] = [
  { id: "PRODUCTIVE", label: "작업하기 좋은", IconComponent: IconNote },
  { id: "AESTHETIC", label: "사진찍기 좋은", IconComponent: IconPhoto },
  { id: "SOCIABLE", label: "대화하기 좋은", IconComponent: IconTalk },
  { id: "INDULGENT", label: "디저트가 맛있는", IconComponent: IconDesert },
];

const Step1_4Page = () => {
  const navigate = useNavigate();
  const { place: places, setPlace: setPlaces } = useMeetingStore();
  const [editingPlaceId, setEditingPlaceId] = useState<number | null>(null);
  const [overlayData, setOverlayData] = useState<any>(null);
  const [displaySubTypes, setDisplaySubTypes] = useState<{
    [key: number]: string;
  }>({});

  // ▼▼▼ "자동으로 새 창 추가"를 전담하는 useEffect 로직 ▼▼▼
  useEffect(() => {
    // places가 없거나 비어있으면 초기화
    if (!places || places.length === 0) {
      setPlaces([{ id: Date.now(), placeType: null, atmosphere: null }]);
      return;
    }
    // 배열에 빈 칸이 있는지 확인
    const hasEmptySlot = places.some((p) => p.placeType === null);
    // 빈 칸이 없고, 전체 개수가 5개 미만이면 새 빈칸을 추가
    if (!hasEmptySlot && places.length < 5) {
      setPlaces([
        ...places,
        { id: Date.now(), placeType: null, atmosphere: null },
      ]);
    }
  }, [places, setPlaces]); // places 배열이 변경될 때마다 이 로직이 실행됩니다.

  const handleNext = () => navigate("/Plaza/step1_5");
  const handlePrev = () => navigate(-1);

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
    setPlaces([
      ...places,
      { id: Date.now(), placeType: null, atmosphere: null },
    ]);
  };

  const handleRemovePlace = (idToRemove: number) => {
    if (
      places.filter((p) => p.placeType !== null).length <= 1 &&
      places.length === 1
    )
      return;
    if (places.length <= 1) return;
    setPlaces(places.filter((p) => p.id !== idToRemove));
    setDisplaySubTypes((prev) => {
      const newState = { ...prev };
      delete newState[idToRemove];
      return newState;
    });
  };

  // ▼▼▼ 매우 단순해진 handleConfirm 함수 ▼▼▼
  const handleConfirm = (selectedId: string) => {
    const isMainStep = overlayData?.step === "main";
    const editingId = editingPlaceId!;

    if (isMainStep) {
      const placeType = selectedId as PlaceType;
      setPlaces(
        places.map((p) =>
          p.id === editingId ? { ...p, placeType, atmosphere: null } : p
        )
      );
      setDisplaySubTypes((prev) => ({ ...prev, [editingId]: "" }));

      if (
        placeType === "RESTAURANT" ||
        placeType === "BAR" ||
        placeType === "CAFE"
      ) {
        const nextOverlayMap = {
          RESTAURANT: {
            title: "음식점 유형을 선택해주세요",
            options: foodTypeOptions,
          },
          BAR: { title: "술집 유형을 선택해주세요", options: barTypeOptions },
          CAFE: {
            title: "카페 유형을 선택해주세요",
            options: atmosphereOptions,
          },
        };
        setOverlayData({
          ...nextOverlayMap[placeType],
          buttonText: "선택하기",
          step: "sub",
        });
      } else {
        setOverlayData(null);
      }
    } else {
      const currentPlace = places.find((p) => p.id === editingId);
      if (currentPlace?.placeType === "CAFE") {
        setPlaces(
          places.map((p) =>
            p.id === editingId
              ? { ...p, atmosphere: selectedId as AtmosphereType }
              : p
          )
        );
      } else {
        setDisplaySubTypes((prev) => ({ ...prev, [editingId]: selectedId }));
      }
      setOverlayData(null);
    }
  };

  const isNextDisabled =
    places.filter((p) => p.placeType !== null).length === 0;

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
            displaySubTypes={displaySubTypes}
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
