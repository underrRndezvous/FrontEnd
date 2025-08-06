import React from "react"; // useState는 이제 사용하지 않으므로 제거합니다.
import { useNavigate } from "react-router-dom";
import GroupPurposeForm from "@/widgets/meeting/groupPurposeForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import { useMeetingStore } from "@/store/meetingStore"; // ✅ 1. Zustand 스토어를 import 합니다.

const Step1_2Page = () => {
  const navigate = useNavigate();
  // ✅ 2. useState 대신 useMeetingStore에서 groupPurpose와 setGroupPurpose를 가져옵니다.
  const { groupPurpose, setGroupPurpose } = useMeetingStore();

  const handleNext = () => {
    // setGroupPurpose를 통해 이미 전역 스토어에 저장됩니다.
    navigate("/Plaza/step1_3");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  // ✅ 전역 상태인 groupPurpose를 사용하여 '다음' 버튼 활성화 여부를 결정합니다.
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
