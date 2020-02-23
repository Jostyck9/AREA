import React from 'react';
import './globals.js'
import ReactDOM from 'react-dom';
import './css/site.css';
import * as serviceWorker from './serviceWorker';
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
