import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useAppSelector } from "@/reduxtoolkit/hooks";
import { useCreateReviewMutation } from "../api/reviewsQueries";

type ReviewDialogProps = {
  productId: string;
  productTitle: string;
};

export default function ReviewDialog({ productId, productTitle }: ReviewDialogProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate, isPending } = useCreateReviewMutation(productId);

  const handleTriggerClick = (event: React.MouseEvent) => {
    if (!isAuthenticated) {
      event.preventDefault();
      toast.error("Please login to write a review");
      navigate("/account/login");
    }
  };

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setComment("");
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    mutate(
      { rating, comment: comment.trim() },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully!");
          resetForm();
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to submit review. Please try again.");
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={handleTriggerClick}
          className="text-[14px] text-brand underline underline-offset-4 cursor-pointer"
        >
          Write a Review
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts on "{productTitle}" with other customers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Your Rating</Label>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (hoveredRating || rating);

                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={isFilled ? "text-warning" : "text-gray-300"}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="review-comment">Your Review</Label>
            <Textarea
              id="review-comment"
              placeholder="What did you like or dislike about this product?"
              className="min-h-[100px] resize-none"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
