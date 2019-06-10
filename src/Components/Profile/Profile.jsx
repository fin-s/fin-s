import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileIncome from './ProfileIncome'

class Profile extends Component {

  state = {
    loading: true,
    incomes: [],
    debts: [],
    expenses: [],
    addIncome: false,
    addExpense: false,
    addDebt: false,
    incomeNickname: '',
    incomeFrequency: '',
    incomeDate1: null,
    incomeDate2: null,
    incomeWeekday: null,
    incomeAmount: null,
    incomeNotes: ''
  }

  async componentDidMount() {
    let user = await axios.get('/api/users')
    // console.log(user.data)
    this.setState({
      incomes: user.data.incomes,
      debts: user.data.debts,
      expenses: user.data.expenses,
      loading: false
    })

  }

  toggleAddIncome = () => {

    this.setState({
      addIncome: !this.state.addIncome
    })
  }
  toggleAddDebt = () => {

    this.setState({
      addDebt: !this.state.addDebt
    })
  }
  toggleAddExpense = () => {

    this.setState({
      addExpense: !this.state.addExpense
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className='profile-hold'>
        <NavBar />
        <div className='Profile'>
          {this.state.loading ? <div>Loading...</div> :
            <div className='Profile'>
              <section className="column incomes">
                <h1 className="column-title">Incomes</h1>
                <div className="add-new-title" onClick={this.toggleAddIncome}>
                  <FontAwesomeIcon icon='plus-circle' />
                  <p>Add new income</p>
                </div>
                {this.state.addIncome ? <form className='add-form'>
                  <p>Income name</p>
                  <input onChange={(e) => this.handleChange(e)} name='incomeNickname' type="text" />
                  <p>Income frequency</p>
                  <select onChange={(e) => this.handleChange(e)} name="incomeFrequency">
                    <option value="">--Income Frequency--</option>
                    <option value="monthly">Monthly</option>
                    <option value="semi-monthly">Semi-monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  {this.state.incomeFrequency === 'monthly' ?
                    <div>
                      <p>Payday</p>
                      <input onChange={(e) => this.handleChange(e)} name='incomeDate1' type="number" />
                    </div> : this.state.incomeFrequency === 'semi-monthly' ?
                      <div>
                        <p>Paydays</p>
                        <input onChange={(e) => this.handleChange(e)} name='incomeDate1' type="number" />
                        <input onChange={(e) => this.handleChange(e)} name='incomeDate2' type="number" />
                      </div> : this.state.incomeFrequency === 'weekly' ?
                      <div>
                        <p>Payday</p>
                        <select onChange={(e) => this.handleChange(e)} name="incomeWeekday">
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
                  <input onChange={(e) => this.handleChange(e)} name='incomeAmount' type="number" />
                  <p>Notes</p>
                  <input onChange={(e) => this.handleChange(e)} type="text" name='incomeNotes' />

                </form> : <></>}

                {this.state.incomes.map(element => {
                  return <ProfileIncome key={element._id} income={element}/>
                })}
              </section>
              <section className="column debts">
                <h1 className="column-title">Debts</h1>
                <div className="add-new-title" onClick={this.toggleAddDebt}>
                  <FontAwesomeIcon icon='plus-circle' />
                  <p>Add new debt</p>
                </div>
                {this.state.addDebt ? <form className='add-form'>

                </form> : <></>}
              </section>
              <section className="column expenses">
                <h1 className="column-title">Expenses</h1>
                <div className="add-new-title" onClick={this.toggleAddExpense}>
                  <FontAwesomeIcon icon='plus-circle' />
                  <p>Add new expense</p>
                </div>
                {this.state.addExpense ? <form className='add-form'>

                </form> : <></>}
              </section>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Profile