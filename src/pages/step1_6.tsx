import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import MeetingSummary from "@/widgets/meeting/meetingSummary";
import { useMeetingStore } from "@/store/meetingStore";
import { postMeetingInfo } from "@/shared/api/meetingApi";
import { useMutation } from "@tanstack/react-query";

const Step1_6Page = () => {
  const navigate = useNavigate();
  const meetingData = useMeetingStore();

  // const { groupName } = useMeetingStore();
  // const { mutate: recommendMeeting, isPending } = useMutation({
  //   mutationFn: postMeetingInfo,
  //   onSuccess: (data) => {
  //     // 성공 시, 응답 데이터(data)를 가지고 로딩 페이지로 이동
  //     // 예시: navigate(`/loading/${data.recommendationId}`);
  //     navigate("/loading");
  //   },
  //   onError: (error) => {
  //     console.error("추천 요청 실패:", error);
  //     alert("오류가 발생했습니다. 다시 시도해주세요.");
  //   },
  // });

  const handleRecommend = () => {
    // recommendMeeting(meetingData);
    navigate("/Plaza/loading");
  };

  const handleEdit = () => {
    navigate("/Plaza/editMeetingPage");
  };

  return (
    <StepFormLayout
      title={`{ ${meetingData.groupName} } 의\n모임 장소를 추천해드릴게요`}
      subtitle="정보가 맞는지 한 번 더 확인해주세요"
      onNext={handleRecommend}
      onPrev={handleEdit}
      nextButtonText="추천받기"
      prevButtonText="수정하기"
      // isNextDisabled={isPending}
    >
      <MeetingSummary />
    </StepFormLayout>
  );
};

export default Step1_6Page;
