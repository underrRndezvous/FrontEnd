import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  useMeetingStore,
  type Departure,
  type StartPointRequest,
  type TimeType,
  type DayType,
  type PlaceType,
  type AtmosphereType,
  type RestaurantTypeDetail,
  type BarTypeDetail,
} from "@/store/meetingStore";

import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";
import Overlay from "@/shared/ui/overlay";
import SelectionOverlay from "@/widgets/common/selectionOverlay";
import type { SelectionOption } from "@/shared/ui/selection";

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
  { id: "IZAKAYA", label: "이자카야", IconComponent: IconIzakaya },
  { id: "POCHA", label: "한식주점", IconComponent: IconKor },
  { id: "BEER", label: "맥주", IconComponent: IconBeer },
  { id: "BAR_SPECIATLS", label: "와인/위스키", IconComponent: IconWine },
];
const atmosphereOptions: SelectionOption[] = [
  { id: "PRODUCTIVE", label: "작업하기 좋은", IconComponent: IconNote },
  { id: "AESTHETIC", label: "사진찍기 좋은", IconComponent: IconPhoto },
  { id: "SOCIABLE", label: "대화하기 좋은", IconComponent: IconTalk },
  { id: "INDULGENT", label: "디저트가 맛있는", IconComponent: IconDesert },
];

