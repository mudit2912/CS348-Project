import pandas as pd

from os import path

def lifts():
  data_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'data.csv')

  csv_df = pd.read_csv(data_csv_path, low_memory=False)

  persons_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Person.csv')

  persons_df = pd.read_csv(persons_csv_path, low_memory=False)

  meets_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Meet.csv')

  meets_df = pd.read_csv(meets_csv_path, low_memory=False)

  join_csv_persons = pd.merge(csv_df, persons_df, on=["name", "sex"], how="inner").rename(columns={"id": "person_id"})

  join_on = ["meet_name", "meet_state", "meet_country", "date", "federation"]

  join_csv_persons_meets = pd.merge(join_csv_persons, meets_df, on=join_on)

  fields = ["person_id", "meet_id", "squat1_kg", "squat2_kg", "squat3_kg", 
            "best3_squat_kg", "bench1_kg", "bench2_kg", "bench3_kg", "best3_bench_kg",
            "deadlift1_kg", "deadlift2_kg", "deadlift3_kg", "best3_bench_kg", "total_kg"]

  person_meet_info = join_csv_persons_meets[fields]

  person_meet_info.drop_duplicates(inplace=True)

  lifts_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Lifts.csv')

  person_meet_info.to_csv(lifts_csv_path, index=False)

if __name__ == "__main__":
  lifts()