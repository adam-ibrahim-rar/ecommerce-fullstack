import Frame from "@/components/Helpers/Frame";
import { Link } from "react-router-dom";
import type { FeaturedSlot, Product } from "../../types/home";

type FeaturedSectionProps = {
  featured: Record<FeaturedSlot, Product | null>;
};

export default function SeventhSection({ featured }: FeaturedSectionProps) {
    if (!featured) return null;
const { large, wide, smallLeft, smallRight } = featured;

  // اتشال الشرط اللي كان بيقفل السكشن كله لو ولا سلوت من الأربعة فاضي.
  // دلوقتي السكشن بيظهر لو في منتج واحد على الأقل متحط في أي سلوت،
  // وكل سلوت بيتعرض بس لو فيه منتج فعلاً.
  if (!large && !wide && !smallLeft && !smallRight) return null;

  return (
    <div className="flex flex-col gap-5 w-[1170px]">
      <Frame title="Featured" description="New Arrival" />

      <div className="h-[600px] flex gap-7 justify-between">
        {large && (
          <section className="w-[570px] h-[600px] bg-black flex items-end relative overflow-hidden">
            <img
              src={large.image}
              alt={large.title}
              className="w-[511px] h-[511px] object-cover mx-auto"
            />

            <caption className="text-white absolute bottom-10 left-10 flex flex-col items-start gap-2">
              <h1 className="capitalize text-[24px] font-semibold">{large.title}</h1>
              <p className="capitalize w-[242px] text-left text-[14px]">
                {large.description}
              </p>
              <Link to={`/products/${large.id}`} className="capitalize text-[16px] underline underline-offset-10">
                Shop Now
              </Link>
            </caption>
          </section>
        )}

        {(wide || smallLeft || smallRight) && (
          <section className="w-[570px] h-[600px] flex flex-col gap-7">
            {wide && (
              <div className="w-[570px] h-[284px] bg-black relative overflow-hidden">
                <img
                  src={wide.image}
                  alt={wide.title}
                  className="absolute right-0 bottom-0 w-full h-full object-cover"
                />
                <caption className="text-white absolute bottom-6 left-5 flex flex-col items-start gap-2">
                  <h1 className="capitalize text-[24px] font-semibold">{wide.title}</h1>
                  <p className="capitalize w-[242px] text-left text-[14px]">
                    {wide.description}
                  </p>
                  <Link to={`/products/${wide.id}`} className="capitalize text-[16px] underline underline-offset-10">
                    Shop Now
                  </Link>
                </caption>
              </div>
            )}

            {(smallLeft || smallRight) && (
              <div className="w-[570px] h-[284px] flex gap-7">
                {smallLeft && (
                  <div className="w-[270px] h-[284px] bg-black relative overflow-hidden">
                    <img src={smallLeft.image} alt={smallLeft.title} className="w-full h-full object-cover" />
                    <caption className="text-white absolute bottom-5 left-5 flex flex-col items-start gap-1">
                      <h1 className="capitalize text-[22px] font-semibold">{smallLeft.title}</h1>
                      <p className="capitalize text-[13px]">{smallLeft.description}</p>
                      <Link to={`/products/${smallLeft.id}`} className="capitalize text-[15px] underline underline-offset-8">
                        Shop Now
                      </Link>
                    </caption>
                  </div>
                )}

                {smallRight && (
                  <div className="w-[270px] h-[284px] bg-black relative overflow-hidden">
                    <img src={smallRight.image} alt={smallRight.title} className="w-full h-full object-cover" />
                    <caption className="text-white absolute bottom-5 left-5 flex flex-col items-start gap-1">
                      <h1 className="capitalize text-[22px] font-semibold">{smallRight.title}</h1>
                      <p className="capitalize text-[13px]">{smallRight.description}</p>
                      <Link to={`/products/${smallRight.id}`} className="capitalize text-[15px] underline underline-offset-8">
                        Shop Now
                      </Link>
                    </caption>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}