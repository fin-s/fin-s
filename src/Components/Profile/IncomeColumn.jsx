import React, { Component } from 'react'
import ProfileIncome from './ProfileIncome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class IncomeColumn extends Component {

  state = {
    nickname: '',
    frequency: '',
    incomeDate1: null,
    incomeDate2: null,
    incomeWeekday: null,
    amount: null,
    notes: '',
    edit: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddIncome = (e) => {
    e.preventDefault()
    const { nickname, frequency, incomeDate1, incomeDate2, incomeWeekday, amount, notes } = this.state
    const income = {
      nickname,
      frequency,
      incomeDate1,
      incomeDate2,
      incomeWeekday,
      amount,
      notes
    }

    this.props.handleAddIncome(income)
  }

  toggleAddIncome = () => {

    this.setState({
      edit: !this.state.edit
    })
  }



  render() {
    return (
      <>
        <div className="column-head">
          <h1 className="column-title">Incomes</h1>
          <div className="add-new-title" onClick={this.toggleAddIncome}>
            <FontAwesomeIcon icon='plus-circle' />
            <p>Add new income</p>
          </div>
        </div>
        {this.state.edit ?
          <form onSubmit={(e) => this.handleAddIncome(e)} className='add-form'>
            <p>Income name</p>
            <input 
            onChange={(e) => this.handleChange(e)} 
            name='nickname' 
            type="text" 
            required />
            <p>Income frequency</p>
            <select onChange={(e) => this.handleChange(e)} name="frequency" required>
              <option value="">--Income Frequency--</option>
              <option value="monthly">Monthly</option>
              <option value="semi-monthly">Semi-monthly</option>
              <option value="weekly">Weekly</option>
            </select>
            {this.state.frequency === 'monthly' ?
              <div>
                <p>Payday</p>
                <input 
                onChange={(e) => this.handleChange(e)} 
                name='incomeDate1' 
                type="number" 
                required  />
              </div> : this.state.frequency === 'semi-monthly' ?
                <div>
                  <p>Paydays</p>
                  <input 
                  onChange={(e) => this.handleChange(e)} 
                  name='incomeDate1' 
                  type="number" 
                  required  />
                  <input 
                  onChange={(e) => this.handleChange(e)} 
                  name='incomeDate2' 
                  type="number"
                  required  />
                </div> : this.state.frequency === 'weekly' ?
                  <div>
                    <p>Payday</p>
                    <select onChange={(e) => this.handleChange(e)} name="incomeWeekday" required>
                      <option value={0}>Sunday</option>
                      <option value={1}>Monday</option>
                      <option value={2}>Tuesday</option>
                      <option value={3}>Wednesday</option>
                      <option value={4}>Thursday</option>
                      <option value={5}>Friday</option>
                      <option value={6}>Saturday</option>
                    </select>
                  </div> : <p>--Select an income frequency--</p>}
            <p>Amount</p>
            <input 
            onChange={(e) => this.handleChange(e)} name='amount' 
            type="number"
            required  />
            <p>Notes</p>
            <input 
            onChange={(e) => this.handleChange(e)} 
            type="text" 
            name='notes'  />
            <button type='submit' className="btn btn-outline-secondary">Submit</button>

          </form> : <></>}

        {this.props.data.map(element => {
          return <ProfileIncome fetchUserInfo={this.props.fetchUserInfo} key={element._id} income={element} />
        })}
      </>
    )
  }
}

export default IncomeColumn