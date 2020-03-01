import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class SpotifyOAuth extends React.Component {

    /**
     * Do things before the render
     */
    componentWillMount() {
        this.props.history.push("/")
    }

    /**
     * Render the Spotify auth page
     * @returns the Spotify Auth page
     */

    render() {
        return (
            <h1>Spotify OAuth</h1>
        );
    }
}