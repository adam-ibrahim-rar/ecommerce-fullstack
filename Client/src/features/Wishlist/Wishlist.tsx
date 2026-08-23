import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PathLocation from "../../components/Helpers/PathLocation";
import Button from "../../components/Helpers/Button";
import WishlistProduct from "./WishlistProduct";
import WishlistSkeleton from "../../components/Skeletons/WishlistSkeleton";

import { useAppDispatch, useAppSelector } from "../../reduxtoolkit/hooks";
import {
  getWishlist,
  deleteWishlistItem,
} from "../../reduxtoolkit/slices/wishlist/wishlistSlice";
import { addToCart } from "../../reduxtoolkit/slices/cart/cartSlice";
import { selectWishlistItems, selectWishlistLoading } from "./wishlistSelectors";

const details = ["product", "price", "status", "action"];

export default function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector(selectWishlistItems);
  const loading = useAppSelector(selectWishlistLoading);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  function handleDelete(id: string) {
    dispatch(deleteWishlistItem(id))
      .unwrap()
      .catch(() => toast.error("Failed to remove item"));
  }

  function handleMoveToBag(productId: string, wishlistItemId: string) {
    dispatch(addToCart({ productId, quantity: 1 }))
      .unwrap()
      .then(() => {
        dispatch(deleteWishlistItem(wishlistItemId));
        toast.success("Moved to cart");
      })
      .catch(() => toast.error("Failed to move item to cart"));
  }

  function handleMoveAllToBag() {
    if (wishlistItems.length === 0) return;

    Promise.all(
      wishlistItems.map((item) =>
        dispatch(addToCart({ productId: item.productId, quantity: 1 })).unwrap(),
      ),
    )
      .then(() => {
        wishlistItems.forEach((item) => dispatch(deleteWishlistItem(item.id)));
        toast.success("All items moved to cart");
      })
      .catch(() => toast.error("Failed to move some items to cart"));
  }

  if (loading && wishlistItems.length === 0) {
    return <WishlistSkeleton />;
  }

  return (
    <div className="w-[1170px] mx-auto">
      <PathLocation />

      {wishlistItems.length > 0 ? (
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">
              Wishlist ({wishlistItems.length})
            </h1>

            <Button
              bg="bg-white"
              text="text-black"
              classes="border border-gray-400 h-[56px] w-fit font-medium"
              content="Move All To Bag"
              handleClick={handleMoveAllToBag}
            />
          </div>

          <div className="flex flex-col gap-10">
            <header className="h-[72px] shadow-lg px-10 grid grid-cols-4 items-center">
              {details.map((item, index) => (
                <span
                  key={index}
                  className={`text-[16px] capitalize ${
                    index === 0 ? "text-left" : "text-center"
                  }`}
                >
                  {item}
                </span>
              ))}
            </header>

            {wishlistItems.map((item) => (
              <WishlistProduct
                key={item.id}
                Product={item}
                onDelete={handleDelete}
                onMoveToBag={handleMoveToBag}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              bg="bg-white"
              text="text-black"
              classes="border border-gray-400 h-[56px] w-[218px] font-medium"
              content="Return To Shop"
              handleClick={() => navigate("/")}
            />
          </div>
        </div>
      ) : (
        <div className="h-[120px] mt-10 w-full shadow-lg px-10 flex items-center justify-between">
          <span>Your wishlist is empty</span>

          <Button
            bg="bg-white"
            text="text-black"
            classes="border border-gray-400 h-[56px] w-[218px] font-medium"
            content="Return To Shop"
            handleClick={() => navigate("/")}
          />
        </div>
      )}
    </div>
  );
}
