/*
  Warnings:

  - You are about to drop the column `bukti` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the `scholarship_recipients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `link` to the `scholarships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scholarship_recipients` DROP FOREIGN KEY `scholarship_recipients_beasiswaId_fkey`;

-- DropForeignKey
ALTER TABLE `scholarship_recipients` DROP FOREIGN KEY `scholarship_recipients_studentId_fkey`;

-- AlterTable
ALTER TABLE `payments` DROP COLUMN `bukti`;

-- AlterTable
ALTER TABLE `scholarships` ADD COLUMN `link` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `scholarship_recipients`;
