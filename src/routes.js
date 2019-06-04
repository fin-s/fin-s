import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import RegisterWizzard from './Components/RegisterWizzard';
import Login from './Components/LoginRegister/Login'


export default(
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/wizard' component={RegisterWizzard} />
  </Switch>
)