/*
  Warnings:

  - You are about to alter the column `Student_Phone_Number` on the `students` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `Int`.

*/
-- AlterTable
ALTER TABLE `students` MODIFY `Student_Phone_Number` INTEGER NULL;
