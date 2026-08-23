// FristSection/FristSection.tsx
import CategoriesList from "./CategoriesList";
import Slider from "./Slider";
import type { Banner, Category } from "../../types/home";

type CategoryHeroSectionProps = {
  categories: Category[];
  heroBanners: Banner[];
};

export default function CategoryHeroSection({
  categories,
  heroBanners: slides,
}: CategoryHeroSectionProps) {
  return (
    <div className="flex gap-8">
      <div className="pr-4 border-r border-gray-300 h-[384px]">
        <CategoriesList categories={categories} />
      </div>
      <Slider slides={slides} />
    </div>
  );
}