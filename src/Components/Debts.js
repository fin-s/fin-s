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
        <input placeholder='Account Name' onChange={this.handleChange} name='nickname'/>
        <input placeholder='Balance' onChange={this.handleChange} name='balance' />
        <input placeholder='Interest Rate' onChange={this.handleChange} name='interestRate' />
        <input placeholder='Minimum Payment' onChange={this.handleChange} name='minimumPayment' />
        <input placeholder='Your Average Payment' onChange={this.handleChange} name='actualPayment' />
        <input type='number' min='1' max='28' placeholder='Day of the Month this comes due' onChange={this.handleChange} name='dueDate' />
        <textarea columns={20} rows={5} placeholder='Notes' onChange={this.handleChange} name='notes' />
        <button onClick={this.confirmDebt}>Add Debt</button>
        {this.props.debts.map((current, index) => {
          return(
            <span key={index}>{current.nickname} {current.balance}</span>
          )
        })}
        <span onClick={()=>this.props.history.push('/dashboard')}>Skip for now</span>
      </div>
    )
  }
}

export default withRouter(Debts)