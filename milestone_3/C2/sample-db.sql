-- --------------------------------------------------------
--
-- CS348 Project
-- Task C2
-- SQL Code to create and load sample database
-- 
-- --------------------------------------------------------

---
--- Person Table
---

CREATE TABLE Person (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender CHAR(1) NOT NULL,
    date_of_birth DATE NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Person VALUES
(1,'Zack','Mera','M','1995-05-03'),
(2,'Mudit','Gupta','M','1981-11-12'),
(3,'Kabeelan','Sivamanoharan','M','1977-03-01'),
(4,'Harjot','Tathgur','M','1965-09-16'),
(5,'Muhammad','Rabee','M','1947-07-30'),
(6,'Lucy','Smith','F','1961-02-25');

---
--- User Table
---

CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE NOT NULL,
    pfp_url VARCHAR(255),
    bio VARCHAR(255) NOT NULL DEFAULT 'Welcome to my profile!',
    email VARCHAR(100) UNIQUE NOT NULL,
    pw VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Person(id) ON DELETE CASCADE
);

INSERT INTO User VALUES
(1,'zack_gym','https://this-person-does-not-exist.com/img/avatar-1114d6357eb8e8de042b095e89102b04.jpg','Eat, Gym, Sleep.','zackgym@powerlifty.com','zack123'),
(2,'mgupta','https://this-person-does-not-exist.com/img/avatar-1133b6eeb8b4bffd78a8ff788aecf662.jpg',"2x World Champion. DON'T SKIP LEG DAY!",'mgupta@powerlifty.com','donthackme'),
(3,'kabeelanlifts','https://this-person-does-not-exist.com/img/avatar-1154a7b7d1550d5201293099ad8d9d3e.jpg','Aspiring Powerlifter from Canada. Favourite my profile to see my progress!','kabeelanlifts@powerlifty.com','qwerty'),
(4,'harjot_fitness','https://this-person-does-not-exist.com/img/avatar-115f2e9b28a429908c6823bcc5f1bedc.jpg','Buy my supplements @ www.healthysupps.ca','harjotfitness@powerlifty.com','123harjot456'),
(5,'mrabee','https://this-person-does-not-exist.com/img/avatar-115862403481308766e678103892fdc8.jpg','#Natty | 5x Regional Champ | 3x National Champ','mrabee@powerlifty.com','safepassword'),
(6,'admin_lucy',NULL,'Admin Lucy! IPF Judge.','lucysmith@ipf.org','lucysmith123');

---
--- Admin Table
---

