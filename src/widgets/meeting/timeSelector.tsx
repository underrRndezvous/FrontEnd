import clsx from "clsx";
import type { TimeType } from "@/store/meetingStore";
interface TimeSelectorProps {
  selectedTimes: TimeType[];
  onSelect: (id: string) => void;
}

const timeTypeToId: { [key in TimeType]?: string } = {
  MORNING: "morning",
  LUNCH: "lunch",
  AFTERNOON: "afternoon",
  EVENING: "evening",
};

const TimeSelector = ({ selectedTimes, onSelect }: TimeSelectorProps) => {
  const timeSlots = {
    lunch: "점심",
    afternoon: "오후",

    evening: "저녁",
    morning: "오전",
  };
  const selectedIds = selectedTimes.map((type) => timeTypeToId[type]);
  const textBaseStyle = "block transform -rotate-45";
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-64 w-64">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 transform rotate-45">
          <button
            onClick={() => onSelect("morning")}
            className={clsx(
              "relative rounded-tl-full bg-white border-2 transition-all",

              selectedIds.includes("morning")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute bottom-8 right-8",
                selectedIds.includes("morning")
                  ? "title-03 text-black"
                  : "body-02 text-gray3"
              )}
            >
              {timeSlots.morning}
            </span>
          </button>

          <button
            onClick={() => onSelect("lunch")}
            className={clsx(
              "relative rounded-tr-full bg-white border-2 transition-all",
              selectedIds.includes("lunch")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute bottom-8 left-8",
                selectedIds.includes("lunch")
                  ? "title-03 text-black"
                  : "body-02 text-gray3"
              )}
            >
              {timeSlots.lunch}
            </span>
          </button>

          <button
            onClick={() => onSelect("evening")}
            className={clsx(
              "relative rounded-bl-full bg-white border-2 transition-all",
              selectedIds.includes("evening")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute top-8 right-8",
                selectedIds.includes("evening")
                  ? "title-03 text-black"
                  : "body-02 text-gray3"
              )}
            >
              {timeSlots.evening}
            </span>
          </button>

          <button
            onClick={() => onSelect("afternoon")}
            className={clsx(
              "relative rounded-br-full bg-white border-2 transition-all",
              selectedIds.includes("afternoon")
                ? "shadow-glow-main border-main"
                : "border-gray1"
            )}
          >
            <span
              className={clsx(
                textBaseStyle,
                "absolute top-8 left-8",
                selectedIds.includes("afternoon")
                  ? "title-03 text-black"
                  : "body-02 text-gray3"
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
