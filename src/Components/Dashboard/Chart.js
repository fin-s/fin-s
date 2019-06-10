import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divStyle:{width:720, height:360},
      chartData: {
        labels: [],
        datasets:[],
      }
    };
  }

  async componentDidMount() {
    let user = await axios.get('/api/users')
    let userDataSets = []
    user.data.debts.forEach((current) => {
      let {nickname, minimumPayment, interestRate, balance, actualPayment} = current
      let dataSet = {
        label: nickname,
        fill: true,
        data:this.getDebtData(interestRate, balance, minimumPayment, actualPayment),
        backgroundColor: 'rgba(41, 223, 32, 0.2)',
        borderColor:'rgb(41, 223, 32)'
      }
      userDataSets.push(dataSet)
    })
    console.log(userDataSets)
    this.setState({
      chartData: {
        labels: this.getDataLabels(userDataSets),
        datasets: userDataSets
      }
    })
    // console.log(`USER DATA IS: ${user}`)
  }
// debt object example
//   actualPayment:
// 500
// balance:
// 3000
// dueDate:
// 10
// interestRate:
// 1529
// minimumPayment:
// 100
// nickname:
// "Credit card 2"
getDataLabels = userDataSets => {
  let longestPayoff = 0;
  userDataSets.forEach(current => {
    if (current.data.length > longestPayoff) {
      longestPayoff = current.data.length;
    }
  });
  let labelArr = [];
  let date = new Date()
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
    }
    if(month === 11){
      year++
      month = -1
    }
    month++
  }
  return labelArr
};

getDebtData = (interestRate, balance, minimumPayment, actualPayment) => {
  let payments = []
while(balance > 0){
  let interestPayment = (interestRate / 120000) * balance
  let principlePayment = actualPayment -interestPayment
  balance -= principlePayment
  if (balance < 0){
    balance = 0
  }
payments.push(Math.floor(balance))
}
return payments
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