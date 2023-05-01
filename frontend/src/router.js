import {createBrowserRouter, useNavigate} from 'react-router-dom'
import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import LoginPage from "./components/Login"
import {directoryLoader, fileLoader} from "./loaders";
import {useEffect} from "react";


const NavigateBack = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('navigate back')
        navigate(-1);
    }, [navigate]);

    return null;
}


const router = createBrowserRouter([
    {
        element: <NavBar/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <div>Hello</div>,
            },
            {
                path: "/login/",
                element: <LoginPage/>
            },
            {
                path: '/directory/*',
                element: <DirectoryContainer/>,
                loader: directoryLoader
            },
            {
                path: '/download/*',
                element: <NavigateBack/>,
                loader: fileLoader
            }
        ],
    },
]);

export default router;