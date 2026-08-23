export interface CreateReviewInput {
  rating: number;
  comment?: string;
}

export interface ReviewProductParams {
  id: string;
}

export interface ReviewResponse {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
