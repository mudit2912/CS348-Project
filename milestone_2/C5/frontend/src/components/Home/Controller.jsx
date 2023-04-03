// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { getHomeFeed } from "../../apicalls/WrappedCalls.js";

// Functional Component for Home Feed
function HomeFeed(props) {
  const data = props.data;

  // Function to render feed timeline
  function buildTimeline() {
    var r = [];

    for (const [k, v] in Object.entries(data)) {
      const value = data[k];
      r.push(
        <div className="home feed post">
          <div className="top">
            <img src={value.pfp_url} />
            <a href={'/u/'+value.username} target="_blank">
              {value.username}
            </a>
          </div>
          <div className="bottom">
            <h2>{value.date}</h2>
            <h2>{value.name}</h2>
            <div className="lifts">
              <div>
                <h3>Bench (kg)</h3>
                <h1>{value.best3benchkg}</h1>
              </div>
              <div>
                <h3>Squat (kg)</h3>
                <h1>{value.best3squatkg}</h1>
              </div>
              <div>
                <h3>Deadlift (kg)</h3>
                <h1>{value.best3deadliftkg}</h1>
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

      const response = await getHomeFeed();
      if (response.status !== 200) {
        alert(response.data.msg);
        return;
      }

      setFeedData(response.data);
      setFeedLoaded(true);
      /*
      const response = await getUserFeed();
      if (!response.ok) return;
      setFeedData(response.data);
      setFeedLoaded(true);
      */
     /*
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
      */
    }
    loadFeed();
  }, []);

  // Layout
  return(
    <>
    <div className="home cont">
      <h1>Home</h1>
      <a href="http://localhost:3000/insertlift">
      <button className='auth cont home-button' type="button"> Add Your Lift</button>
    </a>
      { (feedLoaded) && <HomeFeed {...{data: feedData}} /> }
    </div>
    </>
  );
}

export default Home;
