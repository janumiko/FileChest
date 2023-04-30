import React from 'react';
import {RouterProvider} from 'react-router-dom'


import router from './router';


export function App(props) {
    return (
        <div className='App'>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;