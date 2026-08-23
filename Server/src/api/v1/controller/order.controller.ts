import type {
  Request,
  Response,
} from "express";

import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../../../schemas/order.schema";

import {
  createOrderService,
  getOrdersService,
  getOrderService,
  updateOrderStatusService,
  cancelOrderService,
} from "../services/order.service";
import { AppError } from "../utils/app-error.util";

import type { OrderQuery } from "../types/order.type";

import {
  getAdminOrdersService,
  getAdminOrderService,
  getOrderStatsService,
} from "../services/order.service";

export const getAdminOrders = async (
  req: Request<{}, {}, {}, OrderQuery>,
  res: Response
) => {
  const orders = await getAdminOrdersService(req.query);

  res.status(200).json({
    success: true,
    data: orders,
  });
};

export const getAdminOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("Invalid order ID", 400);
  }

  const order = await getAdminOrderService(id);

  res.status(200).json({
    success: true,
    data: order,
  });
};

export const getOrderStats = async (_req: Request, res: Response) => {
  const stats = await getOrderStatsService();

  res.status(200).json({
    success: true,
    data: stats,
  });
};
export const createOrder = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user.id;

  const data =
    createOrderSchema.parse(req.body);

  const order =
    await createOrderService(
      userId,
      data,
    );

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
};

export const getOrders = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user.id;

  const orders =
    await getOrdersService(userId);

  res.status(200).json({
    success: true,
    data: orders,
  });
};

export const getOrder = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user.id;

  
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("Invalid order ID",400);
  }
  
  const order =
    await getOrderService(
      userId,
      id,
    );

  res.status(200).json({
    success: true,
    data: order,
  });
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
) => {
  
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("Invalid order ID",400);
  }

  const data =
    updateOrderStatusSchema.parse(
      req.body,
    );

  const order =
    await updateOrderStatusService(
      id,
      data,
    );

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};

export const cancelOrder = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user.id;

  
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("Invalid order ID",400);
  }

  const order =
    await cancelOrderService(
      userId,
      id,
    );

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
};