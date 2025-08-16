import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import PlaceRecommendation from "@/widgets/meeting/recommendPlace";
import { useMeetingStore } from "@/store/meetingStore";
import glassIcon from "@/shared/asset/images/glass.png";
import AnimatedPageLayout from "@/shared/layout";

const Step2_Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupName } = useMeetingStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [remainingChanges, setRemainingChanges] = useState(3);
  const [showToast, setShowToast] = useState(false);

  const recommendationData = location.state?.recommendations;

  useEffect(() => {
    if (recommendationData) {
      console.log("✅ 추천 장소 데이터 전체:", recommendationData);
      console.log(`📍 추천된 지역 개수: ${recommendationData.length}개`);

      const regionNames = recommendationData.map(
        (region: any, index: number) => `${index + 1}. ${region.hotPlace}`
      );
      console.log("📜 추천 지역 목록:", regionNames);
    } else {
      console.log("⚠️ 추천 장소 데이터가 없습니다.");
    }
  }, [recommendationData]);

  if (!recommendationData || recommendationData.length === 0) {
    return <div>추천 정보를 불러올 수 없습니다.</div>;
  }

  const handleSelect = () => {
    navigate("/plaza/step3", {
      state: {
        allRecommendedRegions: recommendationData,

        selectedRegion: currentRecommendation,
      },
    });
  };

  const handleFindAnotherPlace = () => {
    if (remainingChanges <= 0) {
      return;
    }

    setIsChanging(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsChanging(false);

      const newRemainingChanges = remainingChanges - 1;
      setRemainingChanges(newRemainingChanges);

      if (newRemainingChanges > 0) {
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    }, 300);
  };

  const currentRecommendation = recommendationData[currentIndex];
  const isLastRecommendation =
    currentIndex === recommendationData.length - 1 || remainingChanges <= 0;

  const titleWithIcon = (
    <div className="flex items-center justify-center">
      <img
        src={glassIcon}
        alt="검색 캐릭터"
        className="w-16 h-16 mr-3 transform scale-150"
        style={{ transformOrigin: "center" }}
      />
      <span className="text-left">{`  ${groupName}에\n딱 맞는 장소를 찾았어요!`}</span>
    </div>
  );

  return (
    <AnimatedPageLayout>
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
        <PlaceRecommendation
          recommendation={currentRecommendation}
          isChanging={isChanging}
        />
      </StepFormLayout>

      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg max-w-sm">
            <p className="text-sm font-medium text-center">
              다른 장소 찾기 기회가 {remainingChanges - 1}회 남았어요
            </p>
            <p className="text-xs text-gray-300 text-center mt-1">
              (총 3개의 장소를 추천받을 수 있어요)
            </p>
          </div>
        </div>
      )}
    </AnimatedPageLayout>
  );
};

export default Step2_Page;
