// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { createUser } from "../../apicalls/WrappedCalls.js";

// Functional Component
function SignUpView(props) {
    const [page, setPage] = useState(0); // 0 -> Name, 1 -> Date of Birth, 2 -> Username/Password
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [gender, setGender] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handler for 'Continue' / 'Create Account' button pressed
    async function handleSubmit(event) {
        event.preventDefault();

        switch (page) {
            case 0:
                // Check all fields filled in
                if (name.length !== 0 && surname.length !== 0 && gender.length !== 0) setPage(1);
                break;
            case 1:
                // Check all fields filled in
                if (birthMonth.length !== 0 && birthDay.length !== 0 && birthYear.length !== 0) setPage(2);
                break;
            case 2:
                // Check all fields filled in
                if (emailAddress.length !== 0 && username.length !== 0 && password.length !== 0) await handleCreateUser();
                break;
            default:
                break;
        }
    }

    // Create user logic
    async function handleCreateUser() {
        const response = await createUser(name, surname, gender, birthMonth, birthDay, birthYear, emailAddress, username, password);
        if (response.status !== 200) alert(response.data.msg);
        else alert("Account Creation Successful!");
    }

    // JSX for Sign Up page
    return (
    <div className="auth cont">
        <form className="auth form" onSubmit={handleSubmit}>
            <h1 className="auth title">{(page === 0) ? "Sign Up" : ((page === 1) ? "Birth Date" : "Account Details")}</h1>
            {(page === 0) &&
                <div>
                    <label className="auth label">
                        <h2 className="auth label text">First Name</h2>
                        <input className="auth input" type="text" placeholder="Pat" value={name || ""} onChange={(event) => setName(event.target.value)} />
                    </label>
                    <br />
                    <br />
                    <label className="auth label">
                        <h2 className="auth label text">Last Name</h2>
                        <input className="auth input" type="text" placeholder="Doe" value={surname || ""} onChange={(event) => setSurname(event.target.value)} />
                    </label>
                    <br />
                    <br />
                    <label className="auth label">
                        <h2 className="auth label text">Gender</h2>
                        <select className="auth input" value={gender || ""} onChange={(event) => setGender(event.target.value)}>
                            <option value="" />
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </label>
                </div>
            }
            {(page === 1) &&
                <div>
                    <label className="auth label">
                        <h2 className="auth label text">Month</h2>
                        <input className="auth input" type="number" min="1" max="12" placeholder="7" maxLength="2" value={birthMonth || ""} onChange={(event) => setBirthMonth(event.target.value)} />
                    </label>
                    <br />
                    <br />
                    <label className="auth label">
                        <h2 className="auth label text">Day</h2>
                        <input className="auth input last" type="number" min="1" max="31" placeholder="30" maxLength="2" value={birthDay || ""} onChange={(event) => setBirthDay(event.target.value)} />
                    </label>
                    <br />
                    <br />
                    <label className="auth label">
                        <h2 className="auth label text">Year</h2>
                        <input className="auth input last" type="number" min="1930" max="2010" placeholder="1947" maxLength="4" value={birthYear || ""} onChange={(event) => setBirthYear(event.target.value)} />
                    </label>
                </div>
            }
            {(page === 2) &&
                <div>
                    <label className="auth label">
                        <h2 className="auth label text">Email Address</h2>
                        <input className="auth input" type="text" placeholder="Email Address" maxLength="100" value={emailAddress || ""} onChange={(event) => setEmailAddress(event.target.value)} />
                    </label>
                    <br />
                    <br />
                    <label className="auth label">
                        <h2 className="auth label text">Username</h2>
                        <input className="auth input" type="text" placeholder="Username" maxLength="30" value={username || ""} onChange={(event) => setUsername(event.target.value)} />
                    </label>
                    <br />
                    <br />
                    <label className="auth label">
                        <h2 className="auth label text">Password</h2>
                        <input className="auth input last" type="password" placeholder="Password" value={password || ""} onChange={(event) => setPassword(event.target.value)} />
                    </label>
                </div>
            }
            <br />
            <button className="auth" type="submit">
                {(page === 2) ? "Create Account" : "Continue"}
            </button>
            {(page === 0) &&
                <div>
                    <br />
                    <br />
                    <button className="auth switch" onClick={()=>{window.open('/login','_self')}}>
                        Already have an account?&nbsp;<span className="green">Sign In.</span>
                    </button>
                </div>
            }
        </form>
    </div>
    );
}

export default SignUpView;