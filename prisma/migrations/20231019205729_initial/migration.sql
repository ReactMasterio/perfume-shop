-- CreateTable
CREATE TABLE `admins` (
    `Admin_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Admin_UserName` VARCHAR(255) NULL,
    `Admin_Password` VARCHAR(255) NULL,

    UNIQUE INDEX `Admin_ID`(`Admin_ID`),
    UNIQUE INDEX `Admin_UserName`(`Admin_UserName`),
    PRIMARY KEY (`Admin_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `Course_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Course_Name` VARCHAR(255) NULL,
    `Course_Description` TEXT NULL,
    `Course_Image_Url` VARCHAR(255) NULL,
    `Course_Price` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`Course_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `Student_ID` INTEGER NOT NULL,
    `Student_Name` VARCHAR(150) NULL,
    `Student_Social_Security_Number` INTEGER NULL,
    `Student_Phone_Number` VARCHAR(15) NULL,
    `Student_Email` VARCHAR(255) NULL,

    PRIMARY KEY (`Student_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `vote_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NULL,
    `course_id` INTEGER NULL,
    `vote_value` BIT(1) NULL,

    INDEX `course_id`(`course_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`vote_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`Student_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses`(`Course_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
