// Here are where all the product methods live

// App Imports
// grabing more stuff from config just like in user
// more stuff in the setup as well
import params from '../../config/params'
//This defines connection to database
import models from '../../setup/models'



// Method to get all the products in descending order based on id so from highest to lowest
// Get all products
export async function getAll() {
  //models contains the product database connect so connect to database and call find all for the database
  return await models.Product.findAll({ order: [['id', 'DESC']] })
}

// Get product by slug
export async function getBySlug(parentValue, { slug }) {
  // go find product based on this slug string
  const product = await models.Product.findOne({ where: { slug } })

  if (!product) {
    // Product does not exists
    // if you cant find it spit out error or give them product
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Get product by ID
//find product based on an id otherwise spit out an error
export async function getById(parentValue, { productId }) {
  const product = await models.Product.findOne({ where: { id: productId } })

  if (!product) {
    // Product does not exists
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Get related products
// get related method searches through product model and finds all products where id
// basically get any products that arnt the product, select three of them at random
export async function getRelated(parentValue, { productId }) {
  return await models.Product.findAll({
  //sequelize provides methods for querying database
  // I think Op is is operator which allows you to call more things off of
  // so select all id not equal to productId I think
    where: {
      id: { [models.Sequelize.Op.not]: productId }
    },
    // only take 3 and take a random one which makes sense for get related
    limit: 3,
    order: [[models.Sequelize.fn('RAND')]] // mock related products by showing random products
  })
}

// Create product
// if the user exists (auth comes from the params import which has user role stuff) and user roll is of admin them
// make this product with the given fields below, otherwise throw an error out
export async function create(parentValue, { name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.create({
      name,
      slug,
      description,
      type,
      gender,
      image
    })
  } else {
    throw new Error('Operation denied.')
  }
}
// same as above put for an update method
// Update product
export async function update(parentValue, { id, name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.update(
      {
        name,
        slug,
        description,
        type,
        gender,
        image
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}
// still need admin access for all user operations deletes a specific product if it exists and you
// have axcess otherwise spits out the corresponding error.
// Delete product
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    const product = await models.Product.findOne({where: {id}})

    if (!product) {
      // Product does not exists
      throw new Error('The product does not exists.')
    } else {
      return await models.Product.destroy({where: {id}})
    }
  } else {
    throw new Error('Operation denied.')
  }
}
// give me all the product types so a list of unique product types I think.
// This may come from the setup models with the Object keys stuff
// Product types
export async function getTypes() {
  return Object.values(params.product.types)
}
