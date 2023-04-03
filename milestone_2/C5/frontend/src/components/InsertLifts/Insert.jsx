// Dependencies
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { addLift } from "../../apicalls/WrappedCalls.js";
// Functional Componenet
function InsertLift() {
    const [meet_id, setMeetID] = useState("");
    const [division, setDivison] = useState("");
    const [place, setPlace] = useState("");
    const [weight, setWeight] = useState("");
    const [bench1, setBench1] = useState("");
    const [bench2, setBench2] = useState("");
    const [bench3, setBench3] = useState("");
    const [squat1, setSquat1] = useState("");
    const [squat2, setSquat2] = useState("");
    const [squat3, setSquat3] = useState("");
    const [deadlift1, setDeadlift1] = useState("");
    const [deadlift2, setDeadlift2] = useState("");
    const [deadlift3, setDeadlift3] = useState("");
    const [mccullough, SetMccullough] = useState("");
    const [glossbrenner, setGlossBrenner] = useState("");
    const [ipfpPoints, setIpfpPoints] = useState("");
    const [wilks, setWilks] = useState("");

    // Handler for 'Continue' / 'Create Account' button pressed

    async function handleCreateLift(event) {
        event.preventDefault();

        const best3bench = Math.max(parseFloat(bench1),parseFloat(bench2),parseFloat(bench3));
        const best3squat = Math.max(parseFloat(squat1),parseFloat(squat2),parseFloat(squat3));
        const best3deadlift = Math.max(parseFloat(deadlift1),parseFloat(deadlift2),parseFloat(deadlift3));
        const totalkg = best3bench + best3squat + best3deadlift;

        const response = await addLift(meet_id, division, place, weight, bench1, bench2, bench3, best3bench,
            squat1, squat2, squat3, best3squat, deadlift1, deadlift2, deadlift3, best3deadlift, totalkg, mccullough, wilks, glossbrenner, ipfpPoints);
        if (response.status !== 200) alert(response.data.msg);
        else alert("Lift added successfully!");
    }

    return (
        <div className="add-lift cont">
            <form className="auth form" onSubmit={handleCreateLift}>
                <h1 className="auth title"><center>Add Your Lift</center></h1>
                <h2 className='leaderboard in label tac'>Please ask your meet administrator for the meet ID. Note that administrators can edit your submission to reflect official results.</h2>
                <br />
                <h2 className='leaderboard in label profile'>Meet Information</h2>
                <input className="auth input" type="text" placeholder="Meet ID" value={ meet_id || ""} onChange={(event) => setMeetID(event.target.value)} />
                <input className="auth input" type="text" placeholder="Division" value={division || ""} onChange={(event) => setDivison(event.target.value)} />
                <input className="auth input" type="text" placeholder="Weight Class" value={weight || ""} onChange={(event) => setWeight(event.target.value)} />
                <input className="auth input" type="text" placeholder="Place" value={place || ""} onChange={(event) => setPlace(event.target.value)} />
                <br />
                <br />
                <h2 className='leaderboard in label profile'>Bench Performance</h2>
                <div className="add-lift split3">
                    <input className="auth input" type="text" placeholder="Bench 1" value={bench1 || ""} onChange={(event) => setBench1(event.target.value)} />
                    <input className="auth input" type="text" placeholder="Bench 2" value={bench2 || ""} onChange={(event) => setBench2(event.target.value)} />
                    <input className="auth input" type="text" placeholder="Bench 3" value={bench3 || ""} onChange={(event) => setBench3(event.target.value)} />
                </div>
                <br />
                <h2 className='leaderboard in label profile'>Squat Performance</h2>
                <div className="add-lift split3">
                    <input className="auth input" type="text" placeholder="Squat 1" value={squat1 || ""} onChange={(event) => setSquat1(event.target.value)} />
                    <input className="auth input" type="text" placeholder="Squat 2" value={squat2 || ""} onChange={(event) => setSquat2(event.target.value)} />
                    <input className="auth input" type="text" placeholder="Squat 3" value={squat3 || ""} onChange={(event) => setSquat3(event.target.value)} />
                </div>
                <br />
                <h2 className='leaderboard in label profile'>Deadlift Performance</h2>
                <div className="add-lift split3">
                    <input className="auth input" type="text" placeholder="Deadlift 1" value={deadlift1 || ""} onChange={(event) => setDeadlift1(event.target.value)} />
                    <input className="auth input" type="text" placeholder="Deadlift 2" value={deadlift2 || ""} onChange={(event) => setDeadlift2(event.target.value)} />
                    <input className="auth input" type="text" placeholder="Deadlift 3" value={deadlift3 || ""} onChange={(event) => setDeadlift3(event.target.value)} />
                </div>
                <br />
                <h2 className='leaderboard in label profile'>Scores</h2>
                <input className="auth input" type="text" placeholder="McCulloch Coefficient" value={mccullough || ""} onChange={(event) => SetMccullough(event.target.value)} />
                <input className="auth input" type="text" placeholder="Glossbrenner Score" value={glossbrenner || ""} onChange={(event) => setGlossBrenner(event.target.value)} />
                <input className="auth input" type="text" placeholder="IPFP Points" value={ipfpPoints || ""} onChange={(event) => setIpfpPoints(event.target.value)} />
                <input className="auth input" type="text" placeholder="Wilks Coefficient" value={wilks || ""} onChange={(event) => setWilks(event.target.value)} />
                <br />
                <button className="auth" type="submit">Add Lift</button>
            </form>
        </div>
    )
}

export default InsertLift;