import Button from "../../../components/Button";
import Frame from "../../../components/Frame";
import iphone from "../../../assets/iphone.jpg";
import ProductCard from "../../../components/ProductCard";
const products = [
  {
    id: 1,
    image: iphone,
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    rating: 5,
    reviews: 88,
  },
  {
    id: 2,
    image: iphone,
    title: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    image: iphone,
    title: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    rating: 5,
    reviews: 99,
  },
  {
    id: 4,
    image: iphone,
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    rating: 4,
    reviews: 99,
  },
];
export default function ForthSection() {
  function handleClick() {}
  return (
    <div className="flex flex-col  gap-14 w-[1170px]">
      <Frame
        description="Best Selling Products"
        title="this month"
        functionality={<Button content="View all" handleClick={handleClick} />}
      />
      <div className="grid grid-cols-4 mt-2 gap-[30px]">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}
