/*
  Warnings:

  - Added the required column `userAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userAddress" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "userPhone" TEXT NOT NULL;
