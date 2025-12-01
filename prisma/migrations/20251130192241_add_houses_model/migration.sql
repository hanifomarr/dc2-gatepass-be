/*
  Warnings:

  - You are about to drop the column `unitNumber` on the `Resident` table. All the data in the column will be lost.
  - Added the required column `houseId` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resident` DROP COLUMN `unitNumber`,
    ADD COLUMN `houseId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `House` (
    `id` VARCHAR(191) NOT NULL,
    `unitNo` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resident` ADD CONSTRAINT `Resident_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
