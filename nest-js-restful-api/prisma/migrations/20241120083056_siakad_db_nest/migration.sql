/*
  Warnings:

  - Added the required column `pesan` to the `KritikSaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalTerima` to the `PenerimaBeasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programStudi` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusStudent` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gelar` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keahlian` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `evaluasidosen` MODIFY `komentar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `kritiksaran` ADD COLUMN `pesan` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `penerimabeasiswa` ADD COLUMN `tanggalTerima` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `programStudi` VARCHAR(191) NOT NULL,
    ADD COLUMN `statusStudent` ENUM('ACTIVE', 'DO', 'LULUS') NOT NULL;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `gelar` VARCHAR(191) NOT NULL,
    ADD COLUMN `keahlian` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `tanggalLahir` DATETIME(3) NULL,
    ADD COLUMN `telephone` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Alumni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `tanggalLulus` DATETIME(3) NOT NULL,
    `pekerjaan` VARCHAR(191) NULL,
    `perusahaan` VARCHAR(191) NULL,

    UNIQUE INDEX `Alumni_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alumni` ADD CONSTRAINT `Alumni_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
