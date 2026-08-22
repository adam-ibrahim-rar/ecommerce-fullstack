import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { FiPlus, FiTrash2 } from "react-icons/fi";

import {
  createProductSchema,
  type CreateProductFormInput,
  type CreateProductFormValues,
} from "../schemas/product.schema";

import { useCreateProductMutation } from "../api/productsQueries";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { uploadToCloudinary } from "../api/uploadToCloudinary";
import type { CreateProductInput } from "../types/product.types";
import { Controller } from "react-hook-form";
import axios from "axios";
import { useCategoriesQuery } from "../../Categories/api/categoriesQueries";
// ----------------------------------------
// Props
// ----------------------------------------

interface AddProductFormProps {
  onSuccess?: () => void;
}

// ----------------------------------------
// Component
// ----------------------------------------

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const {
  data: categories = [],
  isLoading: isCategoriesLoading,
  isError: isCategoriesError,
} = useCategoriesQuery();
  // ----------------------------------------
  // Form
  // ----------------------------------------

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormInput, unknown, CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
  title: "",
  description: "",
  price: undefined,
  oldPrice: undefined,
  discount: undefined,
  images: [],
  inStock: true,
  colors: [],
  categoryId: "",
},
  });

  // ----------------------------------------
  // Images
  // ----------------------------------------

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  // ----------------------------------------
  // Colors
  // ----------------------------------------

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  // ----------------------------------------
  // Mutation
  // ----------------------------------------

  const { mutateAsync, isPending } = useCreateProductMutation();

  // ----------------------------------------
  // Submit
  // ----------------------------------------

 const onSubmit = async (data: CreateProductFormValues) => {
  try {
    // 1. الـ Files اللي اختارها الـ Admin
   const files = data.images.map((image) => image.file);

const uploadedImages = await Promise.all(
  files.map((file) => uploadToCloudinary(file)),
);
const imageUrls = uploadedImages.map(
  (image) => image.secure_url,
);

console.log("Uploaded images:", imageUrls);

const payload: CreateProductInput = {
  title: data.title,
  description: data.description,
  price: data.price,
  oldPrice: data.oldPrice,
  discount: data.discount,
  images: imageUrls,
  inStock: data.inStock,
  colors: data.colors?.filter(
    (color) => color.value.trim() !== "",
  ),
  categoryId: data.categoryId,
};

console.log("Final payload:", payload);

await mutateAsync(payload);

  
    toast.success("Product created successfully!");

    onSuccess?.();
  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);
    console.error("URL:", error.config?.url);
    console.error("METHOD:", error.config?.method);
  } else {
    console.error("ERROR:", error);
  }

  toast.error("Could not create product.");
}
};
  // ----------------------------------------
  // Render
  // ----------------------------------------

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-2">
      <section className="space-y-5 border p-4 rounded-4xl">
        
        <div className="space-y-2">
          <Label htmlFor="title">Product Title</Label>

          <Input
            id="title"
            placeholder="e.g. Nike Air Max 270"
            {...register("title")}
          />

          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>


        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>

          <Textarea
            id="description"
            placeholder="Write a description..."
            className="min-h-[100px] resize-none"
            {...register("description")}
          />

          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>
      </section>

    

      <section className="space-y-5 border p-4 rounded-4xl">
        


        <div className="grid gap-4 sm:grid-cols-3">

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price")}
            />

            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* Old Price */}

          <div className="space-y-2">
            <Label htmlFor="oldPrice">Old Price</Label>

            <Input
              id="oldPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("oldPrice")}
            />

            {errors.oldPrice && (
              <p className="text-sm text-destructive">
                {errors.oldPrice.message}
              </p>
            )}
          </div>

          {/* Discount */}

          <div className="space-y-2">
            <Label htmlFor="discount">Discount %</Label>

            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="0"
              {...register("discount")}
            />

            {errors.discount && (
              <p className="text-sm text-destructive">
                {errors.discount.message}
              </p>
            )}
          </div>
        </div>
      </section>


