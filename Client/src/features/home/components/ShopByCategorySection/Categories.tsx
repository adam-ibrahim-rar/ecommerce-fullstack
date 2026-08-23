import { useNavigate } from "react-router-dom";
import { useCategoriesQuery } from "../../api/homeQueries";
import { categoryIcons } from "./categoryIcons";

export default function Categories() {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError } = useCategoriesQuery();

  if (isLoading) return null;
  if (isError) return <p className="text-red-500">Failed to load categories.</p>;

  return (
    <div className="flex w-full gap-7">
      {categories.map((category) => {
        const Icon = category.icon ? categoryIcons[category.icon] : null;

        return (
          <button
            key={category.id}
            onClick={() => navigate(`/categories/${category.name}`)}
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