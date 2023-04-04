import pandas as pd

from os import path

def person_meet_info():
  data_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'data.csv')

  data_df = pd.read_csv(data_csv_path, low_memory=False)

  persons_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Person.csv')

  persons_df = pd.read_csv(persons_csv_path, low_memory=False)

  meets_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Meet.csv')

  meets_df = pd.read_csv(meets_csv_path, low_memory=False)

  join_data_persons = pd.merge(data_df, persons_df, on=["name", "sex"], how="inner").rename(columns={"id": "person_id"})

  join_csv_persons_meets = pd.merge(join_data_persons, meets_df, on=["meet_name", "meet_state", "meet_country", "date", "federation"])

  person_meet_info = join_csv_persons_meets[["person_id", "meet_id", "division", "weight_class_kg", "place"]]

  person_meet_info.rename(columns={"person_id": "powerlifter_id"}, inplace=True)

  person_meet_info.drop_duplicates(inplace=True)

  data_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Person_Meet_Info.csv')

  person_meet_info.to_csv(data_csv_path, index=False)

if __name__ == "__main__":
  person_meet_info()