import React, { Component } from 'react'
import ProfileExpense from './ProfileExpense'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ExpenseColumn extends Component {

  state = {
    nickname: '',
    amount: null,
    dueDate: null,
    notes: '',
    edit: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddExpense = (e) => {
    e.preventDefault()
    const { nickname, amount, dueDate, notes } = this.state
    const expense = {
      nickname,
      amount,
      dueDate,
      notes
    }

    this.props.handleAddExpense(expense)
  }

  toggleAddDebt = () => {

    this.setState({
      edit: !this.state.edit
    })
  }



  render() {
    return (
      <>
        <div className="column-head">
          <h1 className="column-title">Expenses</h1>
          <div className="add-new-title" onClick={this.toggleAddDebt}>
            <FontAwesomeIcon icon='plus-circle' />
            <p>Add new expense</p>
          </div>
        </div>
        {this.state.edit ?
          <form onSubmit={(e) => this.handleAddExpense(e)} className='add-form'>
            <div className="ProfileIncome-form-line">
              <p>expense name</p>
              <input onChange={(e) => this.handleChange(e)} name='nickname' type="text" />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Amount</p>
              $<input onChange={(e) => this.handleChange(e)} name='amount' type="number" step='any' />
              <p>Due Date</p>
              <input onChange={(e) => this.handleChange(e)} name='dueDate' type="number" />
            </div>
            <p>Notes</p>
            <input onChange={(e) => this.handleChange(e)} type="text" name='notes' />
            <button type='submit' class="btn btn-outline-secondary">Submit</button>

          </form> : <></>}

        {this.props.data.map(element => {
          return <ProfileExpense fetchUserInfo={this.props.fetchUserInfo} key={element._id} expense={element} />
        })}
      </>
    )
  }
}

export default ExpenseColumn