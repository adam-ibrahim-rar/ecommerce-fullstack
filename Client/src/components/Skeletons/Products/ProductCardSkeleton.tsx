import Skeleton from "../Skeleton";

export default function ProductCardSkeleton({
  withColors = false,
}: {
  withColors?: boolean;
}) {
  return (
    <div className="w-[270px]">

      <Skeleton ClassName="w-[270px] h-[250px] rounded" />

      <div className="mt-2 flex flex-col gap-2">
        <Skeleton ClassName="w-[220px] h-[20px] rounded" />

        <div className="flex gap-3">
          <Skeleton ClassName="w-[50px] h-[20px] rounded" />
          <Skeleton ClassName="w-[55px] h-[20px] rounded" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton ClassName="w-[85px] h-[16px] rounded" />
          <Skeleton ClassName="w-[35px] h-[16px] rounded" />
        </div>

        {withColors && (
          <div className="flex gap-2">
            <Skeleton ClassName="size-3 rounded-full" />
            <Skeleton ClassName="size-3 rounded-full" />
            <Skeleton ClassName="size-3 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}