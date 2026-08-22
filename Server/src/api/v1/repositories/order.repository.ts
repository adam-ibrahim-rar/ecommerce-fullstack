import prisma from "../../../config/prisma";

export const orderRepository = {
  create: async (
    userId: string,
    totalAmount: number,
    paymentMethod: any,
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[],
  ) => {
    return prisma.order.create({
      data: {
        userId,
        totalAmount,
        paymentMethod,

        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  findAllByUserId: async (userId: string) => {
    return prisma.order.findMany({
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

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById: async (id: string) => {
    return prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },

        user: true,
      },
    });
  },

  findByIdForUser: async (id: string, userId: string) => {
    return prisma.order.findFirst({
      where: {
        id,
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
  },

  updateStatus: async (id: string, status: any) => {
    return prisma.order.update({
      where: {
        id,
      },

      data: {
        status,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },
};
