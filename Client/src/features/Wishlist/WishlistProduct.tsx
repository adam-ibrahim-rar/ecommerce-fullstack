import { TbXboxXFilled } from "react-icons/tb";
import Button from "../../components/Helpers/Button";
import type { WishlistItem } from "../../reduxtoolkit/slices/wishlist/WishlistTypes";

type WishlistProductProps = {
  Product: WishlistItem;
  onDelete: (id: string) => void;
  onMoveToBag: (productId: string, wishlistItemId: string) => void;
};

export default function WishlistProduct({
  Product,
  onDelete,
  onMoveToBag,
}: WishlistProductProps) {
  return (
    <div className="h-[102px] shadow-lg inset-shadow-xs select-none w-full px-10 grid grid-cols-4 items-center">
      <div className="relative flex items-center gap-5">
        <TbXboxXFilled
          className="w-[24px] h-[24px] text-brand cursor-pointer absolute top-0.5 right-52"
          onClick={() => onDelete(Product.id)}
        />

        <img
          src={Product.image}
          alt={Product.name}
          className="w-[55px] h-[55px] object-contain"
        />

        <span className="text-sm">{Product.name}</span>
      </div>

      <div className="text-center text-sm">${Product.price}</div>

      <div className="text-center text-sm">
        {Product.inStock ? (
          <span className="text-success">In Stock</span>
        ) : (
          <span className="text-brand">Out of Stock</span>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          content="Add to Cart"
          classes="!px-6 !py-2 text-sm w-fit"
          disabled={!Product.inStock}
          handleClick={() => onMoveToBag(Product.productId, Product.id)}
        />
      </div>
    </div>
  );
}
