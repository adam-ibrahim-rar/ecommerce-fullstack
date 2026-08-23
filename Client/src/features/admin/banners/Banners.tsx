import { useMemo, useState } from "react";

import {
  FiEdit2,
  FiImage,
  FiLink,
  FiMoreHorizontal,
  FiPlus,
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

import AddBannerForm from "./components/AddBannerForm";

import {
  useBannersQuery,
  useDeleteBannerMutation,
} from "./api/bannersQueries";

import type { Banner, BannerType } from "./types/banner.types";

// -----------------------------------------------------
// Component
// -----------------------------------------------------

export default function AdminBanners() {
  const [typeFilter, setTypeFilter] = useState<"all" | BannerType>("all");

  // بيانات كل البانرز من غير فلتر، عشان الإحصائيات
  const { data: allBanners = [] } = useBannersQuery();

  // بيانات مفلترة (بترجع من الباك اند نفسه)
  const { data: banners = [], isLoading } = useBannersQuery(
    typeFilter !== "all" ? { type: typeFilter } : undefined,
  );

  const { mutate: deleteBanner, isPending: isDeleting } =
    useDeleteBannerMutation();

  // ----------------------------------------
  // Stats
  // ----------------------------------------

  const stats = useMemo(() => {
    const total = allBanners.length;
    const hero = allBanners.filter((b) => b.type === "hero").length;
    const promo = allBanners.filter((b) => b.type === "promo").length;
    const active = allBanners.filter((b) => b.isActive).length;

    return { total, hero, promo, active };
  }, [allBanners]);

  const handleDelete = (banner: Banner) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${banner.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    deleteBanner(banner.id, {
      onSuccess: () => {
        toast.success("Banner deleted successfully");
      },
      onError: () => {
        toast.error("Could not delete banner");
      },
    });
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banners</h1>

          <p className="mt-2 text-muted-foreground">
            Manage the hero slider and promo banners on your home page.
          </p>
        </div>

        <AddBannerDialog />
      </section>

      {/* --------------------------------------------- */}
      {/* Stats */}
      {/* --------------------------------------------- */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Banners</p>

              <p className="mt-2 text-2xl font-bold">{stats.total}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <FiImage className="text-primary" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Hero Banners</p>

              <p className="mt-2 text-2xl font-bold">{stats.hero}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <FiImage className="text-blue-600" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Promo Banners</p>

              <p className="mt-2 text-2xl font-bold">{stats.promo}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
              <FiImage className="text-purple-600" size={21} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>

              <p className="mt-2 text-2xl font-bold">{stats.active}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
              <FiImage className="text-green-600" size={21} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --------------------------------------------- */}
      {/* Banners */}
      {/* --------------------------------------------- */}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Banners</CardTitle>

              <CardDescription>
                View and manage the hero slider and promo banner.
              </CardDescription>
            </div>

            {/* Filter */}

            <Select
              value={typeFilter}
              onValueChange={(value) =>
                setTypeFilter(value as "all" | BannerType)
              }
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="promo">Promo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Loading banners...
            </p>
          ) : banners.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No banners found.
            </p>
          ) : (
            <>
              {/* Desktop Table */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-4 font-medium">Banner</th>

                      <th className="pb-4 font-medium">Type</th>

                      <th className="pb-4 font-medium">Link</th>

                      <th className="pb-4 font-medium">Order</th>

                      <th className="pb-4 font-medium">Status</th>

                      <th className="pb-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {banners.map((banner) => (
                      <tr key={banner.id} className="border-b last:border-0">
                        {/* Banner */}

                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={banner.image}
                              alt={banner.title}
                              className="h-12 w-20 rounded-lg object-cover"
                            />

                            <div>
                              <p className="font-medium">{banner.title}</p>

                              <p className="text-sm text-muted-foreground">
                                #{banner.id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}

                        <td className="py-4">
                          <Badge variant="secondary" className="capitalize">
                            {banner.type}
                          </Badge>
                        </td>

                        {/* Link */}

                        <td className="py-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <FiLink size={14} />
                            <span className="max-w-[160px] truncate">
                              {banner.link}
                            </span>
                          </div>
                        </td>

                        {/* Order */}

                        <td className="py-4">{banner.order}</td>

                        {/* Status */}

                        <td className="py-4">
                          {banner.isActive ? (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Inactive</Badge>
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
                              <DropdownMenuItem disabled>
                                <FiEdit2 className="mr-2" />
                                Edit Banner
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                disabled={isDeleting}
                                onClick={() => handleDelete(banner)}
                              >
                                <FiTrash2 className="mr-2" />
                                Delete Banner
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
                {banners.map((banner) => (
                  <div key={banner.id} className="rounded-xl border p-4">
                    <div className="flex gap-4">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="h-16 w-24 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="truncate font-medium">
                              {banner.title}
                            </p>

                            <p className="mt-1 text-sm capitalize text-muted-foreground">
                              {banner.type}
                            </p>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <FiMoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem disabled>
                                <FiEdit2 className="mr-2" />
                                Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-red-600"
                                disabled={isDeleting}
                                onClick={() => handleDelete(banner)}
                              >
                                <FiTrash2 className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Order: {banner.order}
                          </span>

                          {banner.isActive ? (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Inactive</Badge>
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
// Add Banner Dialog
// =====================================================

function AddBannerDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FiPlus className="mr-2" />
          Add Banner
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="space-y-5 my-5 text-center border p-4 rounded-4xl">
            Create a new banner for your store.
          </DialogTitle>
        </DialogHeader>

        <AddBannerForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}