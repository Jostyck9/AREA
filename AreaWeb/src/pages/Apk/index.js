import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';

export default class Apk extends React.Component {

    /**
     * Render the Apk page
     * 
     * @returns the apk page
     */
    render() {
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%">
                <div class="text-center">
                    <a href="https://drive.google.com/open?id=1aHDDzViSdLnVsdzlyLqBng-mPwBH9zkT" download>Click to download</a>
                </div>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}