import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DepartureInputForm from "@/widgets/meeting/departure";
import GroupPurposeForm from "@/widgets/meeting/groupPurposeForm";
const Step1_4Page = () => {
  const navigate = useNavigate();
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const handleNext = () => {
    navigate("/Plaza/step1_5");
    // 다음 단계 로직
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <StepFormLayout
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={false}
    >
      <GroupPurposeForm
        selectedPurpose={selectedPurpose}
        onPurposeSelect={setSelectedPurpose}
      />
    </StepFormLayout>
  );
};

export default Step1_4Page;
