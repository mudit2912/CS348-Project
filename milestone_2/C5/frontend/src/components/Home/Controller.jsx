// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { getRowsSample } from "../../apicalls/WrappedCalls.js";

// Functional Component for DB Rows
function DBRows(props) {
  const data = props.data;

  // Function to render rows from DB Data
  function renderRows() {
    var r = [];

    const count = data.names.length;
    for (var i=0; i<count; i++) {
      r.push(
        <h3>
          {`Name: ${data.names[i]}
            || Age: ${data.ages[i]}
            || Gender: ${data.genders[i]}
            || Weight: ${data.bodyweightkgs[i]}kg
            || Event (Equipment): ${data.events[i]} (${data.equipments[i]})`}
        </h3>
      );
    }

    return r;
  }

  // Layout
  return(
    <div>
      { renderRows() }
    </div>
  );
}

// Functional Component for Home Page
function Home(props) {
  // States
  const [sampleData, setSampleData] = useState(null);
  const [sampleDataLoaded, setSampleDataLoaded] = useState(false);

  // Effects
  useEffect(() => {
    async function loadData() {
      const response = await getRowsSample();
      setSampleData(response);
      setSampleDataLoaded(true);
    }
    loadData();
  }, []);

  // Layout
  return(
    <div>
      <h1>Hello world!</h1>
      <h2>Just a demo to show we can load the DB, have the backend query the DB, and return it to the frontend.</h2>
      { (sampleDataLoaded) && <DBRows {...{data: sampleData}} />}
    </div>
  );
}

export default Home;
