import React from "react";
import {Navbar} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBoxArchive} from '@fortawesome/free-solid-svg-icons';
import {Outlet, useNavigate} from "react-router-dom";

import '../styles/Navbar.css'

const NavBar = () => {
    return (
        <div>
            <Navbar expand="md">
                <Navbar.Brand href="/">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faBoxArchive} className="me-2"/>
                        <span className="logo"><em>FileChest</em></span>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default NavBar;