const tylerFunctions = require('../src/utils/tyler.functions')

test('/auth/list/debts should add debt',() => {
  expect.assertions(0)
  return tylerFunctions.axiosPost('http://localhost:8989/api/list/debts', {balance: 'a'}).catch(e => expect(e).toEqual({
    error: 'There was an error adding debt'
  }))    
})

test('/auth/list/debts should add debt',() => {
  expect.assertions(0)
  return tylerFunctions.axiosPost('http://localhost:8989/api/list/debts', {minimumPayment: 'a'}).catch(e => expect(e).toEqual({
    error: 'There was an error adding debt'
  }))
})
  
test('/auth/list/expenses should add an expense',() => {
  expect.assertions(0)
  return tylerFunctions.axiosPost('http://localhost:8989/api/list/expenses', {amount: 'a'}).catch(e => expect(e).toEqual({
    error: 'There was an error adding expense'
  }))
})

test('/auth/list/expenses should add an expense',() => {
  expect.assertions(0)
  return tylerFunctions.axiosPost('http://localhost:8989/api/list/expenses', {dueDate:'a'}).catch (e => expect(e).toEqual({
    error: 'There was an error adding expense'
  }))
})

test('/auth/list/incomes should add an income',() => {
  expect.assertions(0)
  return tylerFunctions.axiosPost('http://localhost:8989/api/list/incomes', {nickname:'abc', amount: 'a', type:'fixed', notes:'abc'}).catch (e => expect(e).toEqual({
    error: 'There was an error adding expense'
  }))
})

