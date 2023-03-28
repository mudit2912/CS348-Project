import pandas as pd

from os import path

def get_first_name(name):
  return name.split(' ', 1)[0]

def get_last_name(name):
  last_name_list = name.split(' ', 1)

  if len(last_name_list) == 1:
    return ''
  else:
    return last_name_list[1]

def persons():
  data_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'data.csv')

  persons_df = pd.read_csv(data_csv_path, low_memory=False, usecols=['name', 'sex'])

  unique_persons_df = persons_df.drop_duplicates()

  unique_persons_df["id"] = unique_persons_df.index + 1

  unique_persons_df['first_name'] = unique_persons_df['name'].apply(get_first_name)

  unique_persons_df['last_name'] = unique_persons_df['name'].apply(get_last_name)

  persons_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Person.csv')

  unique_persons_df.to_csv(persons_csv_path, index=False)

if __name__ == "__main__":
  persons()