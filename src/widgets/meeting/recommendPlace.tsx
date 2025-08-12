import type { Region } from "@/shared/api/meetingApi";

interface PlaceRecommendationProps {
  recommendation: Region;
}

const PlaceRecommendation = ({ recommendation }: PlaceRecommendationProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      {/* 제목 부분은 StepFormLayout으로 옮겨졌으므로 여기서는 제거해도 됩니다. 
          디자인에 따라 유지할 수도 있습니다. */}

      <div className="w-full rounded-lg bg-white p-3 shadow-md">
        {/* 2. Region 타입에 맞는 필드명을 사용합니다. */}
        <h3 className="title-02 text-center text-black">
          {recommendation.hotPlace}
        </h3>

        <img
          src={recommendation.hotPlaceImage}
          alt={recommendation.hotPlace}
          className="mt-2 h-48 w-full rounded-md object-cover bg-gray-200"
        />
        <button className="mt-3 flex w-full items-center justify-center rounded-md bg-sub01 py-2 body-02 text-black">
          <svg /* ... */>{/* ... */}</svg>
          컨텐츠 미리보기
        </button>
      </div>
    </div>
  );
};

export default PlaceRecommendation;
