import React from "react";
import {Button, Nav, Navbar} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBoxArchive} from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css'
import {Outlet, useNavigate} from "react-router-dom";

const NavBar = () => {
    let navigate = useNavigate();
    console.log('navbar')

    const routeChange = () => {
        let path = "/login/";
        navigate(path);
    }

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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="primary" onClick={routeChange}>Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default NavBar;