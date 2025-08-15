
export type PostMeetingRequest = {

  name: string;
  purpose?: string;
  
};

export type PostMeetingResponse = {
  
  recommendationId?: string;
  recommendations?: unknown[];
};
