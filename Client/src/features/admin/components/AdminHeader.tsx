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

export default function AdminHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        flex
        items-center
        justify-between

        border-b
        bg-background/80
        backdrop-blur

        px-8
        h-20
      "
    >
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
            className="
              w-[320px]
              pl-10
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          className="
            relative

            flex
            items-center
            justify-center

            h-11
            w-11

            rounded-full

            hover:bg-muted
            transition
            cursor-pointer
          "
        >
          <FiBell size={20} />

          <span
            className="
              absolute
              top-2
              right-2

              h-2
              w-2

              rounded-full
              bg-red-500
            "
          />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                flex
                items-center
                gap-3

                rounded-xl

                px-2
                py-1

                hover:bg-muted
                transition

                cursor-pointer
              "
            >
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>

              <div
                className="
                  text-left
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  Admin
                </p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  Administrator
                </p>
              </div>

              <FiChevronDown />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>Profile</DropdownMenuItem>

            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="
                text-red-500
                cursor-pointer
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
