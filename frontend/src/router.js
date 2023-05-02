import {createBrowserRouter} from 'react-router-dom'

import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import HomePage from "./components/Home";
import {directoryLoader} from "./loaders";


const router = createBrowserRouter([
    {
        element: <NavBar/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
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