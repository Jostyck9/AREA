import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class TwitterOAuth extends React.Component {

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
     * Render the Twitter Auth page
     * @returns a the Twitter Auth page
     */

    render() {
        return (
            <h1>Twitter OAuth</h1>
        );
    }
}