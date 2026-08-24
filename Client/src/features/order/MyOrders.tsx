import { Link } from "react-router-dom";
import { FiEye, FiPackage } from "react-icons/fi";

import { useMyOrdersQuery } from "./api/orderQueries";
import type { OrderStatus } from "./types/order.types";

// -----------------------------------------------------
// Status → لون البادج
// -----------------------------------------------------

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function MyOrders() {
  const { data: orders = [], isLoading, isError } = useMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading your orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-500">
        Failed to load your orders. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[20px] font-medium text-brand">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <FiPackage size={40} className="text-gray-300" />
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link to="/" className="text-brand underline underline-offset-4">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 rounded-md border border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">Order #{order.id.slice(0, 8)}</p>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {order.itemsCount}{" "}
                  {order.itemsCount === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
                >
                  {order.status.toLowerCase()}
                </span>

                <span className="font-semibold">
                  ${order.totalAmount.toFixed(2)}
                </span>

                <Link
                  to={`/settings/my-orders/${order.id}`}
                  className="flex items-center gap-1 text-sm text-brand hover:underline"
                >
                  <FiEye size={16} />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
