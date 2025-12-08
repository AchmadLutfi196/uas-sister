-- DropForeignKey
ALTER TABLE `absences` DROP FOREIGN KEY `absences_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `absences` DROP FOREIGN KEY `absences_studentId_fkey`;

-- AlterTable
ALTER TABLE `absences` MODIFY `studentId` INTEGER NULL,
    MODIFY `materi` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
