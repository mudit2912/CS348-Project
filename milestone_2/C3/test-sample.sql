--
-- Feature #1
-- Global Leaderboard
--

CREATE FUNCTION global_leaderboard(n INT)
RETURNS TABLE (
    id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    totalkg DECIMAL(5,2)
)
BEGIN
    RETURN
    SELECT id, first_name, last_name, totalkg
    FROM Person, Lifts
    WHERE Person.id = Lifts.powerlifter_id
    ORDER BY totalkg DESC
    LIMIT n;
END;

SELECT * FROM global_leaderboard(5);


--
-- Feature #1
-- National Leaderboard
--

CREATE FUNCTION national_leaderboard(filter_country varchar(50), n INT)
RETURNS TABLE (
    id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    totalkg DECIMAL(5,2)
)
BEGIN
    RETURN
    SELECT id, first_name, last_name, totalkg
    FROM Person, Lifts
    WHERE Person.id = Lifts.powerlifter_id
    AND meet_id IN (SELECT meet_id FROM Meet WHERE country = filter_country)
    ORDER BY totalkg DESC
    LIMIT n;
END;

SELECT * FROM national_leaderboard(‘USA’, 5);


--
-- Feature #2
--

CREATE FUNCTION compare_lifters(user_a_id INT, user_b_id INT)
RETURNS TABLE (
    id INT,
	meet_name VARCHAR(150),
	meet_date DATE,
	meet_state VARCHAR(50),
	meet_country VARCHAR(50),
	best3benchkg DECIMAL(5,2),
	best3squatkg DECIMAL(5,2)
	best3deadliftkg DECIMAL(5,2),
	totalkg DECIMAL(5,2),
	wilks DECIMAL(5,2),
	mccullough DECIMAL(5,2),
	glossbrenner DECIMAL(5,2),
	ipfp_points DECIMAL(5,2)
)
BEGIN
    RETURN
    SELECT m.powerlifter_id as id, m.name as meet_name, m.date as meet_date, m.state as meet_state, m.country as meet_country, best3benchkg, best3squatkg, best3deadliftkg, totalkg, wilks, mccullough, glossbrenner, ipfp_points
    FROM scores as s
    INNER JOIN Meet as m
    ON s.meet_id = m.meet_id AND s.powerlifter_id = user_a_id
    INNER JOIN Lifts as l
    ON s.meet_id = l.meet_id AND s.powerlifter_id = user_a_id
    UNION
    SELECT m.powerlifter_id as id, m.name as meet_name, m.date as meet_date, m.state as meet_state, m.country as meet_country, best3benchkg, best3squatkg, best3deadliftkg, totalkg, wilks, mccullough, glossbrenner, ipfp_points
    FROM scores as s
    INNER JOIN Meet as m
    ON s.meet_id = m.meet_id AND s.powerlifter_id = user_b_id
    INNER JOIN Lifts as l
    ON s.meet_id = l.meet_id AND s.powerlifter_id = user_b_id;
END;

SELECT * FROM compare_head_to_head(3,5);


--
-- Feature #3
--
CREATE FUNCTION get_user_favourited(search_user_id INT)
RETURNS TABLE (
    powerlifter_id INT
)
BEGIN
    RETURN SELECT powerlifter_id from Favourites WHERE user_id = search_user_id;
END;

SELECT * FROM get_user_favourited(1);

--
-- Feature #4
--
CREATE PROCEDURE insert_person_user(
    IN new_name VARCHAR(50) NOT NULL,
    IN new_surname VARCHAR(50) NOT NULL,
    IN new_gender CHAR(1) NOT NULL,
    IN new_dob DATE NOT NULL,
    IN new_username VARCHAR(30) NOT NULL,
    IN new_pfp_url VARCHAR(255),
    IN new_bio VARCHAR(255) DEFAULT “Welcome to my profile!”,
    IN new_email VARCHAR(100) NOT NULL,
    IN new_pw VARCHAR(255) NOT NULL
)
BEGIN
    DECLARE person_id INT;
    
    INSERT INTO Person (first_name, last_name, gender, date_of_birth)
    VALUES (new_name, new_surname, new_gender, new_dob);
    
    SELECT MAX(id) INTO person_id FROM Person;
    
    INSERT INTO User (id, username, pfp_url, bio, email, pw)
    VALUES (person_id, new_username, new_pfp_url, new_bio, new_email, new_pw);
END;

CALL insert_person_user('Ed','Coan','M','1963-07-24','ed_coan',NULL,'71x World Record Holder.','edcoan@powerlifty.com');
