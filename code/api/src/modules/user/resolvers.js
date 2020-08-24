// The users file is grabbing from here
// This file defines how the user database changes based on crud functionality
// Imports
import bcrypt from 'bcrypt' // for authentication
import jwt from 'jsonwebtoken' // secure way to send queries over the internet

// App Imports
//grabing lots of stuff from config and setup from models
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
// Attempts to create a new user. If the user/email already exists it throws an error
// If the user does not already exist it creates them using bcrypt to encrypt their password, and
// unders the name and email into the user fields.
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}
// This checks login fuctionalty, if the user/email does not exist it spits out an error, otherwise
// it checks the user password. if the password does not match the encrypted on, then it throws an error, otherwise
// it send the info as a hash with a token saying that the user is logged in
export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}
// method find a user by id
// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}
// method finding all users
// Get all
export async function getAll() {
  return await models.User.findAll()
}
// deleting a user
// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
// can possible change this to be more inclusive somewhere
export async function getGenders() {
  return Object.values(params.user.gender)
}
