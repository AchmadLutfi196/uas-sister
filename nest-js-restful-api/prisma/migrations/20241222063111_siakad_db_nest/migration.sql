-- AlterTable
ALTER TABLE `announcements` MODIFY `konten` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `graduates` ADD COLUMN `motivasi` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `libraries` MODIFY `overview` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `konten` TEXT NOT NULL;
