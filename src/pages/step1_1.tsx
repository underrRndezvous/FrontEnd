import React from "react"; // useState는 이제 필요 없으므로 React만 import 합니다.
import { useNavigate } from "react-router-dom";
import GroupNameForm from "@/widgets/meeting/groupNameForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import { useMeetingStore } from "@/store/meetingStore"; // ✅ Zustand 스토어를 import 합니다.

const Step1_1Page = () => {
  const navigate = useNavigate();
  // ✅ useState 대신 useMeetingStore에서 groupName과 setGroupName을 가져옵니다.
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
