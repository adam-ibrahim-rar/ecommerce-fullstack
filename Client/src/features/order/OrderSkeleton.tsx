import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton() {
  return (
    <div className="w-[1170px] mx-auto flex-col flex gap-7">
      <div className="h-[24px] my-9">
        <Skeleton className="w-[150px] h-[30px] rounded" />
      </div>

      <div className="flex justify-between ">
        <Skeleton className="w-[570px] rounded-md h-[914px]" />
        <Skeleton className="w-[570px] rounded-md h-[600px]" />
      </div>
    </div>
  );
}
