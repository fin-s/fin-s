const dossFunc = require('../src/utils/doss.functions')

test('/auth/login should log you in', () => {
  expect(dossFunc.axiosPost('http://localhost:8989/auth/login', { email: 'b', password: 'c' })).resolves.toBe('Email or password incorrect')
  expect(dossFunc.axiosPost('http://localhost:8989/auth/login', { email: 'b', password: '' })).resolves.toBe('There was an error logging in')
})

test('auth/register should get ...', () => {
  expect(dossFunc.axiosPost('http://localhost:8989/auth/register', { email: 'b', firstName: 'b', lastName: 'b', password: 'b' })).resolves.toBe('Email is in use')
  expect(dossFunc.axiosPost('http://localhost:8989/auth/register', { email: 'c', firstName: 'c', lastName: 'c', password: '' })).resolves.toBe('There was an error registering')
})

test('api/list/incomes should get ...', () => {
  expect(dossFunc.axiosPost('http://localhost:8989/api/list/incomes', {})).resolves.toBe('There was an error adding income')
})