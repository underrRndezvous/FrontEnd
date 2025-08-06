import React from "react";
import clsx from "clsx";

// 1. 페이지로부터 받을 props 타입을 정의합니다.
interface TimeSelectorProps {
  selectedTimes: string[];
  onSelect: (id: string) => void;
}

const TimeSelector = ({ selectedTimes, onSelect }: TimeSelectorProps) => {
  // 2. 위젯이 직접 관리하던 useState는 제거합니다.

  const timeSlots = {
    lunch: "점심",
    afternoon: "오후",
    dinner: "저녁",
    morning: "오전",
  };

  const textBaseStyle = "body-02 block transform -rotate-45";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-64 w-64">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 transform rotate-45">
          {/* 3. props로 받은 selectedTimes와 onSelect를 사용합니다. */}
          <button
            onClick={() => onSelect("morning")}
            className={clsx(
              "relative rounded-tl-full bg-white border-2 transition-all",
              selectedTimes.includes("morning")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute bottom-5 right-5",
                selectedTimes.includes("morning") ? "text-black" : "text-gray3"
              )}
            >
              {timeSlots.morning}
            </span>
          </button>

          <button
            onClick={() => onSelect("lunch")}
            className={clsx(
              "relative rounded-tr-full bg-white border-2 transition-all",
              selectedTimes.includes("lunch")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute bottom-5 left-5",
                selectedTimes.includes("lunch") ? "text-black" : "text-gray3"
              )}
            >
              {timeSlots.lunch}
            </span>
          </button>

          <button
            onClick={() => onSelect("dinner")}
            className={clsx(
              "relative rounded-bl-full bg-white border-2 transition-all",
              selectedTimes.includes("dinner")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute top-5 right-5",
                selectedTimes.includes("dinner") ? "text-black" : "text-gray3"
              )}
            >
              {timeSlots.dinner}
            </span>
          </button>

          <button
            onClick={() => onSelect("afternoon")}
            className={clsx(
              "relative rounded-br-full bg-white border-2 transition-all",
              selectedTimes.includes("afternoon")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute top-5 left-5",
                selectedTimes.includes("afternoon")
                  ? "text-black"
                  : "text-gray3"
              )}
            >
              {timeSlots.afternoon}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
