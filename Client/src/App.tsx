import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "./reduxtoolkit/hooks";
import { getCart } from "./reduxtoolkit/slices/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // الكارت مش بيتعمله fetch إلا بعد login/register مباشرة.
  // فلو اليوزر عامل login فعلاً وعمل refresh للصفحة أو فتح تاب جديد،
  // الـ cart.cart بيفضل null والسلة بتظهر فاضية غلط رغم إن فيها منتجات في الباك إند.
  // الحل: أول ما الـ app يشتغل، لو اليوزر authenticated (من الـ localStorage)، اجيب الكارت بتاعه فورًا.
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          duration: 2000,
          classNames: {
            toast: "rounded-xl mt-8  shadow-lg !min-w-20  !w-fit text-center",

            title: "font-meduim text-sm",

            description: "text-sm opacity-80",

            success: "!bg-emerald-100 !border-emerald-500 !text-emerald-700",

            error: "!bg-rose-700  !text-white",
          },
        }}
      />

      <Header />

      <main className="flex-1 ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
