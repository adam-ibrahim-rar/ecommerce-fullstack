import Skeleton from "./Skeleton";

export default function RegisterSkeleton() {
  return (
    <div className="w-[1420px] h-[784px]  flex gap-[129px] justify-between">
      <Skeleton ClassName="w-[905px] h-[784px] rounded-none" />

      <div className="w-[371px] h-[530px] mt-30  flex flex-col gap-12 my-auto">
        <div className="gap-3 flex flex-col">
          <Skeleton ClassName="w-[280px] h-[30px] rounded" />

          <Skeleton ClassName="w-[191px] h-[24px] rounded" />
        </div>

        <div className="flex flex-col h-[404px] gap-8">
          <div className="flex flex-col gap-12">
            <Skeleton ClassName="w-full h-[30px] rounded-xs" />

            <Skeleton ClassName="w-full h-[30px] rounded-xs" />

            <Skeleton ClassName="w-full h-[30px] rounded-xs" />
          </div>

          <div>
            <div className="flex flex-col gap-4">
              <Skeleton ClassName="w-full h-[56px] rounded" />

              <div className="flex flex-col gap-8">
                <Skeleton ClassName="w-full h-[56px] rounded " />

                <div className="flex gap-3 self-center">
                  <Skeleton ClassName="w-[160px] h-[20px] rounded" />

                  <Skeleton ClassName="w-[45px] h-[20px] rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
