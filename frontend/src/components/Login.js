import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from "../utils";
import { useNavigate, useLocation} from "react-router-dom";

function LoginPage() {
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

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
            }
        );

        if (response.status === 401) {
            setErrorMessage("Invalid credentials");
            setError(true);
        } else if (response.status !== 200) {
            setErrorMessage("Something went wrong");
            setError(true);
        }

        if (error) 
        {
            return;
        }

        const data = await response.json();
        console.log(data);
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