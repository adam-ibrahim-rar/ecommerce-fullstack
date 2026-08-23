import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSkeleton() {
  return (
    <div className="flex w-full gap-7">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-[145px] w-[175px] rounded-md" />
      ))}
    </div>
  );
}
