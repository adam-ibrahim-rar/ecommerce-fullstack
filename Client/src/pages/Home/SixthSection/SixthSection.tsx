import { useNavigate } from "react-router-dom";
import Frame from "../../../components/Frame";
import Swapers from "../../../components/Swapers";
import ProductCard from "../../../components/ProductCard";
import iphone from "../../../assets/iphone.jpg";
import Button from "../../../components/Button";

const products = [
  {
    id: 1,
    image: iphone,
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: 20,
    rating: 4,
    reviews: 99,
    colors: ["#177777", "#FF0000"],
  },
  {
    id: 2,
    image: iphone,
    title: "The North Face Urban Jacket",
    price: 260,
    oldPrice: 320,
    discount: 19,
    rating: 5,
    reviews: 87,
    colors: ["#000000", "#FFFFFF", "#808080"],
  },
  {
    id: 3,
    image: iphone,
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    discount: 25,
    rating: 4,
    reviews: 64,
    colors: ["#FF0000", "#000000"],
  },
  {
    id: 4,
    image: iphone,
    title: "AK-900 Wired Keyboard",
    price: 85,
    oldPrice: 110,
    discount: 23,
    rating: 4,
    reviews: 48,
    colors: ["#000000", "#FFFFFF"],
  },
  {
    id: 5,
    image: iphone,
    title: "IPS LCD Gaming Monitor",
    price: 650,
    oldPrice: 750,
    discount: 13,
    rating: 5,
    reviews: 120,
    colors: ["#000000", "#222222"],
  },
  {
    id: 6,
    image: iphone,
    title: "Wireless Noise Cancelling Headphones",
    price: 180,
    oldPrice: 230,
    discount: 22,
    rating: 4,
    reviews: 76,
    colors: ["#000000", "#FFFFFF", "#FF0000"],
  },
  {
    id: 7,
    image: iphone,
    title: "Smart Fitness Watch",
    price: 210,
    oldPrice: 280,
    discount: 25,
    rating: 4,
    reviews: 91,
    colors: ["#000000", "#177777", "#FFFFFF"],
  },
  {
    id: 8,
    image: iphone,
    title: "RGB Mechanical Gaming Mouse",
    price: 95,
    oldPrice: 130,
    discount: 27,
    rating: 5,
    reviews: 143,
    colors: ["#000000", "#FF0000", "#177777", "#FFFFFF"],
  },
  {
    id: 9,
    image: iphone,
    title: "Portable Bluetooth Speaker",
    price: 140,
    oldPrice: 190,
    discount: 26,
    rating: 4,
    reviews: 58,
    colors: ["#000000", "#FF0000", "#0000FF"],
  },
];
export default function SixthSection() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/products");
  }
  return (
    <div className="flex flex-col  gap-5 w-[1170px]">
      <Frame
        title="Our Products"
        functionality={<Swapers />}
        description="explore Our Products"
      />

      <div className="grid grid-cols-4 mt-2 gap-[30px]">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="self-center mt-14">
        <Button content="view all products" handleClick={handleClick} />
      </div>
    </div>
  );
}
