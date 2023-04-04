// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { getHeadToHeadComparison } from "../../apicalls/WrappedCalls.js";


// Functional Component for Head to Head Comparison page
function HeadToHead(props) {
    const [showingPage, setShowingPage] = useState(0);
    const [lifterA, setLifterA] = useState("");
    const [lifterB, setLifterB] = useState("");
    const [lifterUser_A, setLifterUser_A] = useState(null);
    const [lifterUser_B, setLifterUser_B] = useState(null);
    const [lifterData_A, setLifterData_A] = useState(null);
    const [lifterData_B, setLifterData_B] = useState(null);

    // Function to convert SQL date time 
    function formatDate(sqlDateTime) {
        const date = new Date(sqlDateTime);
        const monthNames = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    
    // Load comparison for head to head
    async function loadComparison() {
        const response = await getHeadToHeadComparison(lifterA, lifterB);
        if (response.status !== 200) {
            if (response.status === 404) alert("Oops! One of the lifters was not found.");
            else alert("Oops! There was an error comparing the lifters.");
            return;
        }
        
        var userA = response.data.users[0]; var userB = response.data.users[1];

        var resultsA = []; var resultsB = [];
        for (const [key, value] in Object.entries(response.data.lifts)) {
            const curr_meet = response.data.lifts[key];
            if (curr_meet.id === userA.id) resultsA.push(curr_meet);
            else resultsB.push(curr_meet);
        }

        setLifterUser_A(userA);
        setLifterUser_B(userB);
        setLifterData_A(resultsA);
        setLifterData_B(resultsB);
        setShowingPage(1);
    }

    // Handle compare
    function handleCompare(event) {
        event.preventDefault();
        if (lifterA.length === 0 || lifterB.length === 0) {
            alert("Please enter two powerlifters!");
            return;
        }
        loadComparison();
    }

    function renderLifts(lifterData) {
        var r = [];
        lifterData.forEach(x => {
            if (x.best3benchkg === null) return;
            r.push(
                <div className="home feed post h2h-bubble">
                    <div className="h2h-top">
                        <h2>{x.meet_country}</h2>
                        <h1>{x.meet_name}</h1>
                        <h2>{formatDate(x.meet_date)}</h2>
                    </div>
                    <div className="bottom">
                        <div className="lifts">
                            <div>
                                <h3>Bench (kg)</h3>
                                <h1>{x.best3benchkg}</h1>
                            </div>
                            <div>
                                <h3>Squat (kg)</h3>
                                <h1>{x.best3squatkg}</h1>
                            </div>
                            <div>
                                <h3>Deadlift (kg)</h3>
                                <h1>{x.best3deadliftkg}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="lifts">
                            <div>
                                <h3>IPFP Points</h3>
                                <h1>{x.ipfp_points}</h1>
                            </div>
                            <div>
                                <h3>Glossbrenner</h3>
                                <h1>{x.glossbrenner}</h1>
                            </div>
                            <div>
                                <h3>McCullough</h3>
                                <h1>{x.mccullough}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return r;
    }

    return (
        <div className={"h2h cont" + ((showingPage === 1) ? " in" : "")}>
            {(showingPage === 0) && 
            <form className="auth form" onSubmit={handleCompare}>
                <h1 className="auth title">Head to Head</h1>
                <input className="auth input" type="text" placeholder="Username" value={lifterA || ""} onChange={(event) => setLifterA(event.target.value)} />
                <h2 className="h2h form subheader">VS</h2>
                <input className="auth input last" type="text" placeholder="Username" value={lifterB || ""} onChange={(event) => setLifterB(event.target.value)} />
                <br />
                <button className="auth" type="submit">Compare</button>
            </form>
            }
            {(showingPage === 1) &&
                <div>
                    <button className="h2h-goback" onClick={()=>{setShowingPage(0);}}>Go Back</button>
                    <div className="h2h comparison">
                        <div>
                            <img src={lifterUser_A.pfp_url} />
                            <h1>{lifterUser_A.username}</h1>
                            <h3 className="h2h bio">{lifterUser_A.bio}</h3>
                            { renderLifts(lifterData_A) }
                        </div>
                        <div>
                            <img src={lifterUser_B.pfp_url} />
                            <h1>{lifterUser_B.username}</h1>
                            <h3 className="h2h bio">{lifterUser_B.bio}</h3>
                            { renderLifts(lifterData_B) }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default HeadToHead;