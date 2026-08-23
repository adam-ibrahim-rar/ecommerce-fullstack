-- AlterTable: password becomes optional (Google-only accounts have no password)
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable: add googleId
ALTER TABLE "User" ADD COLUMN "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
