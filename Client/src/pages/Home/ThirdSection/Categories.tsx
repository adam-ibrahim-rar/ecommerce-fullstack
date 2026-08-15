import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCamera,
  FiHeadphones,
} from "react-icons/fi";
import { TbDeviceGamepad } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Phones",
    icon: FiSmartphone,
  },
  {
    name: "Computers",
    icon: FiMonitor,
  },
  {
    name: "SmartWatch",
    icon: FiWatch,
  },
  {
    name: "Camera",
    icon: FiCamera,
  },
  {
    name: "HeadPhones",
    icon: FiHeadphones,
  },
  {
    name: "Gaming",
    icon: TbDeviceGamepad,
  },
];

export default function Categories() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full gap-7">
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <button
            key={category.name}
            onClick={() =>
              navigate(`/categories/${category.name.toLowerCase()}`)
            }
            className="bg-secondary-two-hover flex h-[145px] w-[175px] 
            cursor-pointer flex-col items-center justify-center gap-5 
            rounded-md border-one bg-white 
            transition-all duration-200 hover:text-white"
          >
            <Icon size={32} strokeWidth={1.5} className="transition-colors" />

            <span className="text-[15px] font-normal">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
