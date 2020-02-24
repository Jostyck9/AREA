import 'bootstrap/dist/css/bootstrap.min.css';
import tree from '../../images/tree.png';
import React from 'react';
import '../../css/site.css';
import { Button } from 'react-bootstrap'

export default class Home extends React.Component {

    printToken() {
        alert(JSON.parse(localStorage.getItem('currentUser')));
    }

    render() {
        return (
            <div class="text-center">
                <h1 class="display-4">Welcome to AREA</h1>
                <h5>You need to be connected first to manage your services.</h5>
                <Button variant="secondary" size="lg" active onClick={this.printToken}>Print Token</Button><br/>
                <footer>
                    <img src={tree} className="tree-logo" alt="tree"/>
                </footer>
            </div>
        );
    }
}