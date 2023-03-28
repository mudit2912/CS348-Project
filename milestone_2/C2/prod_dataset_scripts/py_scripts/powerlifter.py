import pandas as pd

from os import path

def powerlifter():
  persons_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Person.csv')
  
  powerlifters_df = pd.read_csv(persons_csv_path, low_memory=False, usecols=['id'])

  powerlifters_df.rename(columns={"id": "powerlifter_id"}, inplace=True)

  powerlifter_csv_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'Powerlifter.csv')

  powerlifters_df.to_csv(powerlifter_csv_path, index=False)

if __name__ == "__main__":
  powerlifter()