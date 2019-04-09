import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        </header>
      </div>
    );
  }
}

export default App;
