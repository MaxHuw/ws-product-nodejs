import React, { Component } from 'react';
import './App.css';
import Charts from './components/_charts.js';
import Tables from './components/_tables.js';
import Map from './components/_map.js';


class App extends Component {

  state = {
    chartData: {},
    parsedData: {},
    endDate: '2017-04-23',
    startDate: '2017-01-01',
    selectedGeoData: "events",
    filteredGeoData: []

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

  filterGeoData = (event) => {
    event.preventDefault();

    if (this.state.selectedGeoData === "events"){
      fetch(`/events/all/?selection=${this.state.selectedGeoData}&start=${this.state.startDate}&end=${this.state.endDate}`)
        .then(results => results.json())
        .then(results => this.setState({filteredGeoData: results}))
    } else {
      fetch(`/stats/all/?selection=${this.state.selectedGeoData}&start=${this.state.startDate}&end=${this.state.endDate}`)
        .then(results => results.json())
        .then(results => this.setState({filteredGeoData: results}))
    }
  }

  handleChangeStartDate = (event) => this.setState({startDate: event.target.value});
  handleChangeEndDate = (event) => this.setState({endDate: event.target.value});


  componentDidMount() {
    // this.testAPI();
    // this.poiData();
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
            <Map geoData={this.state.geoData} filteredGeoData={this.state.filteredGeoData} filterGeoData={this.filterGeoData} selectedGeoData={this.state.selectedGeoData} handleChangeStartDate={this.handleChangeStartDate} handleChangeEndDate={this.handleChangeEndDate} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
