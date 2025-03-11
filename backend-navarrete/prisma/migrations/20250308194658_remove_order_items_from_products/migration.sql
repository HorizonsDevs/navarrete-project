/*
  Warnings:

  - You are about to drop the column `seller_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_seller_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "seller_id";
