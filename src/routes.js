import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import LoginForm from './Components/LoginRegister/LoginForm'
import Register from './Components/LoginRegister/Register'
import RegisterWizzard from './Components/RegisterWizzard';


export default(
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/login' component={LoginForm}/>
    <Route path='/register' component={Register} />
    <Route path='/wizard' component={RegisterWizzard} />
  </Switch>
)