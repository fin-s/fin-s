import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

class ProfileDebt extends Component {

  state = {
    popup: false,
    edit: false,
    nickname: '',
    interestRate: null,
    dueDate: null,
    minimumPayment: null,
    actualPayment: null,
    notes: ''
  }

  componentDidMount() {
    const { nickname, interestRate, dueDate, minimumPayment, actualPayment, notes, balance } = this.props.debt

    this.setState({
      nickname,
      interestRate: interestRate / 100,
      dueDate,
      minimumPayment,
      actualPayment,
      notes,
      balance
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
    await axios.delete(`/api/list/debts?id=${this.props.debt._id}`)
    this.props.fetchUserInfo()
  }

  togglePopup = () => {
    this.setState({
      popup: !this.state.popup
    })
  }

  handleEdit = async (e) => {
    e.preventDefault()
    const { nickname, balance, interestRate, dueDate, minimumPayment, actualPayment, notes } = this.state
    let debt = {
      _id: this.props.debt._id,
      nickname,
      balance,
      interestRate: interestRate * 100,
      dueDate,
      minimumPayment,
      actualPayment,
      notes
    }
    await axios.put('/api/list/debts', { debt })
    this.setState({
      edit: false
    })
    this.props.fetchUserInfo()
  }

  render() {

    const { debt } = this.props

    let popupStyle

    if (this.state.popup) {
      popupStyle = {
        position: 'fixed',
        // left: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }
    } else {
      popupStyle = {
        display: 'none'
      }
    }

    return (
      <div className='ProfileIncome'>
        <div className="confirm" style={popupStyle}>
          <p>
            Delete {this.props.debt.nickname}?
          </p>
          <div className="confirm-button-hold"><button className="btn btn-outline-secondary" onClick={this.togglePopup}>Cancel</button>
            <button className="btn btn-outline-secondary" onClick={this.handleDelete}>Confirm</button></div>
        </div>
        {!this.state.edit ?
          <div className="ProfileIncome-text-hold">
            <p style={{ fontSize: '1.7rem', fontWeight: 600, textDecoration: 'underline' }}>{debt.nickname}</p>
            <p>Balance: ${debt.balance}</p>
            <p>Interest Rate: {debt.interestRate / 100}%</p>
            <p>Due Date: {debt.dueDate}</p>
            <p>Minimum Payment: ${debt.minimumPayment}</p>
            <p>Actual Payment: ${debt.actualPayment}</p>
            <p>Notes: {debt.notes}</p>
          </div> :



          <div className="ProfileIncome-text-hold">
            <div className="ProfileIncome-form-line">
              <p>Nickname:</p> <input onChange={(e) => this.handleChange(e)} name='nickname' type="text" value={this.state.nickname} />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Balance:</p>
              $<input onChange={(e) => this.handleChange(e)} type="number" name='balance' value={this.state.balance} />
              <p>Interest Rate:</p>
              <input onChange={(e) => this.handleChange(e)} type="number" name='interestRate' value={this.state.interestRate} step='any'/>%
              </div>
            <div className="ProfileIncome-form-line">
              <p>Minimum Payment:</p>
              $<input onChange={(e) => this.handleChange(e)} type="number" name='minimumPayment' value={this.state.minimumPayment} />
              <p>Actual Payment:</p>
              $<input onChange={(e) => this.handleChange(e)} type="number" name='actualPayment' value={this.state.actualPayment} />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Notes:</p>
              <input onChange={(e) => this.handleChange(e)} type="text" name='notes' value={this.state.notes} />
            </div>
            <button className="btn btn-outline-secondary" onClick={this.handleEdit}>Submit</button>
          </div>
        }
        <div className="ProfileIncome-button-hold">
          <FontAwesomeIcon onClick={this.toggleEdit} className='ProfileIncome-button' icon='edit' />
          <FontAwesomeIcon onClick={this.togglePopup} className='ProfileIncome-button' icon='trash' />
        </div>
      </div>

    )
  }
}


export default ProfileDebt