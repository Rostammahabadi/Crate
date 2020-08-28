import '@testing-library/jest-dom'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'
import state from './state'

describe('Reducers', () => {

  let nullValue, falseValue, user, user1;
  
  beforeEach(() => {
    user = {}
    user1 = {
      error: null,
      isLoading: false,
      isAuthenticated: false,
      details: null
    }
  })

  it('should set initial state for error', () => {
    const currentState = state(undefined, {})
    expect(currentState.error).toEqual(null)
  })

  it('should set initial state of isLoading', () => {
    const currentState = state(undefined, {})
    expect(currentState.isLoading).toEqual(false)
  })

  it('should set initial state of isAuthenticated', () => {
    const currentState = state(undefined, {})
    expect(currentState.isAuthenticated).toEqual(false)
  })

  it('should set details default value', () => {
    const currentState = state(undefined, {})
    expect(currentState.details).toEqual(null)
  })

  it('should set user default value', () => {
    const currentState = state(undefined, {
      type: SET_USER,
      user: {}
    })
    expect(currentState.details).toEqual(user)
  })

  it('should set user value', () => {
    const currentState = state(undefined, {
      type: SET_USER,
      user: {}
    })
    expect(currentState.details).toEqual(user)
  })

  it('should logout a user', () => {
    const currentState = state(undefined, {
      type: LOGOUT
    })
    expect(currentState).toEqual(user1)
  })
  
  // Sad Path
  it('if error, should display error message', () => {
    const errorMessage =  "Place helpful and descriptive error message here"
    const currentState = state(undefined, {
      type: LOGIN_RESPONSE,
      error: errorMessage
    })
    expect(currentState.error).toEqual(errorMessage)
  })
})