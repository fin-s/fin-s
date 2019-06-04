import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import RegisterWizzard from './Components/RegisterWizzard';
import Dashboard from './Components/Dashboard/Dashboard'


export default(
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/wizard' component={RegisterWizzard} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
)

