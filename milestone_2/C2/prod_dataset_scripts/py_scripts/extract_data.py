import re

import pandas as pd

from os import path

def camel_to_snake(name):
  name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name).lower()

def extract_data():
  csv_path = path.join(path.dirname(__file__), '..', 'openpowerlifting 2.csv')

  df = pd.read_csv(csv_path, low_memory=False)

  usa_df = df.query("`Country` == 'USA'").head(2500)

  russia_df = df.query("`Country` == 'Russia'").head(1000)

  australia_df = df.query("`Country` == 'Australia'").head(1000)

  canada_df = df.query("`Country` == 'Canada'").head(500)

  merged_df = pd.concat([usa_df, russia_df, australia_df, canada_df])

  merged_df.columns = merged_df.columns.to_series().apply(camel_to_snake)

  generated_csvs_path = path.join(path.dirname(__file__), '..', 'generated_csvs', 'data.csv')

  merged_df.to_csv(generated_csvs_path, index=False)

if __name__ == "__main__":
  extract_data()