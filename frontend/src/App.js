import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Charts from './components/_charts.js';
import Table from './components/_table.js';
import Map from './components/_map.js';


class App extends Component {

  state = {
    data: 'Loading...'
  }

  testAPI = () => {
    fetch('/events/hourly')
      .then(results => results.json())
      .then(results => this.setState({data: results}))
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
            {JSON.stringify(this.state.data)}
          </p>
          <Charts />
          <Table />
          <Map />
        </header>
      </div>
    );
  }
}

export default App;
