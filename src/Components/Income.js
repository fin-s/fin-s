import React, {Component} from 'react';


class Income extends Component {
  constructor(){
    super()
    this.state = {
      nickname: '',
      type: null,
      frequency: '',
      date: null,
      amount: null,
      notes: '',
      weekDay1: null,
      weekDay2: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  confirmIncome = () => {
    let {nickname, type, frequency, date, amount, notes, weekDay1, weekDay2} = this.state
    let newIncome = {
      nickname,
      type,
      amount,
      notes,
      interval: {
        frequency,
        date,
        weekDay1,
        weekDay2
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
          <input placeholder='Account Name' onChange={this.handleChange} name='nickname' />
          <select onChange={this.handleChange} name='type'>
            <option value=''>-Select an option-</option>
            <option value='fixed'>Fixed</option>
            <option value='variable'>Variable</option>
          </select>
          <select onChange={this.handleChange} name = 'frequency'>
            <option value=''>-Choose an option-</option>
            <option value='monthly'>Monthly</option>
            <option value='bi-weekly' >Bi-weekly</option>
            <option value='weekly' >Weekly</option>
          </select>
         {this.state.frequency === 'monthly' 
         ? <input onChange={this.handleChange} name=''/> 
         : this.state.frequency === 'bi-weekly' 
         ? <div><input onChange={this.handleChange} name='weekDay1' /> <input name='weekDay2' /></div> 
         : this.state.frequency === 'weekly'
         ? <select onChange={this.handleChange} name='weekday'>
           <option value=''>-select an option-</option>
           <option value={0}>Sunday</option>
           <option value={1}>Monday</option>
           <option value={2}>Tuesday</option>
           <option value={3}>Wednesday</option>
           <option value={4}>Thursday</option>
           <option value={5}>Friday</option>
           <option value={6}>Saturday</option>
           </select>
         : <div>Input a frequency</div>}
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