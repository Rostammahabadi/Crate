// Imports
// methods set user, login, logout, register, and get genders live here
import axios from 'axios'
// A simple helper function to generate GraphQL queries using plain JavaScript Objects (JSON).
// sounds like they use this to ping the backend
import { query, mutation } from 'gql-query-builder'
// A simple, lightweight JavaScript API for handling cookies
// cookies, I saw that they might use that to keep track of the user possibly but maybe not
import cookie from 'js-cookie'

// App Imports
//routes file I guess it points here
import { routeApi } from '../../../setup/routes'

// Actions Types
// path helpers maybe, actually these are referenced in state so maybe these contain the data from the methods below
// these are more like methods I think, or return of method stored in constatant set soemhow to a string path?
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
// axios Promise based HTTP client for the browser and node.js: so it makes the http requests I think
export function setUser(token, user) {
  if (token) {
    // set headers for http request?
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  // setting user if approved its the action helper above, still be iffy on set_user
  return { type: SET_USER, user }
}

// Login a user using credentials
//
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })
    //looks like this determines login functionality. It is being based some user credintials
    //name email role and token. It geves different errors based on what is present. Interesting as this is present in
    // both the front and backend, though I figure the backend doesn't really display stuff so the frontend will still need to do that
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))
          // possible there is some type of session thingy going on here
          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
// This creates session or cookie in this case, odd a cookie is used
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  // think url has token verifing user logged in, encrypted? so maybe it is ok to see
  // just attaching it to url request or response I think
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    // they are sending us the data here via post request and we take care of it on backend
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
// some method made somewhere else possibly? for logoutUnsetUserLocalStorageAndCookie()
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
// here is where method from above is it takes out token from localstorage and cookie
// user no longer logged in
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
// lost of post requests, it sends post requset via http to backend so we can store maybe or just keeps them in url for us to play with
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
