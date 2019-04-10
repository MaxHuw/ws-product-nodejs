import React from "react";
import { isArray } from "util";

const Chart = require("chart.js")

class Charts extends React.Component {

  state = {
    parsedData: this.props.parsedChartData
  }

  componentDidMount(){
    
    console.log(this.props.parseChartData);
    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: Object.keys(this.props.parsedChartData),
        datasets: [
          {
            label: "Number of Events",
            backgroundColor: "#3e95cd",
            data: Object.values(this.props.parsedChartData)
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Number of Events by Hour.'
        }
      }
    });

  };

  componentDidUpdate(){

    console.log(this.props.parsedChartData);

    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: Object.keys(this.props.parsedChartData),
        datasets: [
          {
            label: "Number of Events",
            backgroundColor: "#3e95cd",
            data: Object.values(this.props.parsedChartData)
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Number of Events by Hour.'
        }
      }
    });

  }

  render() {
    return (
      <div>
        <p>This is where the Charts will go.</p>
        {/* {JSON.stringify(this.props.chartData)} */}
        <canvas id="bar-chart" width="800" height="450"></canvas>
      </div>
    );
  }
}

export default Charts;
