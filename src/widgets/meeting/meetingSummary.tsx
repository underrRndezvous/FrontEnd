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
  morning: "오전",
  lunch: "점심",
  afternoon: "오후",
  dinner: "저녁",
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
  const sortedSelectedDays = [...selectedDays].sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  const getPlaceTypeText = (place: PlaceRequest) => {
    if (!place.type) return "";
    const typeMap: { [key: string]: string } = {
      restaurant: "음식점",
      cafe: "카페",
      activity: "액티비티",
      bar: "술집",
    };

    const subTypeMap: { [key: string]: string } = {
      western: "양식",
      chinese: "중식",
      japanese: "일식",
      korean: "한식",
      izakaya: "이자카야",
      "kor-bar": "한식주점",
      beer: "맥주",
      wine: "와인/위스키",
    };
    const mainText = typeMap[place.type] || "장소 유형";
    const subText = place.subType ? ` - ${subTypeMap[place.subType]}` : "";
    return `${mainText}${subText}`;
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 text-left shadow-md overflow-y-auto max-h-[310px]">
      {/* 받아오는 값 가운데 정렬 추가해야함 */}
      <div className="w-full flex justify-between items-center border-b py-3">
        <span className="title-03 text-black">모임 시간</span>
        <span className="body-02 text-gray4 ">
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
            .filter((p) => p.type)
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
          {departures
            .filter((d) => d.value)
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
