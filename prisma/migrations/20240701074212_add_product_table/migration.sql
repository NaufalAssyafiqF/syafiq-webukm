-- CreateTable
CREATE TABLE `products` (
    `id_product` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `name_product` VARCHAR(191) NOT NULL,
    `price_product` DOUBLE NOT NULL,
    `description_product` VARCHAR(191) NULL,
    `condition` VARCHAR(191) NULL,
    `brend` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `Users_email_key` ON `Users`(`email`);
DROP INDEX `email` ON `users`;
