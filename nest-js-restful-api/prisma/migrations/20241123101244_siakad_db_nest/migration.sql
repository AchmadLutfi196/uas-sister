/*
  Warnings:

  - You are about to drop the `absensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alumni` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `beasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `berita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluasidosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kritiksaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pembayaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penerimabeasiswa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `absensi` DROP FOREIGN KEY `Absensi_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `absensi` DROP FOREIGN KEY `Absensi_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `alumni` DROP FOREIGN KEY `Alumni_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `evaluasidosen` DROP FOREIGN KEY `EvaluasiDosen_enrollmentId_fkey`;

-- DropForeignKey
ALTER TABLE `kritiksaran` DROP FOREIGN KEY `KritikSaran_userId_fkey`;

-- DropForeignKey
ALTER TABLE `pembayaran` DROP FOREIGN KEY `Pembayaran_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `penerimabeasiswa` DROP FOREIGN KEY `PenerimaBeasiswa_beasiswaId_fkey`;

-- DropForeignKey
ALTER TABLE `penerimabeasiswa` DROP FOREIGN KEY `PenerimaBeasiswa_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_courseId_fkey`;

-- DropTable
DROP TABLE `absensi`;

-- DropTable
DROP TABLE `alumni`;

-- DropTable
DROP TABLE `beasiswa`;

-- DropTable
DROP TABLE `berita`;

-- DropTable
DROP TABLE `evaluasidosen`;

-- DropTable
DROP TABLE `kritiksaran`;

-- DropTable
DROP TABLE `pembayaran`;

-- DropTable
DROP TABLE `penerimabeasiswa`;

-- CreateTable
CREATE TABLE `absences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `scheduleId` INTEGER NOT NULL,
    `statusKehadiran` ENUM('HADIR', 'ALPA', 'SAKIT', 'IZIN') NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `pertemuan` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scholarships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `mulai` DATETIME(3) NOT NULL,
    `akhir` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scholarship_recipients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `beasiswaId` INTEGER NOT NULL,
    `tanggalTerima` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `konten` VARCHAR(191) NOT NULL,
    `gambar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedbacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `type` ENUM('KRITIK', 'SARAN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollmentId` INTEGER NOT NULL,
    `nilai` ENUM('S', 'A', 'B', 'C', 'D') NOT NULL,
    `komentar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `evaluations_enrollmentId_key`(`enrollmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `jenisPembayaran` ENUM('BANK', 'EWALLET') NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `bukti` VARCHAR(191) NOT NULL,
    `statusPembayaran` ENUM('FAILED', 'PENDING', 'SUCCESS') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `graduates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `tanggalLulus` DATETIME(3) NOT NULL,
    `pekerjaan` VARCHAR(191) NULL,
    `perusahaan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `graduates_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scholarship_recipients` ADD CONSTRAINT `scholarship_recipients_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scholarship_recipients` ADD CONSTRAINT `scholarship_recipients_beasiswaId_fkey` FOREIGN KEY (`beasiswaId`) REFERENCES `scholarships`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `enrollments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `graduates` ADD CONSTRAINT `graduates_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
