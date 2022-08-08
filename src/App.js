//logic only
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {DayPilot, DayPilotScheduler, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import Header from "./components/Header";
import Bottom from "./components/Bottom.js"
import "./App.css";
import qs from 'qs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "Resources",
      treeEnabled: true,
      // ..
    };
  }

  componentDidMount() {
    this.resourcesDays();
    this.resourcesTimes();
  }

  resourcesDays() {
    const columns = [
      { name: "Montag", id: "G1"},
      { name: "Dienstag", id: "G2"},
      { name: "Mittwoch", id: "G3"},
      { name: "Donnerstag", id: "G4"},
      { name: "Freitag", id: "G5"}
    ];
     this.setState({
      columnWidthSpec: "Auto",
      columns
    });
  }

  resourcesTimes() {
    const resources = [
      { name: "08:00 - 10:00", id: "T1"},
      { name: "10:00 - 12:00", id: "T2"},
      { name:"12:00 - 14:00", id: "T3"},
      { name: "14:00 - 16:00", id: "T4"},
      { name: "16:00 - 18:00", id: "T5"},
      { name: "18:00 - 20:00", id: "T6"}
    ];
     this.setState({
      rowWidthSpec: "Auto",
      rowHeightSpec: "Auto",
      resources
    });
  }
  render() {
    const {...config} = this.state;
    return (
      <main>
      <Header />
      <div id="calender">
        <DayPilotCalendar 
         {...config}
         ref={component => {
          this.calendar = component && component.control; }}/>
      </div>
      <Bottom />
      </main>
    );
  }
}
export default App;