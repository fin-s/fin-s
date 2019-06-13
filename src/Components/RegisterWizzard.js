import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Income from './Income'
import Debts from './Debts'
import Expenses from './Expenses';
import axios from 'axios'
import Logo from './Logo'

class RegisterWizzard extends Component {
  constructor() {
    super()
    this.state = {
      incomes: [],
      expenses: [],
      debts: [],
      switchPage: 'incomes',
      incomeError: false,
      debtError: false,
      expenseError: false
    }
  }

  async componentDidMount(){
    let user = await axios.get('/api/users')

    this.setState({
      incomes: [...user.data.incomes],
      debts: [...user.data.debts],
      expenses: [...user.data.expenses]
    })
  }

  updateDebts = (newDebt) => {
    this.setState({
      debts: [...this.state.debts, newDebt]
    })
  }

  updateIncomes = (newIncomes) => {
    this.setState({
      incomes: [...this.state.incomes, newIncomes]
    })
  }

  updateExpenses = (newExpense) => {
    this.setState({
      expenses: [...this.state.expenses, newExpense]
    })
  }

  handleSubmitFinances = async () => {
    const { incomes, expenses, debts } = this.state

    if(incomes.length === 0) {
      this.setState({
        incomeError: true
      })
    }

    if(debts.length === 0) {
      this.setState({
        debtError: true
      })
    }

    if(expenses.length === 0){
      this.setState({
        expenseError: true
      })
    }

    if(incomes.length !== 0 && debts.length !== 0 && expenses.length !== 0) {
      try {
        await axios.post('/api/users/money', { incomes, expenses, debts })
        this.props.history.push('/dashboard')
      } catch (err) {
        console.log('Error encountered submitting finances: ', err)
      }
    }

  }

  handleWizardConditional = (page) => {
    switch (page) {
      case 'incomes':
        return (
          <Income incomes={this.state.incomes} updateIncomes={this.updateIncomes} />
        )
      case 'debts':
        return (
          <Debts debts={this.state.debts} updateDebts={this.updateDebts} />
        )
      case 'expenses':
        return (
          <Expenses handleSubmitFinances={this.handleSubmitFinances} expenses={this.state.expenses} updateExpenses={this.updateExpenses} />
        )
      default:
        return (
          <div>nothing</div>
        )
    }
  }

  handleSwitchPage = (pageSwitch) => {
    const switchArr = ['incomes', 'debts', 'expenses']
    let current = switchArr.findIndex(ele => {
      return ele === this.state.switchPage
    })
    if (pageSwitch) {
      let next = current + 1
      this.setState({ switchPage: switchArr[next % switchArr.length] })
    } else {
      let next = current + switchArr.length - 1
      this.setState({ switchPage: switchArr[next % switchArr.length] })
    }
  }


  render() {
    const { switchPage } = this.state
    return (
      <div>
        <Logo/>
        <div className='wizNav'>
        {this.handleWizardConditional(switchPage)}

        <>
          {this.state.switchPage === 'incomes' ? 
          <>
          <button onClick={() => this.handleSwitchPage(true)} type="button" className="btn btn-outline-secondary">next form</button></> :
          this.state.switchPage === 'debts' ?
          <><button onClick={() => this.handleSwitchPage(false)} type="button" className="btn btn-outline-secondary" >previous form</button>
          <button onClick={() => this.handleSwitchPage(true)} type="button" className="btn btn-outline-secondary">next form</button></> :
          <><button onClick={() => this.handleSwitchPage(false)} type="button" className="btn btn-outline-secondary" >previous form</button>
          </> 
          }
        </>
        </div>
        <div className='errors-hold'>
          <>{this.state.incomeError && <p>Please enter an income</p>}</>
          <>{this.state.debtError && <p>Please enter an debt</p>}</>
          <>{this.state.expenseError && <p>Please enter an expense</p>}</>
        </div>
      </div>
    )
  }
}

export default withRouter(RegisterWizzard)