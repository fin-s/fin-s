import React, { Component } from 'react'
import Income from './Income'
import Debts from './Debts'
import Expenses from './Expenses';
import NavBar from './NavBar'
import axios from 'axios'

class RegisterWizzard extends Component {
  constructor() {
    super()
    this.state = {
      incomes: [],
      expenses: [],
      debts: [],
      switchPage: 'incomes'
    }
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

  handleSubmitFinances = () => {
    //fire axios to endpoint
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
          <Expenses expenses={this.state.expenses} updateExpenses={this.updateExpenses} />
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
    if(pageSwitch){
      let next = current + 1
      this.setState({switchPage: switchArr[next % switchArr.length]})
    } else {
      let next = current + switchArr.length - 1
      this.setState({switchPage: switchArr[next % switchArr.length]})
    }
  }


  render() {
    const { switchPage } = this.state
    return (
      <div>
        <NavBar />
        {this.handleWizardConditional(switchPage)}
        {/* <Income incomes={this.state.incomes} updateIncomes={this.updateIncomes}/>
            <Debts debts={this.state.debts} updateDebts={this.updateDebts}/>
            <Expenses expenses={this.state.expenses} updateExpenses={this.updateExpenses} /> */}
        <button onClick={() => this.handleSwitchPage(true)} >Next Form</button>
        <button onClick={() => this.handleSwitchPage(false)} >Previous Form</button>
        <button onChange={this.handleSubmitFinances} >Confirm and Submit</button>
      </div>
    )
  }
}

export default RegisterWizzard