import React, { Component } from 'react';
import './App.css';
import Charts from './components/_charts.js';
import Tables from './components/_tables.js';
import Map from './components/_map.js';
import styled from "styled-components";


////////////////////////////
// Styling

const ChartContainer = styled.div`
  margin-top: 30px;
  margin-bottom:15px;
  align-content: center;
  width: 900px;
  background: white;
  border-radius: 20px;
  padding: 20px;
`

const TableContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 900px;
  background: white;
  border-radius: 20px;
  padding: 20px;
`

const MapContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  width: 900px;
  background: white;
  border-radius: 20px;
  padding: 20px;
`
//////////////////////


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
          
          <ChartContainer>
            <Charts chartData={this.state.formatedChartData} getChartAndTableData={this.getChartAndTableData} />
          </ChartContainer>
          
          <TableContainer>
            <Tables data={this.state.chartAndTableData}/>
          </TableContainer>

          <MapContainer>
            <Map />
          </MapContainer>
        </header>
      </div>
    );
  }
}

export default App;
