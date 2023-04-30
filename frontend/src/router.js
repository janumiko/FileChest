import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import { removeTrailingSlash, BACKEND_URL } from "./utils";
import LoginPage from "./components/Login"


async function loader({request, params}) {
    const query_params = new URL(request.url).searchParams;

    let path = `${BACKEND_URL}/directory/${removeTrailingSlash(params["*"])}?${query_params.toString()}`;
    console.log('path', path);
    const response = await fetch(path);

    if (response.status !== 200) {
        throw {status: response.status, data: response.statusText};
    }

    return await response.json();
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
                loader: loader
            },
        ],
    },
]);

export default router;