// Imports
import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// added this to connect to REDUX Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension'

// App Imports
// imports all collected reducers to pass into combineReducers
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// App Reducer
// combine reducers grabs all reducers in one place
// it is pulling them from their specific api/state file that has all reducers in anonymous functions
// currently pulls SET_USER + LOGIN_REQUEST + LOGIN_RESPONSE + LOGOUT 
const appReducer = combineReducers({
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
// this rootReducer returns the appReducer (combination of all reducers)
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
// ^^ added composeWithDevTools to be able to activate all data for the browser 
