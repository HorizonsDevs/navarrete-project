/*
  Warnings:

  - You are about to drop the column `imageData` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "imageData",
ADD COLUMN     "imageUrl" TEXT;
