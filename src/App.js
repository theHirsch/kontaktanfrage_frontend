//logic only
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {DayPilot, DayPilotScheduler, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import Header from "./components/Header";
import Bottom from "./components/Bottom.js";
import "./App.css";
import "./index.css"
import Stack from '@mui/material/Stack';
import qs from 'qs';


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
      <main>
      <Header />
      <p className="App-intro">;{this.state.apiResponse}</p>
      <Bottom />
      </main>
    );
  }
}
export default App;