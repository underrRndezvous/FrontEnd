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
  meetDays: DayType; // API가 배열을 받는다고 가정. 단일 값이면 DayType
  place: (Omit<PlaceRequest, 'id'> & { typeDetail: null })[];
  startPoint: Omit<StartPointRequest, 'id' | 'type'>[];
}

// 2. 서버로부터 받을 Response Body 타입 정의
interface MeetingResponseBody {
  regions: Region[];
}

export interface StoreDetail {
  storeId: string;
  storeType: "date" | "business" | "study" | "gathering";
  storeDetail: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  Address: string;
  businessHours: string;
  image: string;
}


const postMeetingInfo = async (): Promise<MeetingResponseBody> => {
  const { groupName, meetTime, meetDays, place, startPoint } = useMeetingStore.getState();

  // ▼▼▼ 1. '요일'을 한글에서 영문 DayType으로 변환하는 로직 추가 ▼▼▼
  const dayKoreanToEnglish: { [key: string]: DayType } = {
    '월': 'MONDAY', '화': 'TUESDAY', '수': 'WEDNESDAY', '목': 'THURSDAY',
    '금': 'FRIDAY', '토': 'SATURDAY', '일': 'SUNDAY',
    '평일': 'WEEKDAY', '주말': 'WEEKEND'
  };
    const transformedMeetDays = meetDays.map(day => dayKoreanToEnglish[day] || day as DayType);
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  // 스토어 상태를 API Request Body 형식으로 변환합니다.
  const requestBody: MeetingRequestBody = {
    groupName,
    meetTime: meetTime as TimeType[], 
    
    // 변환된 요일 데이터를 사용합니다.
    meetDays: transformedMeetDays[0], 
    
    // place: UI 전용 'id'를 제외하고 'typeDetail: null'을 추가합니다.
    // **이전 코드와 동일하지만, 이 변환이 꼭 필요합니다.**
     place: place
      .filter(p => p.placeType !== null) // 1. placeType이 null이 아닌 항목만 필터링합니다.
      .map(({ id, ...rest }) => ({     // 2. 그 다음에 나머지 변환 작업을 수행합니다.
        ...rest,
        typeDetail: null,
      })),
    
    
    startPoint: startPoint.map(({ id, type, ...rest }) => rest),
  };
    
    
  
  const { data } = await axios.post<MeetingResponseBody>('/api/meet', requestBody);
  return data;
};
const getStoreDetail = async (storeId: number): Promise<StoreDetail> => {
  try {
    const { data } = await axios.get<StoreDetail>(`/meet/store/detail?storeId=${storeId}`);
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
  });
};
export const useMultipleStoreDetails = (storeIds: number[]) => {
  return useQuery<StoreDetail[], Error>({
    queryKey: ['multipleStoreDetails', storeIds],
    queryFn: async () => {
      const promises = storeIds.map(id => getStoreDetail(id));
      return Promise.all(promises);
    },
    enabled: storeIds.length > 0, // storeIds가 있을 때만 쿼리 실행
  });
};

// 직접 API 함수 내보내기 (필요한 경우)
export { getStoreDetail };