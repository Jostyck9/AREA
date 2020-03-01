import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class DropBoxOAuth extends React.Component {

    /**
     * DO things before the render
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
     * Render the dropbox page
     * @returns DropBoxOAuth page
     */
    render() {
        return (
            <h1>DropBox OAuth</h1>
        );
    }
}