from os import path, listdir, SEEK_SET

import pandas as pd

from .sql_row_generators import format_person, format_meet, format_powerlifter, format_powerlifter_meets, format_person_meet_info, format_lifts, format_scores

row_gen_dict = {
  'Person': format_person,
  'Meet': format_meet,
  'Powerlifter': format_powerlifter,
  'Powerlifter_Meets': format_powerlifter_meets,
  'Person_Meet_Info': format_person_meet_info,
  'Scores': format_scores,
  'Lifts': format_lifts
}

formatted_columns = {
  'Person': 'INSERT INTO Person (first_name, last_name, gender, id, date_of_birth) VALUES',
  'Meet': 'INSERT INTO Meet (federation, date, country, state, name, meet_id) VALUES',
  'Powerlifter': 'INSERT INTO Powerlifter(id) VALUES',
  'Powerlifter_Meets': 'INSERT INTO Powerlifter_Meets (powerlifter_id, meet_id) VALUES',
  'Person_Meet_Info': 'INSERT INTO Person_Meet_Info (powerlifter_id, meet_id, division, weight_class, place) VALUES',
  'Scores': 'INSERT INTO Scores (powerlifter_id, meet_id, wilks, mccullough, glosbrenner, ipfp_points) VALUES',
  'Lifts': 'INSERT INTO Lifts (powerlifter_id, meet_id, squat1kg, squat2kg, squat3kg, best3squatkg, bench1kg, bench2kg, bench3kg, best3benchkg, deadlift1kg, deadlift2kg, deadlift3kg, best3deadliftkg, totalkg) VALUES'
}

def generate_sql():
  generated_csvs_path = path.join(path.dirname(__file__), '..', 'generated_csvs')

  csv_file_names = listdir(generated_csvs_path)

  csv_file_names.remove('data.csv')

  sql_scripts_path = path.join(path.dirname(__file__), '..', 'sql_scripts')

  for csv_file_name in csv_file_names:
    csv_file_path = path.join(generated_csvs_path, csv_file_name)

    df = pd.read_csv(csv_file_path)

    table_name = csv_file_name.split('.', 1)[0]

    sql_file_path = path.join(sql_scripts_path, f'{table_name}.sql')

    file = open(sql_file_path, 'w')

    file.write(formatted_columns[table_name])

    row_function = row_gen_dict[table_name]

    for _, row in df.iterrows():
      file.write(row_function(row))

    file.seek(file.tell() - 1, SEEK_SET)
    
    file.truncate()

    file.close()

if __name__ == "__main__":
  generate_sql()