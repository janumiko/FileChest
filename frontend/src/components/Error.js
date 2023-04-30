import React, { useEffect } from "react";
import {useNavigate, useRouteError, Link} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    let navigate = useNavigate(); 

    // navigate to /login/ if the user is not authenticated
    useEffect(() => {
        if (error.status === 401) {
            navigate("/login/");
        }
    }, [error, navigate]);

    return (
        <div>
            <h1>ERROR {error.status}</h1>
            <h2>{error.data}</h2>
            <Link to="/">Home</Link>
        </div>
    );
};

export default ErrorPage;