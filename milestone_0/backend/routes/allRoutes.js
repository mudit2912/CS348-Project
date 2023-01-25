// Dependencies
const express = require('express');
const session = require('express-session');
const router = express.Router();

// DB Imports
const knex = require('knex')(require('../knexfile.js').development);


/*
*   Functions
*/

async function getRowsSample() {
  const query = await knex('Sample')
                  .select('name', 'sex', 'event', 'equipment', 'age', 'bodyweightkg')
                  .catch(err => {
                    return({ok: false, msg: 'Knex error!'});
                  });

  if (!query[0]) return({msg: 'No meets exist!'});

  var returnDict = {names: [], genders: [], events: [], equipments: [], ages: [], bodyweightkgs: []};
  for (var i=0; ; i++) {
    if (!query[i]) break;
    returnDict.names.push(query[i].name);
    returnDict.genders.push(query[i].sex);
    returnDict.events.push(query[i].event);
    returnDict.equipments.push(query[i].equipment);
    returnDict.ages.push(query[i].age);
    returnDict.bodyweightkgs.push(query[i].bodyweightkg);
  }

  return returnDict;
}

async function postRowsSample() {
  return({msg: "TODO"});
}


/*
*   Route Handlers
*/

router.get('/get/sample', async function (req, res, next) {
  try {
    const responseData = await getRowsSample();
    return res.json(responseData);

  } catch (err) {
    return res.json({msg: "Error!"});
  }
});

router.post('/post/sample', async function (req, res, next) {
  try {
    // const postedData = req.(*INSERT KEY NAME HERE*) ... Ex. const a = req.a;
    const responseData = await postRowsSample();
    return res.json(responseData);

  } catch (err) {
    return res.json({msg: "Error!"});
  }
});

router.get('/*', (req, res) => {
  res.sendStatus(502);
})

module.exports = router;
