import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {BACKEND_URL} from "../utils";


const HomePage = () => {
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    async function checkIfLoggedIn() {
        const response = await fetch(`${BACKEND_URL}/authorized/`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (response.status === 200) {
            return true;
        }

        return false;
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        const response = await fetch(`${BACKEND_URL}/login/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"username": username, "password": password}),
                credentials: "include",
            }
        );

        if (response.status === 401) {
            setErrorMessage("Invalid credentials");
        } else if (response.status !== 200) {
            setErrorMessage("Something went wrong");
        } else {
            setErrorMessage("");
            navigate("/directory/");
        }
    }

    return (
        <div className="container">
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="card text-center shadow-lg">
                    <div className="card-header">
                        <h1 className="display-1 fw-bold text-primary mb-3 fst-italic">FileChest</h1>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title p-3">Please login to continue</h5>
                        <form onSubmit={handleSubmit}>
                            <input className="form-control mb-3" type="text" name="username" placeholder="Username"/>
                            <input className="form-control mb-3" type="password" name="password"
                                   placeholder="Password" autoComplete="on"/>
                            <button className="btn btn-primary" type="submit">Login</button>
                        </form>
                        <div className="alert alert-danger mt-3" role="alert" hidden={errorMessage === ""}>
                            {errorMessage}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;