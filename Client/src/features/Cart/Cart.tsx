import PathLocation from "../../components/Helpers/PathLocation";
import CartProduct from "./CartProduct";
import Button from "../../components/Helpers/Button";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "./CartSkeleton";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../../reduxtoolkit/hooks";
import {  updateCartItem, deleteCartItem } from "../../reduxtoolkit/slices/cart/cartSlice";
import { selectCartItems, selectCartLoading } from "./cartSelectors";

const details = ["product", "price", "quantity", "subtotal"];

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector(selectCartItems);
  const loading = useAppSelector(selectCartLoading);


  function handleDelete(id: string) {
    dispatch(deleteCartItem(id))
      .unwrap()
      .catch(() => toast.error("Failed to remove item"));
  }

  function handleQuantityChange(id: string, quantity: number) {
    dispatch(updateCartItem({ itemId: id, quantity }))
      .unwrap()
      .catch(() => toast.error("Failed to update quantity"));
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  if (loading && cartProducts.length === 0) {
    return <CartSkeleton />;
  }

  return (
    <div className="w-[1170px] mx-auto">
      <PathLocation />

      {cartProducts.length > 0 ? (
        <div className="flex flex-col gap-10">
          {/* Cart Header */}
          <header className="h-[72px] shadow-lg px-10 grid grid-cols-4 items-center">
            {details.map((item, index) => (
              <span
                key={index}
                className={`text-[16px] capitalize ${
                  index === 0 ? "text-left" : "text-center"
                }`}
              >
                {item}
              </span>
            ))}
          </header>

          {cartProducts.map((item) => (
            <CartProduct
              key={item.id}
              Product={item}
              onDelete={handleDelete}
              onQuantityChange={handleQuantityChange}
            />
          ))}

          <div className="flex justify-between">
            <Button
              bg="bg-white"
              text="text-black"
              classes="border border-gray-400 h-[56px] w-[218px] font-medium"
              content="Return To Shop"
              handleClick={() => navigate("/")}
            />
          </div>

          <div className="w-[470px] min-h-[324px] self-center border border-black px-6 py-7">
            <h2 className="text-xl font-medium mb-6">Cart Total</h2>

            <div className="flex justify-between pb-4 border-b border-gray-300">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between py-4 border-b border-gray-300">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between pt-4">
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                bg="bg-brand"
                text="text-white"
                classes="h-[50px] font-medium"
                content="Proceed to checkout"
                handleClick={() => navigate("/checkout")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[120px] mt-10 w-full shadow-lg px-10 flex items-center justify-between">
          <span>Your cart is empty</span>

          <Button
            bg="bg-white"
            text="text-black"
            classes="border border-gray-400 h-[56px] w-[218px] font-medium"
            content="Return To Shop"
            handleClick={() => navigate("/")}
          />
        </div>
      )}
    </div>
  );
}