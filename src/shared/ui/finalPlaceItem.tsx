import React from "react";
import clsx from "clsx";
import type { RecommendedPlace } from "@/shared/api/meetingApi";

interface FinalPlaceItemProps {
  place: RecommendedPlace;
  index: number;
}

const FinalPlaceItem = ({ place, index }: FinalPlaceItemProps) => {
  return (
    <div className="flex w-full items-center gap-x-3 py-2 border-b last:border-b-0">
      <div className="flex flex-grow items-center rounded-md p-1 text-left">
        <div
          className={clsx(
            "mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-sm",
            "bg-main text-black"
          )}
        >
          {index + 1}
        </div>

        <div className="flex-grow text-left">
          <span className={clsx("body-02", "text-black")}>
            {place.storeName}
          </span>
          <p className="caption-01 text-gray3">{place.category}</p>
        </div>
      </div>
    </div>
  );
};

export default FinalPlaceItem;
