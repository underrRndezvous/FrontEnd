import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimeType = 'MORNING' | 'LUNCH' | 'AFTERNOON' | 'EVENING';
export type DayType = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY' | 'WEEKDAY' | 'WEEKEND';
export type PlaceType = 'RESTAURANT' | 'CAFE' | 'BAR' | 'ACTIVITY';
export type AtmosphereType = 'PRODUCTIVE' | 'AESTHETIC' | 'INDULGENT' | 'SOCIABLE';

export interface PlaceRequest {
  id: number;
  placeType: PlaceType | null; // type -> placeType, 타입 구체화
  atmosphere: AtmosphereType | null; // subType -> atmosphere, 타입 구체화
}

export interface StartPointRequest {
  id: number;
  type: 'leader' | 'member';
  first: string; // 시/도
  second: string; // 시/군/구
  third: string; // 동/면/읍
}

export interface MeetingState {
  groupName: string;
  groupPurpose: string | null;
  meetDays: string[]
  meetTime: string[];
  place: PlaceRequest[];
  startPoint: StartPointRequest[];
}

interface MeetingActions {
  setGroupName: (name: string) => void;
  setGroupPurpose: (purpose: string | null) => void;
  setMeetDays: (days: string[]) => void;
  setMeetTime: (times: string[]) => void;
  setPlace: (places: PlaceRequest[]) => void;
  setStartPoint: (departures: StartPointRequest[]) => void;
  reset: () => void;
}

const initialState: MeetingState = {
  groupName: '',
  groupPurpose: null,
  meetTime: [],
  place: [],
  meetDays: [],
  startPoint: [{ id: 1, type: 'leader', first: '', second: '', third: '' }],
};
export const useMeetingStore = create<MeetingState & MeetingActions>()(
  
  persist(
    (set) => ({
      ...initialState, 

      setGroupName: (name) => set({ groupName: name }),
      setGroupPurpose: (purpose) => set({ groupPurpose: purpose }),
      setMeetDays: (days) => set({ meetDays: days }),
       setMeetTime: (times) => {
      
        const koreanToEnglish: { [key: string]: TimeType } = {
          '오전': 'MORNING',
          '점심': 'LUNCH',
          '오후': 'AFTERNOON',
          '저녁': 'EVENING' // API 명세서에 'dinner'가 아닌 'EVENING'일 가능성이 높습니다. 확인 필요
        };
        
  
        const normalizedTimes = times.map(time => koreanToEnglish[time] || time) as TimeType[];
        
    
        const uniqueTimes = [...new Set(normalizedTimes)];
        
        set({ meetTime: uniqueTimes });
      },
      // setSelectedTimes: (times) => set({ selectedTimes: times }),
      
      setPlace: (places) => set({ place: places }),
      setStartPoint: (departures) => set({ startPoint: departures }),
      reset: () => set(initialState),
    }),

    {
      name: 'meeting-storage',
    }
  )
);

