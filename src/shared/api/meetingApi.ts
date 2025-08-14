import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMeetingStore } from '@/store/meetingStore';
import type { PlaceRequest, StartPointRequest, TimeType, DayType, } from '@/store/meetingStore';

export interface RecommendedPlace {
  order: number;
  storeId: number;
  category: string;
  storeName: string;
  placelati: number;
  placelong: number;
  isOpen: boolean;
}

export interface Region {
  hotPlace: string;
  hotPlaceImage: string;
  recommendPlace: RecommendedPlace[];
}

// 1. 서버로 보낼 Request Body 타입 정의
interface MeetingRequestBody {
  groupName: string;
  meetTime: TimeType[];
  meetDays: DayType;
  place: (Omit<PlaceRequest, 'id'> & { typeDetail: null })[];
  startPoint: Omit<StartPointRequest, 'id' | 'type'>[];
}

// 2. 서버로부터 받을 Response Body 타입 정의
interface MeetingResponseBody {
  regions: Region[];
}
export interface StoreDetail {
  storeId: number;
  storeType: string;
  storeDetail: string | null; // null이 올 수 있음을 명시
  storeName: string;
  rating: number;
  reviewCount: number | null; // 리뷰 수도 null일 수 있음
  address: string; // 대문자 Address -> 소문자 address로 변경
  businessHours: string;
  image: string;
}

const postMeetingInfo = async (): Promise<MeetingResponseBody> => {
  const { groupName, meetTime, meetDays, place, startPoint } = useMeetingStore.getState();

  // 요일을 한글에서 영문 DayType으로 변환하는 로직
  const dayKoreanToEnglish: { [key: string]: DayType } = {
    '월': 'MONDAY', '화': 'TUESDAY', '수': 'WEDNESDAY', '목': 'THURSDAY',
    '금': 'FRIDAY', '토': 'SATURDAY', '일': 'SUNDAY',
    '평일': 'WEEKDAY', '주말': 'WEEKEND'
  };
  
  const transformedMeetDays = meetDays.map(day => dayKoreanToEnglish[day] || day as DayType);

  const requestBody: MeetingRequestBody = {
    groupName,
    meetTime: meetTime as TimeType[], 
    meetDays: transformedMeetDays[0], 
    place: place
      .filter(p => p.placeType !== null)
      .map(({ id, ...rest }) => ({
        ...rest,
        typeDetail: null,
      })),
    startPoint: startPoint.map(({ id, type, ...rest }) => rest),
  };

  const { data } = await axios.post<MeetingResponseBody>('/api/meet', requestBody);
  return data;
};

// 🔥 수정: 템플릿 리터럴 문법 오류 수정
const getStoreDetail = async (storeId: number): Promise<StoreDetail> => {
  try {
    const { data } = await axios.get<StoreDetail>(`/api/meet/store/detail?storeId=${storeId}`);
    return data;
  } catch (error) {
    console.error('가게 상세 정보를 불러오는데 실패했습니다:', error);
    throw error;
  }
};

export const useRecommendPlaces = () => {
  return useMutation<MeetingResponseBody, Error>({
    mutationFn: postMeetingInfo,
  });
};

export const useStoreDetail = (storeId: number) => {
  return useQuery<StoreDetail, Error>({
    queryKey: ['storeDetail', storeId],
    queryFn: () => getStoreDetail(storeId),
    enabled: !!storeId, // storeId가 있을 때만 쿼리 실행
    retry: 1, // 실패시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

export const useMultipleStoreDetails = (storeIds: number[]) => {
  return useQuery<StoreDetail[], Error>({
    queryKey: ['multipleStoreDetails', storeIds],
    queryFn: async () => {
      const promises = storeIds.map(id => getStoreDetail(id));
      return Promise.all(promises);
    },
    enabled: storeIds.length > 0,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};

// 직접 API 함수 내보내기
export { getStoreDetail };