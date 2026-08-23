import Button from "@/components/Helpers/Button";
import Frame from "@/components/Helpers/Frame";
import ProductCard from "@/components/Helpers/ProductCard";
import ProductCardSkeleton from "@/components/Skeletons/Products/ProductCardSkeleton";
import { useBestSellingProductsQuery } from "../../api/homeQueries";

export default function BestSellingSection() {
  const { data: products, isLoading, isError } = useBestSellingProductsQuery();

  function handleClick() {}

  return (
    <div className="flex flex-col gap-14 w-[1170px]">
      <Frame
        description="Best Selling Products"
        title="this month"
        functionality={<Button content="View all" handleClick={handleClick} />}
      />

      {isLoading && <ProductCardSkeleton />}

      {isError && (
        <p className="text-red-500">Failed to load products.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-4 mt-2 gap-[30px]">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}