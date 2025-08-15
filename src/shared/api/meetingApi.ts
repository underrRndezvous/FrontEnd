import axios from '@/shared/api/axiosInstance';
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

interface MeetingRequestBody {
  groupName: string;
  meetTime: TimeType[];
  meetDays: DayType;
  place: (PlaceRequest & { typeDetail: null })[];
  startPoint: Omit<StartPointRequest, 'id' | 'type'>[];
}

interface MeetingResponseBody {
  regions: Region[];
}
export interface StoreDetail {
  storeId: number;
  storeType: string;
  storeDetail: string | null; 
  storeName: string;
  rating: number;
  reviewCount: number | null;
  address: string; 
  businessHours: string;
  image: string;
}

const postMeetingInfo = async (): Promise<MeetingResponseBody> => {
  const { groupName, meetTime, meetDays, place, startPoint } = useMeetingStore.getState();

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
      .map((p) => ({
        ...p,
        typeDetail: null,
      })),
    startPoint: startPoint.map(({ id, type, ...rest }) => rest),
  };

  const { data } = await axios.post<MeetingResponseBody>('/meet', requestBody);
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
    enabled: !!storeId, 
    retry: 1,
    staleTime: 5 * 60 * 1000,
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


export { getStoreDetail };