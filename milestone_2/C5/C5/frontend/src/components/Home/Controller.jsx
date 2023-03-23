// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { getRowsSample } from "../../apicalls/WrappedCalls.js";

// Functional Component for Home Feed
function HomeFeed(props) {
  const data = props.data;

  // Function to render feed timeline
  function buildTimeline() {
    var r = [];

    const count = data.names.length;
    for (var i=0; i<count; i++) {
      r.push(
        <div className="home feed post">
          <div className="top">
            <img src={data.pfps[i]} />
            <a href={'/u/'+data.usernames[i]} target="_blank">
              {data.names[i]}
            </a>
          </div>
          <div className="bottom">
            <h2>{data.dates}</h2>
            <div className="lifts">
              <div>
                <h3>Bench (kg)</h3>
                <h1>{data.bench[i]}</h1>
              </div>
              <div>
                <h3>Squat (kg)</h3>
                <h1>{data.squat[i]}</h1>
              </div>
              <div>
                <h3>Deadlift (kg)</h3>
                <h1>{data.deadlift[i]}</h1>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return r;
  }

  // Layout
  return(
    <div className="home feed">
      { buildTimeline() }
    </div>
  );
}

// Functional Component for Home Page
function Home(props) {
  // States
  const [feedData, setFeedData] = useState(null);
  const [feedLoaded, setFeedLoaded] = useState(false);

  // Effects
  useEffect(() => {
    async function loadFeed() {
      /*
      const response = await getUserFeed();
      if (!response.ok) return;
      setFeedData(response.data);
      setFeedLoaded(true);
      */
      setFeedData({
        pfps: ["https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg"],
        usernames: ["zack_gym"],
        names: ["Zack M"],
        dates: ["Jun 15 2022"],
        bench: [205],
        squat: [300],
        deadlift: [375]
      })
      setFeedLoaded(true);
    }
    loadFeed();
  }, []);

  // Layout
  return(
    <div className="home cont">
      <h1>Home</h1>
      { (feedLoaded) && <HomeFeed {...{data: feedData}} /> }
    </div>
  );
}

export default Home;
