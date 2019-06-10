import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProfileIncome extends Component {

  state = {
    edit: false,
  }

  componentDidMount() {
    const { income } = this.props
    this.setState({
      nickname: income.nickname,
      amount: income.amount,
      frequency: income.interval.frequency,
      incomeDate1: income.interval.incomeDate1,
      incomeDate2: income.interval.incomeDate2,
      incomeWeekday: income.interval.incomeWeekday,
      notes: income.notes
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

  render() {
    const { income } = this.props

    function getWeekday(num) {
      switch (num) {
        case 0: return 'Sunday'
        case 1: return 'Monday'
        case 2: return 'Tuesday'
        case 3: return 'Wednesday'
        case 4: return 'Thursday'
        case 5: return 'Friday'
        case 6: return 'Saturday'
        default: return null
      }
    }
    return (
      <div className='ProfileIncome'>
        {!this.state.edit ?
          <div className="ProfileIncome-text-hold">
            <p>Nickname: {income.nickname}</p>
            <p>Frequency: {income.interval.frequency}</p>
            {income.interval.frequency === 'monthly' ?
              <p>Payday: {income.interval.incomeDate1}</p> :
              income.interval.frequency === 'semi-monthly' ?
                <><p>Payday 1: {income.interval.incomeDate1}</p>
                  <p>Payday 2: {income.interval.incomeDate2}</p></> :
                <p>Payday: {getWeekday(income.interval.incomeWeekday)}</p>}
            <p>Amount: {income.amount}</p>
            <p>Notes: {income.notes}</p>
          </div> :



          <div className="ProfileIncome-text-hold">
            <div className="ProfileIncome-form-line">
              <p>Nickname:</p> <input onChange={(e) => this.handleChange(e)} name='nickname' type="text" value={this.state.nickname} />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Frequency:</p> <select onChange={(e) => this.handleChange(e)} value={this.state.frequency} name="frequency" id="">
                <option value="monthly">Monthly</option>
                <option value="semi-monthly">Semi-monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            {this.state.frequency === 'monthly' ?
              <div className="ProfileIncome-form-line">
                <p>Payday:</p>
                <input onChange={(e) => this.handleChange(e)} type="number" name='incomeDate1' value={this.state.incomeDate1} />
              </div> :
              this.state.frequency === 'semi-monthly' ?
                <><div className='ProfileIncome-form-line'>
                  <p>Payday 1:</p>
                  <input onChange={(e) => this.handleChange(e)} type="number" name='incomeDate1' value={this.state.incomeDate1} />
                </div>
                  <div className="ProfileIncome-form-line">
                    <p>Payday 2: </p>
                    <input onChange={(e) => this.handleChange(e)} type="number" name='incomeDate2' value={this.state.incomeDate2} />
                  </div></> :
                <div className="ProfileIncome-form-line">
                  <p>Payday:</p>
                  <select onChange={(e) => this.handleChange(e)} name="incomeWeekday" value={this.state.incomeWeekday} id="">
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={2}>Tuesday</option>
                    <option value={3}>Wednesday</option>
                    <option value={4}>Thursday</option>
                    <option value={5}>Friday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </div>
            }
            <div className="ProfileIncome-form-line">
              <p>Amount:</p>
              <input onChange={(e) => this.handleChange(e)} type="number" name='amount' value={this.state.amount} />
            </div>
            <div className="ProfileIncome-form-line">
              <p>Notes:</p>
              <input onChange={(e) => this.handleChange(e)} type="text" name='notes' value={this.state.notes} />
            </div>
          </div>
        }
        <div className="ProfileIncome-button-hold">
          <FontAwesomeIcon onClick={this.toggleEdit} className='ProfileIncome-button' icon='edit' />
          <FontAwesomeIcon className='ProfileIncome-button' icon='trash' />
        </div>
      </div>
    )
  }
}

export default ProfileIncome