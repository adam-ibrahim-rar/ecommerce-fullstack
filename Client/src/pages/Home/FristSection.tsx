import Slider from "./Slider";
import Categories from "./Categories";

export default function FristSection() {
  return (
    <div className="flex">
      <div className="pr-4 border-r border-gray-300 h-[384px]">
        <Categories />
      </div>
        <Slider />
    </div>
  );
}