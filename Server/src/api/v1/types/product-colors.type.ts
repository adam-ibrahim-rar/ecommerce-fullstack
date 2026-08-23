export interface CreateProductVariantInput {
  productId: string;
  color: string;
}

export interface UpdateProductVariantInput {
  color?: string;
}

export interface ProductVariantResponse {
  id: string;
  productId: string;
  color: string;
}