import { useState } from "react";
import clsx from "clsx";
import {
  useMeetingStore,
  type Departure,
  type StartPointRequest,
  type TimeType,
  type DayType,
  type PlaceType,
  type AtmosphereType,
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
    const newDays = selectedDays.includes(dayApi)
      ? selectedDays.filter((d) => d !== dayApi)
      : [...selectedDays, dayApi];
    setSelectedDays(newDays);
  };
  const handleTimeSelect = (timeKey: TimeType) => {
    setSelectedTimes(
      selectedTimes.includes(timeKey)
        ? selectedTimes.filter((t) => t !== timeKey)
        : [...selectedTimes, timeKey]
    );
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

  const handleAddPlace = () => {
    if (places.length < 5) {
      setPlaces([
        ...places,
        { id: Date.now(), placeType: null, atmosphere: null },
      ]);
    }
  };
  const handleRemovePlace = (id: number) => {
    if (places.length > 1) {
      setPlaces(places.filter((p) => p.id !== id));
    }
  };

  const parseAddress = (address: string) => {
    const firstSpaceIndex = address.indexOf(" ");
    const secondSpaceIndex =
      firstSpaceIndex >= 0 ? address.indexOf(" ", firstSpaceIndex + 1) : -1;
    return {
      first: firstSpaceIndex >= 0 ? address.slice(0, firstSpaceIndex) : address,
      second:
        secondSpaceIndex >= 0
          ? address.slice(firstSpaceIndex + 1, secondSpaceIndex)
          : firstSpaceIndex >= 0
          ? address.slice(firstSpaceIndex + 1)
          : "",
      third: secondSpaceIndex >= 0 ? address.slice(secondSpaceIndex + 1) : "",
    };
  };

  const uiDepartures: Departure[] = departures.map((sp) => ({
    id: sp.id,
    type: sp.type,
    value: [sp.first, sp.second, sp.third].join(" "),
  }));

  const handleAddDeparture = () => {
    if (departures.length < 5) {
      setDepartures([
        ...departures,
        { id: Date.now(), type: "member", first: "", second: "", third: "" },
      ]);
    }
  };
  const handleRemoveDeparture = (id: number) => {
    if (departures.length > 1) {
      setDepartures(departures.filter((d) => d.id !== id));
    }
  };
  const handleChangeDeparture = (id: number, value: string) => {
    const parsedAddress = parseAddress(value);
    setDepartures(
      departures.map((d) => (d.id === id ? { ...d, ...parsedAddress } : d))
    );
  };
  const setUiDepartures = (newDepartures: Departure[]) => {
    const newStartPoint: StartPointRequest[] = newDepartures.map((dep) => {
      const parsed = parseAddress(dep.value);
      return { id: dep.id, type: dep.type, ...parsed };
    });
    setDepartures(newStartPoint);
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
            places={places}
            setPlaces={setPlaces}
            onItemClick={handleItemClick}
            onAdd={handleAddPlace}
            onRemove={handleRemovePlace}
            isEditPage={true}
            displaySubTypes={displaySubTypes}
          />
        </section>

        <hr className="border-gray-100" />

        <section>
          <h3 className="title-03 text-left mb-2">출발 위치</h3>
          <DepartureInputForm
            departures={uiDepartures}
            setDepartures={setUiDepartures}
            onAdd={handleAddDeparture}
            onRemove={handleRemoveDeparture}
            onChange={handleChangeDeparture}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </section>
      </div>

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

export default EditMeetingForm;
