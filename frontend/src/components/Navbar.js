import React from "react";
import {Button, Navbar, Nav} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBoxArchive} from '@fortawesome/free-solid-svg-icons';
import {Outlet, useNavigate} from "react-router-dom";

import '../styles/Navbar.css'

import {BACKEND_URL} from "../utils";

const NavBar = () => {
    let navigate = useNavigate();

    const LogOut = async () => {
        fetch(`${BACKEND_URL}/logout/`, 
            {
                credentials: "include"
            }
        ).then(() => navigate("/"));
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
                        <Button variant="primary" onClick={LogOut}>Log out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default NavBar;