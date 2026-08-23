import prisma from "../../../config/prisma";

import type {
  CreateBannerInput,
  UpdateBannerInput,
  BannerQuery,
} from "../types/banner.type";

export const findAll = async (query: BannerQuery) => {
  return prisma.banner.findMany({
    where: {
      isActive: true,
      ...(query.type && { type: query.type }),
    },
    orderBy: {
      order: "asc",
    },
  });
};

export const findById = async (id: string) => {
  return prisma.banner.findUnique({
    where: { id },
  });
};

export const create = async (data: CreateBannerInput) => {
  return prisma.banner.create({ data });
};

export const update = async (id: string, data: UpdateBannerInput) => {
  return prisma.banner.update({
    where: { id },
    data,
  });
};

export const remove = async (id: string) => {
  return prisma.banner.delete({
    where: { id },
  });
};