/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `students` DROP PRIMARY KEY,
    MODIFY `Student_ID` VARCHAR(191) NOT NULL,
    MODIFY `Student_Social_Security_Number` VARCHAR(191) NULL,
    MODIFY `Student_Phone_Number` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`Student_ID`);
