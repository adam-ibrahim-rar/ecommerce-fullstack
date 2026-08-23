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
  return prisma.product.create({
    data,
    include: {
      category: true,
    },
  });
};
export const update = async (
  id: string,
  data: UpdateProductInput
) => {
  return prisma.product.update({
    where: { id },
    data,
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