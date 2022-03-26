/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "card_no" TEXT NOT NULL,
    "exp_date" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "coupon_code" TEXT NOT NULL,
    "coupon_offer" TEXT NOT NULL,
    "coupon_description" TEXT NOT NULL,
    "coupon_image" TEXT NOT NULL,
    "coupon_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "coupon_code" TEXT NOT NULL,
    "coupon_offer" TEXT NOT NULL,
    "coupon_description" TEXT NOT NULL,
    "coupon_image" TEXT NOT NULL,
    "coupon_end" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
