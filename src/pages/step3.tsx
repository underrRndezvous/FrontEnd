import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { NavermapsProvider, NaverMap, Marker } from "react-naver-maps";

import Button from "@/shared/ui/Button";

import type { Region } from "@/shared/api/meetingApi";
import FinalPlaceItem from "@/shared/ui/finalPlaceItem";

const Step3_Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedRegion: Region | undefined = location.state?.selectedRegion;

  if (!selectedRegion) {
    React.useEffect(() => {
      alert("추천 정보가 없습니다. 홈으로 이동합니다.");
      navigate("/plaza");
    }, [navigate]);
    return null;
  }

  const getMapCenter = () => {
    const { recommendPlace } = selectedRegion;

    if (!recommendPlace || recommendPlace.length === 0) {
      return { lat: 37.5665, lng: 126.978 };
    }

    const latSum = recommendPlace.reduce((sum, p) => sum + p.placelati, 0);
    const lngSum = recommendPlace.reduce((sum, p) => sum + p.placelong, 0);
    const count = recommendPlace.length;

    return { lat: latSum / count, lng: lngSum / count };
  };

  return (
    <NavermapsProvider
      ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID || ""}
    >
      <div className="relative w-full h-screen sm:w-[375px] sm:h-[645px] sm:rounded-lg overflow-hidden">
        <div style={{ width: "100%", height: "100%" }}>
          <NaverMap defaultCenter={getMapCenter()} defaultZoom={15}>
            {selectedRegion.recommendPlace.map((place, index) => (
              <Marker
                key={place.storeId}
                position={{ lat: place.placelati, lng: place.placelong }}
                icon={{
                  content: `<div style="background-color: #62FFBB; color: black; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1px solid black;">${
                    index + 1
                  }</div>`,
                }}
              />
            ))}
          </NaverMap>
        </div>

        <div className="absolute top-0 left-0 p-4 w-full h-full flex flex-col justify-between pointer-events-none">
          <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-lg pointer-events-auto">
            <h3 className="text-center font-bold mb-2 text-lg">
              {selectedRegion.hotPlace} 추천 경로
            </h3>
            <div>
              {selectedRegion.recommendPlace.map((place, index) => (
                <FinalPlaceItem
                  key={place.storeId}
                  place={place}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-auto">
            <Button
              format="Button1"
              color="primary"
              onClick={() => alert("공유하기 기능 구현 예정")}
            >
              모임 컨텐츠 공유하기
            </Button>
          </div>
        </div>
      </div>
    </NavermapsProvider>
  );
};

export default Step3_Page;
