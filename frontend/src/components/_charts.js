import React from "react";

const Chart = require("chart.js")

class Charts extends React.Component {

  ////////////////////
  // Functions

  renderChart = () => {

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
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
      }
    });

  }

  componentDidMount(){

    this.renderChart();

  };

  componentDidUpdate(){

    this.renderChart();

  }

  render() {
    if (this.props.parsedChartData){
      return (
        <div>
          <canvas id="bar-chart" width="800" height="450"></canvas>
        </div>
      );
    } else {
      return <p>Loading...</p>
    }
  }
}

export default Charts;
