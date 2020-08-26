import '@testing-library/jest-dom'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'
import state from './state'
import Item from '../../subscription/Item'

describe('Reducers', () => {
  it('should set initial state for error', () => {
    const expected = null
    const result = state(undefined, {})
    expect(result.error).toEqual(expected)
  })

  it('should set initial state of isLoading', () => {
    const expected = false
    const result = state(undefined, {})
    expect(result.isLoading).toEqual(expected)
  })
})