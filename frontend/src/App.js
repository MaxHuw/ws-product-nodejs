import React, { Component } from 'react';
import './App.css';
import Charts from './components/_charts.js';
import Tables from './components/_tables.js';
import Map from './components/_map.js';


class App extends Component {

  state = {
    chartAndTableData: {},
    formatedChartData: {},
    endDate: '2017-04-23',
    startDate: '2017-01-01',
    selectedGeoData: "events",
    filteredGeoData: []

  }

  getChartAndTableData = () => {
    fetch('/events/hourly')
      .then(results => {
        if(results.status === 500){
          window.alert("Rate Limit Exceeded.");
          throw new Error(results.status)
        } else return results.json();
      })
      .then(results => this.setState({chartAndTableData: results}))
      .then( () => this.formatDataForChart())
      .catch(error => {
        console.log("Error: ", error)
      })
  };

  // Fetch data from poi api for basic map testing.
  poiData = () => {
    fetch('/poi')
      .then(results => {
        if(results.status === 500){
          window.alert("Rate Limit Exceeded.");
          throw new Error(results.status)
        } else return results.json();
      })
      .then(results => this.setState({geoData: results}))
      .catch(error => {
        console.log("Error: ", error)
      })
  }

  // Parsed the API data for the chart to make is easier to implement.
  formatDataForChart = () => {
    let rawData = (this.state.chartAndTableData);
    let formatedChartData = {};

    rawData.forEach(element => {
      if(!formatedChartData[element.hour]){
        formatedChartData[element.hour] = element.events;
      } else {
        formatedChartData[element.hour] += element.events;
      }
    });

    this.setState({formatedChartData: formatedChartData})

  }

  // For user to selecte metrics for the Geo visualizer.

  // selectGeoData = (event) => {
  //   this.setState({selectedGeoData: event.target.value});
  // }

  // Function for making the individual API calls based on the input data.
  // Queries either the Events or Stats API based on the selected data.

  filterGeoData = (event) => {
    event.preventDefault();

    //TODO Check that date inputs are valid.

    if (this.state.selectedGeoData === "events"){
      fetch(`/events/all/?selection=${this.state.selectedGeoData}&start=${this.state.startDate}&end=${this.state.endDate}`)
        .then(results => {
          if(results.status === 500){
            window.alert("Rate Limit Exceeded.");
            throw new Error(results.status)
          } else return results.json();
        })
        .then(results => this.setState({filteredGeoData: results}))
        .catch(error => {
          console.log("Error: ", error)
        })
    } else {
      fetch(`/stats/all/?selection=${this.state.selectedGeoData}&start=${this.state.startDate}&end=${this.state.endDate}`)
        .then(results => {
          if(results.status === 500){
            window.alert("Rate Limit Exceeded.");
            throw new Error(results.status)
          } else return results.json();
        })
        .then(jsonResults => this.setState({filteredGeoData: jsonResults}))
        .catch(error => {
          console.log("Error: ", error)
        })
    }
  }

  // Change handlers for the dates for the geo data visualizer.

  // handleChangeStartDate = (event) => this.setState({startDate: event.target.value});
  // handleChangeEndDate = (event) => this.setState({endDate: event.target.value});


  componentDidMount() {

    this.getChartAndTableData();
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="chart-container component-container">
            <Charts chartData={this.state.formatedChartData} getChartAndTableData={this.getChartAndTableData} />
          </div>
          
          <div className="table-container component-container">
            <Tables data={this.state.chartAndTableData}/>
          </div>

          <div className="map-container component-container">
            <Map geoData={this.state.geoData} filteredGeoData={this.state.filteredGeoData} filterGeoData={this.filterGeoData} selectedGeoData={this.state.selectedGeoData} selectGeoData={this.selectGeoData} handleChangeStartDate={this.handleChangeStartDate} handleChangeEndDate={this.handleChangeEndDate} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
