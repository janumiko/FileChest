import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from "./components/Error";
import NavBar from "./components/Navbar"
import DirectoryContainer from "./components/DirectoryContainer";
import { removeTrailingSlash } from "./utils";


const BACKEND_URL = 'http://localhost:8000';


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
                path: '/directory/*',
                element: <DirectoryContainer />,
                loader: async ({ params }) => {
                    let path = `${BACKEND_URL}/directory/${removeTrailingSlash(params["*"])}`;
                    console.log(path);
                    const response = await fetch(path);

                    if (response.status === 404) {
                        throw new Response("Not Found", { status: 404 });
                    }

                    return await response.json();
                }
            },
        ],
    },
]);

export default router;