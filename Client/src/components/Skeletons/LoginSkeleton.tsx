import Skeleton from "./Skeleton";

export default function LoginSkeleton() {
  return (
    <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between">
      <Skeleton ClassName="w-[905px] h-[784px] rounded-none" />

      <div className="w-[371px] h-[530px] mt-30 flex flex-col gap-12 my-auto">
        <div className="gap-3 flex flex-col">
          <Skeleton ClassName="w-[350px] h-[40px] rounded" />

          <Skeleton ClassName="w-[170px] h-[24px] rounded" />
        </div>

        <div className="flex flex-col h-[404px] gap-8">
          <div className="flex flex-col gap-12">
            <Skeleton ClassName="w-full h-[30px] rounded-xs" />

            <Skeleton ClassName="w-full h-[30px] rounded-xs" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Skeleton ClassName="w-[140px] h-[56px] rounded" />

              <Skeleton ClassName="w-[145px] h-[24px] rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
