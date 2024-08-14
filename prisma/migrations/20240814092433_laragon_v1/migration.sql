/*
  Warnings:

  - You are about to drop the column `brend` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `brend`,
    ADD COLUMN `category` VARCHAR(100) NULL;
