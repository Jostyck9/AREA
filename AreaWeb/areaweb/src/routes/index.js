import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Registration from "../pages/Registration";
import Help from "../pages/Help"
import ErrorPage from "../pages/ErrorPage"
import Account from "../pages/Account";

export default function Routes() {
    return (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/registration" component={Registration} />
        <Route path="/help" component={Help} />
        <Route path="/error" component={ErrorPage} />

        <Route path="/account" component={Account} isPrivate />

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={LogIn} />
    </Switch>
    );
}
