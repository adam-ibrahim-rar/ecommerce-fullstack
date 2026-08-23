import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../reduxtoolkit/hooks";

import { addToCart } from "../../reduxtoolkit/slices/cart/cartSlice";

export type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  colors: string[];
  isNew?: boolean;
};

export default function ProductCard({
  images,
  id,
  title,
  price,
  oldPrice,
  discount,
  rating,
  reviews,
  isNew,
  colors,
}: ProductCardProps) {
  const [addToCartHovered, setAddToCartHovered] = useState(false);
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  return (
    <div className="w-[270px] ">
      <div
        onMouseOver={() => setAddToCartHovered(true)}
        onMouseOut={() => setAddToCartHovered(false)}

        className="relative h-[250px] bg-[#F5F5F5] rounded flex items-center justify-center"
      >
        {isNew ? (
          <span className=" capitalize absolute top-3 left-3 bg-success text-white text-xs px-3 py-1 rounded">
            new
          </span>
        ) : (
          discount && (
            <span className="absolute top-3 left-1.5 bg-brand text-white text-xs px-3 py-1 rounded">
              -{discount}%
            </span>
          )
        )}

        <div className="absolute top-3 w-[34px] h-[76px] right-3 flex flex-col gap-2">
          <button
            onClick={() => {}}
            className="size-[34px] cursor-pointer rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition"
          >
            <FaRegHeart size={18} />
          </button>

          <button
            onClick={() => {}}
            className="size-[34px] cursor-pointer rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition"
          >
            <FiEye size={18} />
          </button>
        </div>

        <div
          onClick={() => {
            navigate(`/products/${id.split(" ").join("-")}`);
          }}
          className="w-[190px] cursor-pointer h-[180px] flex justify-start items-center "
        >
          <img
            src={images[0]}
            alt={title}

            className="w-[172px]  h-[152px] object-cover"
          />
        </div>
        <button
          className={`absolute bottom-0 w-full h-[41px] inset-x-0
    bg-black text-white rounded transition cursor-pointer
      ${addToCartHovered ? "opacity-100" : "opacity-0"}
      `}
          onClick={() => {
            if (!isAuthenticated) {
toast.error("Please login to add items to your cart", {
  duration: 4000, // 4 ثواني بدل الافتراضي
});              navigate("/account/login");
              return;
            }

            dispatch(
              addToCart({
                productId: String(id),
                quantity: 1,
              }),
            );
          }}
        >
          Add to Cart
        </button>
      </div>

      <div className="mt-1">
        <h3 className="font-medium text-base line-clamp-1">{title}</h3>

        <div className="flex items-center gap-3 ">
          <span className="text-brand font-medium">${price}</span>

          {oldPrice && (
            <span className="text-gray-400 line-through">${oldPrice}</span>
          )}
        </div>

        <div className="flex items-center  gap-2 ">
          <div className="flex text-warning">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                size={15}
                className={
                  index < rating ? "text-warning" : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-gray-500 text-sm font-medium">({reviews})</span>
        </div>

        {colors?.length ? (
          <div className="flex gap-2">
            {colors.map((colorValue, index) => (
              <button
                key={index}
                type="button"
                className="size-3 cursor-pointer rounded-full
        focus:outline focus:outline-2 focus:outline-black focus:outline-offset-2"
                style={{ backgroundColor: colorValue }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}