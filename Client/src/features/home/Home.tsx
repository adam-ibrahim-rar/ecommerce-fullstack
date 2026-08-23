import { useEffect, useState } from "react";
import BannerSection from "./components/BannerSection/BannerSection";
import BestSellingSection from "./components/BestSellingSection/BestSellingSection";
import CategoryHeroSection from "./components/CategoryHeroSection/CategoryHeroSection";
import TodaySection from "./components/TodaySection/TodaySection";
import FeaturedSection from "./components/Featured/FeaturedSection";
import OurProductsSection from "./components/OurProductsSection/OurProductsSection";
import ShopByCategorySection from "./components/ShopByCategorySection/ShopByCategorySection";
import Arrow from "../../components/Helpers/Arrow";
import { HiArrowLongUp } from "react-icons/hi2";
import OurServices from "@/components/Helpers/OurServices";

const SCROLL_THRESHOLD = 200;

export default function Home() {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollButtonVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="w-[1170px] flex flex-col gap-8 mx-auto">
        <CategoryHeroSection />
        <TodaySection />
        <ShopByCategorySection />
        <BestSellingSection />
        <BannerSection />
        <OurProductsSection />
        <FeaturedSection />
        <OurServices />
      </div>

      {isScrollButtonVisible && (
        <div className="fixed bottom-10 right-14 text-secondary-two animate-bounce">
          <Arrow onClick={scrollToTop} icon={<HiArrowLongUp />} />
        </div>
      )}
    </div>
  );
}
