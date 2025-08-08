import React from "react";
import clsx from "clsx";
import { useMeetingStore } from "@/store/meetingStore";

import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";

const EditMeetingForm = () => {
  const {
    groupPurpose,
    setGroupPurpose,
    selectedTimes,
    setSelectedTimes,
    places,
    setPlaces,
    departures,
    setDepartures,
  } = useMeetingStore();

  const purposeOptions = [
    { id: "", label: "선택", disabled: true },
    { id: "date", label: "데이트" },
    { id: "business", label: "비즈니스" },
    { id: "study", label: "스터디" },
    { id: "social", label: "친목" },
  ];

  const timeOptions = ["오전", "점심", "오후", "저녁"];

  const handleTimeSelect = (time: string) => {
    const newTimes = selectedTimes.includes(time)
      ? selectedTimes.filter((t) => t !== time)
      : [...selectedTimes, time];
    setSelectedTimes(newTimes);
  };

  // PlaceTypeForm과 DepartureInputForm에 필요한 핸들러 함수들
  const handleItemClick = (id: number) => {
    // 수정 페이지에서는 오버레이를 띄우지 않으므로, 페이지에서 다시 구현해야 합니다.
    console.log("Edit item:", id);
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
    <div className="w-full space-y-6 rounded-lg border border-main bg-white p-6">
      <section className="flex items-center gap-x-4">
        <h3 className="title-03 text-black">모임 목적</h3>
        <div className="flex-grow" />
        <select
          value={groupPurpose || ""}
          onChange={(e) => setGroupPurpose(e.target.value)}
          className="w-24 rounded-md border border-gray2 p-2 body-02 text-center text-gray3"
        >
          {purposeOptions.map((opt) => (
            <option key={opt.id} value={opt.id} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      <hr className="border-gray-100" />

      {/* 모임 시간 */}
      <section className="flex flex-col items-start gap-y-3">
        <h3 className="title-03 text-left">모임 시간</h3>
        <div className="w-full flex gap-x-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={clsx(
                "flex-1 rounded-md px-3 py-1 body-02 transition-colors",
                selectedTimes.includes(time)
                  ? "bg-main text-black"
                  : "bg-gray-200 text-gray-500"
                // 수정
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 장소 유형 */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="title-03 text-left">장소 유형</h3>
        </div>
        <PlaceTypeForm
          places={places}
          setPlaces={setPlaces}
          onItemClick={handleItemClick}
          onAdd={handleAddPlace}
          onRemove={handleRemovePlace}
          isEditPage={true}
        />
      </section>

      <hr className="border-gray-100" />

      {/* 출발 위치 */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="title-03 text-left ">출발 위치</h3>
        </div>
        <DepartureInputForm
          departures={departures}
          setDepartures={setDepartures}
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
