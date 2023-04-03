// Dependencies
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { NavLink, BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

// View Controllers
import { Home, Login, SignUp, ViewProfile, HeadToHead, GlobalLeaderboard, NationalLeaderboard, UpdateProfile, Search, AdminLifts, AdminLiftsNew } from "./components";

// API Calls
import { getAuthStatus } from "./apicalls/WrappedCalls";

// Public Route Component
const PublicRoutes = (props) => {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    async function getStatus() {
      const req = await getAuthStatus();
      setAuthStatus(req.auth);
    }
    getStatus();
  }, [])

  if (authStatus === null) {
    return (<div></div>);

  } else if (!authStatus) {
    props.setNavbar(false);
    return(<Outlet />);

  } else {
    return(<Navigate to="/home"/>);
  }
}

// Private Route Component
const AuthRoutes = (props) => {
  const [authStatus, setAuthStatus] = useState(null);
  const [un, setUn] = useState(null);

  useEffect(() => {
    async function getStatus() {
      const req = await getAuthStatus();
      setAuthStatus(req.auth);
      setUn(req.username);
    }
    getStatus();
  }, [])

  if (authStatus === null) {
    return (<div></div>);

  } else if (authStatus) {
    props.setUsername(un);
    props.setNavbar(true);
    return(<Outlet />);

  } else {
    return(<Navigate to="/login"/>);
  }
}


// Navbar component
function NavBar(props) {

    return(
        <div className="navbar container">
            <div className="navbar left">

            </div>
            <div className="navbar middle">
              <NavLink to="/home" className={(navData) => (navData.isActive ? "active" : "")}>
                  Feed
                  <div className="navbar rect" />
              </NavLink>
              <NavLink to="/search" className={(navData) => (navData.isActive ? "active" : "")}>
                  Search
                  <div className="navbar rect" />
              </NavLink>
              <NavLink to="/leaderboard/global" className={(navData) => (navData.isActive ? "active" : "")}>
                  Global
                  <div className="navbar rect" />
              </NavLink>
              <NavLink to="/leaderboard/national" className={(navData) => (navData.isActive ? "active" : "")}>
                  National
                  <div className="navbar rect" />
              </NavLink>
              <NavLink to="/h2h" className={(navData) => (navData.isActive ? "active" : "")}>
                  H2H
                  <div className="navbar rect" />
              </NavLink>
            </div>
            <div className="navbar right">
              <NavLink to={`/u/${props.username}/edit`} className={(navData) => (navData.isActive ? "active" : "")}>
                <img src="https://i.pinimg.com/564x/bc/75/88/bc75882d906b263fbe0550fe59dc7b21.jpg" className="navbar profile icon" />
              </NavLink>
            </div>
        </div>
    );
}


// Main Router
function App() {
  const [navbar, setNavbar] = useState(false);
  const [username, setUsername] = useState(null);

  return (
    <Router>
      {(navbar) && <NavBar {...{username: username}} />}
      <Routes>
        // These routes can only be accessed if you are not logged in
        <Route element={<PublicRoutes {...{setNavbar: setNavbar}} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<AuthRoutes {...{setNavbar: setNavbar, setUsername: setUsername}} />}>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/h2h" element={<HeadToHead />} />
          <Route path="/u/:user" element={<ViewProfile />} />
          <Route path="/u/:user/edit" element={<UpdateProfile {...{setUsername: setUsername}} />} />
          <Route path="/leaderboard/global" element={<GlobalLeaderboard />} />
          <Route path="/leaderboard/national" element={<NationalLeaderboard />} />
          <Route path="/admin/lifts" element={<AdminLifts/>}/>
          <Route path="/admin/lifts/new" element={<AdminLiftsNew/>}/>
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
