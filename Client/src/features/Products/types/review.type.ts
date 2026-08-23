export type Review = {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type CreateReviewInput = {
  rating: number;
  comment: string;
};
