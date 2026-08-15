import Slider from "./Slider";
import CategoriesList from "./CategoriesList";

export default function FristSection() {
  return (
    <div className="flex">
      <div className="pr-4 border-r border-gray-300 h-[384px]">
        <CategoriesList />
      </div>
      <Slider />
    </div>
  );
}
