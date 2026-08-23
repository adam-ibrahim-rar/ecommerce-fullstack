import PathLocation from "../../components/Helpers/PathLocation";
import Button from "../../components/Helpers/Button";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "./api/orderQueries";
import { toast } from "sonner";
import OrderSkeleton from "../../components/Skeletons/OrderSkeleton";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkoutSchema,
  type CheckoutFormValues,
} from "./schema/checkout.schema";

import { useAppDispatch, useAppSelector } from "../../reduxtoolkit/hooks";
import { getCart } from "../../reduxtoolkit/slices/cart/cartSlice";
import { selectCartItems, selectCartLoading } from "../Cart/cartSelectors";

export default function Order() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartItems);
  const cartLoading = useAppSelector(selectCartLoading);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [coupon, setCoupon] = useState("");

  const createOrderMutation = useCreateOrderMutation();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema) as Resolver<CheckoutFormValues>,
    defaultValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      phone: "",
      email: "",
      saveInformation: false,
    },
  });

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = (data: CheckoutFormValues) => {
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    createOrderMutation.mutate(
      {
        totalAmount: total,
        items: cartProducts.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
        paymentMethod:
          paymentMethod === "cash" ? "CASH_ON_DELIVERY" : "BANK",
      },
      {
        onSuccess: () => {
          toast.success("Order placed successfully!");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to place order",
          );
        },
      },
    );
  };

  const handleApplyCoupon = () => {
    console.log("Coupon:", coupon);
  };

  if (cartLoading && cartProducts.length === 0) {
    return <OrderSkeleton />;
  }

  // ... باقي الـ JSX زي ما هو، بس بدون تغيير

  return (
    <div className="w-[1170px] mx-auto">
      <PathLocation />

      <form onSubmit={handleSubmit(handlePlaceOrder)}>
        <div className="mt-14 grid grid-cols-2 gap-[100px]">
          {/* ================= BILLING DETAILS ================= */}
          <div>
            <h1 className="text-3xl font-medium mb-8">Billing Details</h1>

            <div className="flex flex-col gap-6">
              <div>
                <label className="text-[16px] text-gray-500">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[16px] text-gray-500">
                  Company Name
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
              </div>

              <div>
                <label className="text-[16px] text-gray-500">
                  Street Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("streetAddress")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[16px] text-gray-500">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  {...register("apartment")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
              </div>

              <div>
                <label className="text-[16px] text-gray-500">
                  Town/City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("city")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[16px] text-gray-500">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[16px] text-gray-500">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full h-[56px] mt-2 bg-gray-100 outline-none px-4"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("saveInformation")}
                  className="w-5 h-5 accent-brand cursor-pointer"
                />
                <span className="text-[16px]">
                  Save this information for faster check-out next time
                </span>
              </label>
            </div>
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="pt-[90px]">
            <div className="flex flex-col gap-7">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[55px] h-[55px] object-contain"
                    />
                    <span className="text-[18px]">{product.name}</span>
                  </div>
                  <span className="text-[18px]">
                    ${product.price * product.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-5 border-b border-gray-300 mt-5">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between py-5 border-b border-gray-300">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between py-5">
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <div className="flex flex-col gap-6 mt-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                    className="w-5 h-5 accent-black"
                  />
                  <span>Bank</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-pink-500">Bkash</span>
                  <span className="text-blue-600">VISA</span>
                  <span className="text-red-500">MasterCard</span>
                  <span>nagad</span>
                </div>
              </label>

              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="w-5 h-5 accent-black"
                />
                <span>Cash on delivery</span>
              </label>
            </div>

            <div className="flex gap-3 mt-7">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="h-[56px] flex-1 border border-gray-400 rounded-md px-4 outline-none"
              />

              <Button
                type="button"
                bg="bg-brand"
                text="text-white"
                classes="h-[56px]"
                content="Apply Coupon"
                handleClick={handleApplyCoupon}
              />
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                bg="bg-brand"
                text="text-white"
                classes="h-[50px]"
                content={
                  createOrderMutation.isPending
                    ? "Placing Order..."
                    : "Place Order"
                }
                disabled={createOrderMutation.isPending}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}