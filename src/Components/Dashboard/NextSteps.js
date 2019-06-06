import React, { Component } from "react";
import axios from 'axios'

class NextSteps extends Component {
  constructor(){
    super()

    this.state= {
      stepsCompleted: []
    }
  }

  componentDidMount() {
    axios.get('/api/todos')
    .then(res => {
      this.setState({
        stepsCompleted: res.data
      })
    })
    .catch(() => console.log('You have an error in your CDM in NextSteps.js'))
  }

  async componentWillUnmount() {
    await axios.post('/api/todos', this.state.stepsCompleted)
  }

  handleClick(i) {
    let copiedComplete = [...this.state.stepsCompleted]
    if (copiedComplete[i] === 0) {
      copiedComplete[i] = 1
    } else {
      copiedComplete[i] = 0
    }
    this.setState({
      stepsCompleted: copiedComplete
    })
  }

  render() {
    return (
      <div>
        <h3>NextSteps</h3>
        <div name="progress-bar" />
        <div className='stepContainer'>
          <div className="step">
            <h5>Step 1:</h5>
            <p>Set up a high interest savings account</p>
            <button
            onClick={() => {this.handleClick(0)}}>
            x</button>
          </div>
          <div className="step">
            <h5>Step 2:</h5>
            <p>Set all payments on auto-pay to avoid late fees and penalties</p>
            <button
            onClick={() => {this.handleClick(1)}}>
            x</button>
          </div>
          <div className="step">
            <h5>Step 3:</h5>
            <p>Build a $1000 emergency fund as quick as possible</p>
            <button
            onClick={() => {this.handleClick(2)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 4:</h5>
            <p>If your company has a retirement plan match makes sure to maximize the match and get the free monet</p>
            <button
            onClick={() => {this.handleClick(3)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 5:</h5>
            <p>Set all debt payments to the minimum except the smallest</p>
            <button
            onClick={() => {this.handleClick(4)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 6:</h5>
            <p>Pay off the smallest debt with every dollar you can scrap</p>
            <button
            onClick={() => {this.handleClick(5)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 7:</h5>
            <p>Once you have paid off the smallest debt roll that payment to the next smallest debt</p>
            <button
            onClick={() => {this.handleClick(6)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 8:</h5>
            <p>build a 3-6 month emergency fund</p>
            <button
            onClick={() => {this.handleClick(7)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 9:</h5>
            <p>Set up a Roth IRA and maximize contributions for the year</p>
            <button
            onClick={() => {this.handleClick(8)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 10:</h5>
            <p>Contribute 15% or more of your income to tax-advantaged accounts</p>
            <button
            onClick={() => {this.handleClick(9)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 11:</h5>
            <p>Move towards paying off your mortgage early</p>
            <button
            onClick={() => {this.handleClick(10)}}>x</button>
          </div>
          <div className="step">
            <h5>Step 12:</h5>
            <p>Invest in alternative income streams</p>
            <button
            onClick={() => {this.handleClick(11)}}>x</button>
          </div>
        </div>
      </div>
    )
  }
}
export default NextSteps
