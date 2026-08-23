import { useNavigate } from "react-router-dom";
import Frame from "@/components/Helpers/Frame";
import Swapers from "@/components/Helpers/Swapers";
import ProductCard from "@/components/Helpers/ProductCard";
import Button from "@/components/Helpers/Button";
import { useAllProductsQuery } from "../../api/homeQueries";

export default function OurProductsSection() {
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useAllProductsQuery();

  function handleClick() {
    navigate("/products");
  }

  return (
    <div className="flex flex-col gap-10 w-[1170px]">
      <Frame
        title="Our Products"
        functionality={<Swapers />}
        description="explore Our Products"
      />

      {isError && <p className="text-red-500">Failed to load products.</p>}

      {!isError && (
        <div className="grid grid-cols-4 gap-[30px]">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      <div className="self-center ">
        <Button content="view all products" handleClick={handleClick} />
      </div>
    </div>
  );
}