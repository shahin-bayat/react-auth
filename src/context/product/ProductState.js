import React, { useReducer } from 'react'
import ProductContext from './productContext'
import productReducer from './productReducer'
import { GET_PRODUCTS } from '../constants'

const ProductState = props => {
  const initialState = {
    products: [],
  }

  const [state, dispatch] = useReducer(productReducer, initialState)

  // Get products

  return (
    <ProductContext.Provider value={{ products: state.products }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
