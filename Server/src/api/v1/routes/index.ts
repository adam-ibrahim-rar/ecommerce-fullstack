import { Router } from "express";

import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import cartRoutes from "./cart.routes";
import orderRoutes from "./order.routes";
import bannerRouter from "./banner.router";

const router = Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/banners", bannerRouter);
export default router;