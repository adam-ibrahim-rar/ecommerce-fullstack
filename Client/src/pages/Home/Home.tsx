import { useEffect, useState } from "react";
import FifthSection from "./FifthSection/FifthSection";
import ForthSection from "./ForthSection/ForthSection";
import FristSection from "./FristSection/FristSection";
import SecondSection from "./SecondSection/SecondSection";
import SeventhSection from "./SeventhSection/SeventhSection";
import SixthSection from "./SixthSection/SixthSection";
import ThirdSection from "./ThirdSection/ThirdSection";
import Arrow from "../../components/Arrow";
import { HiArrowLongUp } from "react-icons/hi2";
import OurServices from "../../components/OurServices";

export default function Home() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="w-[1170px]  flex flex-col gap-8 mx-auto">
        <FristSection />
        <SecondSection />
        <ThirdSection />
        <ForthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
        <OurServices />
      </div>
      {scroll > 200 && (
        <div className="fixed bottom-10 right-14 text-secondary-two">
          <Arrow 
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            
            icon={<HiArrowLongUp  />}
          />
        </div>
      )}
    </div>
  );
}
