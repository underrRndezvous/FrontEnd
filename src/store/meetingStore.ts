import { create } from 'zustand';

// STEP 1-4: 장소 유형 데이터 타입
export interface Place {
  id: number;
  type: string | null;
  subType: string | null;
}

// STEP 1-5: 출발지 데이터 타입
export interface Departure {
  id: number;
  value: string;
  type: 'leader' | 'member';
}

// 스토어의 전체 상태 타입
interface MeetingState {
  groupName: string;
  groupPurpose: string | null;
  selectedTimes: string[];
  places: Place[];
  departures: Departure[];
}

// 스토어의 상태를 변경할 함수(액션)들의 타입
interface MeetingActions {
  setGroupName: (name: string) => void;
  setGroupPurpose: (purpose: string | null) => void;
  setSelectedTimes: (times: string[]) => void;
  setPlaces: (places: Place[]) => void;
  setDepartures: (departures: Departure[]) => void;
  reset: () => void;
}

// 스토어의 초기 상태값
const initialState: MeetingState = {
  groupName: '',
  groupPurpose: null,
  selectedTimes: [],
  places: [],
  departures: [],
};

// --- Zustand 스토어 생성 ---
export const useMeetingStore = create<MeetingState & MeetingActions>((set) => ({
  ...initialState, // 초기 상태 적용

  // 상태를 변경하는 함수들 (액션)
  setGroupName: (name) => set({ groupName: name }),
  setGroupPurpose: (purpose) => set({ groupPurpose: purpose }),
  setSelectedTimes: (times) => set({ selectedTimes: times }),
  setPlaces: (places) => set({ places }),
  setDepartures: (departures) => set({ departures }),
  reset: () => set(initialState),
}));