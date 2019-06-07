import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Debts extends Component {
  constructor(){
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
    let {nickname, balance, interestRate, minimumPayment, actualPayment, dueDate, notes} = this.state
    let newDebt = {
      nickname,
      balance,
      interestRate,
      minimumPayment,
      actualPayment,
      notes,
      dueDate
      
    }
    this.props.updateDebts(newDebt)
  }

  render(){
    return(
      <div>
        <input placeholder='account name' onChange={this.handleChange} name='nickname' type='text'/>
        <input placeholder='balance' onChange={this.handleChange} name='balance' type='number'/>
        <input placeholder='interest rate' onChange={this.handleChange} name='interestRate' type='text'/>
        <input placeholder='minimum payment' onChange={this.handleChange} name='minimumPayment' type='text' />
        <input placeholder='your average payment' onChange={this.handleChange} name='actualPayment' type='text' />
        <input type='number' min='1' max='28' placeholder='day' onChange={this.handleChange} name='dueDate' />
        <textarea columns={20} rows={5} placeholder='notes' onChange={this.handleChange} name='notes' />
        <button onClick={this.confirmDebt} type="button" class="btn btn-outline-secondary">add debt</button>
        {this.props.debts.map((current, index) => {
          return(
            <span key={index}>{current.nickname} {current.balance}</span>
          )
        })}
        <span onClick={()=>this.props.history.push('/dashboard')}>skip for now</span>
      </div>
    )
  }
}

export default withRouter(Debts)