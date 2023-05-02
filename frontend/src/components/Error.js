import React, {useEffect} from "react";
import {Link, useNavigate, useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    let navigate = useNavigate();

    // navigate to homePage if the user is not authenticated
    useEffect(() => {
        if (error.status === 401) {
            navigate("/");
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