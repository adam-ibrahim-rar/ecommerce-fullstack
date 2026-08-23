import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <div className="w-[1170px] mx-auto">
      <div className="h-[24px] my-9">
        <Skeleton className="w-[150px] h-[30px] rounded" />
      </div>

      <Skeleton className="w-[1170px] rounded-md h-[500px]" />
    </div>
  );
}
