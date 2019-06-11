import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Debts extends Component {
  constructor() {
    super()
    this.state = {
      nickname: '',
      balance: null,
      interestRate: null,
      minimumPayment: null,
      notes: '',
      actualPayment: null,
      dueDate: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmDebt = () => {
    let { nickname, balance, interestRate, minimumPayment, actualPayment, dueDate, notes } = this.state
    let newDebt = {
      nickname,
      balance,
      interestRate: interestRate * 100,
      minimumPayment,
      actualPayment,
      notes,
      dueDate

    }
    this.props.updateDebts(newDebt)
  }

  render() {
    return (
      <div className='grid-container2'>
        <div className='\34'>
          <h1>enter debts</h1>
          <input placeholder='account name' onChange={this.handleChange} name='nickname' type='text' />
          <input placeholder='balance' onChange={this.handleChange} name='balance' type='number' />
          <input placeholder='interest rate' type='number' max='100' min='0' onChange={this.handleChange} name='interestRate' type='text' />
        </div>
        <div className='\35'>
          <input placeholder='minimum payment' onChange={this.handleChange} name='minimumPayment' type='text' />
          <input placeholder='actual payment' onChange={this.handleChange} name='actualPayment' type='text' />
          <input type='number' min='1' max='28' placeholder='day' onChange={this.handleChange} name='dueDate' />
        </div>
        <div className='\36'>
          <textarea columns={20} rows={5} placeholder='notes' onChange={this.handleChange} name='notes' />
          <button onClick={this.confirmDebt} type="button" class="btn btn-outline-secondary">add debt</button>
        </div>
        {this.props.debts.map((current, index) => {
          return (
            <span key={index}>{current.nickname} {current.balance}</span>
          )
        })}
        <button id='skip' type="button" class="btn btn-outline-secondary" onClick={() => this.props.history.push('/dashboard')}>skip for now</button>
      </div>
    )
  }
}

export default withRouter(Debts)