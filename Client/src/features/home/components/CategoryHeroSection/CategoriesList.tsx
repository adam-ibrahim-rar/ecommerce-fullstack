import { Link } from "react-router-dom";
import type { Category } from "../../types/home";

interface CategoriesListProps {
  categories: Category[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="mt-8">
      <ul className="w-[217px] h-[344px] flex flex-col gap-4">
        {categories.map((category) => (
          <Link
            to={`/products?category=${category.id}`}
            key={category.id}
            className="cursor-default"
          >
            <li className="h-[24px] hover:cursor-pointer hover:text-blue-500 w-fit capitalize text-sm">
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}