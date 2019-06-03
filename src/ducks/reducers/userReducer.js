const initialState = {
  users_id: null,
  authenticated: false,
}

const UPDATE_USERS_ID = "UPDATE_LOGIN_ID"
const LOGOUT_USER = 'LOGOUT_USER'

export function updateUsersId (details) {
  return{
    type: UPDATE_USERS_ID,
    payload: details
  }
}

export function logoutUser () {
  return{
    type: LOGOUT_USER,
    payload: {
      login_id: null,
      authenticated: false
    }
  }
}



export default function userReducer (state=initialState, action){
  const {type, payload} = action
  switch(type){
    case UPDATE_USERS_ID:
      const {users_id, authenticated} = payload
      return {...state, users_id, authenticated, favoritesong};
    case LOGOUT_USER: 
      return{...state, login_id: null, authenticated: false}
    default:
      return state
  }
}