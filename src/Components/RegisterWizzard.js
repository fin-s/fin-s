import React, {Component} from 'react'
import Income from './Income'
import Debts from './Debts'
import Expenses from './Expenses';

class RegisterWizzard extends Component {
  constructor(){
    super()
    this.state = {
      incomes: [],
      expenses: [],
      debts: []
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

  render(){
    return(
      <div>
        <Income incomes={this.state.incomes} updateIncomes={this.updateIncomes}/>
        <Debts debts={this.state.debts} updateDebts={this.updateDebts}/>
        <Expenses expenses={this.state.expenses} updateExpenses={this.updateExpenses} />
      </div>
    )
  }
}

export default RegisterWizzard