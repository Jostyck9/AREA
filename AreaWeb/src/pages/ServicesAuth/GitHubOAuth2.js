import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class GithubOAuth2 extends React.Component {

    componentWillMount() {
        const parsedUrl = new URL(window.location.href);
        if (parsedUrl.searchParams.get("status") === "OK")
            alert("OKKKKKKKKKKKK")
        if (parsedUrl.searchParams.get("status") === "KO")
            alert("KOOOOOOOOOOOO")
        localStorage.setItem('currentUser', JSON.stringify(parsedUrl.searchParams.get("token")))
        this.props.history.push("/")
    }

    render() {
        return (
            <h1>GitHub OAuth2</h1>
        );
    }
}