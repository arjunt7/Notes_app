// if we wrap something in this component, it will check if the user is authorized to see that page

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

//we need tocheck if the use is authorzed to see this route else we will 
// redirect it to the login page
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    // as soon as this component mounts we will check if the user is authorized or not by calling auth 
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)) // if auth fails then set isAuthorized to false
    }, [])
  
    // this will refresh the access token for us 
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // sending the refresh token to the backend to get a new access token
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) { // if success
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // this will check if we need to refresh the token or not

    const auth = async () => {
        // look you have the token and if token is there the check if it is expired or not 
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) { // token is not there
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token); // decoding the toke 
        const tokenExpiration = decoded.exp;// exp -> expiration
        const now = Date.now() / 1000;// getting in secs not in ms

        if (tokenExpiration < now) {
            await refreshToken(); 
        } else {
            setIsAuthorized(true);// not expirest so valid
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;