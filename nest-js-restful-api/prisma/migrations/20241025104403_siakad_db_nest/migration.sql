/*
  Warnings:

  - You are about to drop the `grade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `grade` DROP FOREIGN KEY `Grade_enrollmentId_fkey`;

-- AlterTable
ALTER TABLE `enrollments` ADD COLUMN `grade` ENUM('A', 'B', 'C', 'D', 'E') NULL;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `academicAdvisorId` INTEGER NULL,
    ADD COLUMN `gpa` DOUBLE NULL;

-- DropTable
DROP TABLE `grade`;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_academicAdvisorId_fkey` FOREIGN KEY (`academicAdvisorId`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
