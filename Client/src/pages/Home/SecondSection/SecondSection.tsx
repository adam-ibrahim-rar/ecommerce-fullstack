import { useNavigate } from "react-router-dom";
import Frame from "../../../components/Helpers/Frame";
import Swapers from "../../../components/Helpers/Swapers";
import ProductCard from "../../../components/Helpers/ProductCard";
import Button from "../../../components/Helpers/Button";
import Countdown from "./CountDown";
import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";
import ProductCardSkeleton from "@/components/Skeletons/Products/ProductCardSkeleton";

export default function SecondSection() {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data.data;
    },
  });

  function handleClick() {
    navigate("/products");
  }

  return (
    <div className="flex flex-col gap-5 w-[1170px]">
      <Frame
        title="Today’s"
        functionality={<Swapers />}
        counter={<Countdown endsAt="2026-08-20T18:00:00Z" />}
        description="Flash Sales"
      />

      {isLoading && (
        <ProductCardSkeleton/>
      )}

      {isError && (
        <p className="text-red-500 mt-2">Failed to load products.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-4 mt-2 gap-[30px]">
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      <div className="self-center mt-14">
        <Button content="view all products" handleClick={handleClick} />
      </div>
      <hr className="mt-2 h-[1.5px] bg-black border-none opacity-40" />
    </div>
  );
}