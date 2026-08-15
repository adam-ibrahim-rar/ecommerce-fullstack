import { Link } from "react-router-dom";

export default function CategoriesList() {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Toys",
    "Automotive",
    "Books",
    "Fashion",
    "Home & Garden",
  ];

  return (
    <div className="mt-8">
      <ul className=" w-[217px] h-[344px] flex flex-col justify-between  ">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${category.toLowerCase()}`}
            key={index}
            className="cursor-default"
          >
            <li
              className="h-[24px] 
        hover:cursor-pointer hover:text-blue-500 
        w-fit capitalize text-sm"
            >
              {category}{" "}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
