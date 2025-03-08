/*
  Warnings:

  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BulkOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeCharge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeCheckoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeInvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeRefund` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeSubscription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seller_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_user_id_fkey";

-- DropForeignKey
ALTER TABLE "BulkOrder" DROP CONSTRAINT "BulkOrder_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "StripeCharge" DROP CONSTRAINT "StripeCharge_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "StripeCheckoutSession" DROP CONSTRAINT "StripeCheckoutSession_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "StripeInvoice" DROP CONSTRAINT "StripeInvoice_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "StripeRefund" DROP CONSTRAINT "StripeRefund_charge_id_fkey";

-- DropForeignKey
ALTER TABLE "StripeSubscription" DROP CONSTRAINT "StripeSubscription_customer_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "stockQuantity",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "seller_id" TEXT NOT NULL,
ADD COLUMN     "stock_quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "BulkOrder";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "StripeCharge";

-- DropTable
DROP TABLE "StripeCheckoutSession";

-- DropTable
DROP TABLE "StripeInvoice";

-- DropTable
DROP TABLE "StripeRefund";

-- DropTable
DROP TABLE "StripeSubscription";

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bulk_order" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT,
    "details" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bulk_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripe_payment_intent_id" TEXT,
    "stripe_charge_id" TEXT,
    "stripe_invoice_id" TEXT,
    "stripe_refund_id" TEXT,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_checkout_session" (
    "id" TEXT NOT NULL,
    "stripe_session_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_checkout_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_invoice" (
    "id" TEXT NOT NULL,
    "stripe_invoice_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "amount_due" DOUBLE PRECISION NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_charge" (
    "id" TEXT NOT NULL,
    "stripe_charge_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'succeeded',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_charge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_subscription" (
    "id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "current_period_start" TIMESTAMP(3) NOT NULL,
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_refund" (
    "id" TEXT NOT NULL,
    "stripe_refund_id" TEXT NOT NULL,
    "charge_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_connected_account" (
    "id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "stripe_account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_connected_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stripe_checkout_session_stripe_session_id_key" ON "stripe_checkout_session"("stripe_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_invoice_stripe_invoice_id_key" ON "stripe_invoice"("stripe_invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_charge_stripe_charge_id_key" ON "stripe_charge"("stripe_charge_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_subscription_stripe_subscription_id_key" ON "stripe_subscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_refund_stripe_refund_id_key" ON "stripe_refund"("stripe_refund_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_connected_account_seller_id_key" ON "stripe_connected_account"("seller_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_connected_account_stripe_account_id_key" ON "stripe_connected_account"("stripe_account_id");

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_order" ADD CONSTRAINT "bulk_order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_checkout_session" ADD CONSTRAINT "stripe_checkout_session_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_invoice" ADD CONSTRAINT "stripe_invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_charge" ADD CONSTRAINT "stripe_charge_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_subscription" ADD CONSTRAINT "stripe_subscription_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_refund" ADD CONSTRAINT "stripe_refund_charge_id_fkey" FOREIGN KEY ("charge_id") REFERENCES "stripe_charge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_connected_account" ADD CONSTRAINT "stripe_connected_account_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
