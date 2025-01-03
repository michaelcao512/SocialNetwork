import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


const STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
    INVALID: "invalid",
};

const EmailVerification = () => {
    console.log("Starting email verification...");

    const navigate = useNavigate();
   
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("loading");
    const token = searchParams.get("token");

    useEffect(() => {
       
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/auth/verify?token=${token}`, {
                    method: "GET",
                });
                const responseText = await response.text();
                console.log("Response Text:", responseText);
                if (response.ok){
                    console.log("Current status:", status);

                    setStatus(STATUS.SUCCESS);
                } else {
                   
                }
            } catch (err) {
                console.error("Error verifying email:", err);
               
            }
        };
    
        if (token) {
            verifyEmail();
        } else {
            setStatus(STATUS.INVALID);
        }
       
    }, [token]); 
    

    return ( 
        

        <div>
            {status === "loading" && <p>Verifying your email...</p>}
            {status === "success" && (
            <div>
                <h1>Email Verified!</h1>
                <p>Your email has been successfully verified. Please continue to the login page to log into your account.</p>
                <button
                    onClick={() => navigate('/login')}
                    style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
                >
                    Go to Login
                </button>
            </div>
)}

            {status === "error" && (
                <div>
                    <h1>Verification Failed</h1>
                    <p>There was an issue verifying your email. Please try again.</p>
                </div>
            )}
            {status === "invalid" && (
                <div>
                    <h1>Invalid Link</h1>
                    <p>The verification link is invalid or missing a token.</p>
                </div>
            )}
        </div>
    );
};

export default EmailVerification;
