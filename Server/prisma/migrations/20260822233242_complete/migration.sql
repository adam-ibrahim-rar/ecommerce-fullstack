-- CreateEnum
CREATE TYPE "BannerType" AS ENUM ('hero', 'promo');

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "type" "BannerType" NOT NULL,
    "title" TEXT NOT NULL,
    "heading" TEXT,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "buttonText" TEXT,
    "link" TEXT NOT NULL,
    "endsAt" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Banner_type_idx" ON "Banner"("type");
