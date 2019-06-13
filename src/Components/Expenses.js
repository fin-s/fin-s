import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Expenses extends Component {
  constructor() {
    super()
    this.state = {
      nickname: '',
      amount: '',
      notes: '',
      dueDate: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmExpense = (e) => {
    e.preventDefault()
    let { nickname, amount, notes, dueDate } = this.state
    let newExpense = {
      nickname,
      amount,
      notes,
      dueDate
    }
    this.props.updateExpenses(newExpense)
    this.setState({
      nickname: '',
      amount: '',
      notes: '',
      dueDate: ''
    })
  }

  render() {
    return (
      <div className='grid-container3'>
        <div><h1>enter other expenses</h1>
        <p style={{ marginLeft: '15px', width: '80%', marginTop:'15px'}}>This is any other expense: groceries, gas, or food.  If it belongs on your budget, it belongs here</p></div>
        <form onSubmit={(e) => {this.confirmExpense(e)}}>
          <div className='seven'>
            <input
              onChange={this.handleChange}
              name='nickname'
              placeholder='expense name'
              type='text'
              maxLength='25'
              value={this.state.nickname}
              required />
            <input
              onChange={this.handleChange}
              name='amount'
              placeholder='amount'
              type='number'
              value={this.state.amount}
              required />
          </div>
          <div className='eight'>
            <input
              type='number'
              min='1'
              max='28'
              placeholder='due date'
              onChange={this.handleChange}
              name='dueDate'
              value={this.state.dueDate}
              required />
            <input onChange={this.handleChange} type='text' name='notes' value={this.state.notes} placeholder='notes' />
            <button type="submit" className="btn btn-outline-secondary" id="weirdButton" >add expense</button>
          </div>
        </form>
        <div className='nine'>

          {this.props.expenses.map((current, index) => {
            return <p key={index}>{current.nickname}: ${current.amount}</p>
          })}
          <button style={{ width: '200px' }} onClick={() => this.props.handleSubmitFinances()} type="button" className="btn btn-outline-secondary" >confirm and submit</button>
          {/* <button type="button" className="btn btn-outline-secondary" id='skip' onClick={() => this.props.history.push('/dashboard')}>skip for now</button> */}
        </div>
      </div>
    )
  }
}

export default withRouter(Expenses)