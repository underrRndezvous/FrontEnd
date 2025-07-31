import React, { useState } from "react";
import DepartureInput from "@/shared/ui/departureUi";

interface Departure {
  id: number;
  value: string;
  type: "leader" | "member";
}

const DepartureInputForm = () => {
  const [departures, setDepartures] = useState<Departure[]>([
    { id: 1, value: "", type: "leader" },
    { id: 2, value: "", type: "member" },
  ]);

  const handleAdd = () => {
    // 최대 인원수 설정 ? 아직
    if (departures.length >= 5) return;
    const newDeparture: Departure = {
      id: Date.now(),
      value: "",
      type: "member",
    };
    setDepartures((prev) => [...prev, newDeparture]);
  };
  const handleRemove = (idToRemove: number) => {
    setDepartures((prev) => prev.filter((dep) => dep.id !== idToRemove));
  };
  const handleChange = (id: number, newValue: string) => {
    setDepartures((prev) =>
      prev.map((dep) => (dep.id === id ? { ...dep, value: newValue } : dep))
    );
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      const currentInput = departures.find((d) => d.id === id);
      const isLastInput = departures[departures.length - 1].id === id;

      // 마지막 입력창이고, 값이 있고, 모임원 타입이면 새상자 추가
      if (
        currentInput?.type === "member" &&
        isLastInput &&
        currentInput.value !== ""
      ) {
        handleAdd();
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-3 text-center pb-36">
      {departures.map((departure) => (
        <DepartureInput
          key={departure.id}
          variant={departure.type}
          value={departure.value}
          placeholder="출발지 입력"
          onChange={(e) => handleChange(departure.id, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, departure.id)}
          // 모임장(leader)이 아닐 때만 삭제 함수를 전달
          onRemove={
            departure.type === "member"
              ? () => handleRemove(departure.id)
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default DepartureInputForm;