const EditMeetingForm = () => {
  const {
    groupPurpose,
    setGroupPurpose,
    meetDays: selectedDays,
    setMeetDays: setSelectedDays,
    meetTime: selectedTimes,
    setMeetTime: setSelectedTimes,
    place: places,
    setPlace: setPlaces,
    startPoint: departures,
    setStartPoint: setDepartures,
  } = useMeetingStore();

  const [editingPlaceId, setEditingPlaceId] = useState<number | null>(null);
  const [overlayData, setOverlayData] = useState<any>(null);
  const [displaySubTypes, setDisplaySubTypes] = useState<{
    [key: number]: string;
  }>({});
  const [displayValues, setDisplayValues] = useState<{ [id: number]: string }>(
    {}
  );

  useEffect(() => {
    const initialDisplayValues: { [id: number]: string } = {};
    departures.forEach((sp) => {
      const combined = [sp.first, sp.second, sp.third]
        .filter((part) => part && part.trim() !== "")
        .join(" ");
      if (combined) {
        initialDisplayValues[sp.id || 0] = combined;
      }
    });
    setDisplayValues(initialDisplayValues);
  }, []);

  useEffect(() => {
    if (!places || places.length === 0) {
      setPlaces([
        { id: 1, placeType: null, typeDetail: null, atmosphere: null },
      ]);
      return;
    }

    const hasEmptySlot = places.some((p) => p.placeType === null);

    if (!hasEmptySlot && places.length < 5) {
      const nextId = Math.max(...places.map((p) => p.id)) + 1;
      setPlaces([
        ...places,
        { id: nextId, placeType: null, typeDetail: null, atmosphere: null },
      ]);
    }
  }, [places, setPlaces]);

  const purposeOptions = [
    { id: "date", label: "데이트" },
    { id: "business", label: "비즈니스" },
    { id: "study", label: "스터디" },
    { id: "social", label: "친목" },
  ];
  const dayOptions = [
    { ui: "월", api: "MONDAY" as DayType },
    { ui: "화", api: "TUESDAY" as DayType },
    { ui: "수", api: "WEDNESDAY" as DayType },
    { ui: "목", api: "THURSDAY" as DayType },
    { ui: "금", api: "FRIDAY" as DayType },
    { ui: "토", api: "SATURDAY" as DayType },
    { ui: "일", api: "SUNDAY" as DayType },
  ];
  const timeOptions = [
    { key: "MORNING" as TimeType, label: "오전" },
    { key: "LUNCH" as TimeType, label: "점심" },
    { key: "AFTERNOON" as TimeType, label: "오후" },
    { key: "EVENING" as TimeType, label: "저녁" },
  ];

  const handleDaySelect = (dayApi: DayType) => {
    if (selectedDays.includes(dayApi)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== dayApi));
      }
    } else {
      setSelectedDays([dayApi]);
    }
  };

  const handleTimeSelect = (timeKey: TimeType) => {
    if (selectedTimes.includes(timeKey)) {
      if (selectedTimes.length > 1) {
        setSelectedTimes(selectedTimes.filter((t) => t !== timeKey));
      }
    } else {
      setSelectedTimes([...selectedTimes, timeKey]);
    }
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
          BAR: {
            title: "술집 유형을 선택해주세요",
            options: barTypeOptions,
          },
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
      } else if (currentPlace?.placeType === "RESTAURANT") {
        setPlaces(
          places.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  typeDetail: selectedId.toUpperCase() as RestaurantTypeDetail,
                }
              : p
          )
        );
        setDisplaySubTypes((prev) => ({
          ...prev,
          [editingId]: selectedId.toUpperCase(),
        }));
      } else if (currentPlace?.placeType === "BAR") {
        setPlaces(
          places.map((p) =>
            p.id === editingId
              ? { ...p, typeDetail: selectedId.toUpperCase() as BarTypeDetail }
              : p
          )
        );
        setDisplaySubTypes((prev) => ({
          ...prev,
          [editingId]: selectedId.toUpperCase(),
        }));
      }
      setOverlayData(null);
    }
  };
  const handleOverlayClose = () => {
    if (overlayData?.step === "sub") {
      return;
    }
    setOverlayData(null);
  };
  const handleAddPlace = () => {
    if (places.length >= 5) return;
    const nextId =
      places.length > 0 ? Math.max(...places.map((p) => p.id)) + 1 : 1;
    setPlaces([
      ...places,
      { id: nextId, typeDetail: null, placeType: null, atmosphere: null },
    ]);
  };

  const handleRemovePlace = (idToRemove: number) => {
    const selectedPlaces = places.filter((p) => p.placeType !== null);

    if (selectedPlaces.length <= 1) {
      const removingPlace = places.find((p) => p.id === idToRemove);
      if (removingPlace?.placeType !== null) {
        return;
      }
    }

    if (places.length <= 1) return;

    setPlaces(places.filter((p) => p.id !== idToRemove));
    setDisplaySubTypes((prev) => {
      const newState = { ...prev };
      delete newState[idToRemove];
      return newState;
    });
  };

  const parseAddress = (address: string) => {
    if (!address || address.trim() === "") {
      return { first: "", second: "", third: "" };
    }

    const parts = address.trim().split(/\s+/);
    return {
      first: parts[0] || "",
      second: parts[1] || "",
      third: parts.slice(2).join(" ") || "",
    };
  };

  const uiDepartures: Departure[] = departures.map((sp) => ({
    id: sp.id,
    type: sp.type,
    value: displayValues[sp.id] || "",
  }));

  const handleAddDeparture = () => {
    if (departures.length < 5) {
      const newId = Date.now();
      setDepartures([
        ...departures,
        { id: newId, type: "member", first: "", second: "", third: "" },
      ]);
    }
  };

  const handleRemoveDeparture = (id: number) => {
    if (departures.length > 1) {
      setDepartures(departures.filter((d) => d.id !== id));
      setDisplayValues((prev) => {
        const newValues = { ...prev };
        delete newValues[id];
        return newValues;
      });
    }
  };

  const handleChangeDeparture = (id: number, value: string) => {
    setDisplayValues((prev) => ({ ...prev, [id]: value }));

    const parsed = parseAddress(value);
    setDepartures(
      departures.map((d) => (d.id === id ? { ...d, ...parsed } : d))
    );
  };

  return (
    <>
      <div className="w-full space-y-6 rounded-lg border border-main bg-white p-6 ">
        <section className="flex flex-col items-start gap-y-3">
          <h3 className="title-03 text-left text-black">모임 목적</h3>
          <div className="w-full grid grid-cols-4 gap-x-2">
            {purposeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setGroupPurpose(opt.id)}
                className={clsx(
                  "rounded-md border py-1 body-02 transition-colors whitespace-nowrap",
                  groupPurpose === opt.id
                    ? "border-main bg-sub02 text-black shadow-glow-main"
                    : "border-gray2 bg-white text-gray3"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        <section className="flex flex-col items-start gap-y-3">
          <h3 className="title-03 text-left text-black">모임 요일</h3>
          <div className="w-full grid grid-cols-7 gap-x-1.5 justify-items-center">
            {dayOptions.map((day) => (
              <button
                key={day.api}
                onClick={() => handleDaySelect(day.api)}
                className={clsx(
                  "w-full rounded-md border py-1.5 px-1 text-body-02 transition-colors min-w-[32px] max-w-[40px]",
                  selectedDays.includes(day.api)
                    ? "border-main bg-sub02 text-black shadow-glow-main"
                    : "border-gray2 bg-white text-gray3"
                )}
              >
                {day.ui}
              </button>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        <section className="flex flex-col items-start gap-y-3">
          <h3 className="title-03 text-left text-black">모임 시간</h3>
          <div className="w-full grid grid-cols-4 gap-x-2">
            {timeOptions.map((time) => (
              <button
                key={time.key}
                onClick={() => handleTimeSelect(time.key)}
                className={clsx(
                  "rounded-md border py-1 body-02 transition-colors",
                  selectedTimes.includes(time.key)
                    ? "border-main bg-sub02 text-black shadow-glow-main"
                    : "border-gray2 bg-white text-gray3"
                )}
              >
                {time.label}
              </button>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        <section>
          <h3 className="title-03 text-left mb-2">장소 유형</h3>
          <PlaceTypeForm
            places={places || []}
            setPlaces={setPlaces}
            onItemClick={handleItemClick}
            onAdd={handleAddPlace}
            onRemove={handleRemovePlace}
            displaySubTypes={displaySubTypes}
          />
        </section>

        <hr className="border-gray-100" />

        <section>
          <h3 className="title-03 text-left mb-2">출발 위치</h3>
          <DepartureInputForm
            departures={uiDepartures}
            onAdd={handleAddDeparture}
            onRemove={handleRemoveDeparture}
            onChange={handleChangeDeparture}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </section>
      </div>

      <Overlay isOpen={overlayData !== null} onClose={handleOverlayClose}>
        {overlayData && (
          <SelectionOverlay
            title={overlayData.title}
            buttonText={overlayData.buttonText}
            options={overlayData.options}
            onConfirm={handleConfirm}
            onClose={handleOverlayClose}
          />
        )}
      </Overlay>
    </>
  );
};

export default EditMeetingForm;
