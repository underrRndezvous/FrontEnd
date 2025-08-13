import React from "react";
import { useMeetingStore } from "@/store/meetingStore";
import IconCrown from "@/shared/asset/icon/crown.svg?react";
import IconPerson from "@/shared/asset/icon/person.svg?react";
import type { PlaceRequest } from "@/store/meetingStore";

const purposeMap: { [key: string]: string } = {
  date: "데이트",
  business: "비즈니스",
  study: "스터디",
  social: "친목",
};

const timeMap: { [key: string]: string } = {
  MORNING: "오전",
  LUNCH: "점심",
  AFTERNOON: "오후",
  EVENING: "저녁",
};

const dayMap: { [key: string]: string } = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
  WEEKDAY: "평일",
  WEEKEND: "주말",
};

const MeetingSummary = () => {
  const {
    groupName,
    meetDays: selectedDays,
    meetTime: selectedTimes,
    groupPurpose,
    place: places,
    startPoint: departures,
  } = useMeetingStore();

  const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];

  // API 형태의 요일을 한글로 변환
  const convertedDays = selectedDays.map((day) => dayMap[day] || day);
  const sortedSelectedDays = [...convertedDays].sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  const getPlaceTypeText = (place: PlaceRequest) => {
    if (!place.placeType) return "";
    const typeMap: { [key: string]: string } = {
      RESTAURANT: "음식점",
      CAFE: "카페",
      ACTIVITY: "액티비티",
      BAR: "술집",
    };

    const mainText = typeMap[place.placeType] || "장소 유형";

    // atmosphere가 있는 경우 (카페만)
    if (place.atmosphere && place.placeType === "CAFE") {
      const atmosphereMap: { [key: string]: string } = {
        PRODUCTIVE: "생산적인",
        AESTHETIC: "감성적인",
        INDULGENT: "여유로운",
        SOCIABLE: "사교적인",
      };
      const atmosphereText = atmosphereMap[place.atmosphere];
      return `${mainText} - ${atmosphereText}`;
    }

    return mainText;
  };

  // startPoint를 UI에서 사용할 수 있는 형태로 변환
  const convertedDepartures = departures.map((departure) => ({
    ...departure,
    value: [departure.first, departure.second, departure.third]
      .filter(Boolean)
      .join(" "),
  }));

  return (
    <div className="w-full rounded-lg bg-white p-4 text-left shadow-md overflow-y-auto max-h-[310px]">
      <div className="w-full flex justify-between items-center border-b py-3">
        <span className="title-03 text-black">모임 시간</span>
        <span className="body-02 text-gray4">
          {[...new Set(selectedTimes)]
            .map((time) => timeMap[time] || time)
            .join(", ")}
        </span>
      </div>

      <div className="w-full flex justify-between items-center border-b py-3">
        <span className="title-03 text-black">모임 요일</span>
        <span className="body-02 text-gray4">
          {sortedSelectedDays.join(", ")}
        </span>
      </div>

      <div className="flex justify-between border-b py-3">
        <span className="title-03 text-black">모임 목적</span>
        <span className="body-02 text-gray4">
          {groupPurpose ? purposeMap[groupPurpose] : ""}
        </span>
      </div>

      <div className="flex justify-between border-b py-3">
        <span className="title-03 text-black flex-shrink-0 mr-4">
          장소 유형
        </span>
        <div className="text-right">
          {places
            .filter((p) => p.placeType)
            .map((place, index) => (
              <p key={place.id} className="body-02 text-gray4">
                {index + 1}. {getPlaceTypeText(place)}
              </p>
            ))}
        </div>
      </div>

      <div className="flex justify-between py-3">
        <span className="title-03 text-black flex-shrink-0 mr-4">
          출발 위치
        </span>
        <div className="text-right space-y-2">
          {convertedDepartures
            .filter((d) => d.value.trim() !== "")
            .map((departure) => (
              <div key={departure.id} className="flex items-center justify-end">
                {departure.type === "leader" ? (
                  <IconCrown className="h-5 w-5 mr-1" />
                ) : (
                  <IconPerson className="h-5 w-5 mr-1" />
                )}
                <span className="body-02 text-gray4">{departure.value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
