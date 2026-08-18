import type { Request, Response } from "express";

import type {
  CreateProductInput,
  ProductParams,
  ProductQuery,
  UpdateProductInput,
} from "../types/product.type";

import {
  createProductService,
  getProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
} from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, CreateProductInput>,
  res: Response
) => {
  const product = await createProductService(req.body);

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const getProducts = async (
  req: Request<{}, {}, {}, ProductQuery>,
  res: Response
) => {
  const products = await getProductsService(req.query);

  return res.status(200).json({
    success: true,
    data: products,
  });
};

export const getProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  const product = await getProductService(req.params.id);

  return res.status(200).json({
    success: true,
    data: product,
  });
};

export const updateProduct = async (
  req: Request<ProductParams, {}, UpdateProductInput>,
  res: Response
) => {
  const product = await updateProductService(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const deleteProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  await deleteProductService(req.params.id);

  return res.status(204).send();
};