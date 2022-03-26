/*
  Warnings:

  - Added the required column `bank_name` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "priority" INTEGER NOT NULL;
