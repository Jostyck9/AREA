import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
    Navbar,
    Nav,
    DropdownButton,
    Dropdown
} from 'react-bootstrap'
import PropTypes from "prop-types";
import '../../../css/site.css';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

function OnSignOut()
{
    localStorage.removeItem('currentUser')
}

export default function AuthLayout({ children }) {
    return (
        <Router>
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/"><h1><strong>AREA</strong></h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <DropdownButton
                            drop='left' variant='secondary' title='Profile'>
                            <Dropdown.Item href='account'>Account</Dropdown.Item>
                            <Dropdown.Item href='help'>Help</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={OnSignOut} href='/'>Sign Out</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div class="container">
                <main role="main" class="pb-3">
                    { children }
                </main>
            </div>
            <footer class="border-top footer text-muted">
                <div class="container">
                &copy; 2020 - Area - <Link to='/'>About</Link>
                </div>
            </footer>
        </Router>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired
};