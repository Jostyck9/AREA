import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class SpotifyOAuth extends React.Component {

    componentWillMount() {
        const parsedUrl = new URL(window.location.href);
        if (parsedUrl.searchParams.get("status") === "OK")
            alert("OKKKKKKKKKKKK")
        if (parsedUrl.searchParams.get("status") === "KO")
            alert("KOOOOOOOOOOOO")
        this.props.history.push("/")
    }

    render() {
        return (
            <h1>Spotify OAuth</h1>
        );
    }
}