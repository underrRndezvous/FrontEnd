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
  type DragEndEvent,
} from "@dnd-kit/core";
import AnimatedPageLayout from "@/shared/layout";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/shared/ui/Button";
import type { Region, RecommendedPlace } from "@/shared/api/meetingApi";

import { useStoreDetail } from "@/shared/api/meetingApi";
import IconRestaurant from "/src/shared/asset/icon/restaurant.svg?react";
import IconCafe from "/src/shared/asset/icon/cafe.svg?react";
import IconActivity from "/src/shared/asset/icon/activity.svg?react";
import IconBar from "/src/shared/asset/icon/bar.svg?react";
import { IconMinus, IconDragHandle } from "@/shared/ui/svg";
import clsx from "clsx";

const StoreDetailModal = ({
  storeId,
  isOpen,
  onClose,
}: {
  storeId: number | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: storeDetail, isLoading, error } = useStoreDetail(storeId || 0);

  React.useEffect(() => {
    if (storeId) {
      console.log("🔍 Modal opened with storeId:", storeId);
    }
    if (storeDetail) {
      console.log("✅ Store detail loaded:", storeDetail);
    }
    if (error) {
      console.error("❌ Store detail error:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }
    if (isLoading) {
      console.log("⏳ Loading store detail...");
    }
  }, [storeId, storeDetail, error, isLoading]);

  const handleNaverSearch = () => {
    if (storeDetail) {
      const query = encodeURIComponent(
        `${storeDetail.storeName} ${storeDetail.address}`
      );
      const naverMapUrl = `https://map.naver.com/v5/search/${query}`;
      window.open(naverMapUrl, "_blank");
    }
  };

  const checkIsOpen = (businessHours: string): boolean => {
    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      const timeMatch = businessHours.match(
        /(\d{1,2}):(\d{2})\s*~\s*(\d{1,2}):(\d{2})/
      );
      if (timeMatch) {
        const openHour = parseInt(timeMatch[1]);
        const openMinute = parseInt(timeMatch[2]);
        const closeHour = parseInt(timeMatch[3]);
        const closeMinute = parseInt(timeMatch[4]);

        const openTime = openHour * 60 + openMinute;
        const closeTime = closeHour * 60 + closeMinute;

        return currentTime >= openTime && currentTime <= closeTime;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && storeId && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black bg-opacity-50 z-40 pointer-events-auto"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-50 pointer-events-auto max-h-[60vh] overflow-y-auto"
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-main mx-auto"></div>
                <p className="mt-2 text-gray-500 text-sm">로딩중...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-500 text-sm mb-2">
                  정보를 불러올 수 없습니다.
                </p>
                <p className="text-gray-400 text-xs">StoreId: {storeId}</p>
                <p className="text-gray-400 text-xs">Error: {error.message}</p>
                <button
                  onClick={onClose}
                  className="mt-2 px-3 py-1 bg-gray-200 rounded text-sm"
                >
                  닫기
                </button>
              </div>
            )}
            {storeDetail && (
              <div className="space-y-4 py-4">
                {/* 가게 이름 */}
                <h2 className="text-xl font-bold text-gray-900 text-center">
                  {storeDetail.storeName}
                </h2>

                {/* 네이버 지도로 이동 버튼 */}
                <Button
                  format="Button1"
                  color="primary"
                  onClick={handleNaverSearch}
                >
                  네이버 지도로 보러가기
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SortablePlaceItem = ({
  place,
  index,
  onRemove,
  isOnlyItem,
  onPlaceClick,
}: {
  place: RecommendedPlace;
  index: number;
  onRemove: (storeId: number) => void;
  isOnlyItem: boolean;
  onPlaceClick: (storeId: number) => void;
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
        <div style={{ width: 16, height: 16 }}>
          <IconDragHandle />
        </div>
      </button>

      <div
        className="flex flex-grow items-center rounded-md border-[1px] border-main bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => {
          console.log(
            "🖱️ Place clicked:",
            place.storeName,
            "storeId:",
            place.storeId
          );
          onPlaceClick(place.storeId);
        }}
      >
        <div className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-xs bg-main text-black font-semibold">
          {index + 1}
        </div>
        <span className="text-sm text-black flex-grow truncate">
          {place.storeName}
        </span>

        {!isOnlyItem && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(place.storeId);
            }}
            className="ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <div className="w-3 h-3">
              <IconMinus />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const MapComponent = ({
  places,
  selectedCategory,
  categoryMapping,
  categoryIconPaths,
  onMarkerClick,
}: {
  places: RecommendedPlace[];
  selectedCategory: string | null;
  categoryMapping: { [key: string]: string };
  categoryIconPaths: { [key: string]: string };
  onMarkerClick: (storeId: number) => void;
}) => {
  const navermaps = useNavermaps();

  const getMapCenter = () => {
    if (!places || places.length === 0)
      return new navermaps.LatLng(37.5665, 126.978);
    const latSum = places.reduce((sum, p) => sum + p.placelati, 0);
    const lngSum = places.reduce((sum, p) => sum + p.placelong, 0);
    return new navermaps.LatLng(latSum / places.length, lngSum / places.length);
  };

  const createMarkerIcon = (place: RecommendedPlace, index: number) => {
    const koreanCategory = categoryMapping[place.category.toLowerCase()];
    const isSelectedCategory =
      selectedCategory && koreanCategory === selectedCategory;

    if (isSelectedCategory) {
      const iconPath = categoryIconPaths[selectedCategory];
      return {
        content: `<div style="
          width: 36px;
          height: 36px;
          background: #62FFBB;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          border: 2px solid white;
          cursor: pointer;
        ">
          <div style="
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <img src="${iconPath}" alt="${selectedCategory}" style="width: 12px; height: 12px;" />
          </div>
        </div>`,
      };
    } else {
      return {
        content: `<div style="
          position: relative;
          width: 32px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="
            width: 32px;
            height: 32px;
            background: #62FFBB;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <div style="
              width: 18px;
              height: 18px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              transform: rotate(45deg);
              font-weight: bold;
              font-size: 11px;
              color: black;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">${index + 1}</div>
          </div>
        </div>`,
      };
    }
  };

  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <NaverMap defaultCenter={getMapCenter()} defaultZoom={15}>
        {places.map((place, index) => (
          <Marker
            key={place.storeId}
            position={new navermaps.LatLng(place.placelati, place.placelong)}
            icon={createMarkerIcon(place, index)}
            title={place.storeName}
            clickable={true}
            onClick={() => {
              console.log(
                "📍 Marker clicked:",
                place.storeName,
                "storeId:",
                place.storeId
              );
              onMarkerClick(place.storeId);
            }}
          />
        ))}
      </NaverMap>
    </Container>
  );
};

const Step3_Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const allRecommendedRegions: Region[] | undefined =
    location.state?.allRecommendedRegions;
  const selectedRegion: Region | undefined = location.state?.selectedRegion;

  // [수정 2] 지도에 표시할 장소 목록 (모든 지역의 가게)
  const mapPlaces = React.useMemo(() => {
    if (!allRecommendedRegions) return [];
    return allRecommendedRegions.flatMap(
      (region) => region.recommendPlace || []
    );
  }, [allRecommendedRegions]);

  // [수정 3] 상단 위젯(드래그 리스트)에 표시할 장소 목록 (선택한 지역의 가게)
  const [places, setPlaces] = React.useState<RecommendedPlace[]>(
    selectedRegion?.recommendPlace || []
  );
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  // [수정 5] 데이터 유효성 검사 로직을 selectedRegion 기준으로 변경합니다.
  if (!selectedRegion || !allRecommendedRegions) {
    React.useEffect(() => {
      console.warn("⚠️ No region data, redirecting to home");
      alert("추천 장소 정보가 없습니다. 홈으로 이동합니다.");
      navigate("/");
    }, [navigate]);
    return null;
  }

  const [selectedStoreId, setSelectedStoreId] = React.useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const categoryIcons = {
    음식점: IconRestaurant,
    카페: IconCafe,
    액티비티: IconActivity,
    술집: IconBar,
  };

  const categoryIconPaths = {
    음식점: "/src/shared/asset/icon/restaurant.svg",
    카페: "/src/shared/asset/icon/cafe.svg",
    액티비티: "/src/shared/asset/icon/activity.svg",
    술집: "/src/shared/asset/icon/bar.svg",
  };

  const categoryMapping: { [key: string]: string } = {
    restaurant: "음식점",
    cafe: "카페",
    activity: "액티비티",
    bar: "술집",
    food: "음식점",
    coffee: "카페",
    entertainment: "액티비티",
    drink: "술집",
  };

  if (!selectedRegion || !allRecommendedRegions) {
    React.useEffect(() => {
      console.warn("⚠️ No region data, redirecting to home");
      alert("추천 장소 정보가 없습니다. 홈으로 이동합니다.");
      navigate("/");
    }, [navigate]);
    return null;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPlaces((items) => {
        const oldIndex = items.findIndex(
          (item) => item.storeId === Number(active.id)
        );
        const newIndex = items.findIndex(
          (item) => item.storeId === Number(over.id)
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemove = (storeId: number) => {
    console.log("🗑️ Removing place with storeId:", storeId);
    setPlaces((prev) => prev.filter((place) => place.storeId !== storeId));
  };

  const handleShare = () => {
    alert("공유하기 기능은 구현 예정입니다.");
  };

  const handleCategoryClick = (category: string) => {
    console.log("🏷️ Category clicked:", category);
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleMarkerClick = (storeId: number) => {
    console.log("📍 Marker click handler called with storeId:", storeId);
    setSelectedStoreId(storeId);
    setIsModalOpen(true);
  };

  const handlePlaceClick = (storeId: number) => {
    console.log("🖱️ Place click handler called with storeId:", storeId);
    setSelectedStoreId(storeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("❌ Modal closing");
    setIsModalOpen(false);
    setSelectedStoreId(null);
  };

  return (
    <AnimatedPageLayout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="relative flex w-screen flex-col bg-gradient-to-b from-sub01 to-sub02 h-screen sm:w-[375px] sm:h-[645px] rounded-lg overflow-hidden">
          <NavermapsProvider
            ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID || ""}
          >
            <div className="relative w-screen h-screen sm:w-[375px] sm:h-full">
              <MapComponent
                places={mapPlaces}
                selectedCategory={selectedCategory}
                categoryMapping={categoryMapping}
                categoryIconPaths={categoryIconPaths}
                onMarkerClick={handleMarkerClick}
              />

              <div className="absolute top-0 left-0 p-4 w-full h-full flex flex-col pointer-events-none">
                <div className="bg-white bg-opacity-90 p-2 rounded-lg shadow-lg pointer-events-auto mb-3 max-h-48 overflow-y-auto">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={places.map((place) => place.storeId)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-1.5">
                        {places.map((place, index) => (
                          <SortablePlaceItem
                            key={place.storeId}
                            place={place}
                            index={index}
                            onRemove={handleRemove}
                            isOnlyItem={places.length === 1}
                            onPlaceClick={handlePlaceClick}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>

                <div className="flex justify-center gap-x-2 pointer-events-auto mb-auto">
                  {Object.entries(categoryIcons).map(
                    ([category, IconComponent]) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={clsx(
                          "flex items-center text-xs shadow-md px-3 py-2 rounded-full whitespace-nowrap transition-colors",
                          selectedCategory === category
                            ? "bg-main text-black font-semibold"
                            : "bg-white text-gray-700"
                        )}
                      >
                        <IconComponent
                          style={{ width: 12, height: 12, marginRight: 4 }}
                        />
                        {category}
                      </button>
                    )
                  )}
                </div>

                <div className="pointer-events-auto mt-auto px-8">
                  <Button
                    format="Button1"
                    color="primary"
                    onClick={handleShare}
                  >
                    모임 컨텐츠 공유하기
                  </Button>
                </div>
              </div>
            </div>
          </NavermapsProvider>

          <StoreDetailModal
            storeId={selectedStoreId}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </AnimatedPageLayout>
  );
};

export default Step3_Page;
