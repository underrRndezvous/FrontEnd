import React from "react";
import { useMeetingStore } from "@/stores/meetingStore"; // Zustand 스토어 import

// 아이콘 import
import IconCrown from "@/shared/asset/icon/crown.svg?react";
import IconPerson from "@/shared/asset/icon/person.svg?react";

const MeetingSummary = () => {
  // Zustand 스토어에서 필요한 모든 데이터를 가져옵니다.
  const { groupName, selectedTimes, groupPurpose, places, departures } =
    useMeetingStore();

  return (
    <div className="w-full rounded-lg bg-white p-4 text-left">
      {/* 모임 시간 */}
      <div className="flex justify-between border-b py-2">
        <span className="body-02 text-gray-500">모임 시간</span>
        <span className="body-02 text-black">{selectedTimes.join(", ")}</span>
      </div>
      {/* 모임 목적 */}
      <div className="flex justify-between border-b py-2">
        <span className="body-02 text-gray-500">모임 목적</span>
        <span className="body-02 text-black">{groupPurpose}</span>
      </div>
      {/* 장소 유형 */}
      <div className="flex justify-between border-b py-2">
        <span className="body-02 text-gray-500">장소 유형</span>
        <div className="text-right">
          {places.map((place, index) => (
            <p key={place.id} className="body-02 text-black">
              {index + 1}. {place.type} - {place.subType}
            </p>
          ))}
        </div>
      </div>
      {/* 출발 위치 */}
      <div className="flex justify-between py-2">
        <span className="body-02 text-gray-500">출발 위치</span>
        <div className="text-right">
          {departures.map((departure) => (
            <div key={departure.id} className="flex items-center justify-end">
              {departure.type === "leader" ? (
                <IconCrown className="h-5 w-5 mr-1" />
              ) : (
                <IconPerson className="h-5 w-5 mr-1" />
              )}
              <span className="body-02 text-black">{departure.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
