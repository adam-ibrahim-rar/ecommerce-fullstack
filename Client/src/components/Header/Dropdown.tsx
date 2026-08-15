import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
export default function Dropdown() {
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          setTimeout(() => {
            setOpen(false);
          }, 1500);
        }}
        onBlur={() => setOpen(false)}
        className="flex items-center gap-1 cursor-pointer"
      >
        <span>{language}</span>
        <IoChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-20 rounded-md bg-white text-black shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => {
              setLanguage("English");
              setOpen(false);
            }}
            className="w-full text-center py-2  hover:bg-gray-200 transition-colors"
          >
            English
          </button>

          <button
            onClick={() => {
              setLanguage("العربية");
              setOpen(false);
            }}
            className="w-full text-center py-2  hover:bg-gray-200 transition-colors"
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
}
