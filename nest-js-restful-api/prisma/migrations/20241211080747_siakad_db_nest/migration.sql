/*
  Warnings:

  - You are about to drop the column `teacherId` on the `courses` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_teacherId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `teacherId`;

-- AlterTable
ALTER TABLE `enrollments` ADD COLUMN `isValidated` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `validatedAt` DATETIME(3) NULL,
    ADD COLUMN `validatedById` INTEGER NULL;

-- AlterTable
ALTER TABLE `schedules` ADD COLUMN `teacherId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_validatedById_fkey` FOREIGN KEY (`validatedById`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
