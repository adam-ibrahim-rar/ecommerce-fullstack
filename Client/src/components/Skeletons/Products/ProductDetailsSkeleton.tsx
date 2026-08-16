import Skeleton from "../Skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="w-[1170px] mx-auto flex mb-18 justify-between">
      <div className="flex gap-5">
        <div className="w-[170px] h-[600px] flex flex-col justify-between">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              ClassName="w-[170px] h-[138px] rounded"
            />
          ))}
        </div>

          <Skeleton
            ClassName="w-[500px] h-[600px] rounded"
          />
      </div>

      <div className="w-[400px] justify-between h-[600px] flex flex-col">
        <div className="gap-3 flex flex-col">
          <Skeleton
            ClassName="w-[280px] h-[24px] rounded"
          />

                <Skeleton
                  ClassName="w-[280px] h-[20px] rounded"
                />



          <Skeleton
            ClassName="w-[100px] h-[29px] rounded"
          />

          <Skeleton
            ClassName="w-full h-[80px] rounded"
          />

          <Skeleton
            ClassName="h-[1.5px] w-full"
          />
        </div>

        <div className="gap-3 flex flex-col">
            <Skeleton
              ClassName="w-[175px] h-[25px] rounded"
            />


            <Skeleton
              ClassName="w-[300px] h-[25px] rounded"
            />

            

          {/* Quantity / Buy / Wishlist */}
          <div className="flex items-center gap-3">
            <Skeleton
              ClassName="w-[160px] h-[44px] rounded-md"
            />

            <Skeleton
              ClassName="w-[165px] h-[44px] rounded"
            />

            <Skeleton
              ClassName="w-[40px] h-[40px] rounded"
            />
          </div>
        </div>

        {/* Delivery */}
        <div className="border border-gray-400 mt-7">
          <div className="h-[90px] flex items-center gap-4 px-3 justify-start">
            <Skeleton
              ClassName="w-[30px] h-[30px] rounded"
            />

            <div className="flex flex-col gap-1">
              <Skeleton
                ClassName="w-[120px] h-[20px] rounded"
              />

              <Skeleton
                ClassName="w-[280px] h-[15px] rounded"
              />
            </div>
          </div>

          <Skeleton
            ClassName="h-[1px] w-full"
          />

          <div className="h-[90px] flex items-center gap-4 px-3 justify-start">
            <Skeleton
              ClassName="w-[30px] h-[30px] rounded"
            />

            <div className="flex flex-col gap-1">
              <Skeleton
                ClassName="w-[130px] h-[20px] rounded"
              />

              <Skeleton
                ClassName="w-[250px] h-[15px] rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}