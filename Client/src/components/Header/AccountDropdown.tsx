import {
  FiShoppingBag,
  FiXCircle,
  FiStar,
  FiLogOut,
} from "react-icons/fi";
import {IoSettingsOutline  } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { logout } from "../../reduxtoolkit/slices/auth/authSlice";
import { useAppDispatch } from "../../reduxtoolkit/hooks";

const menuItems = [
  {
    label: "Settings",
    icon: IoSettingsOutline ,
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
];

export default function AccountDropdown({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
                setTimeout(() => setOpen(false), 1500);
              }}
            >
              <span className="flex items-center justify-center w-[32px] h-[32px]">
                <Icon size={24} strokeWidth={1.8} className="shrink-0" />
              </span>

              <span className="text-[14px] w-[144px] whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => {
            dispatch(logout());
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
        >
          <span className="flex items-center justify-center w-[32px] h-[32px]">
            <FiLogOut size={24} strokeWidth={1.8} className="shrink-0" />
          </span>

          <span className="text-[14px] w-[144px] whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
