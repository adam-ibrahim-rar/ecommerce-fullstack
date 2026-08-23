import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TbLocationSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const products = [
  "iPhone 15",
  "Samsung Galaxy S24",
  "MacBook Pro",
  "AirPods Pro",
  "Apple Watch",
  "PlayStation 5",
  "Xbox Series X",
];

export default function Search() {
  const ref = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  function focusSearch() {
    ref.current?.focus();
  }

  function handleSearch() {
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
  }

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    if (!search.trim() || !isFocused) return;

    const timer = setTimeout(() => {
      setIsFocused(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [search, isFocused]);
  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="px-2 h-10 flex items-center bg-secondary rounded"
      >
        <input
          ref={ref}
          type="text"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
              setSearch("");
            }, 100);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsFocused(false);
            }
          }}
          placeholder="What are you looking for?"
          className="w-[200px] bg-transparent placeholder:text-subtle placeholder:text-xs focus:outline-none"
        />

        <button
          type={search.trim() ? "submit" : "button"}
          onClick={!search.trim() ? focusSearch : undefined}
        >
          {search.trim() ? (
            <TbLocationSearch className="text-2xl" />
          ) : (
            <IoSearch className="text-2xl" />
          )}
        </button>
      </form>

      {isFocused && search.trim() && (
        <div className="absolute top-full left-0 mt-2 w-full rounded-md bg-white shadow-lg z-50 overflow-hidden">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div
                key={product}
                onClick={() => {
                  setSearch(product);
                  navigate(`/search?q=${product}`);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {product}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
