import type { Request, Response } from "express";

import type {
  CreateCategoryInput,
  UpdateCategoryInput,
  CategoryParams,
} from "../../../schemas/category.schema";
import {
  createCategoryService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service";

export const createCategory = async (
  req: Request<{}, {}, CreateCategoryInput>,
  res: Response,
) => {
  const category = await createCategoryService(req.body);

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await getCategoriesService();

  return res.status(200).json({
    success: true,
    data: categories,
  });
};

export const getCategory = async (
  req: Request<CategoryParams>,
  res: Response,
) => {
  const category = await getCategoryService(req.params.id);

  return res.status(200).json({
    success: true,
    data: category,
  });
};

export const updateCategory = async (
  req: Request<CategoryParams, {}, UpdateCategoryInput>,
  res: Response,
) => {
  const category = await updateCategoryService(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
};

export const deleteCategory = async (
  req: Request<CategoryParams>,
  res: Response,
) => {
  await deleteCategoryService(req.params.id);

  return res.status(204).send();
};
