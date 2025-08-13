import React, { useState } from "react";
import type { Region, RecommendedPlace } from "@/shared/api/meetingApi";

interface PlaceRecommendationProps {
  recommendation: Region;
}

const PlaceRecommendation = ({ recommendation }: PlaceRecommendationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex w-full flex-col items-center px-2">
        <div className="w-full rounded-lg bg-white p-4 shadow-md border border-main">
          <h3 className="title-02 text-center text-black mb-4">
            {recommendation.hotPlace}
          </h3>

          <img
            src={recommendation.hotPlaceImage}
            alt={recommendation.hotPlace}
            className="w-full h-48 rounded-md object-cover bg-gray-200 mb-4"
          />

          <button
            onClick={handlePreviewClick}
            className="flex w-full items-center justify-center rounded-md bg-sub01 py-3 body-02 text-black"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="mr-1"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              <path d="M8 4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1z" />
            </svg>
            컨텐츠 미리보기
          </button>
        </div>
      </div>

      {isModalOpen && (
        <PlaceDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          placeData={recommendation}
        />
      )}
    </>
  );
};

// 모달 컴포넌트
interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeData: Region;
}

const PlaceDetailModal = ({
  isOpen,
  onClose,
  placeData,
}: PlaceDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-sm max-h-96 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-sub01 p-4 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-600 text-xl font-bold hover:text-gray-800"
          >
            ×
          </button>
          <h2 className="text-lg font-semibold">컨텐츠 미리보기</h2>
        </div>

        {/* 장소 리스트 */}
        <div className="p-4 max-h-80 overflow-y-auto">
          {placeData.recommendPlace && placeData.recommendPlace.length > 0 ? (
            placeData.recommendPlace
              .sort((a, b) => a.order - b.order)
              .map((place: RecommendedPlace) => (
                <div
                  key={place.storeId}
                  className="flex items-center p-3 mb-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sub01 flex items-center justify-center mr-3">
                    {/* 아이콘 자리 - 나중에 추가 */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 truncate">
                      {place.storeName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {place.category}
                    </p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          place.isOpen
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {place.isOpen ? "영업중" : "영업종료"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              추천 장소가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceRecommendation;
