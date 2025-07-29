import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupPurposeForm from "@/widgets/meeting/groupPurposeForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";

const Step1_2Page = () => {
  const navigate = useNavigate();
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);

  const handleNext = () => {
    navigate("/Plaza/step1_3");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const isNextDisabled = selectedPurpose === null;

  return (
    <StepFormLayout
      title="어떤 모임인가요?"
      subtitle="모임 목적을 선택해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      <GroupPurposeForm
        selectedPurpose={selectedPurpose}
        onPurposeSelect={setSelectedPurpose}
      />
    </StepFormLayout>
  );
};

export default Step1_2Page;
