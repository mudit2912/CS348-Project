def format_person(row):
  first_name = row['first_name']

  last_name = row['last_name']
  
  sex = row['sex']
  
  id = row['id']

  formatted_first_name = first_name.replace("'", "''")

  if type(last_name) == float:
    formatted_last_name = 'x'
  else:
    formatted_last_name = last_name.replace("'", "''")

  return f'\n(\'{formatted_first_name}\', \'{formatted_last_name}\', \'{sex}\', {id}, \'2002-1-2\'),'

def format_meet(row):
  federation = row['federation']
  
  date = row['date']
  
  country = row['meet_country']
  
  state = row['meet_state']
  
  name = row['meet_name']
  
  id = row['meet_id']

  formatted_name = name.replace("'", "''")

  formatted_row = f'\n(\'{federation}\', \'{date}\', \'{country}\', \'{state}\', \'{formatted_name}\', {id}),'

  return formatted_row.replace('\'nan\'', 'NULL')

def format_powerlifter(row):
  powerlifter_id = row['powerlifter_id']

  return f'\n({powerlifter_id}),'

def format_powerlifter_meets(row):
  powerlifter_id = row['powerlifter_id']
  
  meet_id = row['meet_id']

  return f'\n({powerlifter_id}, {meet_id}),'

def format_lifts(row):
  person_id = row['person_id']
  
  meet_id = row['meet_id']
  
  squat1_kg = row['squat1_kg']

  squat2_kg = row['squat2_kg']
  
  sqaut3_kg = row['squat3_kg']

  best3_squat_kg = row['best3_bench_kg']
  
  bench1_kg = row['bench1_kg']
  
  bench2_kg = row['bench2_kg']

  bench3_kg = row['bench3_kg']

  best3_bench_kg = row['best3_bench_kg']

  deadlift1_kg = row['deadlift1_kg']
  
  deadlift2_kg = row['deadlift2_kg']
  
  deadlift3_kg = row['deadlift3_kg']

  best3_deadlift_kg = row['best3_bench_kg']
  
  total_kg = row['total_kg']

  formatted_lifts = f'\n({person_id}, {meet_id}, {squat1_kg}, {squat2_kg}, {sqaut3_kg}, {best3_squat_kg}, {bench1_kg}, {bench2_kg}, {bench3_kg}, {best3_bench_kg}, {deadlift1_kg}, {deadlift2_kg}, {deadlift3_kg}, {best3_deadlift_kg}, {total_kg}),'

  return formatted_lifts.replace('nan', 'NULL')

def format_scores(row):
  powerlifter_id = row['powerlifter_id']
  
  meet_id = row['meet_id']

  wilks = row['wilks']
  
  mcculloch = row['mc_culloch']
  
  glossbrenner = row['glossbrenner']

  ipfpoints = row['ipf_points']

  formatted_scores = f'\n({int(powerlifter_id)}, {int(meet_id)}, {wilks}, {mcculloch}, {glossbrenner}, {ipfpoints}),'

  return formatted_scores.replace('nan', 'NULL')

def format_person_meet_info(row):
  powerlifter_id = row['powerlifter_id']
  
  meet_id = row['meet_id']

  division = row['division']
  
  weight_class = row['weight_class_kg']
  
  place = row['place']

  formatted_person_meet_info = f'\n({powerlifter_id}, {meet_id}, \'{division}\', \'{weight_class}\', \'{place}\'),'

  return formatted_person_meet_info.replace('\'nan\'', 'NULL')