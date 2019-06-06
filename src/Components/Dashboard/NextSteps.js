import React, { Component } from "react";

class NextSteps extends Component {
  constructor(){
    super()

    this.state= {
      stepsCompleted: []
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 2:</h5>
            <p>Set all payments on auto-pay to avoid late fees and penalties</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 3:</h5>
            <p>Build a $1000 emergency fund as quick as possible</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 4:</h5>
            <p>If your company has a retirement plan match makes sure to maximize the match and get the free monet</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 5:</h5>
            <p>Set all debt payments to the minimum except the smallest</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 6:</h5>
            <p>Pay off the smallest debt with every dollar you can scrap</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 7:</h5>
            <p>Once you have paid off the smallest debt roll that payment to the next smallest debt</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 8:</h5>
            <p>build a 3-6 month emergency fund</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 9:</h5>
            <p>Set up a Roth IRA and maximize contributions for the year</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 10:</h5>
            <p>Contribute 15% or more of your income to tax-advantaged accounts</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 11:</h5>
            <p>Move towards paying off your mortgage early</p>
            <button>x</button>
          </div>
          <div className="step">
            <h5>Step 12:</h5>
            <p>Invest in alternative income streams</p>
            <button>x</button>
          </div>
        </div>
      </div>
    )
  }
}
export default NextSteps
