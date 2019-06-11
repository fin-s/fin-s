import React from 'react';
import './Styles/App.scss';
import { HashRouter as Router } from 'react-router-dom'
import routes from './routes'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle, faMinusCircle, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons'

function App() {

  library.add(faSquare, faCheckSquare, faPlusCircle, faMinusCircle, faEdit, faTrash)
  
  return (
      <Router>
    {routes}
    </Router>
  );
}

export default App;
