export interface CreateCategoryInput {
  name: string;
  icon: string;
}

export interface UpdateCategoryInput {
  name?: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}
export interface CategoryType {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryParams {
  id: string;
}

export interface CategoryQuery {
  name?: string;
}