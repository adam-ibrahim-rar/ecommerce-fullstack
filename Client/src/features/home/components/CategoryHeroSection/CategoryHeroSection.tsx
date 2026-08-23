// FristSection/FristSection.tsx
import CategoriesList from "./CategoriesList";
import Slider from "./Slider";
import { useCategoriesQuery, useHeroBannersQuery } from "../../api/homeQueries";

export default function CategoryHeroSection() {
  const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery();
  const { data: slides, isLoading: slidesLoading } = useHeroBannersQuery();

  if (categoriesLoading || slidesLoading) {
    return <div className="h-[384px]" />;
  }

  return (
    <div className="flex gap-8">
      <div className="pr-4 border-r border-gray-300 h-[384px]">
        <CategoriesList categories={categories} />
      </div>
      <Slider slides={slides} />
    </div>
  );
}