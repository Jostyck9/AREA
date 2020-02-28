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
import Creation from "../pages/Creation"
import GitHubOAuth2 from "../pages/ServicesAuth/GitHubOAuth2"
import GitHubOAuth from "../pages/ServicesAuth/GitHubOAuth"
import TwitterOAuth from "../pages/ServicesAuth/TwitterOAuth"
import SpotifyOAuth from "../pages/ServicesAuth/SpotifyOAuth"
import DropBoxOAuth from "../pages/ServicesAuth/DropBoxOAuth"

export default function Routes() {
    return (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LogIn} isConnected/>
        <Route path="/registration" component={Registration} isConnected/>
        <Route path="/error" component={ErrorPage} />
        <Route path="/about.json" component={About} />

        <Route path="/account" component={Account} isPrivate />
        <Route path="/creation" component={Creation} isPrivate />
        <Route path="/client.apk" component={Apk}/>
        <Route path="/GitHubOAuth2" component={GitHubOAuth2} isConnected/>
        <Route path="/GitHubOAuth" component={GitHubOAuth} isPrivate/>
        <Route path="/TwitterOAuth" component={TwitterOAuth} isPrivate/>
        <Route path="/SpotifyOAuth" component={SpotifyOAuth} isPrivate/>
        <Route path="/DropBoxOAuth" component={DropBoxOAuth} isPrivate/>

        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={Home} />
    </Switch>
    );
}
