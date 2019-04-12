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
    fetch('/events/hourly/:userInput')
      .then(results => results.json())
      .then(results => this.setState({chartData: results}))
      .then( () => this.parseChartData())
      // .then(console.log("Chart data: ",this.state.chartData))
  };

  poiData = () => {
    fetch('/poi')
      .then(results => results.json())
      .then(results => this.setState({geoData: results}))
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

  selectedGeoData = (event) => {
    this.setState({selectedGeoData: event.target.value});
  }

  componentDidMount() {
    // this.testAPI();
    this.poiData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="chart-container">
            <Charts parsedChartData={this.state.parsedData} testAPI={this.testAPI} />
          </div>
          
          <div className="table-container">
            <Tables data={this.state.chartData}/>
          </div>

          <div className="map-container">
            <Map geoData={this.state.geoData} selectedGeoData={this.selectedGeoData}/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
