import React from "react";
import clsx from "clsx";
import { useMeetingStore } from "@/store/meetingStore";

// 각 스텝의 폼 위젯들을 모두 import 합니다.
import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";

const EditMeetingForm = () => {
  // Zustand 스토어에서 모든 상태와 상태 변경 함수를 가져옵니다.
  const {
    groupPurpose,
    setGroupPurpose,
    selectedTimes,
    setSelectedTimes, // 배열을 다루도록 수정
    places,
    setPlaces,
    departures,
    setDepartures,
  } = useMeetingStore();

  const purposeOptions = [
    { id: "date", label: "데이트" },
    { id: "business", label: "비즈니스" },
    { id: "study", label: "스터디" },
    { id: "social", label: "친목" },
  ];
  const timeOptions = ["오전", "점심", "오후", "저녁"];

  const handleTimeSelect = (time: string) => {
    // 다중 선택을 위한 토글 로직
    const newTimes = selectedTimes.includes(time)
      ? selectedTimes.filter((t) => t !== time)
      : [...selectedTimes, time];
    setSelectedTimes(newTimes);
  };

  // PlaceTypeForm, DepartureInputForm에 필요한 핸들러 함수들
  // 수정 페이지에서는 오버레이를 띄우지 않으므로, 간단한 핸들러만 필요
  const handleItemClick = (id: number) => {
    console.log("수정할 장소 ID:", id, "(오버레이 로직은 페이지에 있습니다)");
  };
  const handleAddPlace = () => {
    if (places.length < 5) {
      setPlaces([...places, { id: Date.now(), type: null, subType: null }]);
    }
  };
  const handleRemovePlace = (id: number) => {
    if (places.length > 1) {
      setPlaces(places.filter((p) => p.id !== id));
    }
  };
  const handleAddDeparture = () => {
    if (departures.length < 5) {
      setDepartures([
        ...departures,
        { id: Date.now(), value: "", type: "member" },
      ]);
    }
  };
  const handleRemoveDeparture = (id: number) => {
    if (departures.length > 1) {
      setDepartures(departures.filter((d) => d.id !== id));
    }
  };
  const handleChangeDeparture = (id: number, value: string) => {
    setDepartures(departures.map((d) => (d.id === id ? { ...d, value } : d)));
  };

  return (
    <div className="w-full space-y-8">
      {/* 모임 목적 (드롭다운) */}
      <section className="flex items-center justify-between">
        <h3 className="body-01 font-semibold text-gray-800">모임 목적</h3>
        <select
          value={groupPurpose || ""}
          onChange={(e) => setGroupPurpose(e.target.value)}
          className="rounded-md border border-gray-300 p-2 body-02"
        >
          {purposeOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      {/* 모임 시간 (토글 버튼) */}
      <section className="space-y-2">
        <h3 className="body-01 font-semibold text-left text-gray-800">
          모임 시간
        </h3>
        <div className="flex gap-x-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={clsx(
                "flex-1 rounded-md px-3 py-1 body-02 transition-colors",
                selectedTimes.includes(time)
                  ? "bg-main text-black"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </section>

      {/* 장소 유형 */}
      <section>
        <h3 className="body-01 font-semibold text-left mb-2 text-gray-800">
          장소 유형
        </h3>
        <PlaceTypeForm
          places={places}
          setPlaces={setPlaces}
          onItemClick={handleItemClick}
          onAdd={handleAddPlace}
          onRemove={handleRemovePlace}
        />
      </section>

      {/* 출발 위치 */}
      <section>
        <h3 className="body-01 font-semibold text-left mb-2 text-gray-800">
          출발 위치
        </h3>
        <DepartureInputForm
          departures={departures}
          onAdd={handleAddDeparture}
          onRemove={handleRemoveDeparture}
          onChange={handleChangeDeparture}
          onKeyDown={() => {}}
        />
      </section>
    </div>
  );
};

export default EditMeetingForm;
