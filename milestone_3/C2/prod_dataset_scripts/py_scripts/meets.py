import pandas as pd

from os import path

def meets():
  data_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'data.csv')

  columns = ['meet_name', 'meet_state', 'meet_country', 'federation', 'date']

  meets_df = pd.read_csv(data_csv_path, low_memory=False, usecols=columns)

  unique_meets_df = meets_df.drop_duplicates()

  unique_meets_df["meet_id"] = unique_meets_df.index + 1;

  meets_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Meet.csv')

  unique_meets_df.to_csv(meets_csv_path, index=False)

if __name__ == "__main__":
  meets()