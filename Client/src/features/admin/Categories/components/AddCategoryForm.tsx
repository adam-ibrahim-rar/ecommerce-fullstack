import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  createCategorySchema,
  type CreateCategoryFormValues,
} from "../schemas/category.schema";

import { useCreateCategoryMutation } from "../api/categoriesQueries";

import IconPicker from "./IconPicker";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

interface Props {
  onSuccess?: () => void;
}

export default function AddCategoryForm({
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(
      createCategorySchema
    ),

    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const {
    mutateAsync,
    isPending,
  } = useCreateCategoryMutation();

  const onSubmit = async (
    data: CreateCategoryFormValues
  ) => {
    try {
      await mutateAsync(data);

      toast.success(
        "Category created successfully."
      );

      onSuccess?.();

    } catch {
      toast.error(
        "Couldn't create category."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >

      <section className="space-y-5">

        
        <Separator />

        <div className="space-y-2">

          <Label>
            Category Name
          </Label>

          <Input
            placeholder="Electronics"
            {...register("name")}
          />

          {errors.name && (

            <p className="text-sm text-destructive">
              {errors.name.message}
            </p>

          )}

        </div>

      </section>

      <section className="space-y-5">

        <div>

          <h3 className="font-semibold">
            Category Icon
          </h3>

          <p className="text-sm text-muted-foreground">
            Search and choose an icon.
          </p>

        </div>

        <Separator />

        <IconPicker
          value={watch("icon")}
          onChange={(value) =>
            setValue(
              "icon",
              value,
              {
                shouldValidate: true,
              }
            )
          }
        />

        {errors.icon && (

          <p className="text-sm text-destructive">
            {errors.icon.message}
          </p>

        )}

      </section>

      <div className="flex justify-end border-t pt-6">

        <Button
          type="submit"
          disabled={
            isPending ||
            isSubmitting
          }
        >
          {isPending
            ? "Creating..."
            : "Create Category"}
        </Button>

      </div>

    </form>
  );
}