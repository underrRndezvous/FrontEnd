import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import EditMeetingForm from "@/widgets/meeting/editMeetingForm";
import { useMeetingStore } from "@/store/meetingStore";

const EditMeetingPage = () => {
  const navigate = useNavigate();
  // Zustand 스토어에서 모든 상태와 상태 변경 함수를 가져옵니다.
  const store = useMeetingStore();
  const {
    selectedTimes,
    setSelectedTimes,
    places,
    setPlaces,
    departures,
    setDepartures,
  } = store;

  const handleSave = () => {
    navigate("/Plaza/step1_6");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 핸들러 함수들을 페이지에서 정의합니다.
  const handleTimeSelect = (time: string) => {
    const newTimes = selectedTimes.includes(time)
      ? selectedTimes.filter((t) => t !== time)
      : [...selectedTimes, time];
    setSelectedTimes(newTimes);
  };

  const handleItemClick = (id: number) => console.log("Edit item:", id);
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
      <EditMeetingForm
        {...store}
        onGroupPurposeChange={(e) => store.setGroupPurpose(e.target.value)}
        onTimeSelect={handleTimeSelect}
        onItemClick={handleItemClick}
        onAddPlace={handleAddPlace}
        onRemovePlace={handleRemovePlace}
        onAddDeparture={handleAddDeparture}
        onRemoveDeparture={handleRemoveDeparture}
        onChangeDeparture={handleChangeDeparture}
      />
    </StepFormLayout>
  );
};

export default EditMeetingPage;
