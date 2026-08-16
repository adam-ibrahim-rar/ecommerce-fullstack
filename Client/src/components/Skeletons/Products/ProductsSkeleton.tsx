import ProductCardSkeleton from "./ProductCardSkeleton";
import Skeleton from "../Skeleton";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

export default function ProductsSkeleton() {
  return (
    <div className="w-[1170px] flex flex-col gap-10 mx-auto">
      <div className="h-[24px] my-7">
        <Skeleton ClassName="w-[150px] h-[30px] rounded" />
      </div>

      <ProductDetailsSkeleton />

      <div className="flex flex-col gap-5">
        <div>
          <Skeleton ClassName="w-[130px] h-[35px] rounded" />
        </div>

        <div className="grid grid-cols-4 gap-[30px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
