import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class GithubOAuth extends React.Component {

    componentWillMount() {
        const parsedUrl = new URL(window.location.href);
        localStorage.setItem('currentUser', parsedUrl.searchParams.get("token"))
        this.props.history.push("/")
    }

    render() {
        return (
            <h1>GitHub OAuth</h1>
        );
    }
}