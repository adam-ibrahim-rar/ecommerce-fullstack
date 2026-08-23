import { useNavigate } from "react-router-dom";
import type { Category } from "../../types/home";
import { categoryIcons } from "./categoryIcons";

export default function Categories({ categories }: { categories: Category[] }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full gap-7">
      {categories.map((category) => {
        const Icon = category.icon ? categoryIcons[category.icon] : null;

        return (
          <button
            key={category.id}
            onClick={() => navigate(`/products?category=${category.id}`)}
            className="bg-brand-hover flex h-[145px] w-[175px] 
            cursor-pointer flex-col items-center justify-center gap-5 
            rounded-md border-subtle bg-white 
            transition-all duration-200 hover:text-white"
          >
            {Icon && <Icon size={32} strokeWidth={1.5} className="transition-colors" />}
            <span className="text-[15px] font-normal">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}