CREATE TABLE Admin (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    federation VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Person(id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (email) REFERENCES User(email)
);

INSERT INTO Admin VALUES
(6,'admin_lucy','lucysmith@ipf.org', 'International Powerlifting Federation');

---
--- Powerlifter Table
---

CREATE TABLE Powerlifter (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Person(id) ON DELETE CASCADE
);

INSERT INTO Powerlifter VALUES
(2),(3),(5);

---
--- Favourites Table
---

CREATE TABLE Favourites (
    user_id INT,
    powerlifter_id INT,
    PRIMARY KEY (user_id, powerlifter_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (powerlifter_id) REFERENCES Powerlifter(id) ON DELETE CASCADE
);

INSERT INTO Favourites VALUES
(1,2),(1,3),(1,5),(2,5),(3,2),(4,2),(5,3),(5,2);

---
--- Meet Table
---

CREATE TABLE Meet (
    meet_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    state VARCHAR(50),
    country VARCHAR(50),
    federation VARCHAR(50),
    PRIMARY KEY (meet_id)
);

INSERT INTO Meet VALUES
(1,'Melbourne Cup','2018-10-27','VIC','Australia','GPC-AUS'),
(2,'Nationals','2015-05-19',NULL,'Australia','GPC-AUS'),
(3,'Nationals','2018-06-02','WV','USA','USPF'),
(4,'Mountaineer Cup','2002-06-22','WV','USA','USPF'),
(5,'Winter Wreckage','2016-12-03','WV','USA','USPF'),
(6,'Northwest Powerlifting Championships','2010-02-20','OR','USA','USPF'),
(7,'IL Winter Meet','2018-12-08','IL','USA','USPF');

---
--- Powerlifter_Meets Table
---

CREATE TABLE Powerlifter_Meets (
    powerlifter_id INT NOT NULL,
    meet_id INT NOT NULL,
    PRIMARY KEY (powerlifter_id, meet_id),
    FOREIGN KEY (powerlifter_id) REFERENCES Powerlifter(id) ON DELETE CASCADE,
    FOREIGN KEY (meet_id) REFERENCES Meet(meet_id) ON DELETE CASCADE
);

INSERT INTO Powerlifter_Meets VALUES
(2,1),(2,2),(3,3),(3,4),(3,5),(3,6),(3,7),(5,3),(5,4),(5,5);

---
--- Scores Table
---

CREATE TABLE Scores (
    powerlifter_id INT NOT NULL,
    meet_id INT NOT NULL,
    wilks DECIMAL(5,2),
    mccullough DECIMAL(5,2),
    glosbrenner DECIMAL(5,2),
    ipfp_points DECIMAL(5,2),
    PRIMARY KEY (powerlifter_id, meet_id),
    FOREIGN KEY (powerlifter_id) REFERENCES Powerlifter(id) ON DELETE CASCADE,
    FOREIGN KEY (meet_id) REFERENCES Meet(meet_id) ON DELETE CASCADE
);

INSERT INTO Scores VALUES
(2,1,403.50,419.64,356.92,628.60),
(2,2,322.46,322.46,284.47,528.11),
(3,3,378.96,378.96,333.41,638.21),
(3,4,312.03,312.03,274.63,523.79),
(3,5,307.71,310.78,270.85,516.20),
(3,6,145.06,145.06,126.84,578.50),
(3,7,50.47,56.17,42.89,431.36),
(5,3,304.56,304.56,294.83,431.05),
(5,4,340.60,340.60,329.26,494.05),
(5,5,387.28,387.28,372.36,566.08);

---
--- Person_Meet_Info Table
---

CREATE TABLE Person_Meet_Info (
    powerlifter_id INT NOT NULL,
    meet_id INT NOT NULL,
    division VARCHAR(50),
    weight_class VARCHAR(50),
    place INT,
    PRIMARY KEY (powerlifter_id, meet_id),
    FOREIGN KEY (powerlifter_id) REFERENCES Powerlifter(id) ON DELETE CASCADE,
    FOREIGN KEY (meet_id) REFERENCES Meet(meet_id) ON DELETE CASCADE
);

INSERT INTO Person_Meet_Info VALUES
(2,1,'M1','75',1),
(2,2,'M1','75',1),
(3,3,'Open','82.5',3),
(3,4,'Open','82.5',2),
(3,5,'Open','82.5',5),
(3,6,'Open','100',1),
(3,7,'Open','100',6),
(5,3,'M3','110',4),
(5,4,'M3','110',7),
(5,5,'M3','110',1);

---
--- Lifts Table
---

CREATE TABLE Lifts (
    powerlifter_id INT NOT NULL,
    meet_id INT NOT NULL,
    bench1kg DECIMAL(5,2),
    bench2kg DECIMAL(5,2),
    bench3kg DECIMAL(5,2),
    bench4kg DECIMAL(5,2),
    best3benchkg DECIMAL(5,2),
    squat1kg DECIMAL(5,2),
    squat2kg DECIMAL(5,2),
    squat3kg DECIMAL(5,2),
    squat4kg DECIMAL(5,2),
    best3squatkg DECIMAL(5,2),
    deadlift1kg DECIMAL(5,2),
    deadlift2kg DECIMAL(5,2),
    deadlift3kg DECIMAL(5,2),
    deadlift4kg DECIMAL(5,2),
    best3deadliftkg DECIMAL(5,2),
    totalkg DECIMAL(5,2),
    PRIMARY KEY (powerlifter_id, meet_id),
    FOREIGN KEY (powerlifter_id) REFERENCES Powerlifter(id) ON DELETE CASCADE,
    FOREIGN KEY (meet_id) REFERENCES Meet(meet_id) ON DELETE CASCADE
);

INSERT INTO Lifts VALUES
(2,1,-67.5,67.5,72.5,NULL,72.5,137.5,145,152.5,NULL,152.5,150,160,172.5,182.5,182.5,397.5),
(2,2,147.42,156.49,163.29,168.74,163.29,81.65,86.18,88.45,90.72,88.45,167.83,176.9,181.44,184.16,181.44,433.18),
(3,3,115,135,137.5,140,137.5,82.5,87.5,92.5,95,92.5,177.5,187.5,192.5,195,192.5,422.5),
(3,4,-185,185,200,207.5,200,102.5,117.5,127.5,137.5,127.5,205,227.5,242.5,NULL,242.5,570),
(3,5,-115,115,125,137.5,125,80,-92.5,92.5,102.5,92.5,115,125,137.5,142.5,137.5,355),
(3,6,140,155,165,167.5,165,87.5,95,100,102.5,100,185,195,200,205,200,465),
(3,7,115,117.5,120,130,120,80,85,87.5,92.5,87.5,105,110,115,122.5,115,322.5),
(5,3,150,155,160,165,160,132.5,140,145,150,145,150,160,165,170,165,470),
(5,4,-125,125,140,145,140,92.5,-107.5,107.5,115,107.5,137.5,162.5,172.5,182.5,172.5,420),
(5,5,85,102.5,115,130,115,75,80,83,85,83,130,145.5,150.5,165,150.5,348.5);


