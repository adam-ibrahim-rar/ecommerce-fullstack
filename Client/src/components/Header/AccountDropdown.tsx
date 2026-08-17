import {
  FiUser,
  FiShoppingBag,
  FiXCircle,
  FiStar,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "My Account",
    icon: FiUser,
  },
  {
    label: "My Order",
    icon: FiShoppingBag,
  },
  {
    label: "My Cancellations",
    icon: FiXCircle,
  },
  {
    label: "My Reviews",
    icon: FiStar,
  },
  {
    label: "Logout",
    icon: FiLogOut,
  },
];

export default function AccountDropdown({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="
        absolute
        top-11
        right-0
        rounded-md
        z-50
        w-[224px]
        h-[208px]
        bg-gradient-to-t
        from-[#443a46]
        via-[#635866]
        to-[#bdb2c1]
        shadow-lg
        px-4
        py-[14px]
      "
      onMouseLeave={() => {
        setTimeout(() => setOpen(false), 2500);
      }}
    >
      <div className="flex flex-col justify-between h-full">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                navigate(
                  "/settings/" + item.label.toLowerCase().split(" ").join("-"),
                );
                setOpen(false);
              }}
              className="
                w-[192px]
                h-[32px]
                flex
                items-center
                gap-4
                text-white
                cursor-pointer
                text-left
                hover:opacity-80
                transition-opacity
              "
              onMouseLeave={() => {
                setTimeout(() => setOpen(false), 2500);
              }}
            >
              <span
                className="flex
                items-center justify-center w-[32px] h-[32px] "
              >
                <Icon size={24} strokeWidth={1.8} className="shrink-0" />
              </span>

              <span className="text-[14px] w-[144px]  whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
