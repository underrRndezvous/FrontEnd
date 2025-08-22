import React from "react";
import DepartureInput from "@/shared/ui/departureUi";
import type { Departure } from "@/store/meetingStore";
import type { RegionItem } from "@/shared/hooks/useRegionSearch";
import { IconPlus } from "@/shared/ui/svg";

interface DepartureInputFormProps {
  departures: Departure[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
}

const DepartureInputForm = ({
  departures,
  onAdd,
  onRemove,
  onChange,
  onKeyDown,
}: DepartureInputFormProps) => {
  const handleRegionSelect = (id: number, region: RegionItem) => {
    onChange(id, region.fullAddress);
  };
  console.log("departures 배열:", departures);
  console.log("departures.length:", departures.length);
  console.log("조건 결과 (< 5):", departures.length < 5);

  return (
    <div className="flex w-full flex-col items-center gap-y-3">
      <div className="w-full flex flex-col gap-y-3 relative ">
        {departures.map((departure, index) => (
          <div
            key={departure.id}
            className="relative"
            style={{
              zIndex: departures.length - index + 10,
            }}
          >
            <DepartureInput
              variant={departure.type}
              value={departure.value}
              placeholder="(ex 서울특별시 서초구 서초동)"
              onChange={(e) => onChange(departure.id, e.target.value)}
              onKeyDown={(e) => onKeyDown(e, departure.id)}
              onRegionSelect={(region) =>
                handleRegionSelect(departure.id, region)
              }
              onRemove={
                departure.type === "member"
                  ? () => onRemove(departure.id)
                  : undefined
              }
            />
          </div>
        ))}
      </div>
      {departures.length < 5 && (
        <button
          onClick={onAdd}
          className="flex w-11/12 mx-auto items-center rounded-lg border-2 border-dashed border-gray-300 bg-white bg-opacity-50 p-3 text-left"
          style={{ zIndex: 1 }}
        >
          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
            <IconPlus />
          </div>
          <span className="body-02 text-gray3">출발지 추가</span>
        </button>
      )}
    </div>
  );
};

export default DepartureInputForm;
