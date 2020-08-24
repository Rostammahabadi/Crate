// Imports
// Authentication stuff, might look into later, but looks like this is the authentication logic
import jwt from 'jsonwebtoken'
import serverConfig from '../config/server.json'

// Authentication middleware
export default function (request, response, next) {
  let authToken = request.headers.authorization

  if (authToken && authToken !== null) {
    try {
      const token = authToken.split(' ')
      request.user = jwt.verify(token[1], serverConfig.secret)
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    request.user = {}
  }

  next()
}
