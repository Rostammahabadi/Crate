// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const PRODUCTS_GET_LIST_REQUEST = 'PRODUCTS/GET_LIST_REQUEST'
export const PRODUCTS_GET_LIST_RESPONSE = 'PRODUCTS/GET_LIST_RESPONSE'
export const PRODUCTS_GET_LIST_FAILURE = 'PRODUCTS/GET_LIST_FAILURE'
export const PRODUCTS_GET_LIST_RESET = 'PRODUCTS/GET_LIST_RESET'
export const PRODUCTS_GET_REQUEST = 'PRODUCTS/GET_REQUEST'
export const PRODUCTS_GET_RESPONSE = 'PRODUCTS/GET_RESPONSE'
export const PRODUCTS_GET_FAILURE = 'PRODUCTS/GET_FAILURE'
export const PRODUCTS_GET_RELATED_LIST_REQUEST = 'PRODUCTS/GET_RELATED_LIST_REQUEST'
export const PRODUCTS_GET_RELATED_LIST_RESPONSE = 'PRODUCTS/GET_RELATED_LIST_RESPONSE'
export const PRODUCTS_GET_RELATED_LIST_FAILURE = 'PRODUCTS/GET_RELATED_LIST_FAILURE'

// Actions
// returns list of products based on the given query it will return different fields
// Get list of products
export function getList(isLoading = true, forceRefresh = false) {
  return dispatch => {
    dispatch({
      type: PRODUCTS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })
    // posts products and contains text for handling errors below.
    return axios.post(routeApi, query({
      operation: 'products',
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt', 'updatedAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: PRODUCTS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.products
          })
        } else {
          dispatch({
            type: PRODUCTS_GET_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: PRODUCTS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}
// This action grabs a single product, less sure on the slug, it is a text value so maybe alt text
// same as above, gives errors if request bad, otherwise returns object
// might be getting product based on slug possibly
// Get single product
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: PRODUCTS_GET_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'product',
      variables: { slug },
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          if (response.data.errors && response.data.errors.length > 0) {
            dispatch({
              type: PRODUCTS_GET_FAILURE,
              error: response.data.errors[0].message,
              isLoading: false
            })
          } else {
            dispatch({
              type: PRODUCTS_GET_RESPONSE,
              error: null,
              isLoading: false,
              item: response.data.data.product
            })
          }
        } else {
          dispatch({
            type: PRODUCTS_GET_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: PRODUCTS_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Get single product by Id
export function getById(productId) {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'productById',
      variables: { productId },
      fields: ['id', 'name', 'slug', 'description', 'image', 'type', 'gender']
    }))
  }
}

// Get list of products related to a product
// Gives a product based on a given id.
export function getRelatedList(productId, isLoading = true) {
  return (dispatch, getState) => {
    // this method seems to grab teh state from somewere perhaps in the state.js, maybe it inputs the type below to
    // give a given state
    let state = getState()

    if (state.productsRelated.list.length === 0 || state.productId !== productId) {
      dispatch({
        type: PRODUCTS_GET_RELATED_LIST_REQUEST,
        error: null,
        isLoading
      })

      return axios.post(routeApi, query({
        operation: 'productsRelated',
        variables: { productId },
        fields: ['id', 'name', 'slug', 'description', 'image']
      }))
        .then(response => {
          if (response.status === 200) {
            dispatch({
              type: PRODUCTS_GET_RELATED_LIST_RESPONSE,
              error: null,
              isLoading: false,
              list: response.data.data.productsRelated,
              productId
            })
          } else {
            dispatch({
              type: PRODUCTS_GET_RELATED_LIST_FAILURE,
              error: 'Some error occurred. Please try again.',
              isLoading: false
            })
          }
        })
        .catch(error => {
          dispatch({
            type: PRODUCTS_GET_RELATED_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        })
    }
  }
}

// Create or update product, if id exists update product, otherwise delete product id and create a new product
export function createOrUpdate(product) {
  if (product.id > 0) {
    return update(product)
  } else {
    delete product.id
    return create(product)
  }
}

// Create product
// post a new prodjct to api
export function create(product) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'productCreate',
      variables: product,
      fields: ['id']
    }))
  }
}

// Update product
// updte just like above, update must come from axios, the dispatch is what is passed to api, with operation
// similar to a label, the variable is teh resource updated, and fields is what you update, or just teh id of teh product being
// updated
export function update(product) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'productUpdate',
      variables: product,
      fields: ['id']
    }))
  }
}

// Remove product
// same style as above but for deleting
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'productRemove',
      variables,
      fields: ['id']
    }))
  }
}

// Get product types
// sending a requst for product of id and name to the api, is it asking for thsoe that satify the fields or
// saying just give me all products with the fields below. 
export function getTypes() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'productTypes',
      fields: ['id', 'name']
    }))
  }
}
