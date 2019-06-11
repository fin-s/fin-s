import React, { Component } from 'react'
import ProfileDebt from './ProfileDebt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DebtColumn extends Component {

  state = {
    nickname: '',
    balance: null,
    interestRate: null,
    dueDate: null,
    minimumPayment: null,
    actualPayment: null,
    notes: '',
    edit: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddDebt = (e) => {
    e.preventDefault()
    const { nickname, balance, interestRate, dueDate, minimumPayment, actualPayment, notes } = this.state
    const debt = {
      nickname,
      balance,
      interestRate: interestRate * 100,
      dueDate,
      minimumPayment,
      actualPayment,
      notes
    }

    this.props.handleAddDebt(debt)
  }

  toggleAddDebt = () => {

    this.setState({
      edit: !this.state.edit
    })
  }



  render() {
    return (
      <>
        <h1 className="column-title">Debts</h1>
        <div className="add-new-title" onClick={this.toggleAddDebt}>
          <FontAwesomeIcon icon='plus-circle' />
          <p>Add new debt</p>
        </div>
        {this.state.edit ?
          <form onSubmit={(e) => this.handleAddDebt(e)} className='add-form'>
            <div className="ProfileIncome-form-line"><p>debt name</p>
              <input onChange={(e) => this.handleChange(e)} name='nickname' type="text" />
              <p>Balance</p>
              $<input onChange={(e) => this.handleChange(e)} name='balance' type="number" />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Interest Rate</p>
              <input onChange={(e) => this.handleChange(e)} name='interestRate' type="number" step='any'/>
              <p>Due Date</p>
              <input onChange={(e) => this.handleChange(e)} name='dueDate' type="number" />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Minimum Payment</p>
              $<input onChange={(e) => this.handleChange(e)} name='minimumPayment' type="number" />
              <p>Actual Payment</p>
              $<input onChange={(e) => this.handleChange(e)} name='actualPayment' type="number" />
            </div>
            <p>Notes</p>
            <input onChange={(e) => this.handleChange(e)} type="text" name='notes' />
            <button type='submit' class="btn btn-outline-secondary">Submit</button>

          </form> : <></>}

        {this.props.data.map(element => {
          return <ProfileDebt fetchUserInfo={this.props.fetchUserInfo} key={element._id} debt={element} />
        })}
      </>
    )
  }
}

export default DebtColumn