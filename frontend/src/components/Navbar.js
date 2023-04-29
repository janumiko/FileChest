import React from "react";
import {Navbar, Nav, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBoxArchive} from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css'
import {Outlet} from "react-router-dom";

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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">fa-box-archive
                        <Button variant="primary">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default NavBar;