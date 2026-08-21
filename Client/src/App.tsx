import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
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
