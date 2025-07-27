import React from "react";
import { useNavigate } from "react-router-dom";
import TimeSelector from "@/widgets/meeting/timeSelector";
import StepFormLayout from "@/shared/ui/StepFormLayout";

const Step1_3Page = () => {
  const navigate = useNavigate();

  const handleNext = () => {};

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <StepFormLayout
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={false} // TODO: 선택 여부에 따라 비활성화 처리
    >
      <TimeSelector />
    </StepFormLayout>
  );
};

export default Step1_3Page;
