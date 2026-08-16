import Skeleton from "./Skeleton";

export default function AboutSkeleton() {
  return (
    <div className="w-[1170px] mx-auto">
      <div className="h-[24px] my-7">
        <Skeleton ClassName="w-[150px] h-[30px] rounded" />
      </div>

      <div className="flex items-center justify-between">
        <div className="w-[500px]">
          <Skeleton ClassName="w-[260px] h-[65px] rounded mb-7" />

          <Skeleton ClassName="w-full h-[80px] rounded mb-5" />

          <Skeleton ClassName="w-full h-[80px] rounded" />
        </div>

        <Skeleton ClassName="w-[585px] h-[620px] rounded-none" />
      </div>

      <div className="flex justify-between mt-14">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatisticSkeleton key={index} active={index === 1} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 mt-14">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[564px] gap-8">
            <Skeleton ClassName="w-full h-[430px] rounded-none" />

            <Skeleton ClassName="w-[180px] h-[36px] rounded mt-3" />

            <Skeleton ClassName="w-[150px] h-[20px] rounded mt-2" />

            <div className="flex gap-3 mt-2">
              <Skeleton ClassName="w-[24px] h-[24px] rounded-full" />
              <Skeleton ClassName="w-[24px] h-[24px] rounded-full" />
              <Skeleton ClassName="w-[24px] h-[24px] rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-5 mb-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} ClassName="w-2 h-2 rounded-full" />
        ))}
      </div>

      <div className="w-[943px] h-[161px] mx-auto flex justify-between">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-[280px] flex flex-col items-center text-center"
          >
            <Skeleton ClassName="w-[62px] h-[62px] rounded-full mb-5" />

            <Skeleton ClassName="w-[210px] h-[20px] rounded" />

            <Skeleton ClassName="w-[220px] h-[18px] rounded mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Statistic Skeleton
   Repeated 4 times in About
   ========================================================= */

function StatisticSkeleton({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`
        w-[270px] h-[230px]
        border border-gray-300
        rounded-sm
        flex items-center justify-between
        ${active ? "bg-one" : "bg-white"}
      `}
    >
      <div className="w-full h-[170px] flex flex-col items-center justify-center gap-2">
        {/* Icon */}
        <Skeleton ClassName="w-[80px] h-[80px] rounded-full mb-2" />

        {/* Number */}
        <Skeleton ClassName="w-[100px] h-[38px] rounded" />

        {/* Description */}
        <Skeleton ClassName="w-[190px] h-[24px] rounded" />
      </div>
    </div>
  );
}
