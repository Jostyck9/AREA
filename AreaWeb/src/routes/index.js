import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Registration from "../pages/Registration";
import ErrorPage from "../pages/ErrorPage"
import Account from "../pages/Account";
import About from "../pages/About";
import Apk from "../pages/Apk";

export default function Routes() {
    return (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LogIn} isConnected/>
        <Route path="/registration" component={Registration} isConnected/>
        <Route path="/error" component={ErrorPage} />
        <Route path="/about.json" component={About} />

        <Route path="/account" component={Account} isPrivate />
        <Route path="/client.apk" component={Apk} isConnected />

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={Home} />
    </Switch>
    );
}
