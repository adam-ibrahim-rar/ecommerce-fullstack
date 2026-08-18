export interface CreateCategoryInput {
  name: string;
  icon?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  icon?: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  icon: string | null;
}