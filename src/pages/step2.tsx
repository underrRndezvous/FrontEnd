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
  const [showToast, setShowToast] = useState(false);

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const recommendationData = location.state?.recommendations;
  const meetingId = location.state?.meetingId;

  const totalRecommendations = recommendationData?.length || 0;

  if (!recommendationData || totalRecommendations === 0) {
    return <div>추천 정보를 불러올 수 없습니다.</div>;
  }

  const handleSelect = () => {
    navigate("/plaza/step3", {
      state: {
        allRecommendedRegions: recommendationData,
        selectedRegion: currentRecommendation,
        meetingId: meetingId,
      },
    });
  };

  const handleFindAnotherPlace = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalRecommendations) {
      return;
    }

    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);

      if (nextIndex === totalRecommendations - 1) {
        setIsReviewMode(true);
        setHasReachedEnd(true);
      }
      setIsChanging(false);
    }, 300);

    const changesLeft = totalRecommendations - 1 - nextIndex;
    if (changesLeft >= 0) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const handleGoPrevious = () => {
    if (currentIndex > 0) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setIsChanging(false);
      }, 300);
    }
  };

  const handleReview = () => {
    setIsChanging(true);
    setTimeout(() => {
      let nextIndex;
      if (currentIndex < totalRecommendations - 1) {
        nextIndex = currentIndex + 1;
      } else {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      setIsChanging(false);
    }, 300);
  };

  const currentRecommendation = recommendationData[currentIndex];

  if (!currentRecommendation) {
    return (
      <AnimatedPageLayout>
        <div>데이터를 불러오는 중...</div>
      </AnimatedPageLayout>
    );
  }

  const isAtFirstRecommendation = currentIndex === 0;
  const isAtLastRecommendation = currentIndex === totalRecommendations - 1;

  const getPrevButtonProps = () => {
    if (!isReviewMode) {
      return {
        text: "다른 장소 찾기",
        handler: handleFindAnotherPlace,
        disabled: false,
      };
    } else if (hasReachedEnd) {
      return {
        text: "다시보기",
        handler: handleReview,
        disabled: false,
      };
    } else {
      return {
        text: "이전",
        handler: handleGoPrevious,
        disabled: false,
      };
    }
  };

  const prevButtonProps = getPrevButtonProps();

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
        onPrev={prevButtonProps.handler}
        nextButtonText="이 장소 선택하기"
        prevButtonText={prevButtonProps.text}
        isPrevDisabled={prevButtonProps.disabled}
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
              다른 장소 찾기 기회가 {totalRecommendations - 1 - currentIndex}회
              남았어요
            </p>
            <p className="text-xs text-gray-300 text-center mt-1">
              (총 {totalRecommendations}개의 장소를 추천받을 수 있어요)
            </p>
          </div>
        </div>
      )}
    </AnimatedPageLayout>
  );
};

export default Step2_Page;
