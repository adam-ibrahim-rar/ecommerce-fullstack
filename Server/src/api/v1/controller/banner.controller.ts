import type { Request, Response } from "express";

import type {
  CreateBannerInput,
  UpdateBannerInput,
  BannerQuery,
  BannerParams,
} from "../types/banner.type";

import {
  getBannersService,
  createBannerService,
  updateBannerService,
  deleteBannerService,
} from "../services/banner.service";

export const getBanners = async (
  req: Request<{}, {}, {}, BannerQuery>,
  res: Response
) => {
  const banners = await getBannersService(req.query);

  return res.status(200).json({
    success: true,
    data: banners,
  });
};

export const createBanner = async (
  req: Request<{}, {}, CreateBannerInput>,
  res: Response
) => {
  const banner = await createBannerService(req.body);

  return res.status(201).json({
    success: true,
    message: "Banner created successfully",
    data: banner,
  });
};

export const updateBanner = async (
  req: Request<BannerParams, {}, UpdateBannerInput>,
  res: Response
) => {
  const banner = await updateBannerService(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Banner updated successfully",
    data: banner,
  });
};

export const deleteBanner = async (
  req: Request<BannerParams>,
  res: Response
) => {
  await deleteBannerService(req.params.id);

  return res.status(204).send();
};