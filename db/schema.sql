-- the next line should be deleted for production
DROP DATABASE QA;

CREATE DATABASE QA;

USE QA;

CREATE TABLE Users (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255),
    SignUpDate DATE,
    ThumbnailURL TEXT,
    ProfileURL TEXT,
    HelpfulVotes INT,
    CitiesVisited INT,
    Contributions INT,
    Photos INT,
    Ranking INT,
    HomeCity VARCHAR(255),
    Category VARCHAR(255)
);

CREATE TABLE ReviewDistributions (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    Excellent INT,
    VeryGood INT,
    Poor INT, 
    Terrible INT,
    Average INT,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Questions (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    HotelID INT NOT NULL,
    UserID INT NOT NULL,
    Content TEXT, 
    PostedDate DATE,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Answers (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    QuestionID INT NOT NULL,
    UserID INT NOT NULL,
    Content TEXT, 
    Votes INT,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (QuestionID) REFERENCES Questions(ID)
);
