import type { Request, Response } from "express";

import { getHomeDataService } from "../services/home.service";

export const getHome = async (_req: Request, res: Response) => {
  const data = await getHomeDataService();

  return res.status(200).json({
    success: true,
    data,
  });
};
