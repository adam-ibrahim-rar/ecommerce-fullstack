import PathLocation from "../../components/Helpers/PathLocation";
import CartProduct from "./CartProduct";
import iphone from "../../assets/iphone.jpg";
import { useEffect, useState } from "react";
import Button from "../../components/Helpers/Button";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "../../components/Skeletons/CartSkeleton";

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
    name: "Laptop",
    price: 1200,
    quantity: 1,
  },
  {
    id: 3,
    image: iphone,
    name: "Mechanical Keyboard",
    price: 150,
    quantity: 2,
  },
  {
    id: 4,
    image: iphone,
    name: "Gaming Mouse",
    price: 80,
    quantity: 1,
  },
  {
    id: 5,
    image: iphone,
    name: "Headphones",
    price: 200,
    quantity: 1,
  },
];

const details = ["product", "price", "quantity", "subtotal"];

export default function Cart() {
  const [cartProducts, setCartProducts] = useState(CartProducts);

  const navigate = useNavigate();

  function handleDelete(id: number) {
    setCartProducts((prev) => prev.filter((product) => product.id !== id));
  }

  function handleQuantityChange(id: number, quantity: number) {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity,
            }
          : product,
      ),
    );
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const shipping = 0;

  const total = subtotal + shipping;

  const [loading, setlodaing] = useState(true);
  useEffect(() => {
    setTimeout(() => setlodaing(false), 500);
  }, []);

  return loading ? (
    <CartSkeleton />
  ) : (
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

            <Button
              bg="bg-white"
              text="text-black"
              classes="border border-gray-400 h-[56px] font-medium"
              content="Update Cart"
              handleClick={() => {}}
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

            <div className="flex  justify-center mt-6">
              <Button
                bg="bg-secondary-two"
                text="text-white"
                classes="h-[50px]  font-medium"
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
