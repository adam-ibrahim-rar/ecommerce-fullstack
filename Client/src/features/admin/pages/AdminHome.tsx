import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

export default function AdminHome() {
  const stats = [
    {
      title: "Products",
      value: "0",
      icon: <FiPackage />,
    },
    {
      title: "Orders",
      value: "0",
      icon: <FiShoppingBag />,
    },
    {
      title: "Users",
      value: "0",
      icon: <FiUsers />,
    },
    {
      title: "Revenue",
      value: "$0",
      icon: <FiDollarSign />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">

      <div>
        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back to your admin dashboard.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
              bg-white
              rounded-xl
              p-6
              border
              flex
              items-center
              justify-between
            "
          >

            <div>
              <p className="text-gray-500 text-sm">
                {stat.title}
              </p>

              <p className="text-3xl font-semibold mt-2">
                {stat.value}
              </p>
            </div>

            <div className="text-3xl">
              {stat.icon}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}