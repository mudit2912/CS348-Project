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
        <h1 className="auth title" >Admin Page</h1>
        
        <form className="auth form" onSubmit={handleNewLiftSubmit}>
        <h1 className="auth title">Create Lift</h1>
        <button className="auth" type="submit">Create Lift</button>
        </form>
        <form className="auth form" onSubmit={handleNewMeetSubmit}>
        <h1 className="auth title">Create Meet</h1>
        <button className="auth" type="submit">Create Meet</button>
        </form>

    </div>
    )
}

export default AdminPage;