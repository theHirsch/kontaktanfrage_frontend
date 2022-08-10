//logic only
import React, { Component, useState, useEffect } from "react";
import { BrowseRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Schedule } from './Pages/Schedule';
// import Header from "./components/Header";
// import Bottom from "./components/Bottom.js";
import { Container } from '@mui/system';
import "./App.css";
import "./index.css"
import qs from 'qs';

// admin view
import Admin from './Pages/admin';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("http://localhost:8080")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}

/*function GetData() {
  const [data, setData] = useState({ apiResponse });

  useEffect(() => {
   // only need to fetch '/home' because of proxy (in the package.json)
    fetch("/home")
    .then(res => res.json())
    .then(data => setData(data))
  }, []) 

  return (
    <div>{data.name}</div>
    <div>{data.age}</div>
  )
} */
  render() {
   const {...config} = this.state;
    return (
      <div>

  
      <Router>
        <Switch>
          <a to={'/'}>Hallo</a>
        </Switch>
      </Router>
      <main>
{ /*            <Header /> */ }
            <Container fluid>
                <Schedule />
            </Container>
      </main>
      </div>
    );

  }
}
export default App;