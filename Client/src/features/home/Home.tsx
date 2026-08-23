import { useEffect, useState } from "react";
import BannerSection from "./components/BannerSection/BannerSection";
import BestSellingSection from "./components/BestSellingSection/BestSellingSection";
import CategoryHeroSection from "./components/CategoryHeroSection/CategoryHeroSection";
import TodaySection from "./components/TodaySection/TodaySection";
import FeaturedSection from "./components/FeaturedSection/FeaturedSection";
import OurProductsSection from "./components/OurProductsSection/OurProductsSection";
import ShopByCategorySection from "./components/ShopByCategorySection/ShopByCategorySection";
import Arrow from "../../components/Helpers/Arrow";
import { HiArrowLongUp } from "react-icons/hi2";
import OurServices from "@/components/Helpers/OurServices";
import HomeSkeleton from "@/components/Skeletons/HomeSkeleton";
import { useHomeDataQuery } from "./api/homeQueries";

const SCROLL_THRESHOLD = 200;

export default function Home() {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  // ريكوست واحد بيجيب كل داتا الصفحة، وكل سكشن بياخد نصيبه منه كـ props
  // بدل ما كل سكشن يعمل fetch لوحده (كان في حوالي 10 ريكوستات منفصلة قبل كده)
  const { data, isLoading, isError } = useHomeDataQuery();

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

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (isError || !data) {
    return (
      <p className="py-20 text-center text-lg text-red-500">
        Failed to load the home page. Please try again.
      </p>
    );
  }

  return (
    <div className="relative">
      <div className="w-[1170px] flex flex-col gap-8 mx-auto">
        <CategoryHeroSection
          categories={data.categories}
          heroBanners={data.heroBanners}
        />
        <TodaySection products={data.flashSaleProducts} />
        <ShopByCategorySection categories={data.categories} />
        <BestSellingSection products={data.bestSellingProducts} />
        <BannerSection banner={data.promoBanner} />
        <OurProductsSection products={data.allProducts} />
        <FeaturedSection featured={data.featured} />
        <OurServices />
      </div>

      {isScrollButtonVisible && (
        <div className="fixed bottom-10 right-14 text-brand animate-bounce">
          <Arrow onClick={scrollToTop} icon={<HiArrowLongUp />} />
        </div>
      )}
    </div>
  );
}
