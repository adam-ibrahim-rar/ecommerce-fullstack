import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiEdit2,
  FiEye,
  FiMoreHorizontal,
  FiPackage,
  FiPlus,
  FiSearch,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import AddProductForm from "./components/AddProductForm";

import {
  useDeleteProductMutation,
  useProductsQuery,
} from "./api/productsQueries";

import { useCategoriesQuery } from "../Categories/api/categoriesQueries";

import type { Product } from "./types/product.types";

// -----------------------------------------------------
// Component
// -----------------------------------------------------

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: categories = [] } = useCategoriesQuery();

  // بيانات كل المنتجات من غير أي فلتر، عشان نحسب منها الإحصائيات
  const { data: allProducts = [] } = useProductsQuery();

  // بيانات مفلترة (بترجع من الباك اند نفسه، مش client-side)
  const { data: products = [], isLoading } = useProductsQuery({
    ...(search.trim() && { title: search.trim() }),
    ...(categoryFilter !== "all" && { categoryId: categoryFilter }),
  });

  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteProductMutation();

  // ----------------------------------------
  // Stats (محسوبة من كل المنتجات)
  // ----------------------------------------

  const stats = useMemo(() => {
    const total = allProducts.length;
    const inStock = allProducts.filter((p) => p.inStock).length;
    const outOfStock = total - inStock;

    return {
      total,
      inStock,
      outOfStock,
      categories: categories.length,
    };
  }, [allProducts, categories]);

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    deleteProduct(product.id, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
      },
      onError: () => {
        toast.error("Could not delete product");
      },
    });
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your products, inventory and pricing.
          </p>
        </div>

        <AddProductDialog />
      </section>

      {/* --------------------------------------------- */}
      {/* Stats */}
      {/* --------------------------------------------- */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>

              <p className="mt-2 text-2xl font-bold">{stats.total}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <FiPackage className="text-primary" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">In Stock</p>

              <p className="mt-2 text-2xl font-bold">{stats.inStock}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
              <FiPackage className="text-green-600" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>

              <p className="mt-2 text-2xl font-bold">{stats.outOfStock}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
              <FiPackage className="text-red-600" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>

              <p className="mt-2 text-2xl font-bold">{stats.categories}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <FiPackage className="text-blue-600" size={21} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --------------------------------------------- */}
      {/* Products */}
      {/* --------------------------------------------- */}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Products</CardTitle>

              <CardDescription>
                View and manage all products in your store.
              </CardDescription>
            </div>

            {/* Filters */}

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}

              <div className="relative">
                <FiSearch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  placeholder="Search products..."
                  className="w-full pl-10 sm:w-[250px]"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              {/* Category */}

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>

                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No products found.
            </p>
          ) : (
            <>
              {/* Desktop Table */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-4 font-medium">Product</th>

                      <th className="pb-4 font-medium">Category</th>

                      <th className="pb-4 font-medium">Price</th>

                      <th className="pb-4 font-medium">Rating</th>

                      <th className="pb-4 font-medium">Stock</th>

                      <th className="pb-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b last:border-0">
                        {/* Product */}

                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                product.images?.[0] ??
                                "/placeholder-product.png"
                              }
                              alt={product.title}
                              className="h-12 w-12 rounded-lg object-cover"
                            />

                            <div>
                              <p className="font-medium">{product.title}</p>

                              <p className="text-sm text-muted-foreground">
                                #{product.id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}

                        <td className="py-4">
                          <Badge variant="secondary">
                            {product.category?.name ?? "Uncategorized"}
                          </Badge>
                        </td>

                        {/* Price */}

                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              ${product.price}
                            </span>

                            {product.oldPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.oldPrice}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Rating */}

                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            <FiStar
                              size={15}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="font-medium">
                              {product.rating}
                            </span>

                            <span className="text-sm text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>
                        </td>

                        {/* Stock */}

                        <td className="py-4">
                          {product.inStock ? (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Out of Stock</Badge>
                          )}
                        </td>

                        {/* Actions */}

                        <td className="py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <FiMoreHorizontal size={18} />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/products/${product.id}`}>
                                  <FiEye className="mr-2" />
                                  View Product
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem disabled>
                                <FiEdit2 className="mr-2" />
                                Edit Product
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                disabled={isDeleting}
                                onClick={() => handleDelete(product)}
                              >
                                <FiTrash2 className="mr-2" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}

              <div className="space-y-4 md:hidden">
                {products.map((product) => (
                  <div key={product.id} className="rounded-xl border p-4">
                    <div className="flex gap-4">
                      <img
                        src={
                          product.images?.[0] ?? "/placeholder-product.png"
                        }
                        alt={product.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="truncate font-medium">
                              {product.title}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {product.category?.name ?? "Uncategorized"}
                            </p>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <FiMoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/products/${product.id}`}>
                                  <FiEye className="mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem disabled>
                                <FiEdit2 className="mr-2" />
                                Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-red-600"
                                disabled={isDeleting}
                                onClick={() => handleDelete(product)}
                              >
                                <FiTrash2 className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="font-semibold">
                              ${product.price}
                            </span>

                            {product.oldPrice && (
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                ${product.oldPrice}
                              </span>
                            )}
                          </div>

                          {product.inStock ? (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Out of Stock</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// =====================================================
// Add Product Dialog
// =====================================================

function AddProductDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FiPlus className="mr-2" />
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="space-y-5 my-5 text-center border p-4 rounded-4xl">
            Create a new product for your store.
          </DialogTitle>
        </DialogHeader>

        <AddProductForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}