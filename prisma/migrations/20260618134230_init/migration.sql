/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Store` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_categoryId_fkey";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "categoryId",
ADD COLUMN     "categories" INTEGER[];
