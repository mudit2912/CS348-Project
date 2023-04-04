import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API Imports
import { getProfileInfo, updateProfileInfo } from "../../apicalls/WrappedCalls.js";

function UpdateProfile(props) {
  const { user } = useParams();
  const navigate = useNavigate();

  // States
  const [userInfo, setUserInfo] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Get user info on page load
  useEffect(() => {
    async function loadProfile() {
      const response = await getProfileInfo(user);
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, pfp_url, username, bio } = userInfo;

    const response = await updateProfileInfo({ id, pfp_url, username, bio });
    if (response.status === 200) {
      setUpdateSuccess(true);
      props.setUsername(userInfo.username);
      window.open(`/u/${userInfo.username}`, '_self');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value.replaceAll('@','') }));
  };

  return (
    <div className="leaderboard cont">
      <h1 className="leaderboard title profile">Edit Profile</h1>
      <div className="leaderboard indiv profile">
        <form onSubmit={handleSubmit}>
          <h2 className="leaderboard in label profile">Profile Picture URL</h2>
          <input
            type="text"
            id="pfp_url"
            name="pfp_url"
            className="leaderboard input"
            value={userInfo.pfp_url || ""}
            onChange={handleChange}
          />
          <h2 className="leaderboard in label profile">Username</h2>
          <input
            type="text"
            id="username"
            name="username"
            className="leaderboard input"
            value={(userInfo.username) ? "@" + userInfo.username : ""}
            onChange={handleChange}
          />
          <h2 className="leaderboard in label profile">Biography</h2>
          <textarea
            id="bio"
            name="bio"
            className="leaderboard input"
            value={userInfo.bio || ""}
            onChange={handleChange}
          ></textarea>
          <button className="leaderboard button" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;


