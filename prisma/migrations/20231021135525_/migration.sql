/*
  Warnings:

  - You are about to drop the column `password` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `password`,
    DROP COLUMN `role`,
    DROP COLUMN `username`,
    ADD COLUMN `Student_Password` VARCHAR(255) NULL,
    ADD COLUMN `Student_Role` VARCHAR(191) NOT NULL DEFAULT 'student',
    ADD COLUMN `Student_Username` VARCHAR(255) NULL;
