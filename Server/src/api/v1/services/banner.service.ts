import * as bannerRepository from "../repositories/banner.repository";

import type {
  CreateBannerInput,
  UpdateBannerInput,
  BannerQuery,
  BannerResponse,
} from "../types/banner.type";

import { AppError } from "../utils/app-error.util";

export const getBannersService = async (
  query: BannerQuery
): Promise<BannerResponse[]> => {
  const banners = await bannerRepository.findAll(query);

  return banners.map((banner) => ({
    id: banner.id,
    type: banner.type,
    title: banner.title,

    ...(banner.heading !== null && { heading: banner.heading }),
    ...(banner.description !== null && { description: banner.description }),
    ...(banner.buttonText !== null && { buttonText: banner.buttonText }),
    ...(banner.endsAt !== null && { endsAt: banner.endsAt.toISOString() }),

    image: banner.image,
    link: banner.link,
    order: banner.order,
  }));
};

export const createBannerService = async (data: CreateBannerInput) => {
  return bannerRepository.create(data);
};

export const updateBannerService = async (
  id: string,
  data: UpdateBannerInput
) => {
  const existingBanner = await bannerRepository.findById(id);

  if (!existingBanner) {
    throw new AppError("Banner not found", 404);
  }

  return bannerRepository.update(id, data);
};

export const deleteBannerService = async (id: string) => {
  const existingBanner = await bannerRepository.findById(id);

  if (!existingBanner) {
    throw new AppError("Banner not found", 404);
  }

  await bannerRepository.remove(id);
};