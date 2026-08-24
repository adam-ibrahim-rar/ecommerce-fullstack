import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

import Button from "@/components/Helpers/Button";

import { useMyOrderQuery, useCancelMyOrderMutation } from "./api/orderQueries";
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

// أوردر يقدر يتلغي من اليوزر لو لسه PENDING أو CONFIRMED بس
// (نفس الشرط اللي الباك إند بيتحقق منه في cancelOrderService)
const CANCELLABLE_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED"];

export default function MyOrderDetails() {
  const { id } = useParams();

  const { data: order, isLoading, isError } = useMyOrderQuery(id ?? "");
  const { mutate: cancelOrder, isPending: isCancelling } =
    useCancelMyOrderMutation();

  const handleCancel = () => {
    if (!id) return;

    cancelOrder(id, {
      onSuccess: () => toast.success("Order cancelled"),
      onError: (error: any) =>
        toast.error(
          error?.response?.data?.message || "Could not cancel order",
        ),
    });
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="py-16 text-center text-red-500">
        Order not found.
      </div>
    );
  }

  const canCancel = CANCELLABLE_STATUSES.includes(order.status);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          to="/settings/my-orders"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand"
        >
          <FiArrowLeft size={16} />
          Back to My Orders
        </Link>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
        >
          {order.status.toLowerCase()}
        </span>
      </div>

      <div>
        <h1 className="text-[20px] font-medium text-brand">
          Order #{order.id.slice(0, 8)}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-md border border-gray-200 p-5">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              {item.productImage && (
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="h-[55px] w-[55px] object-contain"
                />
              )}

              <div>
                <p className="text-[15px]">{item.productTitle}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-5">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Payment Method</span>
          <span className="text-black">
            {order.paymentMethod === "CASH_ON_DELIVERY"
              ? "Cash on Delivery"
              : "Bank Transfer"}
          </span>
        </div>

        <div className="flex justify-between pt-2 text-[16px] font-semibold">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {canCancel && (
        <div>
          <Button
            content={isCancelling ? "Cancelling..." : "Cancel Order"}
            bg="bg-white"
            text="text-red-500"
            classes="border border-red-300 !py-2.5 !px-8 hover:bg-red-50"
            disabled={isCancelling}
            handleClick={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
