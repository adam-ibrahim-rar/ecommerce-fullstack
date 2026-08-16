import PathLocation from "../..//components/Helpers/PathLocation";
import Frame from "../..//components/Helpers/Frame";
import ProductCard from "../..//components/Helpers/ProductCard";
import iphone from "../../assets/iphone.jpg";
import ProductDetails from "./ProductDetails";
import { useEffect, useState } from "react";
import ProductsSkeletonContainer from "../../components/Skeletons/Products/ProductsSkeleton";
const relatedProducts = [
  {
    id: 1,
    image: iphone,
    title: "AK-900 Wired Keyboard",
    price: 85,
    oldPrice: 110,
    discount: 23,
    rating: 4,
    reviews: 48,
  },
  {
    id: 2,
    image: iphone,
    title: "AK-900 Wired Keyboard",
    price: 85,
    oldPrice: 110,
    discount: 23,
    rating: 4,
    reviews: 48,
  },
  {
    id: 3,
    image: iphone,
    title: "IPS LCD Gaming Monitor",
    price: 650,
    oldPrice: 750,
    discount: 13,
    rating: 5,
    reviews: 120,
  },
  {
    id: 4,
    image: iphone,
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: 20,
    rating: 4,
    reviews: 99,
  },
];
const product = {
  id: 1,

  title: "Havic HV G-92 Gamepad",

  price: 192,

  oldPrice: 220,

  discount: 13,

  rating: 4,

  reviews: 150,

  images: [iphone, iphone, iphone, iphone],

  colors: [
    {
      name: "blue",
      value: "#177DDC",
    },
    {
      name: "red",
      value: "#E57373",
    },
  ],

  sizes: ["XS", "S", "M", "L", "XL"],

  description:
    "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.",

  inStock: true,

  delivery: {
    freeDeliveryText: "Enter your postal code for Delivery Availability",

    returnText: "Free 30 Days Delivery Returns.",

    returnDetails: "Details",
  },
};

export default function Products() {
  const [loading, setlodaing] = useState(true);
  useEffect(() => {
    setTimeout(() => setlodaing(false), 500);
  }, []);

  return loading ? (
    <ProductsSkeletonContainer />
  ) : (
    <div className="w-[1170px] flex flex-col gap-10 mx-auto">
      <PathLocation />

      <ProductDetails product={product} />
      <div className="flex flex-col  gap-5">
        <Frame title="Related Item" />

        <div className="grid grid-cols-4 gap-[30px]">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
