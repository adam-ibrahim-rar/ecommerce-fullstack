import { FaStar } from "react-icons/fa";
import { useProductReviewsQuery } from "../api/reviewsQueries";
import ReviewDialog from "./ReviewDialog";

type ReviewsListProps = {
  productId: string;
  productTitle: string;
};

export default function ReviewsList({ productId, productTitle }: ReviewsListProps) {
  const { data: reviews, isLoading, isError } = useProductReviewsQuery(productId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">
          Reviews {reviews?.length ? `(${reviews.length})` : ""}
        </h2>

        <ReviewDialog productId={productId} productTitle={productTitle} />
      </div>

      {isLoading && (
        <p className="text-subtle text-sm">Loading reviews...</p>
      )}

      {isError && (
        <p className="text-brand text-sm">Failed to load reviews.</p>
      )}

      {!isLoading && !isError && reviews?.length === 0 && (
        <p className="text-subtle text-sm">
          No reviews yet. Be the first to share your thoughts!
        </p>
      )}

      {!isLoading && !isError && reviews && reviews.length > 0 && (
        <div className="flex flex-col gap-5">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-5">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.userName}</span>

                <span className="text-subtle text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    size={14}
                    className={index < review.rating ? "text-warning" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="mt-2 text-[14px] leading-5">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
