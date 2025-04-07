import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";  // use to navigate
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) { // route is the api endpoint and method is either login or register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register"; // if login the go to login else register

    const handleSubmit = async (e) => {
        setLoading(true); // when the form is submitted we will set loading to true so that we can show the loading indicator
        e.preventDefault(); // prevent from submiting the form and refreshing the page
        // sending req
        try {
            const res = await api.post(route, { username, password }) // sendig a post request
            if (method === "login") { // if method is login
                // setting data 
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else { //if it was not login then it was register and if it was register we dont ahve any toke to set so to get the tokes we need to login
                navigate("/login")
            }
            // error
        } catch (error) {
            alert(error)
        } 
        
        finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}//setting the username
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} //setting the password 
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}  {/*login or register*/}
            </button>
        </form>
    );
}

export default Form 