import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  id:number
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
};

export default function ProductCard({
  image,
  id,
  title,
  price,
  oldPrice,
  discount,
  rating,
  reviews,
}: ProductCardProps) {
  const [addToCartHovered, setAddToCartHovered] = useState(false);
  const navigate=useNavigate()
  return (
    <div className="w-[270px] ">
      <div onMouseOver={() => setAddToCartHovered(true)} onMouseOut={() => setAddToCartHovered(false)}
     
       className="relative   h-[250px] bg-[#F5F5F5] rounded flex items-center justify-center">
        {discount && (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded">
            -{discount}%
          </span>
        )}

        <div className="absolute top-3 w-[34px] h-[76px] right-3 flex flex-col gap-2">
            <button onClick={()=>{}} className="size-[34px] cursor-pointer rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition">
      <FaRegHeart size={18} />
    </button>

    <button onClick={()=>{}} className="size-[34px] cursor-pointer rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition">
      <FiEye size={18} />
    </button> 
        </div>

        <div onClick={() => {navigate(`/products/${id}`)}}
        className="w-[190px] cursor-pointer h-[180px] flex justify-start ">
          <img
          src={image}
          alt={title}
           
          className="w-[172px]  h-[152px] object-contain"
        />
        </div>
        <button
          className={`absolute bottom-0 w-full h-[41px] inset-x-0
             bg-black text-white  rounded transition cursor-pointer ${
            addToCartHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={()=>{}}
        >
          Add to Cart
        </button>
      </div>

      <div className="mt-1">
        <h3 className="font-medium text-base">{title}</h3>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-[#DB4444] font-medium">
            ${price}
          </span>

          {oldPrice && (
            <span className="text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-[#FFAD33]">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                size={15}
                className={
                  index < rating ? "text-[#FFAD33]" : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-gray-500 text-sm font-medium">
            ({reviews})
          </span>
        </div>
      </div>
    </div>
  );
}