/*
  Warnings:

  - You are about to drop the `votes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `votes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `votes_ibfk_2`;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `role` VARCHAR(50) NOT NULL,
    MODIFY `Student_ID` INTEGER NOT NULL AUTO_INCREMENT;

-- DropTable
DROP TABLE `votes`;
