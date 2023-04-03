// ===================
//
// WRAPPED API CALLS
//
// ===================

/*

GET Wrapped Calls
   ____ _____ _____
  / ___| ____|_   _|
 | |  _|  _|   | |
 | |_| | |___  | |
  \____|_____| |_|

*/
export async function getRowsSample() {
  const resp = await fetch('http://localhost:5050/api/get/sample', {
    method: 'GET',
    credentials: 'include',
  });
  const resultjson = await resp.json();
  return resultjson;
}

/*

POST Wrapped Calls
  ____   ___  ____ _____
 |  _ \ / _ \/ ___|_   _|
 | |_) | | | \___ \ | |
 |  __/| |_| |___) || |
 |_|    \___/|____/ |_|

*/

// --------------------
//        AUTH
// --------------------

export async function getAuthStatus() {
  //console.log("GETTING AUTH STATUS");

  const resp = await fetch('http://localhost:5050/api/auth/status', {
    method: 'GET',
    credentials: 'include',
  });
  const resultjson = await resp.json();
  return resultjson['auth'];
}

export async function loginUser(username, password) {
  const resp = await fetch('http://localhost:5050/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}

export async function createUser(
  name,
  surname,
  gender,
  birth_month,
  birth_day,
  birth_year,
  email,
  username,
  password
) {
  const resp = await fetch('http://localhost:5050/api/auth/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: name,
      last_name: surname,
      gender: gender,
      date_of_birth: `${birth_year}-${birth_month}-${birth_day}`,
      email: email,
      username: username,
      password: password,
    }),
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}

// --------------------
//      HOME FEED
// --------------------

export async function getHomeFeed(username) {
  const resp = await fetch('http://localhost:5050/api/home/getfeed', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}

// --------------------
//      PROFILES
// --------------------

export async function getProfileInfo(username) {
  const resp = await fetch('http://localhost:5050/api/user/info', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username }),
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}

// --------------------
//    HEAD TO HEAD
// --------------------

export async function getHeadToHeadComparison(a, b) {
  const resp = await fetch('http://localhost:5050/api/h2h/compare', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ liftera: a, lifterb: b }),
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}

// --------------------
//     LEADERBOARD
// --------------------

export async function getGlobalLeaderboard(limit) {
  const resp = await fetch('http://localhost:5050/api/toplifts/global', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ limit: limit }),
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}

export async function getNationalLeaderboard(limit, country) {
  const resp = await fetch('http://localhost:5050/api/toplifts/national', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ limit: limit, country: country }),
  });
  const resultjson = await resp.json();
  return({status: resp.status, data: resultjson});
}

// --------------------
//        ADMIN
// --------------------
export async function createLift(powerlifter_id, meet_id, bench1kg, bench2kg, bench3kg, best3benchkg,
   squat1kg, squat2kg, squat3kg, best3squatkg, deadlift1kg, deadlift2kg, deadlift3kg, best3deadliftkg, totalkg, mccullough, wilks, glossbrenner, ipfpPoints) {
  const resp = await fetch('http://localhost:5050/api/admin/lifts/new', {
    method: 'POST', credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({powerlifter_id: powerlifter_id, meet_id: meet_id, bench1kg: bench1kg, bench2kg: bench2kg, bench3kg: best3benchkg, best3benchkg: best3benchkg,
                          squat1kg: squat1kg, squat2kg: squat2kg, squat3kg:squat3kg, best3squatkg:best3squatkg, deadlift1kg:deadlift1kg, deadlift2kg:deadlift2kg,
                        deadlift3kg:deadlift3kg, best3deadliftkg:best3deadliftkg, totalkg: totalkg, mccullough: mccullough, wilks: wilks, glossbrenner:glossbrenner, ipfpPoints: ipfpPoints})
  });
  const resultjson = await resp.json();
  return ({status: resp.status, data: resultjson});
}

export async function getUsers(username) {
  const resp = await fetch('http://localhost:5050/api/users', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  const resultjson = await resp.json();
  return { status: resp.status, data: resultjson };
}
