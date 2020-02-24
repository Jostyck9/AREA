import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button } from 'react-bootstrap'

export default class Account extends React.Component {

    render() {
        return (
            <div>
                {/* <Button variant="secondary" size="lg" active onClick={this.getFiles}>Show me the files</Button><br/> */}
                <a href="apk/release/app-release.apk" download>Click to download</a>
            </div>
        );
    }
}