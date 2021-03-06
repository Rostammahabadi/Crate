// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed,
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

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
        role: userDetails.role,
        description: userDetails.description,
        image: userDetails.image, 
        address: userDetails.address
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Update Email
export async function updateEmailResolver(parentValue, { id, email }, { auth }) {
  if(auth.user && auth.user.id > 0){
    return await models.User.update(
      {
      email
    },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Update Description
export async function updateDescriptionResolver(parentValue, { id, description }, { auth }) {
  if(auth.user && auth.user.id > 0){
    return await models.User.update(
      {
        description
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Update Image
export async function updateImageResolver(parentValue, { id, address }, { auth }) {
  if(auth.user && auth.user.id > 0){
    return await models.User.update(
      {
        image
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({
    where: { id },
    include: [
    { model: models.Product, as: 'products' },
    { model: models.UserProduct, as: 'userProduct'}
  ]
   })
}

// Get all
export async function getAll() {
  return await models.User.findAll()
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}

// Option for Update User Resolver
export async function updateUserResolver(parentValue, { id, email, address, image, description }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    await models.User.update(
      {
        id,
        email,
        address,
        image,
        description
      },
      { where: { id } }
    )
    return getById(parentValue, { id })
  } else {
    throw new Error('Operation denied.')
  }
}
