import 'bootstrap/dist/css/bootstrap.min.css';
import tree from '../../images/tree.png';
import React from 'react';
import '../../css/site.css';

export default function Home() {
    return (
        <div class="text-center">
            <h1 class="display-4">Welcome to AREA</h1>
            <h5>You need to be connected first to manage your services.</h5>
            <footer>
                <img src={tree} className="tree-logo" height="700" width="1135" alt="tree"/>
            </footer>
        </div>
    );
}