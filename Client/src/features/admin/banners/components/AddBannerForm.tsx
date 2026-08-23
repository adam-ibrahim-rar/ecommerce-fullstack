import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import {
  createBannerSchema,
  type CreateBannerFormInput,
  type CreateBannerFormValues,
} from "../schema/banner.schema";
import { useCreateBannerMutation } from "../api/bannersQueries";
import { uploadToCloudinary } from "../../products/api/uploadToCloudinary";
import type { CreateBannerInput } from "../types/banner.types";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddBannerFormProps {
  onSuccess?: () => void;
}

export default function AddBannerForm({ onSuccess }: AddBannerFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateBannerFormInput, unknown, CreateBannerFormValues>({
    resolver: zodResolver(createBannerSchema),
    defaultValues: {
      type: "hero",
      title: "",
      heading: "",
      description: "",
      buttonText: "",
      link: "",
      endsAt: "",
      order: 0,
      isActive: true,
    },
  });

  const { mutateAsync, isPending } = useCreateBannerMutation();

  const onSubmit = async (data: CreateBannerFormValues) => {
    try {
      const uploaded = await uploadToCloudinary(data.image);

      const payload: CreateBannerInput = {
        type: data.type,
        title: data.title,
        heading: data.heading || undefined,
        description: data.description || undefined,
        image: uploaded.secure_url,
        buttonText: data.buttonText || undefined,
        link: data.link,
        endsAt: data.endsAt || undefined,
        order: data.order,
        isActive: data.isActive,
      };

      await mutateAsync(payload);
      toast.success("Banner created successfully!");
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
      } else {
        console.error("ERROR:", error);
      }
      toast.error("Could not create banner.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-2">
      <section className="space-y-5 border p-4 rounded-4xl">
        <div className="space-y-2">
          <Label>Banner Type</Label>
          <Select
            value={watch("type")}
            onValueChange={(value) =>
              setValue("type", value as never, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero (top slider)</SelectItem>
              <SelectItem value="promo">Promo (music/promo banner)</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="heading">Heading</Label>
          <Input id="heading" {...register("heading")} />
          {errors.heading && (
            <p className="text-sm text-destructive">{errors.heading.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
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

      <section className="space-y-4 border p-4 rounded-4xl">
        <h3 className="font-semibold">Banner image</h3>
        <Separator />

        <Controller
          control={control}
          name="image"
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
        {errors.image && (
          <p className="text-sm text-destructive">
            {errors.image.message as string}
          </p>
        )}
      </section>

      <section className="space-y-5 border p-4 rounded-4xl">
        <h3 className="font-semibold">Link & button</h3>
        <Separator />

        <div className="space-y-2">
          <Label htmlFor="link">Link (URL when clicked)</Label>
          <Input id="link" placeholder="/shop" {...register("link")} />
          {errors.link && (
            <p className="text-sm text-destructive">{errors.link.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input id="buttonText" placeholder="Shop Now" {...register("buttonText")} />
        </div>
      </section>

      <section className="space-y-5 border p-4 rounded-4xl">
        <h3 className="font-semibold">Scheduling & order</h3>
        <Separator />

        <div className="space-y-2">
          <Label htmlFor="endsAt">Ends At (optional countdown)</Label>
          <Input id="endsAt" type="datetime-local" {...register("endsAt")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Order (lower shows first)</Label>
          <Input id="order" type="number" min="0" {...register("order")} />
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <Label>Active</Label>
            <p className="text-sm text-muted-foreground">
              Only active banners show on the home page.
            </p>
          </div>
          <Switch
            checked={watch("isActive")}
            onCheckedChange={(value) =>
              setValue("isActive", value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
        </div>
      </section>

      <div className="flex justify-center justify-self-center bg-gray-100/90 mb-2 w-40 py-2 rounded-4xl">
        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending ? "Creating..." : "Create Banner"}
        </Button>
      </div>
    </form>
  );
}