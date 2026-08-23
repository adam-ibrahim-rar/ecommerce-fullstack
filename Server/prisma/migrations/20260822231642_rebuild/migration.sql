-- CreateEnum
CREATE TYPE "FeaturedSlot" AS ENUM ('large', 'wide', 'smallLeft', 'smallRight');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "featuredSlot" "FeaturedSlot",
ADD COLUMN     "flashSaleEndsAt" TIMESTAMP(3),
ADD COLUMN     "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFlashSale" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Product_isFlashSale_idx" ON "Product"("isFlashSale");

-- CreateIndex
CREATE INDEX "Product_isBestSeller_idx" ON "Product"("isBestSeller");

-- CreateIndex
CREATE INDEX "Product_featuredSlot_idx" ON "Product"("featuredSlot");
