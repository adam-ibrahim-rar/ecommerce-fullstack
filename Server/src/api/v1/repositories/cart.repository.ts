import prisma from "../../../config/prisma";

export const findByUserId = async (userId: string) => {
  return prisma.cart.findUnique({
    where: {
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

export const create = async (userId: string) => {
  return prisma.cart.create({
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

export const findItem = async (
  userId: string,
  itemId: string
) => {
  return prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: {
        userId,
      },
    },
  });
};

export const findItemByProduct = async (
  userId: string,
  productId: string
) => {
  return prisma.cartItem.findFirst({
    where: {
      productId,
      cart: {
        userId,
      },
    },
  });
};

export const addItem = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  });
};

export const updateItem = async (
  id: string,
  quantity: number
) => {
  return prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity,
    },
  });
};

export const deleteItem = async (id: string) => {
  return prisma.cartItem.delete({
    where: {
      id,
    },
  });
};

export const clear = async (cartId: string) => {
  return prisma.cartItem.deleteMany({
    where: {
      cartId,
    },
  });
};