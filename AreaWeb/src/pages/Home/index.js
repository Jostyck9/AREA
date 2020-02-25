import 'bootstrap/dist/css/bootstrap.min.css';
import tree from '../../images/tree.png';
import React from 'react';
import '../../css/site.css';
import { Button } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    printToken() {
       alert(JSON.parse(localStorage.getItem('currentUser')));
    }

    render() {
        var islogged;
        if (localStorage.getItem('currentUser'))
            islogged = <Button variant="secondary" size="lg" active href='creation'>Create an Area</Button>
        else {
            islogged = <div><h1 class="display-4">Welcome to AREA</h1>
                            <h5>You need to be connected first to manage your services.</h5></div>
        }

        return (
            <div class="text-center">
                <br/>
                {islogged}
                <br/><img src={tree} className="tree-logo" alt="tree"/>
            {/* <JSONPretty id="json-pretty" data={this.state.data}></JSONPretty> */}
            </div>
        );
    }
}