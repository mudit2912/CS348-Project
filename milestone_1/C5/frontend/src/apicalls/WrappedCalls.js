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
  const resp = await fetch('http://127.0.0.1:5050/api/get/sample', {
    method: 'GET', credentials: 'include'
  });
  const resultjson = await resp.json();
  return resultjson;
};

/*

POST Wrapped Calls
  ____   ___  ____ _____
 |  _ \ / _ \/ ___|_   _|
 | |_) | | | \___ \ | |
 |  __/| |_| |___) || |
 |_|    \___/|____/ |_|

*/

// --------------------
// AUTH
// --------------------

export async function loginUser(username, password) {
  const resp = await fetch('http://127.0.0.1:5050/api/auth/login', {
    method: 'POST', credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  });
  const resultjson = await resp.json();
  return ({status: resp.status, data: resultjson});
}

export async function createUser(name, surname, gender, birth_month, birth_day, birth_year, email, username, password) {
  const resp = await fetch('http://127.0.0.1:5050/api/auth/signup', {
    method: 'POST', credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: name, last_name: surname, gender: gender, date_of_birth: `${birth_year}-${birth_month}-${birth_day}`, email: email, username: username, password: password})
  });
  const resultjson = await resp.json();
  return ({status: resp.status, data: resultjson});
}

// --------------------
// PROFILES
// --------------------

export async function getProfileInfo(username) {
  const resp = await fetch('http://127.0.0.1:5050/api/user/info', {
    method: 'POST', credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username})
  });
  const resultjson = await resp.json();
  return({status: resp.status, data: resultjson});
}