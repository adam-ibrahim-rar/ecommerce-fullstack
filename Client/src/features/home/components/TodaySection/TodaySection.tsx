import { useNavigate } from "react-router-dom";
import Frame from "@/components/Helpers/Frame";
import Swapers from "@/components/Helpers/Swapers";
import ProductCard from "@/components/Helpers/ProductCard";
import Button from "@/components/Helpers/Button";
import Countdown from "../shared/CountDown";
import ProductCardSkeleton from "@/components/Skeletons/Products/ProductCardSkeleton";
import { useFlashSaleProductsQuery } from "../../api/homeQueries";

export default function TodaySection() {
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useFlashSaleProductsQuery();

  function handleClick() {
    navigate("/products");
  }

  const flashSaleEndsAt = products[0]?.flashSaleEndsAt;

  return (
    <div className="flex flex-col gap-5 w-[1170px]">
      <Frame
        title="Today's"
        functionality={<Swapers />}
        counter={flashSaleEndsAt ? <Countdown endsAt={flashSaleEndsAt} /> : null}
        description="Flash Sales"
      />

      {isLoading && <ProductCardSkeleton />}

      {isError && (
        <p className="text-red-500 mt-2">Failed to load products.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-4 mt-2 gap-[30px]">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      <div className="self-center mt-14">
        <Button content="view all products" handleClick={handleClick} />
      </div>
      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}