{/* ================================== */}
      {/* images */}
      {/* ================================== */}
      <section className="space-y-4 border p-4 rounded-4xl">
          <h3 className="font-semibold">Add product images.</h3>        <Separator />

      
        <div className="space-y-1">
        {imageFields.map((field, index) => (
  <div key={field.id} className="space-y-2">
    <div className="flex gap-2">
      <Controller
        control={control}
        name={`images.${index}.file`}
        render={({ field }) => (
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];

              field.onChange(file);
            }}
          />
        )}
      />

      {imageFields.length > 1 && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => removeImage(index)}
        >
          <FiTrash2 />
        </Button>
      )}
    </div>

    {errors.images?.[index]?.file && (
      <p className="text-sm text-destructive">
        {errors.images[index]?.file?.message}
      </p>
    )}
  </div>
))}

          {errors.images?.root && (
            <p className="text-sm text-destructive">
              {errors.images.root.message}
            </p>
          )}

          {typeof errors.images?.message === "string" && (
            <p className="text-sm text-destructive">{errors.images.message}</p>
          )}

          <Button
  type="button"
  variant="outline"
  onClick={() =>
   appendImage({
  file: undefined as never,
})
  }
>
  <FiPlus className="mr-2" />
  Add Image
</Button>
        </div>
      </section>

      

      <section className="space-y-3 border p-4 rounded-4xl">
          <h3 className="font-semibold">Select product category.</h3>
                  <Separator />

       <Select
  value={watch("categoryId")}
  onValueChange={(value) =>
    setValue("categoryId", value, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Select category" />
  </SelectTrigger>

  <SelectContent>
    {isCategoriesLoading ? (
      <SelectItem value="loading" disabled>
        Loading categories...
      </SelectItem>
    ) : isCategoriesError ? (
      <SelectItem value="error" disabled>
        Failed to load categories
      </SelectItem>
    ) : categories.length === 0 ? (
      <SelectItem value="empty" disabled>
        No categories found
      </SelectItem>
    ) : (
      categories.map((category) => (
        <SelectItem
          key={category.id}
          value={category.id}
        >
          {category.name}
        </SelectItem>
      ))
    )}
  </SelectContent>
</Select>

{errors.categoryId && (
  <p className="text-sm text-destructive">
    {errors.categoryId.message}
  </p>
)}

          {errors.categoryId && (
            <p className="text-sm text-destructive">
              {errors.categoryId.message}
            </p>
          )}
      </section>

      {/* ================================== */}
      {/* Colors */}
      {/* ================================== */}

      <section className="space-y-5 border p-4 rounded-4xl">
          <h3 className="font-semibold">
                        Add available product colors.
          </h3>

        

        <Separator />

        <div className="space-y-4">
          {colorFields.map((field, index) => (
            <div key={field.id} className="space-y-1">
              <div className="flex gap-3">
                <Input
                  placeholder="Color name"
                  {...register(`colors.${index}.name`)}
                />

                <Input
                  placeholder="#000000"
                  {...register(`colors.${index}.value`)}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeColor(index)}
                >
                  <FiTrash2 />
                </Button>
              </div>

              {errors.colors?.[index]?.name && (
                <p className="text-sm text-destructive">
                  {errors.colors[index]?.name?.message}
                </p>
              )}

              {errors.colors?.[index]?.value && (
                <p className="text-sm text-destructive">
                  {errors.colors[index]?.value?.message}
                </p>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendColor({
                name: "",
                value: "",
              })
            }
          >
            <FiPlus className="mr-2" />
            Add Color
          </Button>
        </div>
      </section>

      {/* ================================== */}
      {/* Inventory */}
      {/* ================================== */}

      <section className="space-y-5 border p-4 rounded-4xl">
        <div>
          <h3 className="font-semibold">            Manage product availability</h3>

        </div>

        <Separator />

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <Label>In Stock</Label>

            <p className="text-sm text-muted-foreground">
              Product is currently available.
            </p>
          </div>

          <Switch
            checked={watch("inStock")}
            onCheckedChange={(value) =>
              setValue("inStock", value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
        </div>
      </section>



      <div className="flex justify-center justify-self-center bg-gray-100/90 mb-2 w-40 py-2 rounded-4xl">
        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
