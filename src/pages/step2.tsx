import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceRecommendation from "@/widgets/meeting/recommendPlace";
import { useMeetingStore } from "@/store/meetingStore";
import glassIcon from "@/shared/asset/images/glass.png";

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
      state: { allRecommendedRegions: recommendationData },
    });
  };

  const handleFindAnotherPlace = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const currentRecommendation = recommendationData[currentIndex];
  const isLastRecommendation = currentIndex === recommendationData.length - 1;

  const titleWithIcon = (
    <div className="flex items-center justify-center">
      <img src={glassIcon} alt="검색 캐릭터" className="w-16 h-16 mr-3" />
      <span className="text-left">{`{${groupName}}에\n딱 맞는 장소를 찾았어요!`}</span>
    </div>
  );

  return (
    <StepFormLayout
      title={titleWithIcon}
      subtitle=""
      onNext={handleSelect}
      onPrev={handleFindAnotherPlace}
      nextButtonText="이 장소 선택하기"
      prevButtonText="다른 장소 찾기"
      isPrevDisabled={isLastRecommendation}
      contentAlignment="start"
      isScrollable={false}
    >
      <PlaceRecommendation recommendation={currentRecommendation} />
    </StepFormLayout>
  );
};

export default Step2_Page;
