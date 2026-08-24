import Button from "@/components/Helpers/Button";
import Countdown from "../shared/CountDown";
import type { Banner } from "../../types/home";
import { useNavigate } from "react-router-dom";

type BannerSectionProps = {
  banner: Banner | null;
};

export default function BannerSection({ banner }: BannerSectionProps) {
  if (!banner) return null;
const navgate=useNavigate()
  return (
    <div className="mt-7 flex h-[500px] w-[1170px] items-center justify-between bg-black px-[40px] text-white">
      <section className="flex h-full w-[45%] flex-col justify-center">
        {banner.description && (
          <span className="mb-8 line-clamp-2 text-lg font-medium capitalize text-success">
            {banner.description}
          </span>
        )}

        <h2 className="h-[120px] text-5xl capitalize font-semibold line-clamp">
          {banner.heading ?? banner.title}
        </h2>

        {banner.endsAt && (
          <div className="mt-8 flex items-center gap-3">
            <Countdown endsAt={banner.endsAt} />
          </div>
        )}

        <Button
          content={banner.buttonText ?? "Shop Now"}
          bg="bg-success"
          classes="mt-9 w-fit hover:opacity-80 font-medium"
          handleClick={()=>navgate(`${banner.link}`)}
        />
      </section>

      <div className="flex h-[420px] w-[600px] items-center justify-center">
        <img
          src={banner.image}
          alt={banner.title}
          className="h-[420px] rounded-2xl w-[600px] object-cover"
        />
      </div>
    </div>
  );
}