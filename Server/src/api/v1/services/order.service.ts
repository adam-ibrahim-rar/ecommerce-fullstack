import prisma from "../../../config/prisma";

import {
  countByStatus,
  findAllAdmin,
} from "../repositories/order.repository";

import { orderRepository } from "../repositories/order.repository";

import { AppError } from "../utils/app-error.util";

import type {
  OrderQuery,
  OrderResponse,
  OrderDetailsResponse,
} from "../types/order.type";

import type {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "../../../schemas/order.schema";

// ---------------------------------------------
// User: إنشاء أوردر
// ---------------------------------------------
export const createOrderService = async (
  userId: string,
  data: CreateOrderInput,
) => {
  if (!data.items.length) {
    throw new AppError("Order must contain at least one item", 400);
  }

  return prisma.$transaction(async (tx) => {
    const productIds = data.items.map((item) => item.productId);

    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      throw new AppError("One or more products were not found", 404);
    }

    const orderItems = data.items.map((item) => {
      const product = products.find(
        (product) => product.id === item.productId,
      );

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      const price = Number(product.price);

      return {
        productId: product.id,
        quantity: item.quantity,
        price,
      };
    });

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const order = await tx.order.create({
      data: {
        userId,
        paymentMethod: data.paymentMethod,
        totalAmount,
        items: {
          create: orderItems,
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

    return order;
  });
};

// ---------------------------------------------
// User: أوردرز اليوزر نفسه
// ---------------------------------------------
export const getOrdersService = async (userId: string) => {
  return orderRepository.findAllByUserId(userId);
};

export const getOrderService = async (userId: string, orderId: string) => {
  const order = await orderRepository.findByIdForUser(orderId, userId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export const updateOrderStatusService = async (
  orderId: string,
  data: UpdateOrderStatusInput,
) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status === "CANCELLED") {
    throw new AppError("Cancelled order cannot be updated", 400);
  }

  if (order.status === "DELIVERED") {
    throw new AppError("Delivered order cannot be updated", 400);
  }

  return orderRepository.updateStatus(orderId, data.status);
};

export const cancelOrderService = async (userId: string, orderId: string) => {
  const order = await orderRepository.findByIdForUser(orderId, userId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status !== "PENDING" && order.status !== "CONFIRMED") {
    throw new AppError("Order cannot be cancelled at this stage", 400);
  }

  return orderRepository.updateStatus(orderId, "CANCELLED");
};

// ---------------------------------------------
// Admin: كل الأوردرز
// ---------------------------------------------
export const getAdminOrdersService = async (
  query: OrderQuery,
): Promise<OrderResponse[]> => {
  const orders = await findAllAdmin(query);

  return orders.map((order) => ({
    id: order.id,
    status: order.status,
    paymentMethod: order.paymentMethod,
    totalAmount: Number(order.totalAmount),
    itemsCount: order.items.length,
    createdAt: order.createdAt,

    customer: {
      id: order.user.id,
      username: order.user.username,
      firstName: order.user.firstName,
      lastName: order.user.lastName,
      email: order.user.email,
    },
  }));
};

// ---------------------------------------------
// Admin: تفاصيل أوردر واحد
// ---------------------------------------------
export const getAdminOrderService = async (
  id: string,
): Promise<OrderDetailsResponse> => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return {
    id: order.id,
    status: order.status,
    paymentMethod: order.paymentMethod,
    totalAmount: Number(order.totalAmount),
    itemsCount: order.items.length,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,

    customer: {
      id: order.user.id,
      username: order.user.username,
      firstName: order.user.firstName,
      lastName: order.user.lastName,
      email: order.user.email,
    },

    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productTitle: item.product.title,
      productImage: item.product.images?.[0] ?? "",
      quantity: item.quantity,
      price: Number(item.price),
    })),
  };
};

// ---------------------------------------------
// Admin: إحصائيات
// ---------------------------------------------
export const getOrderStatsService = async () => {
  return countByStatus();
};