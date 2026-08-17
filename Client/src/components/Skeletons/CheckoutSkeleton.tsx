import Skeleton from "./Skeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="w-[1170px] mx-auto flex-col flex gap-7">
      <div className="h-[24px] my-9">
              <Skeleton ClassName="w-[150px] h-[30px] rounded" />
            </div>

      <div className="flex justify-between ">
        <Skeleton ClassName="w-[570px] rounded-md h-[914px]"/>
     <Skeleton ClassName="w-[570px] rounded-md h-[600px]"/>
      </div>
    </div>
  );
}