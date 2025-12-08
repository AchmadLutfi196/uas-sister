/*
  Warnings:

  - You are about to drop the column `userId` on the `feedbacks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `feedbacks_userId_fkey`;

-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `userId`;
