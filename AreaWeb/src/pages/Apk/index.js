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
                <div class="text-center">
                    <a href="apk/release/app-release.apk" download>Click to download</a>
                </div>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}