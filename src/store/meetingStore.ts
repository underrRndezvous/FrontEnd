import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimeType = 'MORNING' | 'LUNCH' | 'AFTERNOON' | 'EVENING';
export type DayType = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY' | 'WEEKDAY' | 'WEEKEND';
export type PlaceType = 'RESTAURANT' | 'CAFE' | 'BAR' | 'ACTIVITY';
export type AtmosphereType = 'PRODUCTIVE' | 'AESTHETIC' | 'INDULGENT' | 'SOCIABLE';

export interface PlaceRequest {
  id: number;
  placeType: PlaceType | null;
  atmosphere: AtmosphereType | null;
}

export interface StartPointRequest {
  id: number;
  type: 'leader' | 'member';
  first: string;
  second: string;
  third: string;
}
export interface Departure {
  id: number;
  type: 'leader' | 'member';
  value: string;
}
// ▼▼▼▼▼ 바로 이 부분의 타입이 가장 중요합니다! ▼▼▼▼▼
export interface MeetingState {
  groupName: string;
  groupPurpose: string | null;
  meetDays: DayType[]; // string[] -> DayType[]
  meetTime: TimeType[]; // string[] -> TimeType[]
  place: PlaceRequest[];
  startPoint: StartPointRequest[];
}
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

interface MeetingActions {
  setGroupName: (name: string) => void;
  setGroupPurpose: (purpose: string | null) => void;
  setMeetDays: (days: DayType[]) => void; // 받는 타입도 DayType[]으로 변경
  setMeetTime: (times: TimeType[]) => void; // 받는 타입도 TimeType[]으로 변경
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
  startPoint: [],
};

export const useMeetingStore = create<MeetingState & MeetingActions>()(
  persist(
    (set) => ({
      ...initialState,

      setGroupName: (name) => set({ groupName: name }),
      setGroupPurpose: (purpose) => set({ groupPurpose: purpose }),
      
      // 이제 setMeetDays와 setMeetTime은 변환 로직이 필요 없습니다.
      // 변환은 이 함수를 호출하는 UI 컴포넌트에서 미리 해서 넘겨줘야 합니다.
      setMeetDays: (days) => set({ meetDays: days }),
      setMeetTime: (times) => set({ meetTime: [...new Set(times)] }), // 중복만 제거
      
      setPlace: (places) => set({ place: places }),
      setStartPoint: (departures) => set({ startPoint: departures }),
      reset: () => set(initialState),
    }),
    {
      name: 'meeting-storage',
    }
  )
);