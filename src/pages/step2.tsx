import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceRecommendation from "@/widgets/meeting/recommendPlace";
import { useMeetingStore } from "@/store/meetingStore";

const Step2_Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupName } = useMeetingStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  const recommendationData = location.state?.recommendations;

  if (!recommendationData || recommendationData.length === 0) {
    return <div>추천 정보를 불러올 수 없습니다.</div>;
  }

  const handleSelect = () => {
    navigate("/plaza/step3", {
      state: { selectedRegion: currentRecommendation },
    });
  };
  const handleFindAnotherPlace = () => {
    // 다음 인덱스로 상태를 업데이트합니다.
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const currentRecommendation = recommendationData[currentIndex];
  const isLastRecommendation = currentIndex === recommendationData.length - 1;

  return (
    <StepFormLayout
      title={`{${groupName}}에\n딱 맞는 장소를 찾았어요!`}
      subtitle=""
      onNext={handleSelect}
      onPrev={handleFindAnotherPlace}
      nextButtonText="이 장소 선택하기"
      prevButtonText="다른 장소 찾기"
      isPrevDisabled={isLastRecommendation}
    >
      <PlaceRecommendation recommendation={currentRecommendation} />
    </StepFormLayout>
  );
};

export default Step2_Page;
