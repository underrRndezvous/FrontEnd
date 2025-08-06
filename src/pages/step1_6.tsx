import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import MeetingSummary from "@/widgets/meeting/meetingSummary";
import { useMeetingStore } from "@/store/meetingStore";

const Step1_6Page = () => {
  const navigate = useNavigate();
  const { groupName } = useMeetingStore();

  const handleRecommend = () => {
    // TODO: 백엔드에 데이터 POST 요청 보내기
    navigate("/loading"); // 로딩 페이지로 이동
  };

  const handleEdit = () => {
    navigate("/Plaza/editMeetingPage"); // 첫 단계로 이동
  };

  return (
    <StepFormLayout
      title={`${groupName}의\n모임 장소를 추천해드릴게요`}
      subtitle="정보가 맞는지 한 번 더 확인해주세요"
      onNext={handleRecommend}
      onPrev={handleEdit}
      isNextDisabled={false}
      // StepFormLayout에 버튼 텍스트를 props로 전달할 수 있도록 수정이 필요합니다.
      // 예: nextButtonText="추천받기" prevButtonText="수정하기"
    >
      <MeetingSummary />
    </StepFormLayout>
  );
};

export default Step1_6Page;
