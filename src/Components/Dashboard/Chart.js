import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divStyle:{width:720, height:360},
      chartData: {
        labels: [ "jan","feb","mar","apr","may","jun","july","aug","sept","oct","nov","dec"],
        datasets:[
          {
            label: 'Credit Card',
            fill: true,
            data:[400, 350, 200, 150, 100, 50, 0],
            backgroundColor: 'rgba(41, 223, 32, 0.2)',
            borderColor:'rgb(41, 223, 32)'
          },
          {
            label: 'Student Loan',
            fill: true,
            borderColor: 'rgb(223, 207, 32)',
            data:[300, 250, 210, 200, 195, 187, 175, 130, 100, 70, 60, 50],
            backgroundColor: 'rgba(223, 207, 32, 0.2)'
        }
      ],
      }
    };
  }

  render() {
    return (<div className='chartDiv'>
      <Line data={this.state.chartData} 
      options={{
        title:{display:true, text:'Debt payoff timeline', fontSize: '20', fontColor:'#DACE94'}, 
        legend: { position: 'bottom', display: true, labels: { fontColor: '#DACE94'}},
        scales: {
          yAxes: [{
            ticks: {
              fontColor:'#DACE94',
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return '$' + value;
                  }
              }
          }],
          xAxes: [{
            ticks: {
              fontColor:'#DACE94' 
              }
          }]
      }
        }} />
    </div>)
  }
}

export default Chart