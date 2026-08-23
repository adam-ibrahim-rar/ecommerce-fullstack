import type { Request, Response } from "express";
import type {
  CreateReviewInput,
  ReviewProductParams,
} from "../types/review.type";

import {
  getReviewsService,
  addReviewService,
} from "../services/review.service";

export const getReviews = async (
  req: Request<ReviewProductParams>,
  res: Response
) => {
  const reviews = await getReviewsService(req.params.id);

  return res.status(200).json({
    success: true,
    data: reviews,
  });
};

export const addReview = async (
  req: Request<ReviewProductParams, {}, CreateReviewInput>,
  res: Response
) => {
  const review = await addReviewService(
    req.user.id,
    req.params.id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: review,
  });
};
