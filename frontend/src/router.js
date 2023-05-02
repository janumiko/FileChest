import {createBrowserRouter} from 'react-router-dom'

import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import HomePage from "./components/Home";
import {directoryLoader} from "./loaders";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <ErrorPage/>,
    },
    {
        element: <NavBar/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/directory/*',
                element: <DirectoryContainer/>,
                loader: directoryLoader
            }
        ],
    },
]);

export default router;