import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


class Income extends Component {
  constructor() {
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
    let { nickname, type, frequency, incomeWeekday, amount, notes, incomeDate1, incomeDate2 } = this.state
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

  render() {
    return (
      <div >
        <div className='grid-container'>
          <div className='one'>
            <div>
              <h1>enter income</h1>
            </div>
            <input placeholder='income name' type='text' onChange={this.handleChange} name='nickname' />
            <select onChange={this.handleChange} name='type' className='select'>
              <option value=''>-select an option-</option>
              <option value='fixed'>fixed</option>
              <option value='variable'>variable</option>
            </select>
            <select onChange={this.handleChange} name='frequency'>
              <option value=''>-select an option-</option>
              <option value='monthly'>monthly</option>
              <option value='semi-monthly'>semi-monthly</option>
              <option value='bi-weekly' >bi-weekly</option>
              <option value='weekly' >weekly</option>
            </select>
            {this.state.frequency === 'monthly'
              ? <input type='number' min='1' max='28' placeholder='day' onChange={this.handleChange} name='incomeDate1' />
              : this.state.frequency === 'bi-weekly'
                ? <select onChange={this.handleChange} name='incomeWeekday' class='select'>
                  <option value=''>-select an option-</option>
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
                    <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate1' placeholder='day 1' />
                    <input type='number' min='1' max='28' onChange={this.handleChange} name='incomeDate2' placeholder='day 2' />
                  </div>
                  : <h1 className='buffer' >input a frequency</h1>}
          </div>
          <div className='two'>

            <input onChange={this.handleChange} name='amount' placeholder='amount' type='number' />
            <textarea onChange={this.handleChange} columns={20} rows={5} name='notes' placeholder='notes' ></textarea>
            <button type="button" className="btn btn-outline-secondary" onClick={this.confirmIncome}>confirm income</button>
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
          <div className='three'>
            <button id='skip' type="button" className="btn btn-outline-secondary" onClick={() => this.props.history.push('/dashboard')}>skip for now</button>
          </div>
        </div>
      </div>
      //   </div >
      // </div >
    )
  }
}

export default withRouter(Income)