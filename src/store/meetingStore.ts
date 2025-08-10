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
  selectedTimes: string[];
  places: Place[];
  departures: Departure[];
}

interface MeetingActions {
  setGroupName: (name: string) => void;
  setGroupPurpose: (purpose: string | null) => void;
  setSelectedTimes: (times: string[]) => void;
  setPlaces: (places: Place[]) => void;
  setDepartures: (departures: Departure[]) => void;
  reset: () => void;
}

const initialState: MeetingState = {
  groupName: '',
  groupPurpose: null,
  selectedTimes: [],
  places: [],
  departures: [],
};

export const useMeetingStore = create<MeetingState & MeetingActions>()(
  
  persist(
    (set) => ({
      ...initialState, 

      setGroupName: (name) => set({ groupName: name }),
      setGroupPurpose: (purpose) => set({ groupPurpose: purpose }),
       setSelectedTimes: (times) => {
      
        const koreanToEnglish: { [key: string]: string } = {
          '오전': 'morning',
          '점심': 'lunch', 
          '오후': 'afternoon',
          '저녁': 'dinner'
        };
        
  
        const normalizedTimes = times.map(time => koreanToEnglish[time] || time);
        
    
        const uniqueTimes = [...new Set(normalizedTimes)];
        
        set({ selectedTimes: uniqueTimes });
      },
      // setSelectedTimes: (times) => set({ selectedTimes: times }),
      
      setPlaces: (places) => set({ places }),
      setDepartures: (departures) => set({ departures }),
      reset: () => set(initialState),
    }),

    {
      name: 'meeting-storage',
    }
  )
);

