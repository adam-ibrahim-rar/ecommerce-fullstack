import {
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Revenue",
    value: "$12,540",
    icon: FiDollarSign,
    change: "+18%",
  },
  {
    title: "Products",
    value: "124",
    icon: FiPackage,
    change: "+6",
  },
  {
    title: "Orders",
    value: "356",
    icon: FiShoppingBag,
    change: "+24",
  },
  {
    title: "Users",
    value: "1,284",
    icon: FiUsers,
    change: "+12%",
  },
];

export default function AdminHome() {
  return (
    <div className="space-y-8">
      {/* Welcome */}

      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Welcome back 👋 Here's what's happening today.
          </p>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="
                transition-all
                hover:shadow-lg
                hover:-translate-y-1
              "
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>{item.title}</CardDescription>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                    "
                  >
                    <Icon size={20} className="text-primary" />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-green-600
                  "
                >
                  <FiTrendingUp />

                  {item.change}

                  <span className="text-muted-foreground">this month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Recent Orders */}

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>

            <CardDescription>Latest customer purchases.</CardDescription>
          </CardHeader>

          <CardContent>
            <div
              className="
                flex
                h-[350px]
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
              "
            >
              <p className="text-muted-foreground">Orders table will be here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Users</CardTitle>

            <CardDescription>Recently joined users.</CardDescription>
          </CardHeader>

          <CardContent>
            <div
              className="
                flex
                h-[350px]
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
              "
            >
              <p className="text-muted-foreground">Users list will be here</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
