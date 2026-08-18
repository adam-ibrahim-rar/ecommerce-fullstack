
import * as productRepository from "../repositories/product.repository";

import type {
  CreateProductInput,
  ProductDetailsResponse,
  ProductQuery,
  ProductResponse,
  UpdateProductInput,
} from "../types/product.type";

import { AppError } from "../utils/app-error.util";

export const createProductService = async (
  data: CreateProductInput
) => {
  const existingProduct = await productRepository.findByTitle(
    data.title
  );

  if (existingProduct) {
    throw new AppError("Product already exists", 409);
  }

  return productRepository.create(data);
};

export const getProductsService = async (
  query: ProductQuery
): Promise<ProductResponse[]> => {
  const products = await productRepository.findAll(query);

  return products.map((product) => ({
    id: product.id,
    image: product.images[0]!,
    title: product.title,
    price: Number(product.price),
    ...(product.oldPrice !== null && {
      oldPrice: Number(product.oldPrice),
    }),
    ...(product.discount !== null && {
      discount: product.discount,
    }),
    rating: product.rating,
    reviews: product.reviews,
    colors: (product.colors as string[]) ?? [],
  }));
};

export const getProductService = async (
  id: string
): Promise<ProductDetailsResponse> => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return {
    id: product.id,
    title: product.title,
    price: Number(product.price),

    ...(product.oldPrice !== null && {
      oldPrice: Number(product.oldPrice),
    }),

    ...(product.discount !== null && {
      discount: product.discount,
    }),

    rating: product.rating,
    reviews: product.reviews,
    images: product.images,

    colors:
      (product.colors as {
        name?: string;
        value: string;
      }[]) ?? [],

    ...(product.description !== null && {
      description: product.description,
    }),

    inStock: product.inStock,
  };
};


export const updateProductService = async (
  id: string,
  data: UpdateProductInput
) => {
  const existingProduct = await productRepository.findById(id);

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  if (data.title && data.title !== existingProduct.title) {
    const existingTitle = await productRepository.findByTitle(
      data.title
    );

    if (existingTitle) {
      throw new AppError("Product already exists", 409);
    }
  }

  return productRepository.update(id, data);
};

export const deleteProductService = async (id: string) => {
  const existingProduct = await productRepository.findById(id);

  if (!existingProduct) {
    throw new AppError("Product not found", 404);
  }

  await productRepository.remove(id);
};

