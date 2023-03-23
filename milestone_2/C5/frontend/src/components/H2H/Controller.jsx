// Dependencies
import React, { useState, useEffect } from "react";

// API Imports
import { getHeadToHeadComparison } from "../../apicalls/WrappedCalls.js";


// Functional Component for Head to Head Comparison page
function HeadToHead(props) {
    const [showingPage, setShowingPage] = useState(0);
    const [lifterA, setLifterA] = useState("");
    const [lifterB, setLifterB] = useState("");
    const [comparisonData, setComparisonData] = useState(null);

    async function loadComparison() {
        
        const response = await getHeadToHeadComparison(lifterA, lifterB);

        /*
        if (!response.ok) {
            alert("Oops! There was an error comparing the lifters.");
            return;
        }
        */
        setComparisonData({});
        setShowingPage(1);
    }

    function handleCompare(event) {
        event.preventDefault();
        if (lifterA.length === 0 || lifterB.length === 0) {
            alert("Please enter two powerlifters!");
            return;
        }
        loadComparison();
    }

    return (
        <div className="h2h cont">
            {(showingPage === 0) && 
            <form className="auth form" onSubmit={handleCompare}>
                <h1 className="auth title">Head to Head</h1>
                <h2 className="h2h form subheader">Lifter #1</h2>
                <input className="auth input" type="text" placeholder="Username" value={lifterA || ""} onChange={(event) => setLifterA(event.target.value)} />
                <h2 className="h2h form subheader">Lifter #2</h2>
                <input className="auth input last" type="text" placeholder="Username" value={lifterB || ""} onChange={(event) => setLifterB(event.target.value)} />
                <br />
                <button className="auth" type="submit">Compare</button>
            </form>
            }
            {(showingPage === 1) &&
                <div className="h2h comparison">
                    <div>
                        {}
                    </div>
                </div>
            }
        </div>
    );
}

export default HeadToHead;