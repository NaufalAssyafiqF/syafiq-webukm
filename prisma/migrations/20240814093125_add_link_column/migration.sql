/*
  Warnings:

  - You are about to alter the column `user_img` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `description_product` TEXT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deskripsi` TEXT NULL,
    ADD COLUMN `fb_link` VARCHAR(250) NULL,
    ADD COLUMN `ig_link` VARCHAR(250) NULL,
    ADD COLUMN `kota` VARCHAR(100) NULL,
    ADD COLUMN `phone_number` TEXT NULL,
    ADD COLUMN `wa_link` VARCHAR(250) NULL,
    MODIFY `user_img` VARCHAR(150) NULL,
    MODIFY `alamat` VARCHAR(250) NULL;
