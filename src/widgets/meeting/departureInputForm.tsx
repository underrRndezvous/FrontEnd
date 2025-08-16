// import React from "react";
// import DepartureInput from "@/shared/ui/departureUi";
// import type { Departure } from "@/store/meetingStore";
// import type { RegionItem } from "@/shared/hooks/useRegionSearch";
// import { IconPlus } from "@/shared/ui/svg";

// interface DepartureInputFormProps {
//   departures: Departure[];
//   onAdd: () => void;
//   onRemove: (id: number) => void;
//   onChange: (id: number, value: string) => void;
//   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
// }

// const DepartureInputForm = ({
//   departures,
//   // setDepartures,
//   onAdd,
//   onRemove,
//   onChange,
//   onKeyDown,
// }: DepartureInputFormProps) => {
//   const handleRegionSelect = (id: number, region: RegionItem) => {
//     onChange(id, region.fullAddress);
//   };

//   return (
//     <div className="flex w-full flex-col items-center gap-y-3">
//       <div className="w-full flex flex-col gap-y-3 max-h-60 relative pr-2">
//         {departures.map((departure) => (
//           <DepartureInput
//             key={departure.id}
//             variant={departure.type}
//             value={departure.value}
//             placeholder="출발지 입력 (예: 서울시 서초구 서초동)"
//             onChange={(e) => onChange(departure.id, e.target.value)}
//             onKeyDown={(e) => onKeyDown(e, departure.id)}
//             onRegionSelect={(region) =>
//               handleRegionSelect(departure.id, region)
//             }
//             onRemove={
//               departure.type === "member"
//                 ? () => onRemove(departure.id)
//                 : undefined
//             }
//           />
//         ))}
//       </div>
//       {departures.length < 8 && (
//         <button
//           onClick={onAdd}
//           className="flex w-11/12 mx-auto items-center rounded-lg border-2 border-dashed border-gray-300 bg-white bg-opacity-50 p-3 text-left"
//         >
//           <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray1 text-sm">
//             <IconPlus />
//           </div>
//           <span className="body-02 text-gray3">출발지 추가</span>
//         </button>
//       )}
//     </div>
//   );
// };

// export default DepartureInputForm;
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

  return (
    <div className="flex w-full flex-col items-center gap-y-3">
      <div className="w-full flex flex-col gap-y-3 relative">
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
              placeholder="출발지 입력 (예: 서울시 서초구 서초동)"
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
      {departures.length < 8 && (
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
