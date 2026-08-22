import axios from "axios";

import type {
  CategoryType,
  CreateCategoryInput,
} from "../types/category.types";

interface CategoriesResponse {
  success: boolean;
  data: CategoryType[];
}

interface CategoryResponse {
  success: boolean;
  data: CategoryType;
}

export const categoriesApi = {
  getAll: async (): Promise<CategoryType[]> => {
    const { data } =
      await axios.get<CategoriesResponse>(
        "/api/categories"
      );

    return data.data;
  },

  create: async (
    body: CreateCategoryInput
  ): Promise<CategoryType> => {
    const { data } =
      await axios.post<CategoryResponse>(
        "/api/categories",
        body
      );

    return data.data;
  },
};