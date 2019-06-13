import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


class Income extends Component {
  constructor() {
    super()
    this.state = {
      nickname: '',
      type: '',
      amount: '',
      notes: '',
      frequency: '',
      incomeWeekday: '',
      incomeDate1: '',
      incomeDate2: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmIncome = (e) => {
    e.preventDefault()
    let { nickname, frequency, incomeWeekday, amount, notes, incomeDate1, incomeDate2 } = this.state
    let newIncome = {
      nickname,
      type: frequency,
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
    this.setState({
      nickname: '',
      frequency: '',
      incomeDate1: '',
      incomeDate2: '',
      incomeWeekday: '',
      amount: '',
      notes: ''
    })
  }

  render() {
    return (
      <div >
        <form onSubmit={(e) => this.confirmIncome(e)} className='grid-container'>
          <div className='one'>
            <div>
              <h1>enter income</h1>
              <p style={{marginLeft: '15px', width: '80%', marginTop: '10px', marginBottom: '10px'}}>This can be anything: a job, rental property, or odd jobs</p>
            </div>
            <input
              placeholder='income name'
              type='text'
              onChange={this.handleChange}
              name='nickname'
              maxLength='25'
              value={this.state.nickname}
              required />
            {/* <select
              onChange={this.handleChange}
              name='type'
              className='select'
              required>
              <option value=''>-select an option-</option>
              <option value='fixed'>fixed</option>
              <option value='variable'>variable</option>
            </select> */}
            <select
              onChange={this.handleChange}
              name='frequency'
              value={this.state.frequency}
              required>
              <option value=''>-income frequency-</option>
              <option value='monthly'>monthly</option>
              <option value='semi-monthly'>semi-monthly</option>
              {/* <option value='bi-weekly' >bi-weekly</option> */}
              <option value='weekly' >weekly</option>
            </select>
            {this.state.frequency === 'monthly'
              ? <input type='number' min='1' max='28' placeholder='payday' onChange={this.handleChange} name='incomeDate1' value={this.state.incomeDate1} required/>
              : this.state.frequency === 'weekly'
                ? <select value={this.state.incomeWeekday} onChange={this.handleChange} name='incomeWeekday' class='select' required>
                  <option value={null}>-select an option-</option>
                  <option value={0}>sunday</option>
                  <option value={1}>monday</option>
                  <option value={2}>tuesday</option>
                  <option value={3}>wednesday</option>
                  <option value={4}>thursday</option>
                  <option value={5}>friday</option>
                  <option value={6}>saturday</option>
                </select>
                : this.state.frequency === 'semi-monthly'
                  ? <div >
                    <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate1' value={this.state.incomeDate1} placeholder='payday 1' required/>
                    <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate2' value={this.state.incomeDate2} placeholder='payday 2' required/>
                  </div>
                  : <h1 className='buffer' >--input a frequency--</h1>}
          </div>
          <div className='two'>

            <input onChange={this.handleChange} name='amount' placeholder='amount' type='number' value={this.state.amount} required/>
            <input onChange={this.handleChange} name='notes' placeholder='notes'  value={this.state.notes}/>
            <button type="submit" className="btn btn-outline-secondary" >confirm income</button>
            <div>
              {this.props.incomes.map((current, index) => {
                return (
                  <div key={index}>
                    <p>{current.nickname}: ${current.amount}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='three'>
            {/* <button id='skip' type="button" className="btn btn-outline-secondary" onClick={() => this.props.history.push('/dashboard')}>skip for now</button> */}
          </div>
        </form>
      </div>
      //   </div >
      // </div >
    )
  }
}

export default withRouter(Income)