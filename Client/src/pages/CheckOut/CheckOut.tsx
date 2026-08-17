import PathLocation from "../../components/Helpers/PathLocation";
import Button from "../../components/Helpers/Button";
import iphone from "../../assets/iphone.jpg";
import { useEffect, useState } from "react";
import CheckoutSkeleton from "../../components/Skeletons/CheckoutSkeleton";

const CartProducts = [
  {
    id: 1,
    image: iphone,
    name: "LCD Monitor",
    price: 650,
    quantity: 1,
  },
  {
    id: 2,
    image: iphone,
    name: "H1 Gamepad",
    price: 1100,
    quantity: 1,
  },
];

export default function Checkout() {
  const [cartProducts] = useState(CartProducts);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [coupon, setCoupon] = useState("");

  const subtotal = cartProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const shipping = 0;

  const total = subtotal + shipping;
const [loading, setlodaing] = useState(true);
  useEffect(() => {
    setTimeout(() => setlodaing(false), 500);
  }, []);

  return loading ? (
    <CheckoutSkeleton />
  ) : (
    <div className="w-[1170px] mx-auto">

      <PathLocation />

      <div className="mt-14 grid grid-cols-2 gap-[100px]">

        <div>
          <h1 className="text-3xl font-medium mb-8">
            Billing Details
          </h1>

          <form className="flex flex-col gap-6">

            <div>
              <label className="text-[16px] text-gray-500">
                First Name<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <div>
              <label className="text-[16px] text-gray-500">
                Company Name
              </label>

              <input
                type="text"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <div>
              <label className="text-[16px] text-gray-500">
                Street Address<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <div>
              <label className="text-[16px] text-gray-500">
                Apartment, floor, etc. (optional)
              </label>

              <input
                type="text"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <div>
              <label className="text-[16px] text-gray-500">
                Town/City<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <div>
              <label className="text-[16px] text-gray-500">
                Phone Number<span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <div>
              <label className="text-[16px] text-gray-500">
                Email Address<span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                className="
                  w-full
                  h-[56px]
                  mt-2
                  bg-gray-100
                  outline-none
                  px-4
                "
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">

              <input
                type="checkbox"
                className="w-5 h-5 accent-secondary-two  cursor-pointer"
              />

              <span className="text-[16px]">
                Save this information for faster check-out next time
              </span>

            </label>

          </form>
        </div>

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

                  <span className="text-[18px]">
                    {product.name}
                  </span>

                </div>

                <span className="text-[18px]">
                  ${product.price * product.quantity}
                </span>

              </div>
            ))}

          </div>

          <div className="flex justify-between py-5 border-b border-gray-300 mt-5">
            <span>Subtotal:</span>

            <span>
              ${subtotal}
            </span>
          </div>

          <div className="flex justify-between py-5 border-b border-gray-300">
            <span>Shipping:</span>

            <span>
              Free
            </span>
          </div>

          <div className="flex justify-between py-5">
            <span>Total:</span>

            <span>
              ${total}
            </span>
          </div>

          <div className="flex flex-col gap-6 mt-2">

            {/* Bank */}
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

                <span>
                  Bank
                </span>

              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-pink-500">Bkash</span>
                <span className="text-blue-600">VISA</span>
                <span className="text-red-500">MasterCard</span>
                <span>nagad</span>
              </div>

            </label>

            {/* Cash */}
            <label className="flex items-center gap-4 cursor-pointer">

              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="w-5 h-5 accent-black"
              />

              <span>
                Cash on delivery
              </span>

            </label>

          </div>

          <div className="flex gap-3 mt-7">

            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="
                h-[56px]
                flex-1
                border
                border-gray-400
                rounded-md
                px-4
                outline-none
              "
            />

            <Button
              bg="bg-secondary-two"
              text="text-white"
              classes="h-[56px] "
              content="Apply Coupon"
              handleClick={() => {
                console.log("Coupon:", coupon);
              }}
            />

          </div>

          <div className="mt-6">

            <Button
              bg="bg-secondary-two"
              text="text-white"
              classes="h-[50px] "
              content="Place Order"
              handleClick={() => {
                console.log({
                  cartProducts,
                  paymentMethod,
                  subtotal,
                  shipping,
                  total,
                });
              }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}