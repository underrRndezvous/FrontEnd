import React, { useState } from "react";
import clsx from "clsx";

const TimeSelector = () => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedTimes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const timeSlots = {
    lunch: "점심",
    afternoon: "오후",
    dinner: "저녁",
    morning: "오전",
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-64 w-64 ">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 transform rotate-45">
          <button
            onClick={() => handleSelect("lunch")}
            className={clsx(
              "rounded-tl-full bg-white border-2 transition-all flex items-center justify-center",
              selectedTimes.includes("lunch")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
            style={{
              borderRadius: "100% 7% 7% 7%",
            }}
          >
            <span
              className={clsx(
                "body-02 block transform -rotate-45",
                selectedTimes.includes("lunch") ? "text-black" : "text-gray3"
              )}
            >
              {timeSlots.lunch}
            </span>
          </button>

          <button
            onClick={() => handleSelect("afternoon")}
            className={clsx(
              "rounded-tr-full bg-white border-2 transition-all",
              selectedTimes.includes("afternoon")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
            style={{ borderRadius: "7% 100% 7% 7%" }}
          >
            <span
              className={clsx(
                "body-02 block transform -rotate-45",
                selectedTimes.includes("afternoon")
                  ? "text-black"
                  : "text-gray3"
              )}
            >
              {timeSlots.afternoon}
            </span>
          </button>

          <button
            onClick={() => handleSelect("morning")}
            className={clsx(
              "rounded-bl-full bg-white border-2 transition-all",
              selectedTimes.includes("morning")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
            style={{ borderRadius: "7% 7% 7% 100%" }}
          >
            <span
              className={clsx(
                "body-02 block transform -rotate-45",
                selectedTimes.includes("morning") ? "text-black" : "text-gray3"
              )}
            >
              {timeSlots.morning}
            </span>
          </button>

          <button
            onClick={() => handleSelect("dinner")}
            className={clsx(
              "rounded-br-full bg-white border-2 transition-all",
              selectedTimes.includes("dinner")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
            style={{ borderRadius: "7% 7% 100% 7%" }}
          >
            <span
              className={clsx(
                "body-02 block transform -rotate-45",
                selectedTimes.includes("dinner") ? "text-black" : "text-gray3"
              )}
            >
              {timeSlots.dinner}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
