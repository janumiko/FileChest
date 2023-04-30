import React from "react";
import {useRouteError, Link} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <h1>ERROR {error.status}</h1>
            <h2>{error.data}</h2>
            <Link to="/">Home</Link>
        </div>
    );
};

export default ErrorPage;