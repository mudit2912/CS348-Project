// Dependencies
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// Functional Componenet
function AdminPage() {
    const [editPowerlifterID, setEditPowerlifterID] = useState("");
    const [editMeetID, setEditMeetID] = useState("");
    const [createLiftId, setCreateLiftId] = useState("");

    const navigate = useNavigate();

    const handleNewLiftSubmit = event => {
        event.preventDefault();
        navigate('/admin/lifts/new');
    }
    const handleNewMeetSubmit = event => {
        event.preventDefault();
        navigate('/admin/meet/new');
    }
    return (
        <div className="home cont">
        <h1 className="auth title" >Welcome, Administrators!</h1>
        <br />
        <form className="auth form" onSubmit={handleNewLiftSubmit}>
        <h2 className='leaderboard in label'>Add individual lifts to existing meets:</h2>
        <button className="auth" type="submit">Create Lift</button>
        </form>
        <br />
        <br />
        <form className="auth form" onSubmit={handleNewMeetSubmit}>
        <h2 className='leaderboard in label'>Create a meet that lifts can be added to:</h2>
        <button className="auth" type="submit">Create Meet</button>
        </form>

    </div>
    )
}

export default AdminPage;