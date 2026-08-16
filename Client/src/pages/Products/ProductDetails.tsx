import { useState } from "react";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiTruck,
  FiRefreshCcw,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Button from "../../components/Helpers/Button";

type ProductColor = {
  name?: string;
  value: string;
};

type ProductDetailsData = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  colors?: ProductColor[];
  sizes?: string[];
  description: string;
  inStock: boolean;
  delivery?: {
    freeDeliveryText?: string;
    returnText?: string;
    returnDetails?: string;
  };
};

type ProductDetailsProps = {
  product: ProductDetailsData;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");

  const [quantity, setQuantity] = useState(2);

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.value ?? "",
  );

  return (
    <div className="w-[1170px] mx-auto flex mb-18 justify-between">
      <div className="flex gap-5 ">
        <div className="w-[170px] h-[600px] flex flex-col justify-between">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                w-[170px] h-[138px]
                bg-gray-100
                flex items-center justify-center
                cursor-pointer
                rounded
                overflow-hidden
              `}
            >
              <img
                src={image}
                alt={product.title}
                className="w-[121px] h-[114px] object-cover"
              />
            </button>
          ))}
        </div>

        <div className="w-[500px] h-[600px] bg-gray-100 flex items-center justify-center">
          <img
            src={product.images[selectedImage]}
            alt={product.title}
            className="w-[446px] h-[315px] object-contain"
          />
        </div>
      </div>

      <div className="w-[400px] justify-between  h-[600px] flex flex-col ">
        <div className="gap-3 flex flex-col">
          <h1 className="text-[24px] font-semibold leading-6">
            {product.title}
          </h1>

          <div className="flex items-center  gap-2 ">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  size={20}
                  className={
                    index < product.rating
                      ? "text-secondary-four"
                      : "text-gray-400"
                  }
                />
              ))}
            </div>

            <span className="text-[14px] text-one">
              ({product.reviews} Reviews)
            </span>

            <span className="text-one text-[14px]">|</span>

            <span className="text-[14px] text-secondary-three">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-[24px] ">${product.price.toFixed(2)}</p>

          <p className="text-[14px]  leading-4 ">{product.description}</p>

          <div className="h-[1.5px] W-[400PX] bg-one w-full " />
        </div>

        <div className="gap-3 flex flex-col">
          {product.colors?.length ? (
            <div className="flex items-center gap-4 ">
              <span className="text-[20px] font-medium">Colours:</span>

              <div className="flex items-center gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name ?? index}
                    onClick={() => setSelectedColor(color.value)}
                    className={`
                        rounded-full
                        ${color.name ?? ""}
                        ${
                          selectedColor === color.value
                            ? "outline outline-1 outline-offset-2 w-[18px] h-[18px] outline-black"
                            : "w-[20px] h-[20px]"
                        }
                      `}
                    style={{
                      backgroundColor: color.value,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {product.sizes?.length ? (
            <div className="flex items-center gap-6 ">
              <span className="text-[20px] font-medium">Size:</span>

              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                        w-[32px] h-[32px]
                        border border-gray-400
                        rounded
                        text-[14px]
                        font-medium
                        cursor-pointer
                        ${
                          selectedSize === size
                            ? "bg-secondary-two text-white border-secondary-two"
                            : "bg-white"
                        }
                      `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-3 ">
            <div className="flex w-[160px] h-[44px] rounded-md">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-[40px] border border-gray-400 flex items-center justify-center cursor-pointer"
              >
                <FiMinus size={24} strokeWidth={1.5} />
              </button>

              <div className="w-[80px] font-medium text-lg border-y border-gray-400 flex items-center justify-center text-[20px]">
                {quantity}
              </div>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-[40px] bg-secondary-two text-white flex items-center justify-center cursor-pointer"
              >
                <FiPlus size={24} strokeWidth={1.5} />
              </button>
            </div>

            <Button
              content="Buy Now"
              classes="w-[165px] h-[44px] text-[16px]"
              handleClick={() => {}}
            />

            <button
              className="
                  w-[40px] h-[40px]
                  border border-gray-400
                  rounded
                  flex items-center justify-center
                  cursor-pointer
                  hover:bg-gray-100
                "
            >
              <FiHeart size={20} />
            </button>
          </div>
        </div>

        <div className="border border-gray-400 mt-7">
          <div className="h-[90px] flex items-center gap-4 px-3 justify-start">
            <FiTruck size={30} />

            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold">Free Delivery</span>

              <span className="text-[12px] underline">
                {product.delivery?.freeDeliveryText ??
                  "Enter your postal code for Delivery Availability"}
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-gray-300" />

          <div className="h-[90px] flex items-center gap-4 px-3 justify-start">
            <FiRefreshCcw size={30} />

            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold">Return Delivery</span>

              <span className="text-[12px]">
                {product.delivery?.returnText ??
                  "Free 30 Days Delivery Returns."}{" "}
                <span className="underline">
                  {product.delivery?.returnDetails ?? "Details"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
