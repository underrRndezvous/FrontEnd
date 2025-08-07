import React from "react";
import { useNavigate } from "react-router-dom";
import GroupPurposeForm from "@/widgets/meeting/groupPurposeForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import { useMeetingStore } from "@/store/meetingStore"; // ✅ 1. Zustand 스토어를 import 합니다.

const Step1_2Page = () => {
  const navigate = useNavigate();
  const { groupPurpose, setGroupPurpose } = useMeetingStore();

  const handleNext = () => {
    navigate("/Plaza/step1_3");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const isNextDisabled = groupPurpose === null;

  return (
    <StepFormLayout
      title="어떤 모임인가요?"
      subtitle="모임 목적을 선택해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      <GroupPurposeForm
        selectedPurpose={groupPurpose}
        onPurposeSelect={setGroupPurpose}
      />
    </StepFormLayout>
  );
};

export default Step1_2Page;
