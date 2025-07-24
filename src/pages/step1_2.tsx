import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupPurposeForm from "@/widgets/meeting/groupPurposeForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";

const Step1_2Page = () => {
  const navigate = useNavigate();
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);

  const handleNext = () => {
    console.log("선택된 모임 목적:", selectedPurpose);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const isNextDisabled = selectedPurpose === null;

  return (
    <StepFormLayout
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
