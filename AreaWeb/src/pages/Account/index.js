import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class Account extends React.Component {
    render() {
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%">
                        <div class="text-center">Account</div>
                        <div class="text-center">mail address: GET HERE</div>
                        <div class="text-center">username: GET HERE</div>
                        <div class="text-center">Linked Account:</div>
                        <div class="text-center">Spotify</div>
                        <div class="text-center">Twitter</div>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}