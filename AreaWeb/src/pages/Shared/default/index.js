import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import PropTypes from "prop-types";
import '../../../css/site.css';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import {
    Navbar,
    Nav
} from 'react-bootstrap'

export default function DefaultLayout({ children }) {
    return (
        <Router>
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/"><h1><strong>AREA</strong></h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                            <Nav.Link href="login"><h4>Log In</h4></Nav.Link>
                            <Nav.Link href="registration"><h4>Registration</h4></Nav.Link>
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
                    &copy; 2020 - Area - <Link href='/'>About</Link>
                </div>
            </footer>
        </Router>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired
};