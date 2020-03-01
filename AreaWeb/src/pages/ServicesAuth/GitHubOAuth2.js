import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class GithubOAuth2 extends React.Component {

    /**
     * Do things before the render
     */

    componentWillMount() {
        const parsedUrl = new URL(window.location.href);
        if (parsedUrl.searchParams.get("status") === "OK") {
            alert("OKKKKKKKKKKKK")
            localStorage.setItem('currentUser', JSON.stringify(parsedUrl.searchParams.get("token")))
            this.props.history.push("/")
        }
        if (parsedUrl.searchParams.get("status") === "KO") {
            alert("KOOOOOOOOOOOO")
            this.props.history.push("/login")
        }
    }

    /**
     * Render the github Auth 2 page
     * @returns the github Auth 2 page
     */

    render() {
        return (
            <h1>GitHub OAuth2</h1>
        );
    }
}