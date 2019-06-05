import React, {Component} from 'react'


class Expenses extends Component {
  constructor(){
    super()
    this.state = {
      nickname: '',
      amount: null,
      notes: '',
      dueDate: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmExpense = () => {
    let {nickname, amount, notes, dueDate} = this.state
    let newExpense = {
      nickname,
      amount, 
      notes,
      dueDate
    }
    this.props.updateExpenses(newExpense)
  }

  render(){
    return(
      <div>
        <input onChange={this.handleChange} name='nickname' placeholder='Expense name' />
        <input onChange={this.handleChange} name='amount' placeholder='Amount'/>
        <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' />
        <input type='number' min='1' max='28' placeholder='Day of the Month this comes due' onChange={this.handleChange} name='dueDate' />
        <button onClick={this.confirmExpense}>Add Expense</button>
        {this.props.expenses.map((current, index) => {
          return <span key={index}>{current.nickname} {current.amount}</span>
        })}
      </div>
    )
  }
}

export default Expenses