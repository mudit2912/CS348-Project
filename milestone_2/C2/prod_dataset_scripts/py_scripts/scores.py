import pandas as pd

from os import path

def scores():
  data_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'data.csv')

  csv_df = pd.read_csv(data_csv_path, low_memory=False)

  persons_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Person.csv')

  persons_df = pd.read_csv(persons_csv_path, low_memory=False)

  meets_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Meet.csv')

  meets_df = pd.read_csv(meets_csv_path, low_memory=False)

  join_csv_persons = pd.merge(csv_df, persons_df, on=["name", "sex"], how="inner").rename(columns={"id": "person_id"})

  join_csv_persons_meets = pd.merge(join_csv_persons, meets_df, on=["meet_name", "meet_state", "meet_country", "date", "federation"])

  person_meet_scores = join_csv_persons_meets[["person_id", "meet_id", "wilks", "mc_culloch", "glossbrenner", "ipf_points"]]

  person_meet_scores.rename(columns={"person_id": "powerlifter_id"}, inplace=True)

  person_meet_scores.drop_duplicates(inplace=True)
  
  scores_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Scores.csv')

  person_meet_scores.to_csv(scores_csv_path, index=False)

if __name__ == "__main__":
  scores()