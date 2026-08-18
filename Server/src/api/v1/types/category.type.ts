export interface CreateCategoryInput {
  name: string;
  icon: string;
}

export interface UpdateCategoryInput {
  name: string;
  icon: string;
}

export interface CategoryResponse {
  name: string;
  icon: string | null;
}
