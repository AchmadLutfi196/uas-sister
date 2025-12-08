/*
  Warnings:

  - You are about to drop the column `type` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `email` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `type`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
