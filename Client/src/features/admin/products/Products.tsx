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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import AddProductForm from "./components/AddProductForm"; // -----------------------------------------------------
// Dummy Products
// -----------------------------------------------------

const products = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Nike Air Max 270",
    category: "Shoes",
    price: 120,
    oldPrice: 150,
    discount: 20,
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Classic Watch",
    category: "Accessories",
    price: 85,
    oldPrice: 110,
    discount: 23,
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    title: "Smart Watch Pro",
    category: "Electronics",
    price: 250,
    oldPrice: 300,
    discount: 17,
    rating: 4.7,
    reviews: 213,
    inStock: true,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
    title: "Premium Hoodie",
    category: "Clothing",
    price: 65,
    rating: 4.4,
    reviews: 56,
    inStock: false,
  },
];

// -----------------------------------------------------
// Component
// -----------------------------------------------------

export default function AdminProducts() {
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

              <p className="mt-2 text-2xl font-bold">124</p>
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

              <p className="mt-2 text-2xl font-bold">108</p>
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

              <p className="mt-2 text-2xl font-bold">16</p>
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

              <p className="mt-2 text-2xl font-bold">12</p>
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
                />
              </div>

              {/* Category */}

              <Select>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>

                  <SelectItem value="shoes">Shoes</SelectItem>

                  <SelectItem value="clothing">Clothing</SelectItem>

                  <SelectItem value="electronics">Electronics</SelectItem>

                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
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
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-medium">{product.title}</p>

                          <p className="text-sm text-muted-foreground">
                            #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}

                    <td className="py-4">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>

                    {/* Price */}

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">${product.price}</span>

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

                        <span className="font-medium">{product.rating}</span>

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
                          <DropdownMenuItem>
                            <FiEye className="mr-2" />
                            View Product
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <FiEdit2 className="mr-2" />
                            Edit Product
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="truncate font-medium">{product.title}</p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.category}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <FiMoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FiEye className="mr-2" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <FiEdit2 className="mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem className="text-red-600">
                            <FiTrash2 className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="font-semibold">${product.price}</span>

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
        </CardContent>
      </Card>
    </div>
  );
}

// =====================================================
// Add Product Dialog
// =====================================================

function AddProductDialog() {
  return (
    <Dialog>
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

        <AddProductForm />
      </DialogContent>
    </Dialog>
  );
}
