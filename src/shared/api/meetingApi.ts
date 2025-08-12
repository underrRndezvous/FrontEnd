// src/shared/api/meetingApi.ts

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
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
  meetTime: TimeType | null;
  meetDays: DayType[]; // API가 배열을 받는다고 가정. 단일 값이면 DayType
  place: (Omit<PlaceRequest, 'id'> & { typeDetail: null })[];
  startPoint: Omit<StartPointRequest, 'id' | 'type'>[];
}

// 2. 서버로부터 받을 Response Body 타입 정의
interface MeetingResponseBody {
  regions: Region[];
}


const postMeetingInfo = async (): Promise<MeetingResponseBody> => {

  const { groupName, meetTime, meetDays, place, startPoint } = useMeetingStore.getState();

  const requestBody: MeetingRequestBody = {
    groupName,
    
    
    
    meetTime: meetTime.length > 0 ? (meetTime[0] as TimeType) : null,
   

    meetDays: meetDays as DayType[],
    place: place.map(({ id, ...rest }) => ({
      ...rest,
      typeDetail: null,
    })),
    
    startPoint: startPoint.map(({ id, type, ...rest }) => rest),
  };
  
  const { data } = await axios.post<MeetingResponseBody>('/api/v1/meetings/recommend', requestBody);
  return data;
};

// ... (useRecommendPlaces 훅은 동일) ...
export const useRecommendPlaces = () => {
  return useMutation<MeetingResponseBody, Error>({
    mutationFn: postMeetingInfo,
  });
};