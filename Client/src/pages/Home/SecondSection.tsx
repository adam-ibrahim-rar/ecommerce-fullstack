import { useNavigate } from "react-router-dom";
import Frame from "./Frame";
import Swapers from "../../components/Swapers";
import ProductCard from "../../components/ProductCard";
import iphone from "../../assets/iphone.jpg";
import Button from "../../components/Button";

const products = [
  {
    id: 1,
    image: iphone,
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
  },
  {
    id: 2,
    image: iphone,
    title: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    image: iphone,
    title: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
  },
  {
    id: 4,
    image: iphone,
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: 25,
    rating: 4,
    reviews: 99,
  },
];
export default function SecondSection() {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/products");
    }
  return (
    <div className="flex flex-col  gap-5 w-[1170px]">
      <Frame
     title="Second Section"
     functionality={<Swapers />}
     description="This is the second section."/>



          <div className="grid grid-cols-4 mt-2 gap-[30px]">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>

<div className="self-center mt-14">
  <Button content="view all products" handleClick={handleClick} />

</div>
      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
<div className="self-center mt-14">

</div>
    </div>
  )
}
