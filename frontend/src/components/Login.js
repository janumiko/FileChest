import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from "../utils";
import { useNavigate, useLocation} from "react-router-dom";

function LoginPage() {
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate(); 

    async function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("username");
        let password = formData.get("password");

        const response = await fetch(`${BACKEND_URL}/token/`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username, "password": password }),
                credentials: "include",
            }
        );

        if (response.status === 401) {
            setErrorMessage("Invalid credentials");
            setError(true);
        } else if (response.status !== 200) {
            setErrorMessage("Something went wrong");
            setError(true);
        } else {
            setError(false);
            setErrorMessage("");
            navigate("/directory/");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text" />
                </label>{" "}
                <label>
                    Password: <input name="password" type="password" />
                </label>{" "}
                <button type="submit">Login</button>
            </form>
            <p>{errorMessage}</p>
        </div>
    );
}

export default LoginPage;