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
// POST AUTH PROJECT
// --------------------

export async function postRowsSample(a, b, c, d, e) {
  const resp = await fetch('http://127.0.0.1:5050/api/post/sample', {
    method: 'POST', credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: a, b: b, c: c, d: d, e: e})
  });
  const resultjson = await resp.json();
  return resultjson;
}
