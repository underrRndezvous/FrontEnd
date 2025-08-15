import React from "react";
import { useNavigate } from "react-router-dom";
import GroupNameForm from "@/widgets/meeting/groupNameForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import { useMeetingStore } from "@/store/meetingStore";

const Step1_1Page = () => {
  const navigate = useNavigate();
  const { groupName, setGroupName } = useMeetingStore();

  const handleNext = () => {
    console.log("전역 스토어에 저장된 모임 이름:", groupName);
    navigate("/Plaza/step1_2");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const isNextDisabled = groupName.trim() === "";

  return (
    <StepFormLayout
      title="모임 이름은 무엇인가요?"
      subtitle="모임 이름을 입력해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      <GroupNameForm groupName={groupName} onGroupNameChange={setGroupName} />
    </StepFormLayout>
  );
};

export default Step1_1Page;
