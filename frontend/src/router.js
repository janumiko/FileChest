import {createBrowserRouter, redirect} from 'react-router-dom'

import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import LoginPage from "./components/Login"
import {directoryLoader} from "./loaders";


const router = createBrowserRouter([
    {
        element: <NavBar/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: redirect("/directory/"),
            },
            {
                path: "/login/",
                element: <LoginPage/>
            },
            {
                path: '/directory/*',
                element: <DirectoryContainer/>,
                loader: directoryLoader
            }
        ],
    },
]);

export default router;