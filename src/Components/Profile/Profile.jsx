import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import IncomeColumn from './IncomeColumn'
import DebtColumn from './DebtColumn'

class Profile extends Component {

  state = {
    loading: true,
    incomes: [],
    debts: [],
    expenses: []
  }

  async componentDidMount() {
    this.fetchUserInfo()
  }

  fetchUserInfo = async () => {
    let user = await axios.get('/api/users')
    // console.log(user.data)
    this.setState({
      incomes: user.data.incomes,
      debts: user.data.debts,
      expenses: user.data.expenses,
      loading: false
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

  handleAddIncome = async (income) => {
    const newIncome = {
      nickname: income.nickname,
      type: income.frequency,
      amount: +income.amount,
      notes: income.notes,
      interval: {
        frequency: income.frequency,
        incomeDate1: +income.incomeDate1,
        incomeDate2: +income.incomeDate2,
        incomeWeekday: +income.incomeWeekday
      }
    }

    console.log(newIncome)
    this.setState({
      loading: true
    })
    await axios.post('/api/list/incomes', {incomes: [newIncome]})
    this.fetchUserInfo()
  }

  handleAddIncome = async (debt) => {
    const newDebt = {
      nickname: debt.nickname,
      balance: debt.balance,
      dueDate: debt.dueDate,
      interestRate: debt.interestRate,
      minimumPayment: debt.minimumPayment,
      actualPayment: debt.actualPayment,
      notes: debt.notes
    }

    // console.log(newIncome)
    this.setState({
      loading: true
    })
    await axios.post('/api/list/debts', {debts: [newDebt]})
    this.fetchUserInfo()
  }


  render() {
    return (
      <div className='profile-hold'>
        <NavBar />
        <div className='Profile'>
          {this.state.loading ? <div>Loading...</div> :
            <div className='Profile'>
              <section className="column incomes">
                <IncomeColumn 
                data={this.state.incomes}
                handleAddIncome={this.handleAddIncome}
                fetchUserInfo={this.fetchUserInfo}/>
              </section>
              <section className="column">
                <DebtColumn
                data={this.state.debts}
                fetchUserInfo={this.fetchUserInfo}
                handleAddDebt={this.handleAddDebt}/>
              </section>
              <section className="column"></section>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Profile