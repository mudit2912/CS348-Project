import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// API Imports
import { createLift, createUser } from "../../apicalls/WrappedCalls.js";

function AdminLiftsNew() {
    const [powerlifter_id, setPowerlifterID] = useState("");
    const [meet_id, setMeetID] = useState("");
    const [division, setDivison] = useState("");
    const [place, setPlace] = useState("");
    const [weight, setWeight] = useState("");
    const [bench1, setBench1] = useState("");
    const [bench2, setBench2] = useState("");
    const [bench3, setBench3] = useState("");
    const [best3benchkg, setBestBench] = useState("");
    const [squat1, setSquat1] = useState("");
    const [squat2, setSquat2] = useState("");
    const [squat3, setSquat3] = useState("");
    const [best3squatkg, setBestSquat] = useState("");
    const [deadlift1, setDeadlift1] = useState("");
    const [deadlift2, setDeadlift2] = useState("");
    const [deadlift3, setDeadlift3] = useState("");
    const [best3deadliftkg, setBestDeadlift] = useState("");
    const [totalKg, setTotalKg] = useState("");
    const [mccullough, SetMccullough] = useState("");
    const [glossbrenner, setGlossBrenner] = useState("");
    const [ipfpPoints, setIpfpPoints] = useState("");
    const [wilks, setWilks] = useState("");

   async function handleCreateLift(event) {
        event.preventDefault();
        const response = await createLift(powerlifter_id, meet_id, division, place, weight, bench1, bench2, bench3, best3benchkg,
            squat1, squat2, squat3, best3benchkg, deadlift1, deadlift2, deadlift3, best3deadliftkg, totalKg, mccullough, wilks, glossbrenner, ipfpPoints);
        if (response.status !== 200) alert(response.data.msg);
        else alert("Lift added successfully!");
    }

    return (
        <div className="home cont">
            <form className="auth form" onSubmit={handleCreateLift}>
                <h1 className="auth title">Insert Lift</h1>
                <input className="auth input" type="text" placeholder="Powerlifter ID" value={ powerlifter_id|| ""} onChange={(event) => setPowerlifterID(event.target.value)} />
                <input className="auth input" type="text" placeholder="Meet ID" value={ meet_id || ""} onChange={(event) => setMeetID(event.target.value)} />
                <input className="auth input" type="text" placeholder="Division" value={division || ""} onChange={(event) => setDivison(event.target.value)} />
                <input className="auth input" type="text" placeholder="Weight Class" value={weight || ""} onChange={(event) => setWeight(event.target.value)} />
                <input className="auth input" type="text" placeholder="Place" value={place || ""} onChange={(event) => setPlace(event.target.value)} />
                <input className="auth input" type="text" placeholder="Bench 1" value={bench1 || ""} onChange={(event) => setBench1(event.target.value)} />
                <input className="auth input" type="text" placeholder="Bench 2" value={bench2 || ""} onChange={(event) => setBench2(event.target.value)} />
                <input className="auth input" type="text" placeholder="Bench 3" value={bench3 || ""} onChange={(event) => setBench3(event.target.value)} />
                <input className="auth input" type="text" placeholder="Best 3 Bench" value={best3benchkg || ""} onChange={(event) => setBestBench(event.target.value)} />
                <input className="auth input" type="text" placeholder="Squat 1" value={squat1 || ""} onChange={(event) => setSquat1(event.target.value)} />
                <input className="auth input" type="text" placeholder="Squat 2" value={squat2 || ""} onChange={(event) => setSquat2(event.target.value)} />
                <input className="auth input" type="text" placeholder="Squat 3" value={squat3 || ""} onChange={(event) => setSquat3(event.target.value)} />
                <input className="auth input" type="text" placeholder="Best 3 Squat" value={best3squatkg || ""} onChange={(event) => setBestSquat(event.target.value)} />
                <input className="auth input" type="text" placeholder="Deadlift 1" value={deadlift1 || ""} onChange={(event) => setDeadlift1(event.target.value)} />
                <input className="auth input" type="text" placeholder="Deadlift 2" value={deadlift2 || ""} onChange={(event) => setDeadlift2(event.target.value)} />
                <input className="auth input" type="text" placeholder="Deadlift 3" value={deadlift3 || ""} onChange={(event) => setDeadlift3(event.target.value)} />
                <input className="auth input" type="text" placeholder="Best 3 Deadlift" value={best3deadliftkg || ""} onChange={(event) => setBestDeadlift(event.target.value)} />
                <input className="auth input" type="text" placeholder="Total Kg" value={totalKg || ""} onChange={(event) => setTotalKg(event.target.value)} />
                <input className="auth input" type="text" placeholder="Mccullough" value={mccullough || ""} onChange={(event) => SetMccullough(event.target.value)} />
                <input className="auth input" type="text" placeholder="Glossbrenner" value={glossbrenner || ""} onChange={(event) => setGlossBrenner(event.target.value)} />
                <input className="auth input" type="text" placeholder="IPFP Points" value={ipfpPoints || ""} onChange={(event) => setIpfpPoints(event.target.value)} />
                <input className="auth input" type="text" placeholder="Wilks" value={wilks || ""} onChange={(event) => setWilks(event.target.value)} />
                <br />
                <button className="auth" type="submit">Add</button>
            </form>
        </div>
    )
}

export default AdminLiftsNew;