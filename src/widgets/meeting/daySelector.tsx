import React from "react";
import clsx from "clsx";
import type { DayType } from "@/store/meetingStore";

interface DaySelectorProps {
  // 1. props를 DayType 배열이 아닌, 단일 DayType 또는 null로 받도록 변경
  selectedDay: DayType | null;
  onSelect: (day: string) => void;
}
const dayEnglishToKorean: { [key in DayType]?: string } = {
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
const DaySelector = ({ selectedDay, onSelect }: DaySelectorProps) => {
  const weekdays = ["월", "화", "수", "목"];
  const weekends = ["금", "토", "일"];
  const buttonStyle =
    "rounded-lg border py-5 w-16 text-center body-02 transition-colors";

  const selectedKoreanDay = selectedDay
    ? dayEnglishToKorean[selectedDay]
    : null;

  return (
    <div className="w-full flex flex-col items-center gap-y-8">
      {" "}
      {/* gap-y-8 -> gap-y-4로 줄여서 간격 조정 */}
      <div className="flex justify-center gap-x-2">
        {weekdays.map((day) => (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={clsx(
              buttonStyle,
              // 5. 변환된 한글 배열과 비교하여 선택 상태를 결정합니다.
              selectedKoreanDay === day
                ? "border-2 border-main bg-white text-black shadow-glow-main"
                : "border border-gray1 bg-white text-gray3"
            )}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-x-2">
        {weekends.map((day) => (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={clsx(
              buttonStyle,
              selectedKoreanDay === day
                ? "border-2 border-main bg-white text-black shadow-glow-main"
                : "border border-gray1 bg-white text-gray3"
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
