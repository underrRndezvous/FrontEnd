import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

export interface Departure {
  id: number;
  value: string;
  type: 'leader' | 'member';
}

export interface MeetingState {
  groupName: string;
  groupPurpose: string | null;
  meetDays: string[]
  meetTime: string[];
  place: Place[];
  startPoint: Departure[];
}

interface MeetingActions {
  setGroupName: (name: string) => void;
  setGroupPurpose: (purpose: string | null) => void;
  setMeetDays: (days: string[]) => void;
  setMeetTime: (times: string[]) => void;
  setPlace: (places: Place[]) => void;
  setStartPoint: (departures: Departure[]) => void;
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
      setMeetDays: (days) => set({ meetDays: days }),
       setMeetTime: (times) => {
      
        const koreanToEnglish: { [key: string]: string } = {
          '오전': 'morning',
          '점심': 'lunch', 
          '오후': 'afternoon',
          '저녁': 'dinner'
        };
        
  
        const normalizedTimes = times.map(time => koreanToEnglish[time] || time);
        
    
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

