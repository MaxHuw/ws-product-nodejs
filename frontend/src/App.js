import React, { Component } from 'react';
import './App.css';
import Charts from './components/_charts.js';
import Tables from './components/_tables.js';
import Map from './components/_map.js';


class App extends Component {

  // Keeping all data in state on the App level, everything trickles
  // down from here to the individual components.

  state = {
    chartData: {},
    parsedData: {},
    endDate: '2017-04-23',
    startDate: '2017-01-01',
    selectedGeoData: "events",
    filteredGeoData: []

  }

  getChartData = () => {
    fetch('/events/hourly')
      .then(results => results.json())
      .then(results => this.setState({chartData: results}))
      .then( () => this.parseChartData())
  };

  // Fetch data from poi api for basic map testing.
  poiData = () => {
    fetch('/poi')
      .then(results => results.json())
      .then(results => this.setState({geoData: results}))
  }

  // Parsed the API data for the chart to make is easier to implement.
  parseChartData = () => {
    let rawData = (this.state.chartData);
    let parsedData = {};

    rawData.forEach(element => {
      if(!parsedData[element.hour]){
        parsedData[element.hour] = element.events;
      } else {
        parsedData[element.hour] += element.events;
      }
    });

    this.setState({parsedData: parsedData})

  }

  // For user to selecte metrics for the Geo visualizer.

  selectedGeoData = (event) => {
    this.setState({selectedGeoData: event.target.value});
  }

  // Function for making the individual API calls based on the input data.
  // Queries either the Events or Stats API based on the selected data.

  filterGeoData = (event) => {
    event.preventDefault();

    //TODO Check that date inputs are valid.

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

  // Change handlers for the dates for the geo data visualizer.

  handleChangeStartDate = (event) => this.setState({startDate: event.target.value});
  handleChangeEndDate = (event) => this.setState({endDate: event.target.value});


  componentDidMount() {

    this.getChartData();
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="chart-container component-container">
            <Charts parsedChartData={this.state.parsedData} getChartData={this.getChartData} />
          </div>
          
          <div className="table-container component-container">
            <Tables data={this.state.chartData}/>
          </div>

          <div className="map-container component-container">
            <Map geoData={this.state.geoData} filteredGeoData={this.state.filteredGeoData} filterGeoData={this.filterGeoData} selectedGeoData={this.state.selectedGeoData} handleChangeStartDate={this.handleChangeStartDate} handleChangeEndDate={this.handleChangeEndDate} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
