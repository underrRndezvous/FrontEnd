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
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border-2 border-gray-300 shadow-lg p-0 overflow-hidden">
      {/* 모임 목적 */}
      <section className="p-4 border-b-2 border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">모임 목적</h3>
          <select
            value={groupPurpose || ""}
            onChange={(e) => setGroupPurpose(e.target.value)}
            className="min-w-[100px] px-3 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {purposeOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 모임 시간 */}
      <section className="p-4 border-b-2 border-gray-200 bg-white">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">모임 시간</h3>
        <div className="grid grid-cols-4 gap-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={clsx(
                "px-3 py-2 text-sm rounded-md border transition-colors",
                selectedTimes.includes(time)
                  ? "bg-green-400 text-black border-green-400"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </section>

      {/* 장소 유형 */}
      <section className="p-4 border-b-2 border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">장소 유형</h3>
          <button
            onClick={handleAddPlace}
            className="text-sm text-blue-500 font-medium hover:text-blue-600"
          >
            추가
          </button>
        </div>
        <PlaceTypeForm
          places={places}
          setPlaces={setPlaces}
          onItemClick={handleItemClick}
          onAdd={handleAddPlace}
          onRemove={handleRemovePlace}
        />
      </section>

      {/* 출발 위치 */}
      <section className="p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">출발 위치</h3>
          <button
            onClick={handleAddDeparture}
            className="text-sm text-blue-500 font-medium hover:text-blue-600"
          >
            추가
          </button>
        </div>
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
