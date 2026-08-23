import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/hooks";

import { logout } from "../../../reduxtoolkit/slices/auth/authSlice";

import { toast } from "sonner";

export default function AdminHeader() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully.");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const handleProfile = () => {
    if (!user?.id) return;

    navigate(`/admin/dashboard/users/${user.id}`);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        h-20
        items-center
        justify-between
        border-b
        bg-background/80
        px-8
        backdrop-blur
      "
    >

      {/* Search */}

      <div className="flex items-center gap-4">

        <div className="relative">

          <FiSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            placeholder="Search..."
            className="w-[320px] pl-10"
          />

        </div>

      </div>


      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Notifications */}

        <button
          type="button"
          className="
            relative
            flex
            h-11
            w-11
            cursor-pointer
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-muted
          "
        >

          <FiBell size={20} />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />

        </button>


        {/* User Menu */}

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <button
              type="button"
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                px-2
                py-1
                transition
                hover:bg-muted
              "
            >

              <Avatar>

                <AvatarFallback>
                  {user
                    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
                    : "AD"}
                </AvatarFallback>

              </Avatar>


              <div className="text-left">

                <p className="text-sm font-semibold">

                  {user
                    ? `${user.firstName} ${user.lastName}`
                    : "Admin"}

                </p>

                <p className="text-xs text-muted-foreground">

                  {user?.role ?? "Administrator"}

                </p>

              </div>


              <FiChevronDown />

            </button>

          </DropdownMenuTrigger>


          <DropdownMenuContent
            align="end"
            className="w-52"
          >

            <DropdownMenuItem onClick={handleProfile}>
              Profile
            </DropdownMenuItem>


            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>


            <DropdownMenuSeparator />


            <DropdownMenuItem
              onClick={handleLogout}
              className="
                cursor-pointer
                text-red-500
                focus:text-red-500
              "
            >

              Logout

            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  );
}