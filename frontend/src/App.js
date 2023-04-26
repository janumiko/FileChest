import React from 'react';
import {createBrowserRouter, RouterProvider, Link, Outlet, useLoaderData} from 'react-router-dom'
import Folder from "./components/Folder";
import ErrorPage from "./components/Error";


const BACKEND_URL = 'http://localhost:8000';

const Navbar = () => {
    return <div>
        <Link to='/'>Home</Link>
        <Link to='/directory'>Directory</Link>
        <Outlet/>
    </div>
}

const router = createBrowserRouter([
    {
        element: <Navbar/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <div>Hello</div>,
            },
            {
                path: '/directory/*',
                element: <Folder/>,
                loader: async ({params}) => {
                    let path = `${BACKEND_URL}/directory/${params['*']}`;
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


export function App(props) {
    return (
        <div className='App'>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;