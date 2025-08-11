import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceRecommendation from "@/widgets/meeting/recommendPlace";

const Step2_Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const recommendationData = location.state?.recommendations;

  if (!recommendationData) {
    return <div>추천 정보를 불러올 수 없습니다.</div>;
  }

  const handleSelect = () => {
    /* ... */
  };
  const handleRetry = () => {
    navigate("/plaza/loading");
  };

  return (
    <StepFormLayout
      title=""
      subtitle=""
      onNext={handleSelect}
      onPrev={handleRetry}
      nextButtonText="이 장소 선택하기"
      prevButtonText="다른 장소 찾기"
      isNextDisabled={false}
    >
      <PlaceRecommendation recommendation={recommendationData} />
    </StepFormLayout>
  );
};

export default Step2_Page;
