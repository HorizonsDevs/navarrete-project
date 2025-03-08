-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripe_charge_id" TEXT,
ADD COLUMN     "stripe_invoice_id" TEXT,
ADD COLUMN     "stripe_refund_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_subscription_id" TEXT;

-- CreateTable
CREATE TABLE "StripeCheckoutSession" (
    "id" TEXT NOT NULL,
    "stripe_session_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeCheckoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeInvoice" (
    "id" TEXT NOT NULL,
    "stripe_invoice_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCharge" (
    "id" TEXT NOT NULL,
    "stripe_charge_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'succeeded',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeCharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeSubscription" (
    "id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeRefund" (
    "id" TEXT NOT NULL,
    "stripe_refund_id" TEXT NOT NULL,
    "charge_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeRefund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeCheckoutSession_stripe_session_id_key" ON "StripeCheckoutSession"("stripe_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeInvoice_stripe_invoice_id_key" ON "StripeInvoice"("stripe_invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCharge_stripe_charge_id_key" ON "StripeCharge"("stripe_charge_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSubscription_stripe_subscription_id_key" ON "StripeSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeRefund_stripe_refund_id_key" ON "StripeRefund"("stripe_refund_id");

-- AddForeignKey
ALTER TABLE "StripeCheckoutSession" ADD CONSTRAINT "StripeCheckoutSession_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeInvoice" ADD CONSTRAINT "StripeInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCharge" ADD CONSTRAINT "StripeCharge_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscription" ADD CONSTRAINT "StripeSubscription_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeRefund" ADD CONSTRAINT "StripeRefund_charge_id_fkey" FOREIGN KEY ("charge_id") REFERENCES "StripeCharge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
