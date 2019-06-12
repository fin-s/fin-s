import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Slider from "./Slider";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divStyle: { width: 720, height: 360 },
      chartData: {
        labels: [],
        datasets: []
      },
      dataSets: [],
      userDebts: [],
      surplusToAdd: 0,
      debtDisplayIndex: 0
    };
  }

  async componentDidMount() {
    this.setChart()
  }

  formatDebts = () => {
   let debts = this.state.userDebts.map((current) => {
     let { nickname, minimumPayment, interestRate, balance, actualPayment } = current;
     actualPayment += this.state.surplusToAdd
     let middlePayment = minimumPayment + this.state.surplusToAdd
     return(
       [
         {  
          label: `${nickname} minimum`,
          fill: true,
          data: this.getDebtData(interestRate, balance, minimumPayment),
          backgroundColor:'rgba(198, 0, 0, 0.2)',
          borderColor: 'rgb(198, 0, 0)'
         },
         {
          label: `${nickname} minimum + surplus`,
          fill: true,
          data: this.getDebtData(interestRate, balance, middlePayment),
          backgroundColor:'rgba(198, 200, 0, 0.2)',
          borderColor: 'rgb(198, 200, 0)'
         },
         {
          label: `${nickname} actual + surplus`,
          fill: true,
          data: this.getDebtData(interestRate, balance, actualPayment),          backgroundColor:'rgba(41, 223, 32, 0.2)',
          borderColor: 'rgb(41, 223, 32)'
         }
       ]
     )
   })
   console.log(debts)
   this.setState({
     dataSets: debts
   })
  }

  setChart = async () => {
    let user = await axios.get("/api/users");
    this.setState({ userDebts: user.data.debts })
    this.formatDebts()
    this.setState({
      chartData: {
        labels: this.getDataLabels(this.state.dataSets[this.state.debtDisplayIndex]),
        datasets: this.state.dataSets[this.state.debtDisplayIndex]
      }
    });
  };

  getDataLabels = userDataSets => {
    let longestPayoff = 0;
    userDataSets.forEach(current => {
      if (current.data.length > longestPayoff) {
        longestPayoff = current.data.length;
      }
    });
    let labelArr = [];
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    for (let i = 0; i < longestPayoff; i++) {
      switch (month) {
        case 0:
          labelArr.push(`January ${year}`);
          break;
        case 1:
          labelArr.push(`February ${year}`);
          break;
        case 2:
          labelArr.push(`March ${year}`);
          break;
        case 3:
          labelArr.push(`April ${year}`);
          break;
        case 4:
          labelArr.push(`May ${year}`);
          break;
        case 5:
          labelArr.push(`June ${year}`);
          break;
        case 6:
          labelArr.push(`July ${year}`);
          break;
        case 7:
          labelArr.push(`August ${year}`);
          break;
        case 8:
          labelArr.push(`September ${year}`);
          break;
        case 9:
          labelArr.push(`October ${year}`);
          break;
        case 10:
          labelArr.push(`November ${year}`);
          break;
        case 11:
          labelArr.push(`December ${year}`);
          break;
          default:
            break
      }
      if (month === 11) {
        year++;
        month = -1;
      }
      month++;
    }
    return labelArr;
  };

  getDebtData = (interestRate, balance, payment) => {
    let payments = [];
    while (balance > 0) {
      let interestPayment = (interestRate / 120000) * balance;
      let principlePayment = payment - interestPayment;
      balance -= principlePayment;
      if (balance < 0) {
        balance = 0;
      }
      payments.push(Math.floor(balance));
    }
    return payments;
  };

  nextDebt = () => {
    if (this.state.debtDisplayIndex === this.state.dataSets.length - 1) {
      this.setState({
        debtDisplayIndex: 0
      });
    } else {
      this.setState({
        debtDisplayIndex: this.state.debtDisplayIndex + 1
      });
    }
    this.setChart()
  };

  previousDebt = () => {
    if (this.state.debtDisplayIndex === 0) {
      this.setState({
        debtDisplayIndex: this.state.dataSets.length - 1
      });
    } else {
      this.setState({
        debtDisplayIndex: this.state.debtDisplayIndex - 1
      });
    }
    this.setChart()
  };

  getSurplusSliderData = update => {
    this.setState({
      surplusToAdd: update[0]
    });
    this.setChart();
  };

  render() {
    return (
      <div className="chartDiv">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Debt payoff timeline",
              fontSize: "20",
              fontColor: "#DACE94"
            },
            legend: { position: 'bottom', display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "#DACE94",
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                      return "$" + value;
                    }
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "#DACE94"
                  }
                }
              ]
            }
          }}
        />
        <Slider
          onUpdate={this.getSurplusSliderData}
          surplus={this.props.surplus}
        />
        <button onClick={this.previousDebt}>Previous</button>
        <button onClick={this.nextDebt}>Next</button>
      </div>
    );
  }
}

export default Chart;
