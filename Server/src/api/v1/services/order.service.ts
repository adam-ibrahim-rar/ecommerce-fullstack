import prisma from "../../../config/prisma";

import { AppError } from "../utils/app-error.util";

import { orderRepository } from "../repositories/order.repository";

import type {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "../../../schemas/order.schema";

export const createOrderService = async (
  userId: string,
  data: CreateOrderInput,
) => {
  if (!data.items.length) {
    throw new AppError("Order must contain at least one item", 400);
  }

  return prisma.$transaction(async (tx) => {
    /*
     * 1. Get products from database
     */

    const productIds = data.items.map((item) => item.productId);

    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    /*
     * 2. Check that all products exist
     */

    if (products.length !== productIds.length) {
      throw new AppError("One or more products were not found", 404);
    }

    /*
     * 3. Calculate prices
     */

    const orderItems = data.items.map((item) => {
      const product = products.find((product) => product.id === item.productId);

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

    /*
     * 4. Calculate total
     */

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    /*
     * 5. Create order
     */

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

  /*
   * Don't allow updating cancelled orders
   */

  if (order.status === "CANCELLED") {
    throw new AppError("Cancelled order cannot be updated", 400);
  }

  /*
   * Don't allow updating delivered orders
   */

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
