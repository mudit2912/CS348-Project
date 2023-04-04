// Dependencies
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// API Imports
import { getProfileInfo, toggleUserFavorite } from "../../apicalls/WrappedCalls.js";

// Constants
const default_pfp_url = "https://i.stack.imgur.com/34AD2.jpg";

// Functional Component
function ProfileView(props) {
    const { user } = useParams();

    // States
    const [profileLoaded, setProfileLoaded] = useState(0); // -1 => Error / Profile not found, 0 => Loading, 1 => Success
    const [userInfo, setUserInfo] = useState({});

    // Get user info on page load
    useEffect(()=> {
        async function loadProfile() {
            const response = await getProfileInfo(user);
            if (response.status !== 200) {
                setProfileLoaded(-1);
                return;
            }
            console.log(response.data);
            setUserInfo(response.data);
            setProfileLoaded(1);
        }
        loadProfile();
    }, []);

    // Handle button press
    async function handleProfileClick() {
        if (props.username === user) window.open(`/u/${user}/edit`, '_self');
        else {
            const resp = await toggleUserFavorite(userInfo.userId, userInfo.targetId);
            if (resp.status !== 200) {
                alert('An error occurred! Please try again.');
                return;
            }
            if (userInfo.faved) {
                setUserInfo({...userInfo, faved: false});
            } else {
                setUserInfo({...userInfo, faved: true});
            }
        }
    }

    return (
        <div className="profile cont">
            {(profileLoaded === -1) &&
                <h1 className="profile subtext">@{user} not found!</h1>
            }
            {(profileLoaded === 0) && 
                <h1 className="profile subtext">Loading User...</h1>
            }
            {(profileLoaded === 1) &&
                <>
                    <div className="profile top" />
                    <div className="profile info">
                        <img className="profile image" src={userInfo.pfp_url || default_pfp_url} />
                        <h1 className="profile username">@{userInfo.username}</h1>
                        <button className={"profile favorite" + ((props.username === user || userInfo.faved) ? " outline" : "")} onClick={handleProfileClick}>{(props.username === user) ? "Edit Profile" : ((userInfo.faved) ? "Unfavorite" : "Favorite")}</button>
                        <h3 className="profile bio-title">BIOGRAPHY</h3>
                        <h3 className="profile bio">{userInfo.bio}</h3>
                    </div>
                </>
            }
        </div>
    );
}

export default ProfileView;