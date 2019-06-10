import React from 'react';
import './Styles/App.scss';
import { HashRouter as Router } from 'react-router-dom'
import routes from './routes'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSquare, faCheckSquare} from '@fortawesome/free-solid-svg-icons'

function App() {

  library.add(faSquare, faCheckSquare)
  
  return (
      <Router>
    {routes}
    </Router>
  );
}

export default App;
