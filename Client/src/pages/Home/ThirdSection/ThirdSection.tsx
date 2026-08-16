import Frame from "../../../components/Helpers/Frame";
import Swapers from "../../../components/Helpers/Swapers";
import Categories from "./Categories";

export default function ThirdSection() {
  return (
    <div className="flex flex-col  gap-14 w-[1170px]">
      <Frame
        description="Browse By Category"
        title="Categories"
        functionality={<Swapers />}
      />
      <Categories />
      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}
