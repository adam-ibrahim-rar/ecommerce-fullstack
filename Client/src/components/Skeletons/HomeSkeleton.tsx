import ProductSkeleton from "./ProductSkeleton";
import Skeleton from "./Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="relative">
      <div className="w-[1170px] flex flex-col gap-8 mx-auto">
       
        <div className="flex">
          <div className="pr-4 border-r border-gray-300 h-[384px]">
            <div className="mt-8">
              <div className="w-[217px] h-[344px] flex flex-col justify-between">
                {Array.from({ length: 9 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    ClassName="h-[24px] w-[130px] rounded"
                  />
                ))}
              </div>
            </div>
          </div>

          <Skeleton
            ClassName="w-[892px] h-[344px] mt-8 ml-4 rounded"
          />
        </div>

        <div className="flex flex-col  gap-5 w-[1170px]">
          <div className="h-[103px] space-y-5">
            <Skeleton ClassName="w-[80px] h-[40px] rounded" />

            <div className="flex justify-between h-12 items-center">
              <div className="flex gap-20 items-center">
                <Skeleton ClassName="w-[180px] h-[36px] rounded" />

                <div className="ml-4 mb-6  flex flex-col justify-between h-12 ">
                    <Skeleton ClassName="ml-4  rounded-lg w-[320px] h-5"/>
                <Skeleton ClassName="ml-4  rounded-lg w-[320px] h-5"/> 
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton ClassName="size-[46px] rounded-full" />
                <Skeleton ClassName="size-[46px] rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 mt-2 gap-[30px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>

          <div className="self-center mt-14">
            <Skeleton ClassName="w-[180px] h-[48px] rounded" />
          </div>

          {/* Divider */}
          <Skeleton ClassName="mt-2 w-full h-[1.5px]" />
        </div>

       
        <div className="flex flex-col gap-14 w-[1170px]">
          <div className="h-[103px] space-y-5">
            <Skeleton ClassName="w-[100px] h-[40px] rounded" />

            <div className="flex justify-between h-12 items-center">
              <Skeleton ClassName="w-[300px] h-[36px] rounded" />

              <div className="flex gap-2">
                <Skeleton ClassName="size-[46px] rounded-full" />
                <Skeleton ClassName="size-[46px] rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                ClassName="h-[145px] w-[175px] rounded-md"
              />
            ))}
          </div>

          <Skeleton ClassName="mt-2 w-full h-[1.5px]" />
        </div>

        <div className="flex flex-col gap-14 w-[1170px]">
          <div className="h-[103px] space-y-5">
            <Skeleton ClassName="w-[110px] h-[40px] rounded" />

            <div className="flex justify-between h-12 items-center">
              <Skeleton ClassName="w-[300px] h-[36px] rounded" />

              <Skeleton ClassName="w-[120px] h-[48px] rounded" />
            </div>
          </div>

          <div className="grid grid-cols-4 mt-2 gap-[30px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>

          <Skeleton ClassName="mt-2 w-full h-[1.5px]" />
        </div>

        <div className="mt-7 flex h-[500px] w-[1170px] items-center justify-between bg-one px-[40px]">
          <div className="flex h-full w-[45%] flex-col justify-center">
            <Skeleton ClassName="mb-8 w-[100px] h-[24px] rounded" />

            <Skeleton ClassName="h-[120px] w-[480px] rounded" />

            <div className="mt-8 flex items-center gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  ClassName="h-[62px] w-[62px] rounded-full"
                />
              ))}
            </div>

            <Skeleton ClassName="mt-9 w-[110px] h-[48px] rounded" />
          </div>

          <div className="flex h-[420px] w-[600px] items-center justify-center">
            <Skeleton ClassName="h-[420px] w-[600px] rounded-2xl" />
          </div>
        </div>

        <div className="flex flex-col gap-5 w-[1170px]">
          <div className="h-[103px] space-y-5">
            <Skeleton ClassName="w-[120px] h-[40px] rounded" />

            <div className="flex justify-between h-12 items-center">
              <Skeleton ClassName="w-[300px] h-[36px] rounded" />

              <div className="flex gap-2">
                <Skeleton ClassName="size-[46px] rounded-full" />
                <Skeleton ClassName="size-[46px] rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 mt-2 gap-[30px]">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductSkeleton
                key={index}
                withColors
              />
            ))}
          </div>

          <div className="self-center mt-14">
            <Skeleton ClassName="w-[180px] h-[48px] rounded" />
          </div>
        </div>

        <div className="flex flex-col gap-5 w-[1170px]">
          <div className="h-[103px] space-y-5">
            <Skeleton ClassName="w-[100px] h-[40px] rounded" />

            <div className="flex items-center">
              <Skeleton ClassName="w-[220px] h-[36px] rounded" />
            </div>
          </div>

          <div className="h-[600px] flex gap-7 justify-between">
            <div className="w-[570px] h-[600px] bg-one relative overflow-hidden">
              <Skeleton
                ClassName="w-[511px] h-[511px] rounded mx-auto"
              />

              <div className="absolute bottom-10 left-10 flex flex-col items-start gap-2">
                <Skeleton ClassName="w-[180px] h-[30px] rounded" />
                <Skeleton ClassName="w-[242px] h-[40px] rounded" />
                <Skeleton ClassName="w-[90px] h-[20px] rounded" />
              </div>
            </div>

            <div className="w-[570px] h-[600px] flex flex-col gap-7">
              <div className="w-[570px] h-[284px] bg-one relative overflow-hidden">
                <Skeleton
                  ClassName="absolute right-0 bottom-0 w-full h-full rounded-none"
                />

                <div className="absolute bottom-6 left-5 flex flex-col items-start gap-2">
                  <Skeleton ClassName="w-[230px] h-[30px] rounded" />
                  <Skeleton ClassName="w-[242px] h-[40px] rounded" />
                  <Skeleton ClassName="w-[90px] h-[20px] rounded" />
                </div>
              </div>

              <div className="w-[570px] h-[284px] flex gap-7">
                <div className="w-[270px] h-[284px] bg-one relative overflow-hidden">
                  <Skeleton ClassName="w-full h-full rounded-none" />

                  <div className="absolute bottom-5 left-5 flex flex-col items-start gap-1">
                    <Skeleton ClassName="w-[120px] h-[28px] rounded" />
                    <Skeleton ClassName="w-[180px] h-[18px] rounded" />
                    <Skeleton ClassName="w-[80px] h-[18px] rounded" />
                  </div>
                </div>

                <div className="w-[270px] h-[284px] bg-one relative overflow-hidden">
                  <Skeleton ClassName="w-full h-full rounded-none" />

                  <div className="absolute bottom-5 left-5 flex flex-col items-start gap-1">
                    <Skeleton ClassName="w-[110px] h-[28px] rounded" />
                    <Skeleton ClassName="w-[180px] h-[18px] rounded" />
                    <Skeleton ClassName="w-[80px] h-[18px] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="w-[943px] h-[161px] mx-auto flex justify-between">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-[280px] flex flex-col items-center text-center"
            >
              <Skeleton
                ClassName="w-[62px] h-[62px] rounded-full mb-5"
              />

              <Skeleton ClassName="w-[210px] h-[20px] rounded" />

              <Skeleton ClassName="w-[220px] h-[18px] rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


