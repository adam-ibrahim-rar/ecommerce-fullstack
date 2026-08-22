import { useState } from "react";

import {
  FiFolder,
  FiPlus,
} from "react-icons/fi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import AddCategoryForm from "./components/AddCategoryForm";

import { useCategoriesQuery } from "./api/categoriesQueries";

import { iconList } from "./data/icon-list";

export default function AdminCategories() {
  const [open, setOpen] =
    useState(false);

  const {
    data: categories = [],
    isLoading,
  } = useCategoriesQuery();

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage store categories.
          </p>

        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          
        >

          <DialogTrigger asChild>

            <Button>

              <FiPlus className="mr-2" />

              Add Category

            </Button>

          </DialogTrigger>

       <DialogContent
  className="
    !w-[95vw]
    !max-w-[1100px]
    max-h-[90vh]
    overflow-y-auto
    p-6
  "
>
  <DialogHeader>
    <DialogTitle>
      Create Category
    </DialogTitle>

  </DialogHeader>

  <AddCategoryForm
    onSuccess={() => setOpen(false)}
  />
</DialogContent>

        </Dialog>

      </section>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-muted-foreground text-sm">
                Categories
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {categories.length}
              </h2>

            </div>

            <FiFolder
              size={28}
              className="text-primary"
            />

          </CardContent>

        </Card>

      </div>

      {/* List */}

      <Card>

        <CardHeader>

          <CardTitle>
            All Categories
          </CardTitle>

          <CardDescription>
            Available categories.
          </CardDescription>

        </CardHeader>

        <CardContent>

          {isLoading ? (

            <p>Loading...</p>

          ) : (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {categories.map((category) => {

                const Icon =
                  iconList.find(
                    (i) =>
                      i.name ===
                      category.icon
                  )?.icon;

                return (

                  <div
                    key={category.id}
                    className="rounded-xl border p-5 transition hover:shadow-md"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">

                        {Icon ? (
                          <Icon size={28} />
                        ) : (
                          <FiFolder size={28} />
                        )}

                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {category.name}
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          {category.icon?.slice(2)}
                        </p>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </CardContent>

      </Card>

    </div>
  );
}