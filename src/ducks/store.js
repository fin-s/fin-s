import {createStore, combineReducers} from 'redux'
import userReducer from './ducks/userReducer'
import {devToolsEnhancer} from 'redux-devtools-extension'

const rootReducer = combineReducers({
  users: userReducer,
})



export default createStore(rootReducer, devToolsEnhancer())