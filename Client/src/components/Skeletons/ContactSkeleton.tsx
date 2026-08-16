import Skeleton from "./Skeleton";

export default function ContactSkeleton() {
  return (
    <div className="w-[1170px] mx-auto">
     
     <div className="h-[24px] my-7">
             <Skeleton ClassName="w-[150px] h-[30px] rounded" />
           </div>

      
      <div className="flex gap-5">
     
        <div className="w-[340px] shadow-lg inset-shadow-xs h-[457px] flex flex-col items-start px-[50px] justify-center gap-6">
          <div className="flex flex-col gap-4 w-[262px]">
            <div className="flex items-center gap-3">
              <Skeleton ClassName="w-[40px] h-[40px] rounded-full" />

              <Skeleton ClassName="w-[95px] h-[20px] rounded" />
            </div>

            <Skeleton ClassName="w-[250px] h-[20px] rounded" />

            <Skeleton ClassName="w-[180px] h-[20px] rounded" />
          </div>

          <Skeleton ClassName="bg-gray-300 h-[1.5px] w-[270px]" />

          <div className="flex flex-col gap-4 h-[180px] items-start w-[250px]">
            <div className="flex items-center gap-3">
              <Skeleton ClassName="w-[40px] h-[40px] rounded-full" />

              <Skeleton ClassName="w-[105px] h-[20px] rounded" />
            </div>

            <Skeleton ClassName="w-[245px] h-[40px] rounded" />

            <Skeleton ClassName="w-[240px] h-[20px] rounded" />

            <Skeleton ClassName="w-[235px] h-[20px] rounded" />
          </div>
        </div>

        <div className="w-[800px] h-[457px] p-7 shadow-lg inset-shadow-xs">
          <div className="flex flex-col gap-8 w-[737px] h-[377px]">
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  ClassName="w-full h-[50px] rounded-none"
                />
              ))}
            </div>

           
            <Skeleton
              ClassName="w-full h-[207px] rounded-none"
            />

            <div className="self-end">
              <Skeleton
                ClassName="w-[210px] h-[56px] rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}