import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class GithubOAuth extends React.Component {

    /**
     * Do things before the render
     */

    componentWillMount() {
        const parsedUrl = new URL(window.location.href);
        if (parsedUrl.searchParams.get("status") === "OK")
            alert("OKKKKKKKKKKKK")
        if (parsedUrl.searchParams.get("status") === "KO")
            alert("KOOOOOOOOOOOO")
        this.props.history.push("/")
    }

    /**
     * Render the github auth page
     * @returns the Github auth page
     */
    render() {
        return (
            <h1>GitHub OAuth</h1>
        );
    }
}