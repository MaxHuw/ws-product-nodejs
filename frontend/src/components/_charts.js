import React from "react";

const Chart = require("chart.js")

class Charts extends React.Component {

  renderChart = () => {

    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: Object.keys(this.props.chartData),
        datasets: [
          {
            label: "Number of Events",
            backgroundColor: "#3e95cd",
            data: Object.values(this.props.chartData)
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          fontSize: 24,
          text: 'Total Number of Events by Hour'
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
    if (this.props.chartData){
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
