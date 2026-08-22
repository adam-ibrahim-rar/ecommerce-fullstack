import { useParams } from "react-router-dom";
import PathLocation from "../../components/Helpers/PathLocation";
import Frame from "../../components/Helpers/Frame";
import ProductCard from "../../components/Helpers/ProductCard";
import ProductDetails from "./ProductDetails";
import ProductsSkeletonContainer from "../../components/Skeletons/Products/ProductsSkeleton";
import { useAllProductsQuery, useProductQuery, useRelatedProductsQuery } from "./api/productsQueries";

export default function Products() {
  const { id } = useParams<{ id: string }>();
  const hasId = !!id;

  const { data: product, isLoading: isProductLoading } = useProductQuery(id!);

  const { data: relatedProducts } = useRelatedProductsQuery(
    product?.categoryId,
    product?.id,
  );

  const { data: allProducts, isLoading: isAllLoading } = useAllProductsQuery();

  const isLoading = hasId ? isProductLoading : isAllLoading;

  if (isLoading) {
    return <ProductsSkeletonContainer />;
  }

  if (hasId) {
    // لو الـ id مش موجود في الداتابيز، product هترجع undefined
    // من غير الشرط ده هيحصل crash في ProductDetails
    if (!product) {
      return (
        <div className="w-[1170px] flex flex-col gap-10 mx-auto">
          <PathLocation />

          <p className="py-20 text-center text-lg text-muted-foreground">
            Product not found.
          </p>
        </div>
      );
    }

    return (
      <div className="w-[1170px] flex flex-col gap-10 mx-auto">
        <PathLocation override={product.title} />
        <ProductDetails product={product} />

        <div className="flex flex-col gap-5">
          <Frame title="Related Item" />
          <div className="grid grid-cols-4 gap-[30px]">
            {relatedProducts?.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                image={item.image}
                colors={item.colors?.map((c) => c.value) ?? []}
                oldPrice={item.oldPrice ?? undefined}
                discount={item.discount ?? undefined}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1170px] flex flex-col gap-10 mx-auto">
      <PathLocation />

      <div className="flex flex-col gap-5">
        <Frame title="All Products" />
        <div className="grid grid-cols-4 gap-[30px]">
          {allProducts?.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              image={item.image}
              colors={item.colors?.map((c) => c.value) ?? []}
              oldPrice={item.oldPrice ?? undefined}
              discount={item.discount ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}