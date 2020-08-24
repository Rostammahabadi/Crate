// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
// This is being passed into the anonymous fn below as a default value for state
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
// ALL REDUCERS ARE BELOW
// SET AS STATE FOR THE APP? why anonymous fn?

// this defines all the action strings that can be passed down to define the current state from store
// we might need more cases for the following actions
// SET_EMAIL SET_DESCRIPTION SET_IMAGE and these imported above

export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    default:
      return state
  }
}