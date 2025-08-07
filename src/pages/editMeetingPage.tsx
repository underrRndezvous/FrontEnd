import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import { useMeetingStore } from "@/store/meetingStore";
import clsx from "clsx";

import GroupNameForm from "@/widgets/meeting/groupNameForm";
import PlaceTypeForm from "@/widgets/meeting/placeTypeForm";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";

const EditMeetingPage = () => {
  const navigate = useNavigate();

  const {
    groupName,
    setGroupName,
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

  const handleItemClick = () => {};
  const handleAddPlace = () =>
    setPlaces([...places, { id: Date.now(), type: null, subType: null }]);
  const handleRemovePlace = (id: number) =>
    setPlaces(places.filter((p) => p.id !== id));
  const handleAddDeparture = () =>
    setDepartures([
      ...departures,
      { id: Date.now(), value: "", type: "member" },
    ]);
  const handleRemoveDeparture = (id: number) =>
    setDepartures(departures.filter((d) => d.id !== id));
  const handleChangeDeparture = (id: number, value: string) =>
    setDepartures(departures.map((d) => (d.id === id ? { ...d, value } : d)));

  const handleSave = () => {
    navigate("/Plaza/step1_6");
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <StepFormLayout
      title="정보 수정하기"
      subtitle="모임 정보를 수정할 수 있어요"
      onNext={handleSave}
      onPrev={handleCancel}
      nextButtonText="저장"
      prevButtonText="취소"
      isScrollable={true}
      contentAlignment="start"
    >
      <div className="w-full space-y-8">
        {/* 모임 목적 */}
        <section className="flex items-center justify-between">
          <h3 className="body-01 font-semibold">모임 목적</h3>
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

        {/* 모임 시간 */}
        <section className="space-y-2">
          <h3 className="body-01 font-semibold text-left">모임 시간</h3>
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
          <h3 className="body-01 font-semibold text-left mb-2">장소 유형</h3>
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
          <h3 className="body-01 font-semibold text-left mb-2">출발 위치</h3>
          <DepartureInputForm
            departures={departures}
            onAdd={handleAddDeparture}
            onRemove={handleRemoveDeparture}
            onChange={handleChangeDeparture}
            onKeyDown={() => {}}
          />
        </section>
      </div>
    </StepFormLayout>
  );
};

export default EditMeetingPage;
