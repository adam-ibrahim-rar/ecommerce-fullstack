import * as categoryRepository from "../repositories/category.repository";

import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../../schemas/category.schema";

import { AppError } from "../utils/app-error.util";

export const createCategoryService = async (data: CreateCategoryInput) => {
  const existingCategory = await categoryRepository.findByName(data.name);

  if (existingCategory) {
    throw new AppError("Category already exists", 409);
  }

  return categoryRepository.create(data);
};

export const getCategoriesService = async () => {
  return categoryRepository.findAll();
};

export const getCategoryService = async (id: string) => {
  const category = await categoryRepository.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export const updateCategoryService = async (
  id: string,
  data: UpdateCategoryInput,
) => {
  const category = await categoryRepository.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (data.name && data.name !== category.name) {
    const existingCategory = await categoryRepository.findByName(data.name);

    if (existingCategory) {
      throw new AppError("Category already exists", 409);
    }
  }

  return categoryRepository.update(id, data);
};

export const deleteCategoryService = async (id: string) => {
  const category = await categoryRepository.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.remove(id);
};
