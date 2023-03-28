from py_scripts.extract_data import extract_data
from py_scripts.persons import persons
from py_scripts.meets import meets
from py_scripts.powerlifter import powerlifter
from py_scripts.powerlifter_meets import powerlifter_meets
from py_scripts.person_meet_info import person_meet_info
from py_scripts.scores import scores
from py_scripts.lifts import lifts
from py_scripts.generate_sql import generate_sql

extract_data()
persons()
meets()
powerlifter()
powerlifter_meets()
person_meet_info()
scores()
lifts()
generate_sql()