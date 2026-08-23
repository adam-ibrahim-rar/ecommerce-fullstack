import Button from "@/components/Helpers/Button";
import Frame from "@/components/Helpers/Frame";
import ProductCard from "@/components/Helpers/ProductCard";
import type { Product } from "../../types/home";

type BestSellingSectionProps = {
  products: Product[];
};

export default function BestSellingSection({ products }: BestSellingSectionProps) {
  function handleClick() {}

  return (
    <div className="flex flex-col gap-14 w-[1170px]">
      <Frame
        description="Best Selling Products"
        title="this month"
        functionality={<Button content="View all" handleClick={handleClick} />}
      />

      <div className="grid grid-cols-4 mt-2 gap-[30px]">
        {products&&products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}