/*
  Warnings:

  - Added the required column `materi` to the `absences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `absences` ADD COLUMN `materi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `schedules` ADD COLUMN `kouta` INTEGER NOT NULL DEFAULT 30;
