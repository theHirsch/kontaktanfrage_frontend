//logic only
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import Header from ".src/components/Header";
import "./App.css";
import qs from 'qs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
    };
  
  }

  render() {
    const {...config} = this.state;
    return (
      <div>
        <DayPilotCalendar 
         {...config}/>
         <main>
          <Header />
         </main>
      </div>
    );
  }
}
export default App;