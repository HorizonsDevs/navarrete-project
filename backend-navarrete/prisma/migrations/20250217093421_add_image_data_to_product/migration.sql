/*
  Warnings:

  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock_quantity` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "created_at",
DROP COLUMN "image_url",
DROP COLUMN "stock_quantity",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageData" BYTEA,
ADD COLUMN     "stockQuantity" INTEGER NOT NULL DEFAULT 0;
