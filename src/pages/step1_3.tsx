import React from "react";
import { useNavigate } from "react-router-dom";
import TimeSelector from "@/widgets/meeting/timeSelector";
import StepFormLayout from "@/shared/ui/StepFormLayout";

const Step1_3Page = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/Plaza/step1_4");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <StepFormLayout
      title="어떤 모임인가요?"
      subtitle="모임 목적을 선택해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={false} // TODO: 선택 여부에 따라 비활성화 처리
    >
      <TimeSelector />
    </StepFormLayout>
  );
};

export default Step1_3Page;
