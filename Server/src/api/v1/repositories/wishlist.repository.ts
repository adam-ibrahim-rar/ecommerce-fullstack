import prisma from "../../../config/prisma";

export const findByUserId = async (userId: string) => {
  return prisma.wishlist.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const create = async (userId: string) => {
  return prisma.wishlist.create({
    data: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const findItem = async (userId: string, itemId: string) => {
  return prisma.wishlistItem.findFirst({
    where: {
      id: itemId,
      wishlist: {
        userId,
      },
    },
  });
};

export const findItemByProduct = async (
  userId: string,
  productId: string
) => {
  return prisma.wishlistItem.findFirst({
    where: {
      productId,
      wishlist: {
        userId,
      },
    },
  });
};

export const addItem = async (
  wishlistId: string,
  productId: string
) => {
  return prisma.wishlistItem.create({
    data: {
      wishlistId,
      productId,
    },
  });
};

export const deleteItem = async (id: string) => {
  return prisma.wishlistItem.delete({
    where: {
      id,
    },
  });
};

export const clear = async (wishlistId: string) => {
  return prisma.wishlistItem.deleteMany({
    where: {
      wishlistId,
    },
  });
};
