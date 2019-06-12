import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import IncomeColumn from './IncomeColumn'
import DebtColumn from './DebtColumn'
import ExpenseColumn from './ExpenseColumn'

class Profile extends Component {

  state = {
    loading: true,
    incomes: [],
    debts: [],
    expenses: [],
    incomePosition: 0,
    debtsPosition: '100%',
    expensePosition: '200%'
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
    await axios.post('/api/list/incomes', { incomes: [newIncome] })
    this.fetchUserInfo()
  }

  handleAddDebt = async (debt) => {
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
    await axios.post('/api/list/debts', { debts: [newDebt] })
    this.fetchUserInfo()
  }

  handleAddExpense = async (expense) => {
    const newExpense = {
      nickname: expense.nickname,
      amount: expense.amount,
      dueDate: expense.dueDate,
      notes: expense.notes
    }

    // console.log(newIncome)
    this.setState({
      loading: true
    })
    await axios.post('/api/list/expenses', { expenses: [newExpense] })
    this.fetchUserInfo()
  }

  show = (type) => {
    switch(type){
      case 'income':
        this.setState({
          incomePosition: 0,
          debtsPosition: '100%',
          expensePosition: '200%'
        });
        break;
      case 'debt':
        this.setState({
          incomePosition: '-100%',
          debtsPosition: 0,
          expensePosition: '100%'
        });
        break;
      case 'expense':
        this.setState({
          incomePosition: '-200%',
          debtsPosition: '-100%',
          expensePosition: 0
        });
        break;
      default: console.log('none')
    }
  }


  render() {

    return (
      <div className='profile-hold'>
        <NavBar />
        <div className='Profile'>
          {this.state.loading ? <div>Loading...</div> :
            <div className='Profile'>
              <section className="column incomes" style={{ left: this.state.incomePosition }}>
                <IncomeColumn
                  data={this.state.incomes}
                  handleAddIncome={this.handleAddIncome}
                  fetchUserInfo={this.fetchUserInfo} />
              </section>
              <section className="column debts" style={{ left: this.state.debtsPosition }}>
                <DebtColumn
                  data={this.state.debts}
                  fetchUserInfo={this.fetchUserInfo}
                  handleAddDebt={this.handleAddDebt} />
              </section>
              <section className="column expenses" style={{ left: this.state.expensePosition }}>
                <ExpenseColumn
                  data={this.state.expenses}
                  fetchUserInfo={this.fetchUserInfo}
                  handleAddExpense={this.handleAddExpense} />
              </section>
            </div>
          }
        </div>
        <div className='footer-nav'>
          <div onClick={() => this.show('income')} className="footer-nav-section">
            Incomes
          </div>
          <div onClick={() => this.show('debt')} className="footer-nav-section">
            Debts
          </div>
          <div onClick={() => this.show('expense')} className="footer-nav-section">
            Expenses
          </div>
        </div>
      </div>
    )
  }
}

export default Profile