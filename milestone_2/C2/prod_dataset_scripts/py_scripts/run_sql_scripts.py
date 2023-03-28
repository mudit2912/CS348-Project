from mysql import connector

from os import path

config = {
  'user': 'root',
  'password': '_Gravel384',
  'host': '127.0.0.1',
  'database': 'new_schema',
}

connection = connector.connect(**config)

cursor = connection.cursor()

sql_scripts_path = path.join(path.dirname(__file__), '..', 'sql_scripts')

file = open(path.join(sql_scripts_path, 'Person.sql'), 'r')

sql_script = file.read()

cursor.execute(sql_script)

connection.commit()

file = open(path.join(sql_scripts_path, 'Meet.sql'), 'r')

sql_script = file.read()

cursor.execute(sql_script)

file = open(path.join(sql_scripts_path, 'Powerlifter.sql'), 'r')

sql_script = file.read()

cursor.execute(sql_script)

file = open(path.join(sql_scripts_path, 'Powerlifter_Meets.sql'), 'r')

sql_script = file.read()

cursor.execute(sql_script)

file = open(path.join(sql_scripts_path, 'Powerlifter_Meets.sql'), 'r')

sql_script = file.read()

cursor.execute(sql_script)

connection.commit()

connection.close()
