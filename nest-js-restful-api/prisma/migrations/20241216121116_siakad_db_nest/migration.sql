/*
  Warnings:

  - You are about to drop the column `jenisPembayaran` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `payments` table. All the data in the column will be lost.
  - Added the required column `semester` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` DROP COLUMN `jenisPembayaran`,
    DROP COLUMN `tanggal`,
    ADD COLUMN `semester` ENUM('semester_1', 'semester_2', 'semester_3', 'semester_4', 'semester_5', 'semester_6', 'semester_7', 'semester_8') NOT NULL;
