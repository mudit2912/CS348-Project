
/*import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProfileInfo, updateProfileInfo } from "../../apicalls/WrappedCalls.js";

function UpdateProfile() {
  const { user } = useParams();
  const history = useHistory();
  const [pfpUrl, setPfpUrl] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const response = await getProfileInfo(user);
      if (response.status === 200) {
        setPfpUrl(response.data.pfp_url || "");
        setUsername(response.data.username || "");
        setBio(response.data.bio || "");
        setUserId(response.data.id);
      } else {
        console.error("Error loading profile");
      }
    }
    loadProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProfileInfo({ id: userId, pfp_url: pfpUrl, username, bio });
    if (response.status === 200) {
      history.push(`/u/${username}`);
    } else {
      console.error("Error updating profile");
    }
  };

  return (
    // The rest of the component remains the same
    <form onSubmit={handleSubmit} className="update-profile">
    <div className="input-group">
        <label htmlFor="pfpUrl">Profile Picture URL</label>
        <input
            type="text"
            id="pfpUrl"
            value={pfpUrl}
            onChange={(e) => setPfpUrl(e.target.value)}
        />
    </div>
    <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    </div>
    <div className="input-group">
        <label htmlFor="bio">Bio</label>
        <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
        ></textarea>
    </div>
    <button type="submit">Update Profile</button>
</form>
  );
}

export default UpdateProfile; */

/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API Imports
import { getProfileInfo, updateProfileInfo } from "../../apicalls/WrappedCalls.js";

function UpdateProfile() {
  const { user } = useParams();
  const navigate = useNavigate();

  // States
  const [userInfo, setUserInfo] = useState({});

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
      navigate(`/u/${username}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="update-profile">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pfp_url">Profile Picture URL:</label>
        <input
          type="text"
          id="pfp_url"
          name="pfp_url"
          value={userInfo.pfp_url || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userInfo.username || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={userInfo.bio || ""}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;*/

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API Imports
import { getProfileInfo, updateProfileInfo } from "../../apicalls/WrappedCalls.js";

function UpdateProfile() {
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="update-profile">
      <h2>Update Profile</h2>
      {updateSuccess && <p className="success-message">Profile updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="pfp_url">Profile Picture URL:</label>
        <input
          type="text"
          id="pfp_url"
          name="pfp_url"
          value={userInfo.pfp_url || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userInfo.username || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={userInfo.bio || ""}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;


