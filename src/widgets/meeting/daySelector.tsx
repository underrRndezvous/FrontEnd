import React from "react";
import clsx from "clsx";

interface DaySelectorProps {
  selectedDays: string[];
  onSelect: (day: string) => void;
}

const DaySelector = ({ selectedDays, onSelect }: DaySelectorProps) => {
  const weekdays = ["월", "화", "수", "목"];
  const weekends = ["금", "토", "일"];
  const buttonStyle =
    "rounded-lg border py-5 w-16 text-center body-02 transition-colors";
  return (
    <div className="w-full flex flex-col items-center gap-y-8 -mt-16">
      <div className="flex justify-center gap-x-2">
        {weekdays.map((day) => (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={clsx(
              buttonStyle,
              selectedDays.includes(day)
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
              selectedDays.includes(day)
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
