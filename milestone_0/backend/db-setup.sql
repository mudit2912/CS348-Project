--
-- CS348 Project
-- MySQL Database Dump
--

-- --------------------------------------------------------

--
-- Table structure for table `Sample`
--

CREATE TABLE IF NOT EXISTS `Sample` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 NOT NULL,
  `sex` varchar(1) CHARACTER SET utf8mb3 DEFAULT NULL,
  `event` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `equipment` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `bodyweightkg` float(5,1) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=10001 ;


--
-- Dumping data for table `Sample`
--

INSERT INTO `Sample` (`uid`, `name`, `sex`, `event`, `equipment`, `age`, `bodyweightkg`) VALUES
(1,'Abbie Murphy','F','SBD','Wraps',29,59.8),
(2,'Abbie Tuong','F','SBD','Wraps',29,58.5),
(3,'Ainslee Hooper','F','B','Raw',40,55.4);
