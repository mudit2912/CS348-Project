// Dependencies
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// API Imports
import { getNationalLeaderboard } from "../../apicalls/WrappedCalls.js";

// Functional Component
function LeaderboardRows(props) {
    var rows = []; var i = 0;
    for (const key in props.data) {
        const row = props.data[key];
        rows.push(
            <div className="leaderboard row">
                <h1 className="leaderboard name">{i+1}) {row.first_name} {row.last_name}</h1>
                <h2 className="leaderboard score">{row.totalkg} kg (Total)</h2>
            </div>
        );
        i++;
    }
    return rows;
}

// Functional Component
function LeaderboardView(props) {
    const [limit, setLimit] = useState(25);
    const [country, setCountry] = useState("");
    const [leadersLoaded, setLeadersLoaded] = useState(0); // -1 => Error, 0 => Loading, 1 => Success
    const [leaderInfo, setLeaderInfo] = useState({});

    // Load leaderboard on button click
    async function getLeaders() {
        if (!limit) return;
        const response = await getNationalLeaderboard(limit, country);
        if (response.status !== 200) setLeadersLoaded(-1);
        console.log(response);
        setLeadersLoaded(1);
        setLeaderInfo(response.data);
    }

    return(
        <div className="leaderboard cont">
            <h1 className="leaderboard title">National Leaderboard</h1>
            <div className="leaderboard indiv">
                <h2 className="leaderboard in label">Max # of Results</h2>
                <input className="leaderboard input" type="number" value={limit || "" } onChange={(event)=>{setLimit(parseInt(event.target.value))}} />
                <h2 className="leaderboard in label">Country</h2>
                <input className="leaderboard input" type="text" placeholder="USA" value={country || "" } onChange={(event)=>{setCountry(event.target.value)}} />
                <button className="leaderboard button" onClick={getLeaders}>Load</button>
            </div>
            {(leadersLoaded === 1) && 
                <div className="leaderboard table">
                    <LeaderboardRows {...{data: leaderInfo}} />
                </div>
            }
        </div>
    );
}

export default LeaderboardView;
