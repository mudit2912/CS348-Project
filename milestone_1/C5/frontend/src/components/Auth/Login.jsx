// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { loginUser } from "../../apicalls/WrappedCalls.js";

// Functional Component
function LoginView(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleLogin(event) {
        event.preventDefault();

        // Login logic
        const response = await loginUser(username, password);
        if (response.status !== 200) alert(response.data.msg);
        else alert("Login Successful!");
    }

    return (
    <div className="auth cont">
        <form className="auth form" onSubmit={handleLogin}>
            <h1 className="auth title">Sign In</h1>
            <input className="auth input" type="text" placeholder="Username" value={username || ""} onChange={(event) => setUsername(event.target.value)} />
            <input className="auth input last" type="password" placeholder="Password" value={password || ""} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button className="auth" type="submit">Login</button>
            <br />
            <br />
            <br />
            <button className="auth switch" onClick={()=>{window.open('/signup','_self')}}>
                Don't have an account?&nbsp;<span className="green">Sign Up!</span>
            </button>
        </form>
    </div>
    );
}

export default LoginView;