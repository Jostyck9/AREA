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
} from "react-router-dom";

    /**
     * Sign out an user
     */

function OnSignOut()
{
    var token = localStorage.getItem('currentUser')
    localStorage.removeItem('currentUser')
    fetch(
        process.env.REACT_APP_SERVER_URI + '/auth/logout', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token
        }
    }).then(res => {
        alert(res.status)
        if (res.status >= 200 && res.status <= 204) {
            alert("See you next time")
        } else {
            alert("Need a token to logout")
        }
    })
}

    /**
     * Render the Auth Layout
     * @returns the Auth Layoutpage
     */

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
        </Router>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired
};