import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import GitHub from '../../images/github_logo.png'
import Twitter from '../../images/twitter_logo.png'
import Spotify from '../../images/spotify_logo.png'
import DropBox from '../../images/dropbox_logo.png'

export default class Account extends React.Component {
    render() {
        const token = localStorage.getItem('currentUser').replace('"', '').replace('"', '')
        const GitHuburlRedirection = process.env.REACT_APP_URI + "/GitHubOAuth"
        const GitHuburl = process.env.REACT_APP_SERVER_AUTH + '/auth/github?token=' + token + '&cb=' + GitHuburlRedirection
        const TwitterurlRedirection = process.env.REACT_APP_URI + "/TwitterOAuth"
        const Twitterurl = process.env.REACT_APP_SERVER_AUTH + '/auth/twitter?token=' + token + '&cb=' + TwitterurlRedirection
        const SpotifyurlRedirection = process.env.REACT_APP_URI + "/SpotifyOAuth"
        const Spotifyurl = process.env.REACT_APP_SERVER_AUTH + '/auth/spotify?token=' + token + '&cb=' + SpotifyurlRedirection
        const DropBoxurlRedirection = process.env.REACT_APP_URI + "/DropBoxOAuth"
        const DropBoxurl = process.env.REACT_APP_SERVER_AUTH + '/auth/dropbox?token=' + token + '&cb=' + DropBoxurlRedirection
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%" class="text-center">
                        <div >Account</div>
                        <div >mail address: GET HERE</div>
                        <div >username: GET HERE</div>
                        <div >Linked Account:</div>
                        <div >Spotify</div>
                        <div >Twitter</div>
                        <br/><a id="GitHubAuth"   href={GitHuburl}>
                            <img src={GitHub} height="30" width="30" alt="GitHub" />    Github
                        </a><br/>
                        <br/><a id="TwitterAuth" href={Twitterurl}>
                            <img src={Twitter} height="30" width="30" alt="Twitter" />    Twitter
                        </a><br/>
                        <br/><a id="SpotifyAuth" href={Spotifyurl}>
                            <img src={Spotify} height="30" width="30" alt="Spotify" />    Spotify
                        </a><br/>
                        <br/><a id="DropBoxAuth" href={DropBoxurl}>
                            <img src={DropBox} height="30" width="30" alt="DropBox" />    DropBox
                        </a><br/>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}