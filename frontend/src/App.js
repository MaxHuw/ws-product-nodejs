import React, { Component } from 'react';
import './App.css';
import Charts from './components/_charts.js';
import Tables from './components/_tables.js';
import Map from './components/_map.js';


class App extends Component {

  state = {
    chartAndTableData: {},
    formatedChartData: {}
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
            <Map />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
