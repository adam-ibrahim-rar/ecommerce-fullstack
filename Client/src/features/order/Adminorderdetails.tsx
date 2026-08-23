import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useAdminOrderQuery,
  useUpdateOrderStatusMutation,
} from "./api/orderQueries";

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

export default function AdminOrderDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading } = useAdminOrderQuery(id ?? "");
  const { mutate: updateStatus } = useUpdateOrderStatusMutation();

  const handleStatusChange = (status: OrderStatus) => {
    if (!order) return;

    updateStatus(
      { id: order.id, status },
      {
        onSuccess: () => toast.success("Order status updated"),
        onError: () => toast.error("Could not update order status"),
      }
    );
  };

  if (isLoading) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Loading order...
      </p>
    );
  }

  if (!order) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Order not found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between">
        <div>
          <Link
            to="/admin/orders"
            className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <FiArrowLeft size={16} />
            Back to Orders
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.id.slice(0, 8)}
          </h1>

          <p className="mt-2 text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <Select value={order.status} onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`h-9 w-[170px] border-0 ${STATUS_STYLES[order.status]}`}
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
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* --------------------------------------------- */}
        {/* Items */}
        {/* --------------------------------------------- */}

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Items</CardTitle>
            <CardDescription>
              {order.itemsCount} product{order.itemsCount !== 1 && "s"} in
              this order.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productImage || "/placeholder-product.png"}
                      alt={item.productTitle}
                      className="h-14 w-14 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium">{item.productTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------- */}
        {/* Customer + payment info */}
        {/* --------------------------------------------- */}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-muted-foreground">
                @{order.customer.username}
              </p>
              <p className="text-muted-foreground">{order.customer.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Method</span>
                <Badge variant="secondary">
                  {order.paymentMethod === "CASH_ON_DELIVERY"
                    ? "Cash on Delivery"
                    : "Bank Transfer"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className={STATUS_STYLES[order.status]}>
                  {order.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}