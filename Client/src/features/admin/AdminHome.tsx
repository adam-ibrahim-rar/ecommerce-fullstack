import { Link } from "react-router-dom";

import {
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiMail,
  FiEye,
} from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { useOrderStatsQuery, useAdminOrdersQuery } from "./order/api/ordersQueries";
import { useUsersQuery } from "./users/api/usersQueries";
import { useProductsQuery } from "./products/api/productsQueries";

import type { OrderStatus } from "./order/types/order.types";

// -----------------------------------------------------
// Status → لون البادج (نفس الألوان المستخدمة في صفحة Orders)
// -----------------------------------------------------

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10",
  CONFIRMED: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/10",
  PROCESSING: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/10",
  SHIPPED: "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10",
  DELIVERED: "bg-green-500/10 text-green-600 hover:bg-green-500/10",
  CANCELLED: "bg-red-500/10 text-red-600 hover:bg-red-500/10",
};

export default function AdminHome() {
  const { data: orderStats, isLoading: statsLoading } = useOrderStatsQuery();

  const { data: orders = [], isLoading: ordersLoading } = useAdminOrdersQuery();

  const { data: users = [], isLoading: usersLoading } = useUsersQuery();

  const { data: products = [], isLoading: productsLoading } = useProductsQuery();

  // ------------------------------------------------
  // Derived values (كلها من بيانات حقيقية جاية من الـ API)
  // ------------------------------------------------

  const pendingOrders = orderStats?.byStatus?.PENDING ?? 0;

  const outOfStockProducts = products.filter((product) => !product.inStock).length;

  const admins = users.filter((user) => user.role === "admin").length;

  const avgOrderValue =
    orderStats && orderStats.total > 0
      ? orderStats.revenue / orderStats.total
      : 0;

  const recentOrders = [...orders]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const latestUsers = [...users]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const stats = [
    {
      title: "Revenue",
      value: `$${orderStats?.revenue?.toFixed(2) ?? "0.00"}`,
      sub: `avg order $${avgOrderValue.toFixed(2)}`,
      icon: FiDollarSign,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Products",
      value: productsLoading ? "..." : products.length,
      sub: `${outOfStockProducts} out of stock`,
      icon: FiPackage,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Orders",
      value: statsLoading ? "..." : (orderStats?.total ?? 0),
      sub: `${pendingOrders} pending`,
      icon: FiShoppingBag,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Users",
      value: usersLoading ? "..." : users.length,
      sub: `${admins} admins`,
      icon: FiUsers,
      color: "bg-green-500/10 text-green-600",
    },
  ];

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
              className="transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>{item.title}</CardDescription>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>

                <div className="mt-3 text-sm text-muted-foreground">
                  {item.sub}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Recent Orders + Latest Users */}

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer purchases.</CardDescription>
              </div>

              <Link
                to="/admin/dashboard/orders"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {ordersLoading ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Loading orders...
              </p>
            ) : recentOrders.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No orders yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Order</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 text-right font-medium">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 font-medium">
                          #{order.id.slice(0, 8)}
                        </td>

                        <td className="py-3">
                          <p className="font-medium">
                            {order.customer.firstName || order.customer.username}{" "}
                            {order.customer.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer.email}
                          </p>
                        </td>

                        <td className="py-3 font-semibold">
                          ${order.totalAmount.toFixed(2)}
                        </td>

                        <td className="py-3">
                          <Badge className={STATUS_STYLES[order.status]}>
                            {order.status}
                          </Badge>
                        </td>

                        <td className="py-3 text-right text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Latest Users</CardTitle>
                <CardDescription>Recently joined users.</CardDescription>
              </div>

              <Link
                to="/admin/dashboard/users"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {usersLoading ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Loading users...
              </p>
            ) : latestUsers.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No users yet.
              </p>
            ) : (
              <div className="space-y-4">
                {latestUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {user.firstName?.[0] || user.username[0]}
                      {user.lastName?.[0]}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {user.firstName || user.username} {user.lastName}
                      </p>
                      <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                        <FiMail size={12} />
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to={`/admin/dashboard/users/${user.id}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <FiEye size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}