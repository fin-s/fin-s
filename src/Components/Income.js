import React, {Component} from 'react';


class Income extends Component {
  constructor(){
    super()
    this.state = {
      nickname: '',
      type: null,
      amount: null,
      notes: '',
      frequency: '',
      incomeWeekday: null,
      incomeDate1: null,
      incomeDate2: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  confirmIncome = () => {
    let {nickname, type, frequency, incomeWeekday, amount, notes, incomeDate1, incomeDate2} = this.state
    let newIncome = {
      nickname,
      type,
      amount,
      notes,
      interval: {
        frequency,
        incomeWeekday,
        incomeDate1,
        incomeDate2
      }
    }
    this.props.updateIncomes(newIncome)
  }

  render(){
    return (
      <div>
        <div>
          <h1>Enter Income</h1>
        </div>
        <div>
          <input placeholder='Income Name' onChange={this.handleChange} name='nickname' />
          <select onChange={this.handleChange} name='type'>
            <option value=''>-Select an option-</option>
            <option value='fixed'>Fixed</option>
            <option value='variable'>Variable</option>
          </select>
          <select onChange={this.handleChange} name = 'frequency'>
            <option value=''>-Choose an option-</option>
            <option value='monthly'>Monthly</option>
            <option value='semi-monthly'>Semi-Monthly</option>
            <option value='bi-weekly' >Bi-weekly</option>
            <option value='weekly' >Weekly</option>
          </select>
         {this.state.frequency === 'monthly' 
         ? <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate1'/> 
         : this.state.frequency === 'bi-weekly' 
         ? <select onChange={this.handleChange} name='incomeWeekday'>
            <option value=''>-select an option-</option>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
         : this.state.frequency === 'weekly'
         ? <select onChange={this.handleChange} name='incomeWeekday'>
            <option value=''>-select an option-</option>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
           </select>
         : this.state.frequency === 'semi-monthly'
         ? <div>
              <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate1'/>
              <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate2'/>
            </div>
          : <div>Input a Frequency</div> }
         <input onChange={this.handleChange} name='amount' placeholder='amount' />
         <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes'></textarea>
         <button onClick={this.confirmIncome}>Confirm Income</button>
        </div>
        <div>
          {this.props.incomes.map((current, index) => {
            return (
              <div key={index}>
                <span>{current.nickname} {current.amount}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Income