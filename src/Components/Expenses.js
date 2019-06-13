import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Expenses extends Component {
  constructor() {
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
    let { nickname, amount, notes, dueDate } = this.state
    let newExpense = {
      nickname,
      amount,
      notes,
      dueDate
    }
    this.props.updateExpenses(newExpense)
  }

  render() {
    return (
      <div className='grid-container3'>
        <h1>enter other expenses</h1>
        <p style={{marginLeft: '15px', width: '80%'}}>This is any other expense: groceries, gas, or food.  If it belongs on your budget, it belongs here</p>
        <div className='seven'>
          <input onChange={this.handleChange} name='nickname' placeholder='expense name' type='text' />
          <input onChange={this.handleChange} name='amount' placeholder='amount' type='text' />
        </div>
        <div className='eight'>
          <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' />
          <input type='number' min='1' max='28' placeholder='day' onChange={this.handleChange} name='dueDate' />
        </div>
        <div className='nine'>
          <button onClick={this.confirmExpense} type="button" className="btn btn-outline-secondary" id="weirdButton" >add expense</button>
          {this.props.expenses.map((current, index) => {
            return <span key={index}>{current.nickname} {current.amount}</span>
          })}
          <button style={{width: '200px'}} onClick={() => this.props.handleSubmitFinances()} type="button" className="btn btn-outline-secondary" >confirm and submit</button>
          {/* <button type="button" className="btn btn-outline-secondary" id='skip' onClick={() => this.props.history.push('/dashboard')}>skip for now</button> */}
        </div>
      </div>
    )
  }
}

export default withRouter(Expenses)