import React from "react";
import { useMeetingStore } from "@/store/meetingStore";
import glassImage from "@/shared/asset/images/glass.png";

interface Recommendation {
  placeName: string;
  imageUrl: string;
}

interface PlaceRecommendationProps {
  recommendation: Recommendation;
}

const PlaceRecommendation = ({ recommendation }: PlaceRecommendationProps) => {
  const groupName = useMeetingStore((state) => state.groupName) || "모임명";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative mb-4 w-full flex items-center justify-center rounded-lg bg-white p-4 shadow-md">
        <img
          src={glassImage}
          alt="돋보기 캐릭터"
          className="absolute -left-4 -top-8 h-20 w-20"
        />

        <p className="title-03 text-black leading-snug">
          {" "}
          <span>{groupName}</span>에 <br /> 딱 맞는 장소를 찾았어요!
        </p>
      </div>

      <div className="w-full rounded-lg bg-white p-3 shadow-md">
        <h3 className="title-02 text-center text-black">
          {recommendation.placeName}
        </h3>

        <img
          src={recommendation.imageUrl}
          alt={recommendation.placeName}
          className="mt-2 h-48 w-full rounded-md object-cover bg-gray-200"
        />
        <button className="mt-3 flex w-full items-center justify-center rounded-md bg-sub01 py-2 body-02 text-black">
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          컨텐츠 미리보기
        </button>
      </div>
    </div>
  );
};

export default PlaceRecommendation;
