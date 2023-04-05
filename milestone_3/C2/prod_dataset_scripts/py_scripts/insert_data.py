from os import path, listdir

import mysql.connector

def insert_data():
  con = mysql.connector.connect(user='root', password='!admin!cs348', host='mysqldb', database='powerlifting_db')

  cur = con.cursor()

  tables_sql_path = path.join(path.dirname(__file__), '..' , 'db-setup.sql')

  tables_sql = open(tables_sql_path, 'r').read().split('\n-- line break\n')

  for table_sql in tables_sql:
    cur.execute(table_sql)

  sql_scripts_path = path.join(path.dirname(__file__), '..', 'sql_scripts')

  sql_scripts_names = listdir(sql_scripts_path)

  sql_scripts_names.remove('Person.sql')

  sql_scripts_names.remove('Meet.sql')

  sql_scripts_names.remove('Powerlifter.sql')

  cur.execute(open(path.join(sql_scripts_path, 'Person.sql'), 'r').read())

  cur.execute(open(path.join(sql_scripts_path, 'Meet.sql'), 'r').read())

  cur.execute(open(path.join(sql_scripts_path, 'Powerlifter.sql'), 'r').read())

  for sql_script_name in sql_scripts_names:
    cur.execute(open(path.join(sql_scripts_path, sql_script_name), 'r').read())

  con.commit()

  cur.close()

  con.close()

if __name__ == "__main__":
  insert_data()