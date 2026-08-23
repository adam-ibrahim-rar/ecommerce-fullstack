import { useNavigate } from "react-router-dom";
import Frame from "@/components/Helpers/Frame";
import Swapers from "@/components/Helpers/Swapers";
import ProductCard from "@/components/Helpers/ProductCard";
import Button from "@/components/Helpers/Button";
import Countdown from "../shared/CountDown";
import { usePager } from "@/lib/hooks/usePager";
import type { Product } from "../../types/home";

const PAGE_SIZE = 4;

type TodaySectionProps = {
  products: Product[];
};

export default function TodaySection({ products }: TodaySectionProps) {
  const navigate = useNavigate();
  const { pageItems, canPrev, canNext, prev, next } = usePager(products, PAGE_SIZE);

  function handleClick() {
    navigate("/products");
  }

  const flashSaleEndsAt = products[0]?.flashSaleEndsAt;

  return (
    <div className="flex flex-col gap-5 w-[1170px]">
      <Frame
        title="Today's"
        functionality={
          <Swapers onPrev={prev} onNext={next} prevDisabled={!canPrev} nextDisabled={!canNext} />
        }
        counter={flashSaleEndsAt ? <Countdown endsAt={flashSaleEndsAt} /> : null}
        description="Flash Sales"
      />

      <div className="grid grid-cols-4 mt-2 gap-[30px]">
        {pageItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="self-center mt-14">
        <Button content="view all products" handleClick={handleClick} />
      </div>
      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}