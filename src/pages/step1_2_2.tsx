import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DaySelector from "@/widgets/meeting/daySelector";
import { useMeetingStore } from "@/store/meetingStore";

const Step1_2_2Page = () => {
  const navigate = useNavigate();
  const { selectedDays, setSelectedDays } = useMeetingStore();

  const handleNext = () => {
    navigate("/Plaza/step1_3");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleSelectDay = (day: string) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);
  };

  const isNextDisabled = selectedDays.length === 0;

  return (
    <StepFormLayout
      title="어떤 요일에 모일 예정인가요?"
      subtitle="모임 예정 요일을 모두 선택해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      <DaySelector selectedDays={selectedDays} onSelect={handleSelectDay} />
    </StepFormLayout>
  );
};

export default Step1_2_2Page;
