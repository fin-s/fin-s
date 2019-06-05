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
            label: 'other balance',
            data:[400, 350, 200, 150, 100, 50, 0],
            backgroundColor: 'green'
          },
          {
            label: 'Balance',
            data:[300, 250, 210, 200, 195, 187, 175, 130, 100, 70, 60, 50],
            backgroundColor: 'gold'
        }
      ],
      }
    };
  }

  render() {
    return (<div style={this.state.divStyle}>
      <Line data={this.state.chartData}/>
    </div>)
  }
}

export default Chart