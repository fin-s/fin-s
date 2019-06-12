const dossFunc = require('../src/utils/doss.functions')

test('/auth/login should log you in', () => {
  expect.assertions(0);
  return dossFunc.axiosPost('http://localhost:8989/auth/login', { email: 'b', password: 'c' }).catch(e => expect(e).toEqual({
    error: 'Email or password incorrect'
  }))
})

test('/auth/login should log you in', () => {
  expect.assertions(0);
  return dossFunc.axiosPost('http://localhost:8989/auth/login', { email: 'b', password: '' }).catch(e => expect(e).toEqual({
    error: 'There was an error logging in'
  }))
})

test('auth/register should get ...', () => {
  expect.assertions(0);
  return dossFunc.axiosPost('http://localhost:8989/auth/register', { email: 'b', firstName: 'b', lastName: 'b', password: 'b' }).catch(e => expect(e).toEqual({
    error: 'Email is in use'
  }))
})

test('auth/register should get ...', () => {
  expect.assertions(0);
  return dossFunc.axiosPost('http://localhost:8989/auth/register', { email: 'c', firstName: 'c', lastName: 'c', password: '' }).catch(e => expect(e).toEqual({
    error: 'There was an error registering'
  }))
})

test('api/list/incomes should get ...', () => {
  expect.assertions(0);
  return dossFunc.axiosPost('http://localhost:8989/api/list/incomes', {}).catch(e => expect(e).toEqual({
    error: 'There was an error adding income'
  }))
})