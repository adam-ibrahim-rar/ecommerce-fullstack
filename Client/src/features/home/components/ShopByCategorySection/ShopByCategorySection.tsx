import Frame from "@/components/Helpers/Frame";
import Swapers from "@/components/Helpers/Swapers";
import Categories from "./Categories";
import { usePager } from "@/lib/hooks/usePager";
import type { Category } from "../../types/home";

const PAGE_SIZE = 6;

type ShopByCategorySectionProps = {
  categories: Category[];
};

export default function ShopByCategorySection({ categories }: ShopByCategorySectionProps) {
  const { pageItems, canPrev, canNext, prev, next } = usePager(categories, PAGE_SIZE);

  return (
    <div className="flex flex-col  gap-14 w-[1170px]">
      <Frame
        description="Browse By Category"
        title="Categories"
        functionality={
          <Swapers onPrev={prev} onNext={next} prevDisabled={!canPrev} nextDisabled={!canNext} />
        }
      />

      <Categories categories={pageItems} />

      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}
