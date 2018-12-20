DROP DATABASE QA;

CREATE DATABASE QA;

USE QA;

CREATE TABLE Users (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username varchar(255),
    SignUpDate varchar(255),
    ThumbnailURL text,
    ProfileURL text,
    HelpfulVotes int,
    CitiesVisited int
);

CREATE TABLE ReviewDistributions (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID int NOT NULL,
    Excellent int,
    VeryGood int,
    Poor int, 
    Terrible int,
    Average int,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Questions (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    HoltelID int NOT NULL,
    UserID int NOT NULL,
    Content text, 
    QuestionDate varchar(255),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Answers (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    QuestionID int NOT NULL,
    UserID int NOT NULL,
    Content text, 
    Votes int,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (QuestionID) REFERENCES Questions(ID)
);
