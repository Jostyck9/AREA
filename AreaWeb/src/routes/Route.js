import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import DefaultLayout from "../pages/Shared/default";
import AuthLayout from "../pages/Shared/auth";

export default function RouteWrapper({
    component: Component,
    isPrivate,
    isConnected,
    ...rest
}) {

    /**
     * Redirect user to SignIn page if he tries to access a private route
     * without authentication.
     */
    if (isPrivate && !localStorage.getItem('currentUser')) {
        return <Redirect to="/login" />;
    }

    if (isConnected && localStorage.getItem('currentUser')) {
        return <Redirect to="/" />;
    }

    const Layout = localStorage.getItem('currentUser') ? AuthLayout : DefaultLayout;

    /**
     * If not included on both previous cases, redirect user to the desired route.
     */
        return (
        <Route
            {...rest}
            render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
            )}
        />
    );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false
};