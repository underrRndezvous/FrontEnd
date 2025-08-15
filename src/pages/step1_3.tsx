import React from "react";
import { useNavigate } from "react-router-dom";
import TimeSelector from "@/widgets/meeting/timeSelector";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import { useMeetingStore, type TimeType } from "@/store/meetingStore";

const timeIdToType: { [key: string]: TimeType } = {
  morning: "MORNING",
  lunch: "LUNCH",
  afternoon: "AFTERNOON",
  evening: "EVENING",
};

const Step1_3Page = () => {
  const navigate = useNavigate();
  const { meetTime: selectedTimes, setMeetTime: setSelectedTimes } =
    useMeetingStore();

  const handleNext = () => {
    navigate("/Plaza/step1_4");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleSelectTime = (id: string) => {
    const timeType = timeIdToType[id];
    if (!timeType) return;

    const newSelectedTimes = selectedTimes.includes(timeType)
      ? selectedTimes.filter((item) => item !== timeType)
      : [...selectedTimes, timeType];

    setSelectedTimes(newSelectedTimes);
  };

  const isNextDisabled = selectedTimes.length === 0;

  return (
    <StepFormLayout
      title="언제 모일 예정인가요?"
      subtitle="모임 시간대를 모두 선택해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      <TimeSelector selectedTimes={selectedTimes} onSelect={handleSelectTime} />
    </StepFormLayout>
  );
};

export default Step1_3Page;
