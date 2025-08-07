import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import MeetingSummary from "@/widgets/meeting/meetingSummary";
import { useMeetingStore } from "@/store/meetingStore";

const Step1_6Page = () => {
  const navigate = useNavigate();
  const { groupName } = useMeetingStore();

  const handleRecommend = () => {
    navigate("/loading");
  };

  const handleEdit = () => {
    navigate("/Plaza/editMeetingPage");
  };

  return (
    <StepFormLayout
      title={`{ ${groupName} } 의\n모임 장소를 추천해드릴게요`}
      subtitle="정보가 맞는지 한 번 더 확인해주세요"
      onNext={handleRecommend}
      onPrev={handleEdit}
      nextButtonText="추천받기"
      prevButtonText="수정하기"
      isNextDisabled={false}
    >
      <MeetingSummary />
    </StepFormLayout>
  );
};

export default Step1_6Page;
