import React from "react";
import { useNavigate } from "react-router-dom";
import DepartureInputForm from "@/widgets/meeting/departure";
import StepFormLayout from "@/shared/ui/StepFormLayout";

const Step1_5Page = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // 다음 단계 로직
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <StepFormLayout
      title="어떤 장소 유형이 필요한가요?"
      subtitle="모임에 필요한 장소 유형과 순서를 정해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={false}
    >
      <div className="flex h-full w-full flex-col justify-start pt-10">
        <DepartureInputForm />
      </div>
    </StepFormLayout>
  );
};

export default Step1_5Page;
