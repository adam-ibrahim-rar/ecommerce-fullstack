import prisma from "../../../config/prisma";

import type {
  CreateProductInput,
  ProductQuery,
  UpdateProductInput,
} from "../types/product.type";

export const findAll = async (query: ProductQuery) => {
  return prisma.product.findMany({
    where: {
      ...(query.title && {
        title: {
          contains: query.title,
          mode: "insensitive",
        },
      }),
      ...(query.categoryId && {
        categoryId: query.categoryId,
      }),
      ...(query.isFlashSale !== undefined && {
        isFlashSale: query.isFlashSale,
      }),
      ...(query.isBestSeller !== undefined && {
        isBestSeller: query.isBestSeller,
      }),
      ...(query.featuredSlot && {
        featuredSlot: query.featuredSlot,
      }),
    },
    include: {
      category: true,
    },
  });
};

export const findById = async (id: string) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

export const findByTitle = async (title: string) => {
  return prisma.product.findFirst({
    where: {
      title,
    },
    include: {
      category: true,
    },
  });
};

export const findByCategoryId = async (categoryId: string) => {
  return prisma.product.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
  });
};

export const create = async (data: CreateProductInput) => {

  console.log(data);
  
  return prisma.product.create({
    data: {
      title: data.title,
      price: data.price,
      images: data.images,
      categoryId: data.categoryId,

      description: data.description ?? null,
      oldPrice: data.oldPrice ?? null,
      discount: data.discount ?? null,
      ...(data.colors !== undefined && { colors: data.colors }),
      ...(data.sizes !== undefined && { sizes: data.sizes }),
      flashSaleEndsAt: data.flashSaleEndsAt ?? null,
      featuredSlot: data.featuredSlot ?? null,

      ...(data.rating !== undefined && { rating: data.rating }),
      ...(data.reviews !== undefined && { reviews: data.reviews }),
      ...(data.inStock !== undefined && { inStock: data.inStock }),
      ...(data.isFlashSale !== undefined && {
        isFlashSale: data.isFlashSale,
      }),
      ...(data.isBestSeller !== undefined && {
        isBestSeller: data.isBestSeller,
      }),
    },
    include: {
      category: true,
    },
  });
};

export const update = async (id: string, data: UpdateProductInput) => {
  return prisma.product.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.images !== undefined && { images: data.images }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId }),

      ...(data.description !== undefined && {
        description: data.description ?? null,
      }),
      ...(data.oldPrice !== undefined && { oldPrice: data.oldPrice ?? null }),
      ...(data.discount !== undefined && { discount: data.discount ?? null }),
      ...(data.colors !== undefined && {
        colors: data.colors ?? null,
      }),
      ...(data.sizes !== undefined && {
        sizes: data.sizes,
      }),
      ...(data.flashSaleEndsAt !== undefined && {
        flashSaleEndsAt: data.flashSaleEndsAt ?? null,
      }),
      ...(data.featuredSlot !== undefined && {
        featuredSlot: data.featuredSlot ?? null,
      }),

      ...(data.rating !== undefined && { rating: data.rating }),
      ...(data.reviews !== undefined && { reviews: data.reviews }),
      ...(data.inStock !== undefined && { inStock: data.inStock }),
      ...(data.isFlashSale !== undefined && {
        isFlashSale: data.isFlashSale,
      }),
      ...(data.isBestSeller !== undefined && {
        isBestSeller: data.isBestSeller,
      }),
    },
    include: {
      category: true,
    },
  });
};

export const remove = async (id: string) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};
