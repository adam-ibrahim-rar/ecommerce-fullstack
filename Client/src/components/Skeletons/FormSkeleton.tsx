import Skeleton from "./Skeleton";

export default function FormSkeleton() {
  return (
    <div className="w-[710px]">
      {/* Title */}
      <Skeleton ClassName="w-[150px] h-[24px] rounded mb-[18px]" />

      {/* First Row */}
      <div className="flex gap-[50px]">
        <div className="w-[330px] flex flex-col gap-[8px]">
          <Skeleton ClassName="w-[80px] h-[20px] rounded" />
          <Skeleton ClassName="w-[330px] h-[50px] rounded" />
        </div>

        <div className="w-[330px] flex flex-col gap-[8px]">
          <Skeleton ClassName="w-[80px] h-[20px] rounded" />
          <Skeleton ClassName="w-[330px] h-[50px] rounded" />
        </div>
      </div>

      {/* Second Row */}
      <div className="flex gap-[50px] mt-[22px]">
        <div className="w-[330px] flex flex-col gap-[8px]">
          <Skeleton ClassName="w-[50px] h-[20px] rounded" />
          <Skeleton ClassName="w-[330px] h-[50px] rounded" />
        </div>

        <div className="w-[330px] flex flex-col gap-[8px]">
          <Skeleton ClassName="w-[70px] h-[20px] rounded" />
          <Skeleton ClassName="w-[330px] h-[50px] rounded" />
        </div>
      </div>

      {/* Password */}
      <div className="mt-[22px] w-[710px]">
        <Skeleton ClassName="w-[150px] h-[20px] rounded mb-[8px]" />

        <div className="flex flex-col gap-[13px]">
          <Skeleton ClassName="w-[710px] h-[50px] rounded" />
          <Skeleton ClassName="w-[710px] h-[50px] rounded" />
          <Skeleton ClassName="w-[710px] h-[50px] rounded" />
        </div>
      </div>

      {/* Actions */}
      <div className="w-[710px] flex justify-end items-center gap-[32px] mt-[20px]">
        <Skeleton ClassName="w-[50px] h-[20px] rounded" />

        <Skeleton ClassName="w-[178px] h-[48px] rounded" />
      </div>
    </div>
  );
}
