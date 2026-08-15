import Frame from "../../../components/Frame";
import iphone from "../../../assets/iphone.jpg";
import women from "../../../assets/iphone.jpg";
import speakers from "../../../assets/iphone.jpg";
import perfume from "../../../assets/iphone.jpg";
import { Link } from "react-router-dom";

export default function SeventhSection() {
  return (
    <div className="flex flex-col gap-5 w-[1170px]">
      <Frame title="Featured" description="New Arrival" />

      <div className="h-[600px] flex gap-7 justify-between">

        <section className="w-[570px] h-[600px] bg-black flex items-end relative overflow-hidden">
          <img
            src={iphone}
            className="w-[511px] h-[511px] object-cover mx-auto"
          />

          <caption className="text-white absolute bottom-10 left-10 flex flex-col items-start gap-2">
            <h1 className="capitalize text-[24px] font-semibold">
              PlayStation 5
            </h1>

            <p className="capitalize w-[242px] text-left text-[14px]">
              Black and White version of the PS5 coming out on sale.
            </p>

            <Link
              to="/"
              className="capitalize text-[16px] underline underline-offset-10"
            >
              Shop Now
            </Link>
          </caption>
        </section>

        <section className="w-[570px] h-[600px] flex flex-col gap-7">

          <div className="w-[570px] h-[284px] bg-black relative overflow-hidden">
            <img
              src={women}
              className="absolute right-0 bottom-0 w-full h-full object-cover"
            />

            <caption className="text-white absolute bottom-6 left-5 flex flex-col items-start gap-2">
              <h1 className="capitalize text-[24px] font-semibold">
                Women&apos;s Collections
              </h1>

              <p className="capitalize w-[242px] text-left text-[14px]">
                Featured woman collections that give you another vibe.
              </p>

              <Link
                to="/"
                className="capitalize text-[16px] underline underline-offset-10"
              >
                Shop Now
              </Link>
            </caption>
          </div>

          <div className="w-[570px] h-[284px] flex gap-7">

            <div className="w-[270px] h-[284px] bg-black relative overflow-hidden">
              <img
                src={speakers}
                className="w-full h-full object-cover"
              />

              <caption className="text-white absolute bottom-5 left-5 flex flex-col items-start gap-1">
                <h1 className="capitalize text-[22px] font-semibold">
                  Speakers
                </h1>

                <p className="capitalize text-[13px]">
                  Amazon wireless speakers
                </p>

                <Link
                  to="/"
                  className="capitalize text-[15px] underline underline-offset-8"
                >
                  Shop Now
                </Link>
              </caption>
            </div>

            <div className="w-[270px] h-[284px] bg-black relative overflow-hidden">
              <img
                src={perfume}
                className="w-full h-full object-cover"
              />

              <caption className="text-white absolute bottom-5 left-5 flex flex-col items-start gap-1">
                <h1 className="capitalize text-[22px] font-semibold">
                  Perfume
                </h1>

                <p className="capitalize text-[13px]">
                  GUCCI INTENSE OUD EDP
                </p>

                <Link
                  to="/"
                  className="capitalize text-[15px] underline underline-offset-8"
                >
                  Shop Now
                </Link>
              </caption>
            </div>

          </div>
        </section>
      </div>

    </div>
  );
}