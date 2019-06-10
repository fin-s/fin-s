const tylerFunctions = require('../src/utils/tyler.functions')

test('/auth/list/debts should add debt',() => {
  expect(tylerFunctions.axiosPost('http://localhost:8989/api/list/debts', {balance: 'a'})).resolves.toBe('There was an error adding debt')
  expect(tylerFunctions.axiosPost('http://localhost:8989/api/list/debts', {minimumPayment:'a'})).resolves.toBe('There was an error adding debt')
})

test('/auth/list/expenses should add an expense',() => {
  expect(tylerFunctions.axiosPost('http://localhost:8989/api/list/expenses', {amount: 'a'})).resolves.toBe('There was an error adding expense')
  expect(tylerFunctions.axiosPost('http://localhost:8989/api/list/expenses', {dueDate:'a'})).resolves.toBe('There was an error adding expense')
})

test('/auth/list/incomes should add an income',() => {
  expect(tylerFunctions.axiosPost('http://localhost:8989/api/list/incomes', {nickname:'abc', amount: 'a', type:'fixed', notes:'abc'})).resolves.toBe('There was an error editing income')
})

