// Dependencies
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// Functional Componenet
function AdminLifts() {
    const [editPowerlifterID, setEditPowerlifterID] = useState("");
    const [editMeetID, setEditMeetID] = useState("");
    const [createLiftId, setCreateLiftId] = useState("");

    const navigate = useNavigate();

    const handleNewSubmit = event => {
        event.preventDefault();
        navigate('/admin/lifts/new');
    }
    return (
        <div className="home cont">
        <h1 className="auth title" >Admin Page</h1>
        <form className="auth form">
        <h1 className="auth title">Edit Lift</h1>
        <h3 className="h2h form subheader">Input PowerLifter ID, and MeetID for Lift you want to edit</h3>
        <input className="auth input" type="text" placeholder="Powerlifter ID" value={editPowerlifterID || ""} onChange={(event) => setEditPowerlifterID(event.target.value)} />
        <input className="auth input" type="text" placeholder="Meet ID" value={editMeetID || ""} onChange={(event) => setEditMeetID(event.target.value)} />
        <br />
        <button className="auth" type="submit">Search</button>
    </form>
    <form className="auth form" onSubmit={handleNewSubmit}>
        <h1 className="auth title">Create Lift</h1>
        <button className="auth" type="submit">Create</button>
    </form>
    </div>
    )
}



export default AdminLifts;