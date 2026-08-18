import prisma from "../../../config/prisma";

import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category.type";

export const create = async (data: CreateCategoryInput) => {
  return prisma.category.create({
    data,
  });
};

export const findAll = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const findById = async (id: string) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const findByName = async (name: string) => {
  return prisma.category.findUnique({
    where: {
      name,
    },
  });
};

export const update = async (
  id: string,
  data: UpdateCategoryInput
) => {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const remove = async (id: string) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};