import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { createMeet } from "../../apicalls/WrappedCalls";

function AdminMeetNew() {
    const [meet_id, setMeetID] = useState("");
    const [name, setName] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [federation, setFederation] = useState("");

   async function handleCreateMeet(event) {
        event.preventDefault();
        var date = year + '-' + month + '-' + day;
        console.log(date)
        const response = await createMeet(meet_id, name, date, state, country, federation);
        if (response.status !== 200) alert(response.data.msg);
        else alert("Meet added successfully!");
    }

    return (
        <div className="home cont">
            <form className="auth form" onSubmit={handleCreateMeet}>
                <h1 className="auth title">Add Meet Information</h1>
                <input className="auth input" type="text" placeholder="Meet ID" value={ meet_id || ""} onChange={(event) => setMeetID(event.target.value)} />
                <input className="auth input" type="text" placeholder="Meet Name" value={name || ""} onChange={(event) => setName(event.target.value)} />

                <input className="auth input" type="number" min="1" max="12" placeholder="month" maxLength="2" value={month || ""} onChange={(event) => setMonth(event.target.value)} />
                <input className="auth input last" type="number" min="1" max="31" placeholder="day" maxLength="2" value={day || ""} onChange={(event) => setDay(event.target.value)} />
                <input className="auth input last" type="number" min="1930" max="2010" placeholder="year" maxLength="4" value={year || ""} onChange={(event) => setYear(event.target.value)} />            

                <input className="auth input" type="text" placeholder="State" value={state || ""} onChange={(event) => setState(event.target.value)} />
                <input className="auth input" type="text" placeholder="Country" value={country || ""} onChange={(event) => setCountry(event.target.value)} />
                <input className="auth input" type="text" placeholder="Federation" value={federation || ""} onChange={(event) => setFederation(event.target.value)} />
                <br />
                <button className="auth" type="submit">Add</button>
            </form>
        </div>
    )
}

export default AdminMeetNew;