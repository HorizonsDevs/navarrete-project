-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripe_payment_intent_id" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "stripe_price_id" TEXT,
ADD COLUMN     "stripe_product_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_customer_id" TEXT;
