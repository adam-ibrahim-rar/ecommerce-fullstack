import Skeleton from "./Skeleton";

export default function CartSkeleton() {
  return (
    <div className="w-[1170px] mx-auto">
      <div className="h-[24px] my-9">
        <Skeleton ClassName="w-[150px] h-[30px] rounded" />
      </div>

      <Skeleton ClassName="w-[1170px] rounded-md h-[500px]" />
    </div>
  );
}
