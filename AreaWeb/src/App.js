import React from 'react';
import { Router } from "react-router-dom";
import './css/site.css';
import Routes from "./routes";
import history from "./history";

function App() {
  return (
  <Router history={history}>
      <Routes />
  </Router>
  );
}

export default App;