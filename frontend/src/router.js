import { createBrowserRouter, json } from 'react-router-dom'
import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import { removeTrailingSlash, BACKEND_URL } from "./utils";
import LoginPage from "./components/Login"


const router = createBrowserRouter([
    {
        element: <NavBar />,
        errorElement: <ErrorPage />,
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
                element: <DirectoryContainer />,
                loader: async ({ params }) => {
                    let path = `${BACKEND_URL}/directory/${removeTrailingSlash(params["*"])}`;
                    console.log(path);
                    const response = await fetch(path);

                    if (response.status !== 200) {
                        throw { status: response.status, data: response.statusText };
                    } else {
                        return await response.json();
                    }
                }
            },
        ],
    },
]);

export default router;