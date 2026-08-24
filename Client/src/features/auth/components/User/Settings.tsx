import { useEffect } from "react";
import PathLocation from "../../../../components/Helpers/PathLocation";
import { NavLink, Outlet } from "react-router-dom";
import { useGetCurrentUserMutation } from "../../api/authQueries";
import { useAppSelector } from "@/reduxtoolkit/hooks";

export default function Settings() {
  const { mutate  } = useGetCurrentUserMutation();
  const {username,firstName} = useAppSelector((state)=>state.auth.user)!
  useEffect(()=> mutate(),[])
   
  return (
    <div className="w-[1170px] mx-auto flex flex-col">
      <div className="flex justify-between items-center mt-4 mb-6">
        <PathLocation />

        <p className="text-[18px]">
          Welcome! <span className="font-medium text-brand">{firstName||username}</span>
        </p>
      </div>

      <div className="flex justify-between">
        <aside className=" flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-medium whitespace-nowrap">
              Manage My Account
            </h2>

            <div className="flex flex-col gap-3 pl-[29px]">
              <NavLink
                to="/Settings/my-account"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                My Profile
              </NavLink>

              <NavLink
                to="/Settings/my-address"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                Address Book
              </NavLink>

              <NavLink
                to="/Settings/payment-options"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                My Payment Options
              </NavLink>
              <NavLink
                to="remove-account"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer capitalize ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                remove account
              </NavLink>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-medium">My Orders</h2>

            <div className="flex flex-col gap-3 pl-[29px]">
              <NavLink
                to="/Settings/my-orders"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                My Orders
              </NavLink>

              <NavLink
                to="/Settings/my-returns"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                My Returns
              </NavLink>

              <NavLink
                to="/Settings/my-cancellations"
                className={({ isActive }) =>
                  `text-[16px] text-left cursor-pointer ${
                    isActive ? "text-brand" : "text-gray-500"
                  }`
                }
              >
                My Cancellations
              </NavLink>
            </div>
          </div>
        </aside>

        <div
          className="
            w-[870px]
            
            px-[80px]
            py-[20px]
            flex flex-col justify-center
            bg-white
            rounded-md
            shadow-lg
            inset-shadow-xs
          "
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
