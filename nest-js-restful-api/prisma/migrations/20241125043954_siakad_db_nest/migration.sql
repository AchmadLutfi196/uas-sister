/*
  Warnings:

  - You are about to drop the column `courseId` on the `enrollments` table. All the data in the column will be lost.
  - Added the required column `programStudi` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_courseId_fkey`;

-- AlterTable
ALTER TABLE `courses` ADD COLUMN `programStudi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `enrollments` DROP COLUMN `courseId`,
    ADD COLUMN `scheduleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
