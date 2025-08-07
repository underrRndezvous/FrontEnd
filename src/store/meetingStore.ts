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

interface MeetingState {
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
      setSelectedTimes: (times) => set({ selectedTimes: times }),
      setPlaces: (places) => set({ places }),
      setDepartures: (departures) => set({ departures }),
      reset: () => set(initialState),
    }),
    {
      name: 'meeting-storage', 
    }
  )
);