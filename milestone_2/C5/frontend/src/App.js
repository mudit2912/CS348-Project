// Dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

// View Controllers
import { Home, Login, SignUp, ViewProfile, HeadToHead, GlobalLeaderboard, NationalLeaderboard, AdminLifts, AdminLiftsNew, AdminMeetNew, AdminPage, InsertLift} from "./components";



// API Calls
import { getAuthStatus } from "./apicalls/WrappedCalls";

// Public Route Component
const PublicRoutes = () => {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    async function getStatus() {
      setAuthStatus(await getAuthStatus());
    }
    getStatus();
  }, [])

  if (authStatus === null) {
    return (<div></div>);

  } else if (!authStatus) {
    return(<Outlet />);

  } else {
    return(<Navigate to="/home"/>);
  }
}

// Private Route Component
const AuthRoutes = () => {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    async function getStatus() {
      setAuthStatus(await getAuthStatus());
    }
    getStatus();
  }, [])

  if (authStatus === null) {
    return (<div></div>);

  } else if (authStatus) {
    return(<Outlet />);

  } else {
    return(<Navigate to="/login"/>);
  }
}

// Main Router
function App() {
  return (
    <Router>
      <Routes>
        // These routes can only be accessed if you are not logged in
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/h2h" element={<HeadToHead />} />
          <Route path="/u/:user" element={<ViewProfile />} />
          <Route path="/leaderboard/global" element={<GlobalLeaderboard />} />
          <Route path="/leaderboard/national" element={<NationalLeaderboard />} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path ="/admin/meet/new" element={<AdminMeetNew/>} />
          <Route path="/admin/lifts/new" element={<AdminLiftsNew/>}/>
          <Route path="/insertlift" element={<InsertLift/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
