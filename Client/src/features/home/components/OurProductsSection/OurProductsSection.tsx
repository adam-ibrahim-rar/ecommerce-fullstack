import { useNavigate } from "react-router-dom";
import Frame from "@/components/Helpers/Frame";
import Swapers from "@/components/Helpers/Swapers";
import ProductCard from "@/components/Helpers/ProductCard";
import Button from "@/components/Helpers/Button";
import { usePager } from "@/lib/hooks/usePager";
import type { Product } from "../../types/home";

const PAGE_SIZE = 8;

type OurProductsSectionProps = {
  products: Product[];
};

export default function OurProductsSection({ products }: OurProductsSectionProps) {
  const navigate = useNavigate();
  const { pageItems, canPrev, canNext, prev, next } = usePager(products, PAGE_SIZE);

  function handleClick() {
    navigate("/products");
  }

  return (
    <div className="flex flex-col gap-10 w-[1170px]">
      <Frame
        title="Our Products"
        functionality={
          <Swapers onPrev={prev} onNext={next} prevDisabled={!canPrev} nextDisabled={!canNext} />
        }
        description="explore Our Products"
      />

      <div className="grid grid-cols-4 gap-[30px]">
        {pageItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="self-center ">
        <Button content="view all products" handleClick={handleClick} />
      </div>
    </div>
  );
}