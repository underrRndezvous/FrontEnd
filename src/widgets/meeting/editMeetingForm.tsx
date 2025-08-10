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
    // { id: "", label: "선택", disabled: true },
    { id: "date", label: "데이트" },
    { id: "business", label: "비즈니스" },
    { id: "study", label: "스터디" },
    { id: "social", label: "친목" },
  ];

  const timeOptions = [
    { key: "morning", label: "오전" },
    { key: "lunch", label: "점심" },
    { key: "afternoon", label: "오후" },
    { key: "dinner", label: "저녁" },
  ];

  const handleTimeSelect = (timeKey: string) => {
    const isAlreadySelected = selectedTimes.includes(timeKey);

    if (isAlreadySelected) {
      setSelectedTimes(selectedTimes.filter((t) => t !== timeKey));
    } else {
      setSelectedTimes([...selectedTimes, timeKey]);
    }
  };

  const handleItemClick = (id: number) => {
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
      <section className="flex flex-col items-start gap-y-3">
        <h3 className="body-01 font-semibold text-left text-gray-800">
          모임 목적
        </h3>
        <div className="w-full grid grid-cols-4 gap-x-2">
          {purposeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setGroupPurpose(opt.id)}
              className={clsx(
                "rounded-md border py-1 body-02 transition-colors whitespace-nowrap",
                groupPurpose === opt.id
                  ? "border-main bg-sub02 text-black"
                  : "border-gray2 bg-white text-gray3"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>
      <hr className="border-gray-100" />

      <section className="flex flex-col items-start gap-y-3">
        <h3 className="body-01 font-semibold text-left text-gray-800">
          모임 시간
        </h3>
        <div className="w-full grid grid-cols-4 gap-x-2">
          {timeOptions.map((time) => (
            <button
              key={time.key}
              onClick={() => handleTimeSelect(time.key)}
              className={clsx(
                "rounded-md border py-1 body-02 transition-colors",
                selectedTimes.includes(time.key)
                  ? "border-main bg-sub02 text-black"
                  : "border-gray2 bg-white text-gray3"
              )}
            >
              {time.label}
            </button>
          ))}
        </div>
      </section>

      <hr className="border-gray-100" />

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
