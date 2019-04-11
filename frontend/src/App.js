import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Charts from './components/_charts.js';
import Tables from './components/_tables.js';
import Map from './components/_map.js';


class App extends Component {

  state = {
    chartData: {},
    parsedData: {}
  }

  testAPI = () => {
    fetch('/events/hourly')
      .then(results => results.json())
      .then(results => this.setState({chartData: results}))
      .then( () => this.parseChartData())
      // .then(console.log("Chart data: ",this.state.chartData))
  }

  parseChartData = () => {
    let rawData = (this.state.chartData);
    let parsedData = {};
    console.log("Raw Data: ", rawData);

    rawData.forEach(element => {
      if(!parsedData[element.hour]){
        parsedData[element.hour] = element.events;
      } else {
        parsedData[element.hour] += element.events;
      }
    });

    this.setState({parsedData: parsedData})

    console.log("Parsed data: ", parsedData)
  }

  componentDidMount() {
    this.testAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Test API:
            {JSON.stringify(this.state.chartData)}
          </p>
          <Charts parsedChartData={this.state.parsedData} />
          <Tables data={this.state.chartData}/>
          <Map />
        </header>
      </div>
    );
  }
}

export default App;
