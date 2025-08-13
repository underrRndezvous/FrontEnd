import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NavermapsProvider,
  Container,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 직접 만드신 재사용 컴포넌트들을 가져옵니다.
import Button from "@/shared/ui/Button"; // 보내주신 Button 컴포넌트
import type { Region, RecommendedPlace } from "@/shared/api/meetingApi";
import IconRestaurant from "@/shared/asset/icon/restaurant.svg?react";
import IconCafe from "@/shared/asset/icon/cafe.svg?react";
import IconActivity from "@/shared/asset/icon/activity.svg?react";
import IconBar from "@/shared/asset/icon/bar.svg?react";
import { IconMinus, IconDragHandle } from "@/shared/ui/svg";
import clsx from "clsx";

// 드래그 가능한 장소 아이템 컴포넌트
const SortablePlaceItem = ({
  place,
  index,
  onRemove,
  isOnlyItem,
}: {
  place: RecommendedPlace;
  index: number;
  onRemove: (storeId: number) => void;
  isOnlyItem: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: place.storeId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center gap-x-2 touch-none"
    >
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 text-gray-400 cursor-grab"
      >
        <IconDragHandle />
      </button>

      <div className="flex flex-grow items-center rounded-md border-[1px] border-main bg-white p-3">
        <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-sm bg-main text-black">
          {index + 1}
        </div>
        <span className="body-02 text-black flex-grow">{place.storeName}</span>

        {!isOnlyItem && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(place.storeId);
            }}
            className="ml-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
          >
            <IconMinus />
          </button>
        )}
      </div>
    </div>
  );
};

// 지도와 마커들을 관리하는 자식 컴포넌트
const MapComponent = ({ places }: { places: RecommendedPlace[] }) => {
  const navermaps = useNavermaps();

  const getMapCenter = () => {
    if (!places || places.length === 0)
      return new navermaps.LatLng(37.5665, 126.978);
    const latSum = places.reduce((sum, p) => sum + p.placelati, 0);
    const lngSum = places.reduce((sum, p) => sum + p.placelong, 0);
    return new navermaps.LatLng(latSum / places.length, lngSum / places.length);
  };

  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <NaverMap defaultCenter={getMapCenter()} defaultZoom={15}>
        {places.map((place, index) => (
          <Marker
            key={place.storeId}
            position={new navermaps.LatLng(place.placelati, place.placelong)}
            icon={{
              content: `<div style="background-color: #62FFBB; color: black; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1px solid #333;">${
                index + 1
              }</div>`,
            }}
            title={place.storeName}
          />
        ))}
      </NaverMap>
    </Container>
  );
};

const Step3_Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedRegion: Region | undefined = location.state?.selectedRegion;
  const [places, setPlaces] = React.useState<RecommendedPlace[]>(
    selectedRegion?.recommendPlace || []
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!selectedRegion || selectedRegion.recommendPlace.length === 0) {
    // 페이지 접근 오류 시 홈으로 보내는 로직 (또는 다른 처리)
    React.useEffect(() => {
      alert("추천 장소 정보가 없습니다. 홈으로 이동합니다.");
      navigate("/");
    }, [navigate]);
    return null;
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPlaces((items) => {
        const oldIndex = items.findIndex((item) => item.storeId === active.id);
        const newIndex = items.findIndex((item) => item.storeId === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemove = (storeId: number) => {
    setPlaces((prev) => prev.filter((place) => place.storeId !== storeId));
  };

  const handleShare = () => {
    alert("공유하기 기능은 구현 예정입니다.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* 2. 중앙에 위치하는 카드 형태의 메인 컨테이너를 만듭니다. */}
      <div className="relative flex w-screen flex-col bg-gradient-to-b from-sub01 to-sub02 h-screen sm:w-[375px] sm:h-[645px] rounded-lg overflow-hidden">
        <NavermapsProvider
          ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID || ""}
        >
          {/* 2. 전체 레이아웃 컨테이너. 지도와 UI 요소들을 겹치기 위해 relative 속성을 줍니다. */}
          <div className="relative w-screen h-screen sm:w-[375px] sm:h-full">
            {/* 지도 컴포넌트가 배경 역할을 합니다. */}
            <MapComponent places={places} />

            {/* 3. 지도 위에 떠 있는 UI 요소들을 담는 오버레이 컨테이너 */}
            <div className="absolute top-0 left-0 p-4 w-full h-full flex flex-col pointer-events-none">
              {/* 상단 장소 목록 */}
              <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-lg pointer-events-auto mb-3">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={places.map((place) => place.storeId)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {places.map((place, index) => (
                        <SortablePlaceItem
                          key={place.storeId}
                          place={place}
                          index={index}
                          onRemove={handleRemove}
                          isOnlyItem={places.length === 1}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              {/* 카테고리 버튼들 - 상단 위젯 바로 아래 */}
              <div className="flex justify-center gap-x-2 pointer-events-auto mb-auto">
                <button className="flex items-center text-xs bg-white shadow-md px-3 py-2 rounded-full whitespace-nowrap">
                  <IconRestaurant className="w-3 h-3 mr-1" />
                  음식점
                </button>
                <button className="flex items-center text-xs bg-white shadow-md px-3 py-2 rounded-full whitespace-nowrap">
                  <IconCafe className="w-3 h-3 mr-1" />
                  카페
                </button>
                <button className="flex items-center text-xs bg-white shadow-md px-3 py-2 rounded-full whitespace-nowrap">
                  <IconActivity className="w-3 h-3 mr-1" />
                  액티비티
                </button>
                <button className="flex items-center text-xs bg-white shadow-md px-3 py-2 rounded-full whitespace-nowrap">
                  <IconBar className="w-3 h-3 mr-1" />
                  술집
                </button>
              </div>

              {/* 4. 하단 '공유하기' 버튼 (보내주신 Button 컴포넌트 사용) */}
              <div className="pointer-events-auto mt-auto px-8">
                <Button format="Button1" color="primary" onClick={handleShare}>
                  모임 컨텐츠 공유하기
                </Button>
              </div>
            </div>
          </div>
        </NavermapsProvider>
      </div>
    </div>
  );
};

export default Step3_Page;
