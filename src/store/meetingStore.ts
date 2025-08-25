import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TimeType = 'MORNING' | 'LUNCH' | 'AFTERNOON' | 'EVENING';
export type DayType = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY' | 'WEEKDAY' | 'WEEKEND';
export type PlaceType = 'RESTAURANT' | 'CAFE' | 'BAR' | 'ACTIVITY';
export type AtmosphereType = 'PRODUCTIVE' | 'AESTHETIC' | 'INDULGENT' | 'SOCIABLE';
export type RestaurantTypeDetail = 'KOREAN' | 'JAPANESE' | 'CHINESE'  | 'WESTERN';
export type BarTypeDetail = 'BEER' | 'IZAKAYA' | 'POCHA' | 'BAR_SPECIATLS';
export type TypeDetail = RestaurantTypeDetail | BarTypeDetail | null;
export interface PlaceRequest {
  id: number;
  placeType: PlaceType | null;
  typeDetail: TypeDetail;
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

export interface MeetingState {
  groupName: string;
  groupPurpose: string | null;
  meetDays: DayType[]; 
  meetTime: TimeType[]; 
  place: PlaceRequest[];
  startPoint: StartPointRequest[];
}


interface MeetingActions {
  setGroupName: (name: string) => void;
  setGroupPurpose: (purpose: string | null) => void;
  setMeetDays: (days: DayType[]) => void; 
  setMeetTime: (times: TimeType[]) => void; 
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
  
  startPoint: [{
      id: 1,
      type: 'leader',
      first: '서울시',
      second: '',
      third: '',
    }],
};

export const useMeetingStore = create<MeetingState & MeetingActions>()(
  persist(
    (set) => ({
      ...initialState,

      setGroupName: (name) => set({ groupName: name }),
      setGroupPurpose: (purpose) => set({ groupPurpose: purpose }),
      
      setMeetDays: (days) => set({ meetDays: days }),
      setMeetTime: (times) => set({ meetTime: [...new Set(times)] }), 
      
      setPlace: (places) => set({ place: places }),
      setStartPoint: (departures) => set({ startPoint: departures }),
      reset: () => set(initialState),
    }),
    {
      name: 'meeting-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);