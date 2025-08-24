import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  NavermapsProvider,
  Container,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import { useStoreDetail, useMeetingDetail } from "@/shared/api/meetingApi";
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
import IconRestaurant from "/src/shared/asset/icon/restaurant.svg?react";
import IconCafe from "/src/shared/asset/icon/cafe.svg?react";
import IconActivity from "/src/shared/asset/icon/activity.svg?react";
import IconBar from "/src/shared/asset/icon/bar.svg?react";
import { IconMinus, IconDragHandle } from "@/shared/ui/svg";
import clsx from "clsx";
import restaurantIconUrl from "/src/shared/asset/icon/restaurant.svg";
import cafeIconUrl from "/src/shared/asset/icon/cafe.svg";
import activityIconUrl from "/src/shared/asset/icon/activity.svg";
import barIconUrl from "/src/shared/asset/icon/bar.svg";
const StoreDetailModal = ({
  storeId,
  isOpen,
  onClose,
  onAddToCourse,
  isInCourse,
}: {
  storeId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCourse: (storeId: number) => void;
  isInCourse: boolean;
}) => {
  const { data: storeDetail, isLoading, error } = useStoreDetail(storeId || 0);

  const handleNaverSearch = () => {
    if (storeDetail) {
      const query = encodeURIComponent(storeDetail.storeName);
      const naverMapUrl = `https://map.naver.com/v5/search/${query}`;
      window.open(naverMapUrl, "_blank");
    }
  };

  const getTypeDetailInKorean = (storeType: string): string => {
    const typeMapping: { [key: string]: string } = {
      KOREAN: "한식",
      JAPANESE: "일식",
      CHINESE: "중식",
      WESTERN: "양식",
      BEER: "맥주집",
      IZAKAYA: "이자카야",
      POCHA: "포차",
      BAR_SPECIATLS: "바/칵테일",
      RESTAURANT: "음식점",
      CAFE: "카페",
      BAR: "술집",
      ACTIVITY: "액티비티",
    };

    return typeMapping[storeType] || storeType;
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
              <div className="space-y-4 py-2">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {storeDetail.storeName}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-main text-black text-sm font-medium rounded-full">
                    {getTypeDetailInKorean(storeDetail.storeType)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium text-gray-600 min-w-[40px]">
                        주소
                      </span>
                      <span className="text-sm text-gray-800 flex-1 leading-relaxed">
                        {storeDetail.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Button
                    format="Button1"
                    color="primary"
                    onClick={handleNaverSearch}
                  >
                    네이버 지도로 보러가기
                  </Button>
                  {!isInCourse && (
                    <Button
                      format="Button1"
                      color="secondary"
                      onClick={() => {
                        onAddToCourse(storeId);
                        onClose();
                      }}
                    >
                      코스에 추가하기
                    </Button>
                  )}
                </div>
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
            <div className="w-3 h-3 flex items-center justify-center">
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
  selectedRegion,
  currentCoursePlaces,
}: {
  places: RecommendedPlace[];
  selectedCategory: string | null;
  categoryMapping: { [key: string]: string };
  categoryIconPaths: { [key: string]: string };
  onMarkerClick: (storeId: number) => void;
  selectedRegion: Region;
  currentCoursePlaces: RecommendedPlace[];
}) => {
  const navermaps = useNavermaps();

  const getMapCenter = () => {
    if (!places || places.length === 0)
      return new navermaps.LatLng(37.5665, 126.978);
    const latSum = currentCoursePlaces.reduce((sum, p) => sum + p.placelati, 0);
    const lngSum = currentCoursePlaces.reduce((sum, p) => sum + p.placelong, 0);
    return new navermaps.LatLng(
      latSum / currentCoursePlaces.length,
      lngSum / currentCoursePlaces.length
    );
  };

  const createMarkerIcon = (place: RecommendedPlace, index: number) => {
    const koreanCategory = categoryMapping[place.category.toLowerCase()];
    const isSelectedCategory =
      selectedCategory && koreanCategory === selectedCategory;

    const isSelectedRegionPlace = selectedRegion.recommendPlace?.some(
      (p) => p.storeId === place.storeId
    );

    const isInCurrentCourse = places.some((p) => p.storeId === place.storeId);
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
    } else if (
      isSelectedRegionPlace ||
      currentCoursePlaces.some((p) => p.storeId === place.storeId)
    ) {
      const courseIndex = currentCoursePlaces.findIndex(
        (p) => p.storeId === place.storeId
      );
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
          ">${courseIndex + 1}</div>
        </div>
      </div>`,
      };
    } else {
      const iconPath =
        categoryIconPaths[koreanCategory] || categoryIconPaths["음식점"];
      return {
        content: `<div style="
        width: 32px;
        height: 32px;
        background: #E5E5E5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        border: 2px solid white;
        cursor: pointer;
      ">
        <img src="${iconPath}" alt="${koreanCategory}" style="width: 16px; height: 16px;" />
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
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("id");
  const meetingIdNumber = meetingId ? parseInt(meetingId) : null;
  const {
    data: meetingDetailData,
    isLoading: isMeetingDetailLoading,
    error: meetingDetailError,
  } = useMeetingDetail(meetingIdNumber);
  const handleAddToCourse = (storeId: number) => {
    const placeToAdd = mapPlaces.find((place) => place.storeId === storeId);

    if (placeToAdd && !places.some((p) => p.storeId === storeId)) {
      setPlaces((prev) => [...prev, placeToAdd]);
    }
  };

  const allRecommendedRegions: Region[] | undefined =
    location.state?.allRecommendedRegions;
  const selectedRegion: Region | undefined = location.state?.selectedRegion;

  const finalAllRecommendedRegions =
    meetingDetailData?.regions || allRecommendedRegions;
  const finalSelectedRegion =
    meetingDetailData?.regions?.[0] ||
    selectedRegion ||
    (finalAllRecommendedRegions && finalAllRecommendedRegions.length > 0
      ? finalAllRecommendedRegions[0]
      : null);

  const mapPlaces = React.useMemo(() => {
    if (!finalAllRecommendedRegions) return [];
    return finalAllRecommendedRegions.flatMap(
      (region) => region.recommendPlace || []
    );
  }, [finalAllRecommendedRegions]);

  const [places, setPlaces] = React.useState<RecommendedPlace[]>([]);

  React.useEffect(() => {
    if (finalSelectedRegion?.recommendPlace) {
      setPlaces(finalSelectedRegion.recommendPlace);
    }
  }, [finalSelectedRegion]);

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
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

  React.useEffect(() => {
    console.log("Step3 Debug Info:", {
      meetingId,
      meetingIdNumber,
      isMeetingDetailLoading,
      meetingDetailError,
      hasLocationState: !!location.state,
      hasMeetingDetailData: !!meetingDetailData,
      finalSelectedRegion: !!finalSelectedRegion,
      finalAllRecommendedRegions: !!finalAllRecommendedRegions,
      mapPlacesCount: mapPlaces.length,
    });

    if (!isMeetingDetailLoading && !meetingDetailError) {
      if (meetingId && !meetingDetailData && !location.state) {
        console.error("No data available from both API and location state");
        alert("모임 정보를 불러올 수 없습니다. 홈으로 이동합니다.");
        navigate("/");
        return;
      }

      if (!finalSelectedRegion && !finalAllRecommendedRegions) {
        console.error("No region data available");
        alert("추천 장소 정보가 없습니다. 홈으로 이동합니다.");
        navigate("/");
        return;
      }
    }
  }, [
    meetingId,
    meetingIdNumber,
    finalSelectedRegion,
    finalAllRecommendedRegions,
    navigate,
    isMeetingDetailLoading,
    meetingDetailError,
    location.state,
    meetingDetailData,
    mapPlaces.length,
  ]);

  if (isMeetingDetailLoading) {
    return (
      <AnimatedPageLayout>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main mx-auto"></div>
            <p className="mt-2 text-gray-500">모임 정보를 불러오는 중...</p>
          </div>
        </div>
      </AnimatedPageLayout>
    );
  }

  if (meetingDetailError && !location.state) {
    return (
      <AnimatedPageLayout>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-red-500 mb-2">모임 정보를 불러올 수 없습니다.</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-main text-black rounded"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      </AnimatedPageLayout>
    );
  }

  if (!finalSelectedRegion || !finalAllRecommendedRegions) {
    return null;
  }

  const categoryIcons = {
    음식점: IconRestaurant,
    카페: IconCafe,
    액티비티: IconActivity,
    술집: IconBar,
  };

  const categoryIconPaths = {
    음식점: restaurantIconUrl,
    카페: cafeIconUrl,
    액티비티: activityIconUrl,
    술집: barIconUrl,
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
    setPlaces((prev) => prev.filter((place) => place.storeId !== storeId));
  };

  const handleShare = () => {
    const shareId =
      meetingId || meetingDetailData?.meetingId || location.state?.meetingId;

    if (shareId) {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("b7b75806d5bd4d130c404e0b30f148e0");
      }
      window.Kakao.Share.sendCustom({
        templateId: 123447,
        templateArgs: {
          id: shareId.toString(),
        },
      });
    } else {
      alert("공유할 모임 정보가 없습니다. 다시 시도해주세요.");
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleMarkerClick = (storeId: number) => {
    setSelectedStoreId(storeId);
    setIsModalOpen(true);
  };

  const handlePlaceClick = (storeId: number) => {
    setSelectedStoreId(storeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStoreId(null);
  };

  return (
    <AnimatedPageLayout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-0 sm:p-4">
        <div className="relative flex w-full flex-col bg-gradient-to-b from-sub01 to-sub02 h-screen sm:w-[375px] sm:h-[645px] sm:rounded-lg overflow-hidden">
          <NavermapsProvider
            ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID || ""}
          >
            <div className="relative w-full h-full">
              <MapComponent
                places={mapPlaces}
                selectedCategory={selectedCategory}
                categoryMapping={categoryMapping}
                categoryIconPaths={categoryIconPaths}
                onMarkerClick={handleMarkerClick}
                selectedRegion={finalSelectedRegion}
                currentCoursePlaces={places}
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

                <div className="pointer-events-auto px-8 pb-safe mb-6">
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
            onAddToCourse={handleAddToCourse}
            isInCourse={places.some((p) => p.storeId === selectedStoreId)}
          />
        </div>
      </div>
    </AnimatedPageLayout>
  );
};

export default Step3_Page;
