import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiDollarSign,
  FiEye,
  FiPackage,
  FiSearch,
  FiShoppingBag,
  FiClock,
} from "react-icons/fi";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import {
  useAdminOrdersQuery,
  useOrderStatsQuery,
  useUpdateOrderStatusMutation,
} from "./api/ordersQueries";

import type { OrderStatus } from "./types/order.types";

// -----------------------------------------------------
// Status → لون البادج
// -----------------------------------------------------

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10",
  CONFIRMED: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/10",
  PROCESSING: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/10",
  SHIPPED: "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10",
  DELIVERED: "bg-green-500/10 text-green-600 hover:bg-green-500/10",
  CANCELLED: "bg-red-500/10 text-red-600 hover:bg-red-500/10",
};

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

// -----------------------------------------------------
// Component
// -----------------------------------------------------

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: stats } = useOrderStatsQuery();

  const { data: orders = [], isLoading } = useAdminOrdersQuery({
    ...(search.trim() && { search: search.trim() }),
    ...(statusFilter !== "all" && { status: statusFilter as OrderStatus }),
  });

  const { mutate: updateStatus } = useUpdateOrderStatusMutation();

  const pendingCount = useMemo(() => stats?.byStatus?.PENDING ?? 0, [stats]);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateStatus(
      { id, status },
      {
        onSuccess: () => toast.success("Order status updated"),
        onError: () => toast.error("Could not update order status"),
      }
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

        <p className="mt-2 text-muted-foreground">
          Manage and track all customer orders.
        </p>
      </section>

      {/* --------------------------------------------- */}
      {/* Stats */}
      {/* --------------------------------------------- */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="mt-2 text-2xl font-bold">{stats?.total ?? 0}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <FiShoppingBag className="text-primary" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="mt-2 text-2xl font-bold">{pendingCount}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
              <FiClock className="text-yellow-600" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="mt-2 text-2xl font-bold">
                {stats?.byStatus?.DELIVERED ?? 0}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
              <FiPackage className="text-green-600" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="mt-2 text-2xl font-bold">
                ${stats?.revenue?.toFixed(2) ?? "0.00"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <FiDollarSign className="text-blue-600" size={21} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --------------------------------------------- */}
      {/* Orders table */}
      {/* --------------------------------------------- */}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                View and manage every order placed in your store.
              </CardDescription>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <FiSearch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  placeholder="Search by customer or order ID..."
                  className="w-full pl-10 sm:w-[280px]"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[170px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>

                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Loading orders...
            </p>
          ) : orders.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No orders found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-4 font-medium">Order</th>
                    <th className="pb-4 font-medium">Customer</th>
                    <th className="pb-4 font-medium">Items</th>
                    <th className="pb-4 font-medium">Total</th>
                    <th className="pb-4 font-medium">Payment</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4">
                        <p className="font-medium">#{order.id.slice(0, 8)}</p>
                      </td>

                      <td className="py-4">
                        <p className="font-medium">
                          {order.customer.firstName} {order.customer.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer.email}
                        </p>
                      </td>

                      <td className="py-4 text-sm">{order.itemsCount}</td>

                      <td className="py-4 font-semibold">
                        ${order.totalAmount.toFixed(2)}
                      </td>

                      <td className="py-4">
                        <Badge variant="secondary">
                          {order.paymentMethod === "CASH_ON_DELIVERY"
                            ? "Cash on Delivery"
                            : "Bank Transfer"}
                        </Badge>
                      </td>

                      <td className="py-4">
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            handleStatusChange(order.id, value as OrderStatus)
                          }
                        >
                          <SelectTrigger
                            className={`h-8 w-[150px] border-0 ${STATUS_STYLES[order.status]}`}
                          >
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>

                      <td className="py-4 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 text-right">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <FiEye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}