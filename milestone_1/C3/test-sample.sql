--
-- Feature #1
--


--
-- Feature #2
--


--
-- Feature #3
--
SELECT powerlifter_id FROM Favourites WHERE user_id = 1;

--
-- Feature #4
--
INSERT INTO Person (first_name, last_name, gender, date_of_birth) VALUES ('Ed', 'Coan', 'M', '1963-07-24');
INSERT INTO User VALUES (LAST_INSERT_ID(), 'ed_coan', NULL, '71x World Record Holder.', 'edcoan@powerlifty.com');