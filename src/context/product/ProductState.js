import React, { useReducer } from 'react'
import axios from 'axios'
import ProductContext from './productContext'
import productReducer from './productReducer'
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_START,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_START,
  GET_SINGLE_PRODUCT_FAIL,
  GET_MEDIAS_START,
  GET_MEDIAS_SUCCESS,
  GET_MEDIAS_FAIL,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_FAIL,
} from '../constants'
import setGlobalToken from '../../utils/setGlobalToken'

if (localStorage.token) {
  setGlobalToken(localStorage.token)
}

const ProductState = props => {
  const initialState = {
    products: [],
    loading: false,
    currentProduct: {
      loading: false,
      data: null,
      medias: [],
      imageUrl: '',
    },
  }
  const [state, dispatch] = useReducer(productReducer, initialState)
  const { products, loading, currentProduct } = state

  // Get products
  const getProducts = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      dispatch({ type: GET_PRODUCTS_START })
      const res = await axios.get('/admin/api/products/product.json', config)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data })
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: error.response.data.message,
      })
    }
  }

  // get Single Product
  const getSingleProduct = async productId => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_START })
      const res = await axios.get(
        `/admin/api/products/product/${productId}.json`,
        config
      )
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: res.data })
      getMedias(res.data.gallery.id)
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_FAIL })
    }
  }

  //getMediasForGallery
  const getMedias = async galleryId => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      dispatch({ type: GET_MEDIAS_START })
      const res = await axios.get(
        `/admin/api/galleries/${galleryId}/medias.json`,
        config
      )
      dispatch({ type: GET_MEDIAS_SUCCESS, payload: res.data })
      getImage(res.data[0].id)
    } catch (error) {
      dispatch({ type: GET_MEDIAS_FAIL })
    }
  }

  // getSingleImage
  const getImage = async mediaId => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.get(
        `/admin/api/media/${mediaId}/url.json`,
        config
      )
      dispatch({ type: GET_IMAGE_SUCCESS, payload: res.data })
    } catch (error) {
      dispatch({ type: GET_IMAGE_FAIL })
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        loading,
        getSingleProduct,
        currentProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
