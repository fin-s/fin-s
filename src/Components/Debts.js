import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Debts extends Component {
  constructor() {
    super()
    this.state = {
      nickname: '',
      balance: '',
      interestRate: '',
      minimumPayment: '',
      notes: '',
      actualPayment: '',
      dueDate: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmDebt = (e) => {
    e.preventDefault()
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
    this.setState({
      nickname: '',
      balance: '',
      interestRate: '',
      minimumPayment: '',
      actualPayment: '',
      dueDate: '',
      notes: ''
    })
  }

  render() {
    return (
      <form onSubmit={(e) => this.confirmDebt(e)} className='grid-container2'>
        <div className='four'>
          <h1>enter debts</h1>
          <p style={{ marginLeft: '15px', width: '80%', marginTop: '10px', marginBottom: '10px' }}>This is anything with an interest rate: mortgage, credit card, or loan</p>
          <input
            placeholder='account name'
            onChange={this.handleChange}
            name='nickname'
            type='text'
            maxLength='25'
            value={this.state.nickname}
            required />
          <input
            placeholder='balance'
            onChange={this.handleChange}
            name='balance'
            type='number'
            value={this.state.balance}
            required />
          <input
            placeholder='interest %'
            type='number'
            max='50'
            min='1'
            onChange={this.handleChange}
            name='interestRate'
            step='any'
            value={this.state.interestRate}
            required />
        </div>

        <div className='five'>
          <input 
          placeholder='minimum payment' 
          onChange={this.handleChange} 
          name='minimumPayment'
          min={((this.state.interestRate/1200)*this.state.balance) * 1.1}
          step='any'
          type='number'
          value={this.state.minimumPayment} 
          required/>
          <input 
          placeholder='actual payment' 
          onChange={this.handleChange} 
          name='actualPayment' 
          type='number' 
          step='any'
          min={((this.state.interestRate/1200)*this.state.balance) * 1.1}
          value={this.state.actualPayment}
          required/>
          <input 
          type='number' 
          min='1' 
          max='28' 
          placeholder='due date' 
          onChange={this.handleChange} 
          name='dueDate' 
          value={this.state.dueDate}
          required/>
        </div>
        
        <div className='six'>
          <input
          type='text' 
          placeholder='notes' 
          onChange={this.handleChange} 
          value={this.state.notes}
          name='notes' />
          <button type="submit" className="btn btn-outline-secondary">add debt</button>
        {this.props.debts.map((current, index) => {
          return (
            <p key={index}>{current.nickname}:  ${current.balance}</p>
            )
          })}
        {/* <button id='skip' type="button" class="btn btn-outline-secondary" onClick={() => this.props.history.push('/dashboard')}>skip for now</button> */}
          </div>
      </form>
    )
  }
}

export default withRouter(Debts)