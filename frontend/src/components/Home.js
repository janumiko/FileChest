import React, {useState} from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {BACKEND_URL} from "../utils";

import '../styles/Home.css';

const HomePage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [visibleLogin, setVisibleLogin] = useState(false);
    
    let navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("username");
        let password = formData.get("password");

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

    const renderLoginForm = () => {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter password" />
                </Form.Group>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        );
    };

    const handleLoginClick = () => {
        setVisibleLogin(true);
    };

    return (
        <div className="home">
            <h1 className="text-center display-3 mb-5">FileChest</h1>
            <p className="text-center">Please login to continue.</p>
            <div className="d-flex justify-content-center">
                {visibleLogin ? (
                    renderLoginForm()
                ) : (
                    <Button variant="primary" onClick={handleLoginClick}>
                        Login
                    </Button>
                )}
            </div>
        </div>
    );
};

export default HomePage;