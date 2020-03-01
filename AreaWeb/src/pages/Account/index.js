import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import GitHub from '../../images/github_logo.png'
import Twitter from '../../images/twitter_logo.png'
import Spotify from '../../images/spotify_logo.png'
import DropBox from '../../images/dropbox_logo.png'
import Discord from '../../images/discord_logo.png'
import { Button} from 'react-bootstrap'


export default class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            data2: {},
            array: []
        };
        this.openDiscord = this.openDiscord.bind(this);
    }

    /**
     * Do things before the render
     */
    componentWillMount() {
        const token = localStorage.getItem('currentUser').replace('"', '').replace('"', '')

        const GitHuburlRedirection = process.env.REACT_APP_URI + "/GitHubOAuth"
        const GitHuburl = process.env.REACT_APP_SERVER_AUTH + '/auth/github?token=' + token + '&cb=' + GitHuburlRedirection
        const TwitterurlRedirection = process.env.REACT_APP_URI + "/TwitterOAuth"
        const Twitterurl = process.env.REACT_APP_SERVER_AUTH + '/auth/twitter?token=' + token + '&cb=' + TwitterurlRedirection
        const SpotifyurlRedirection = process.env.REACT_APP_URI + "/SpotifyOAuth"
        const Spotifyurl = process.env.REACT_APP_SERVER_AUTH + '/auth/spotify?token=' + token + '&cb=' + SpotifyurlRedirection
        const DropBoxurlRedirection = process.env.REACT_APP_URI + "/DropBoxOAuth"
        const DropBoxurl = process.env.REACT_APP_SERVER_AUTH + '/auth/dropbox?token=' + token + '&cb=' + DropBoxurlRedirection
        var datax = {}
        let array = []

        fetch(process.env.REACT_APP_SERVER_URI + '/me', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token
            }
        }).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(data => {
                    if (!data.email)
                        data.email = 'X'
                    this.setState({data: data})
                })
            }
        })
        
        fetch(process.env.REACT_APP_SERVER_URI + '/me/auth', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token
            }
        }).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(datax => {
                    for (let i = 0; i < datax.length; i++) {
                        if (datax[i].name === "github" || datax[i].name === "twitter" || datax[i].name === "spotify" || datax[i].name === "dropbox" || datax[i].name === "discord") {
                            if (datax[i].name === "github") {
                                array.push(<img src={GitHub} height="30" width="30" alt="GitHub" />)
                                if (datax[i].isConnected === false)  {
                                    array.push(<br/>)
                                    array.push(<br/>)
                                    array.push(<Button href={GitHuburl}>Github</Button>)
                                    array.push(<br/>)
                                }
                                else
                                    array.push(<div>Already Connected</div>)
                            }
                            if (datax[i].name === "twitter") {
                                array.push(<img src={Twitter} height="30" width="30" alt="Twitter" />)
                                if (datax[i].isConnected === false) {
                                    array.push(<br/>)
                                    array.push(<br/>)
                                    array.push(<Button href={Twitterurl}>Twitter</Button>)
                                    array.push(<br/>)
                                }
                                else
                                    array.push(<div>Already Connected</div>)
                            }
                            if (datax[i].name === "spotify") {
                                array.push(<img src={Spotify} height="30" width="30" alt="Spotify" />)
                                if (datax[i].isConnected === false) {
                                    array.push(<br/>)
                                    array.push(<br/>)
                                    array.push(<Button href={Spotifyurl}>Spotify</Button>)
                                    array.push(<br/>)
                                }
                                else
                                    array.push(<div>Already Connected</div>)
                            }
                            if (datax[i].name === "dropbox") {
                                array.push(<img src={DropBox} height="30" width="30" alt="dropbox" />)
                                if (datax[i].isConnected === false) {
                                    array.push(<br/>)
                                    array.push(<br/>)
                                    array.push(<Button href={DropBoxurl}>Dropbox</Button>)
                                    array.push(<br/>)
                                }
                                else
                                    array.push(<div>Already Connected</div>)
                            }
                            if (datax[i].name === "discord") {
                                array.push(<img src={Discord} height="30" width="30" alt="discord" />)
                                    array.push(<br/>)
                                    array.push(<br/>)
                                    array.push(<Button  onClick={this.openDiscord}>Discord</Button>)
                                    array.push(<br/>)
                            }
                            array.push(<br/>)
                        }
                    }
                    this.setState({data2: datax})
                    this.setState({array: array})
                })
            }
        })

    }

    /**
     * OPen the discord registration in a pop up
     */
    openDiscord() {
        const token = localStorage.getItem('currentUser').replace('"', '').replace('"', '')
        const Discordurl = process.env.REACT_APP_SERVER_AUTH + '/auth/discord?token=' + token

        window.open(Discordurl)
    }

    /**
     * Render the account page
     *
     * @returns the account page
     */
    render() {
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%" class="text-center">
                        <h1 >Account</h1>
                        <div >E-mail: {this.state.data.email}</div>
                        <div >Username: {this.state.data.username}</div>
                        <div >Linked Account:</div>
                        <br/>
                            {this.state.array}
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}