import React, {Component} from 'react'

class Debts extends Component {
  constructor(){
    super()
    this.state = {
      nickname: '',
      balance: null,
      interestRate: null,
      minimumPayment: null,
      notes: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmDebt = () => {
    let {nickname, balance, interestRate, minimumPayment, notes} = this.state
    let newDebt = {
      nickname,
      balance,
      interestRate,
      minimumPayment,
      notes
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
        <textarea columns={20} rows={5} placeholder='Notes' onChange={this.handleChange} name='notes' />
        <button onClick={this.confirmDebt}>Add Debt</button>
        {this.props.debts.map((current, index) => {
          return(
            <span key={index}>{current.nickname} {current.balance}</span>
          )
        })}
      </div>
    )
  }
}

export default Debts