import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

class ProfileExpense extends Component {

  state = {
    confirm: false,
    edit: false,
    nickname: '',
    dueDate: null,
    amount: null,
    notes: ''
  }

  componentDidMount() {
    const { nickname, dueDate, amount, notes } = this.props.expense

    this.setState({
      nickname,
      dueDate,
      amount,
      notes
    })
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDelete = async () => {
    await axios.delete(`/api/list/expenses?id=${this.props.expense._id}`)
    this.props.fetchUserInfo()
  }

  toggleConfirm = () => {
    this.setState({
      confirm: !this.state.confirm
    })
  }

  handleEdit = async (e) => {
    e.preventDefault()
    const { nickname, amount, dueDate, notes } = this.state
    let expense = {
      nickname,
      _id: this.props.expense._id,
      amount,
      dueDate,
      notes
    }
    await axios.put('/api/list/expenses', { expense })
    this.setState({
      edit: false
    })
    this.props.fetchUserInfo()
  }

  render() {

    const { expense } = this.props

    return (
      <div className='ProfileIncome'>
        {!this.state.edit ?
          <>
          {this.state.confirm ? 
          
          <div className="ProfileIncome-text-hold">
          <p>
            Delete {this.props.expense.nickname}?
          </p>
          <div className="ProfileIncome-form-line">
            <button className="btn btn-outline-secondary" onClick={this.toggleConfirm}>Cancel</button>
            <button className="btn btn-outline-secondary" onClick={this.handleDelete}>Confirm</button></div>
        </div> :
          
          <div className="ProfileIncome-text-hold">
            <p style={{ fontSize: '1.7rem', fontWeight: 600, textDecoration: 'underline' }}>{expense.nickname}</p>
            <p>Amount: ${expense.amount}</p>
            <p>Due Date: {expense.dueDate}</p>
            <p>Notes: {expense.notes}</p>
          </div>}
          </> :



          <div className="ProfileIncome-text-hold">
            <div className="ProfileIncome-form-line">
              <p>Nickname:</p> 
              <input 
                onChange={(e) => this.handleChange(e)} 
                name='nickname' 
                type="text" 
                value={this.state.nickname} 
                maxLength='25'
                required  />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Amount:</p>
              $<input 
              onChange={(e) => this.handleChange(e)} 
              type="number" 
              name='amount' 
              value={this.state.amount} 
              step='any'
              required  />
              <p>Due Date:</p>
              <input 
              onChange={(e) => this.handleChange(e)} 
              type="number" 
              name='dueDate' 
              value={this.state.dueDate}
              required  />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Notes:</p>
              <input 
              onChange={(e) => this.handleChange(e)} 
              type="text" 
              name='notes' 
              value={this.state.notes}  />
            </div>
            <button className="btn btn-outline-secondary" onClick={this.handleEdit}>Submit</button>
          </div>
        }
        <div className="ProfileIncome-button-hold">
          <FontAwesomeIcon onClick={this.toggleEdit} className='ProfileIncome-button' icon='edit' />
          <FontAwesomeIcon onClick={this.toggleConfirm} className='ProfileIncome-button' icon='trash' />
        </div>
      </div>

    )
  }
}


export default ProfileExpense