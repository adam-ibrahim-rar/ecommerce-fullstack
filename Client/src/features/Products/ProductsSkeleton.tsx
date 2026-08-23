import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/Helpers/ProductCardSkeleton";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

export default function ProductsSkeleton({
  mode = "details",
}: {
  // "details": صفحة منتج واحد (صورة + تفاصيل + منتجات مرتبطة)
  // "list": صفحة كل المنتجات (جريد بس، من غير تفاصيل منتج)
  mode?: "details" | "list";
}) {
  return (
    <div className="w-[1170px] flex flex-col gap-10 mx-auto">
      <div className="h-[24px] my-7">
        <Skeleton className="w-[150px] h-[30px] rounded" />
      </div>

      {mode === "details" && <ProductDetailsSkeleton />}

      <div className="flex flex-col gap-5">
        <div>
          <Skeleton className="w-[130px] h-[35px] rounded" />
        </div>

        <div className="grid grid-cols-4 gap-[30px]">
          {Array.from({ length: mode === "details" ? 4 : 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
