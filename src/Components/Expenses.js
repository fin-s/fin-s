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

<<<<<<< HEAD
  render() {
    return (
      <div className='grid-container3'>
        <h1>enter other expenses</h1>
        <div className='\37'>
          <input onChange={this.handleChange} name='nickname' placeholder='expense name' type='text' />
          <input onChange={this.handleChange} name='amount' placeholder='amount' type='text' />
        </div>
        <div className='\38'>
          <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' />
          <input type='number' min='1' max='28' placeholder='day' onChange={this.handleChange} name='dueDate' />
        </div>
        <div className='\39'>
          <button onClick={this.confirmExpense} type="button" class="btn btn-outline-secondary" >add expense</button>
          {this.props.expenses.map((current, index) => {
            return <span key={index}>{current.nickname} {current.amount}</span>
          })}
        </div>
        <button type="button" class="btn btn-outline-secondary" id='skip' onClick={() => this.props.history.push('/dashboard')}>skip for now</button>
=======
  render(){
    return(
      <div>
<<<<<<< HEAD
        <input onChange={this.handleChange} name='nickname' placeholder='Expense name' type='text' required/>
        <input onChange={this.handleChange} name='amount' placeholder='Amount' type='number' required/>
        <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' />
        
        <input type='number' min='1' max='28' placeholder='Day of the Month this comes due' onChange={this.handleChange} name='dueDate' required/>

        <button onClick={this.confirmExpense}>Add Expense</button>
=======
        <input onChange={this.handleChange} name='nickname' placeholder='expense name' type='text'/>
        <input onChange={this.handleChange} name='amount' placeholder='amount' type='text'/>
        <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' />
        <input type='number' min='1' max='28' placeholder='day' onChange={this.handleChange} name='dueDate' />
        <button onClick={this.confirmExpense} type="button" class="btn btn-outline-secondary" >add expense</button>
>>>>>>> master
        {this.props.expenses.map((current, index) => {
          return <span key={index}>{current.nickname} {current.amount}</span>
        })}
        <span onClick={()=>this.props.history.push('/dashboard')}>skip for now</span>
>>>>>>> master
      </div>
    )
  }
}

export default withRouter(Expenses)