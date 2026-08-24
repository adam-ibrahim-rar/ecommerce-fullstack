import prisma from "../../../config/prisma";
import type { OrderQuery } from "../types/order.type";

// ---------------------------------------------
// Admin: كل الأوردرز مع بيانات العميل والعناصر
// ---------------------------------------------
export const findAllAdmin = async (query: OrderQuery) => {
  return prisma.order.findMany({
    where: {
      ...(query.status && { status: query.status }),
      ...(query.userId && { userId: query.userId }),
      ...(query.search && {
        OR: [
          {
            id: {
              contains: query.search,
              mode: "insensitive",
            },
          },
          {
            user: {
              OR: [
                { username: { contains: query.search, mode: "insensitive" } },
                { email: { contains: query.search, mode: "insensitive" } },
                { firstName: { contains: query.search, mode: "insensitive" } },
                { lastName: { contains: query.search, mode: "insensitive" } },
              ],
            },
          },
        ],
      }),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ---------------------------------------------
// Admin: تفاصيل أوردر واحد (مع اسم/صورة المنتج)
// ---------------------------------------------
export const findByIdAdmin = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              images: true,
            },
          },
        },
      },
    },
  });
};

// ---------------------------------------------
// Admin: إحصائيات سريعة للـ stats cards
// ---------------------------------------------
export const countByStatus = async () => {
  const counts = await prisma.order.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  const total = await prisma.order.count();

  const revenue = await prisma.order.aggregate({
    where: { status: { not: "CANCELLED" } },
    _sum: { totalAmount: true },
  });

  return {
    total,
    revenue: Number(revenue._sum.totalAmount ?? 0),
    byStatus: counts.reduce<Record<string, number>>((acc, item) => {
      acc[item.status] = item._count._all;
      return acc;
    }, {}),
  };
};
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
        user: true,
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
        user: true,
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
