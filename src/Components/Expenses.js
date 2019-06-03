import React, {Component} from 'react'


class Expenses extends Component {
  constructor(){
    super()
    this.state = {
      nickname: '',
      amount: null,
      notes: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmExpense = () => {
    let {nickname, amount, notes} = this.state
    let newExpense = {
      nickname,
      amount, 
      notes
    }
    this.props.updateExpenses(newExpense)
  }

  render(){
    return(
      <div>
        <input onChange={this.handleChange} name='nickname' placeholder='Expense name' />
        <input onChange={this.handleChange} name='amount' placeholder='Amount'/>
        <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' />
        <button onClick={this.confirmExpense}>Add Expense</button>
        {this.props.expenses.map((current, index) => {
          return <span key={index}>{current.nickname} {current.amount}</span>
        })}
      </div>
    )
  }
}

export default Expenses