import { TbXboxXFilled } from "react-icons/tb";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type CartProductProps = {
  Product: any;
  onDelete: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
};

export default function CartProduct({
  Product,
  onDelete,
  onQuantityChange,
}: CartProductProps) {
  return (
    <div className="h-[102px] shadow-lg inset-shadow-xs select-none w-full px-10 grid grid-cols-4 items-center">
      <div className="relative flex items-center gap-5">
        <TbXboxXFilled
          className="
            w-[24px] h-[24px]
            text-secondary-two
            cursor-pointer
            absolute top-0.5 right-52
          "
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

      <div className="flex justify-center">
        <div
          className="
            w-[66px] h-[42px]
            border border-gray-400
            flex justify-around
            items-center
            rounded-md
          "
        >
          <span className="w-[20px] text-sm">
            {String(Product.quantity).padStart(2, "0")}
          </span>

          <span>
            <MdKeyboardArrowUp
              className="cursor-pointer"
              onClick={() => {
                onQuantityChange(Product.id, Product.quantity + 1);
              }}
            />

            <MdKeyboardArrowDown
              className="cursor-pointer"
              onClick={() => {
                if (Product.quantity > 1) {
                  onQuantityChange(Product.id, Product.quantity - 1);
                }
              }}
            />
          </span>
        </div>
      </div>

      <div className="text-center text-sm">
        ${Product.price * Product.quantity}
      </div>
    </div>
  );
}
