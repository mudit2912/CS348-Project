// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { getHomeFeed } from "../../apicalls/WrappedCalls.js";

// Functional Component for Home Feed
function HomeFeed(props) {
  const data = props.data;

  // Function to convert SQL date time 
  function formatDate(sqlDateTime) {
    const date = new Date(sqlDateTime);
    const monthNames = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  // Function to render feed timeline
  function buildTimeline() {
    var r = [];

    for (const [k, v] in Object.entries(data)) {
      const value = data[k];
      r.push(
        <div className="home feed post">
          <div className="top">
            <img src={value.pfp_url} />
            <a className="post-username" href={'/u/'+value.username} target="_blank">@{value.username}</a>
            <h2 className="post-place-date">{formatDate(value.date)} @ {value.name}</h2>
          </div>
          <div className="bottom">
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
  const [noFavorites, setNoFavorites] = useState(false);

  // Effects
  useEffect(() => {
    async function loadFeed() {

      const response = await getHomeFeed();
      if (response.status !== 200) {
        if (response.data.msg === "No favorited lifters / lifts found.") setNoFavorites(true);
        else alert(response.data.msg);
        return;
      }

      setFeedData(response.data);
      setFeedLoaded(true);
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
      { (noFavorites) &&
        <div className="nofavorites">
          Favorite a lifter to start your feed!
          <br/>
          <a href="/search">Search Lifters</a>
        </div>
      }
    </div>
    </>
  );
}

export default Home;
