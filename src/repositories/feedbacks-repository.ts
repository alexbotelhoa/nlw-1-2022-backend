export interface FeedbackResponse {
  id: string;
  type: string;
  comment: string;
  screenshot: string;
}
export interface FeedbackCreate {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackDelete {
  id: string;
}

export interface FeedbacksRepository {
  select: () => Promise<FeedbackResponse[]>;
  create: (data: FeedbackCreate) => Promise<FeedbackResponse>;
  delete: (data: FeedbackDelete) => Promise<FeedbackResponse>;
}
