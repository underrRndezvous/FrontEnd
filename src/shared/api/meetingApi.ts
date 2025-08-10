import axios from 'axios';
import type { MeetingState } from '@/store/meetingStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const postMeetingInfo = async (data: Omit<MeetingState, 'reset'>) => {

  const res = await apiClient.post('/meetings/recommend', data);
  return res.data;
};
