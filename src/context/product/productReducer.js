import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_SINGLE_PRODUCT_START,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_MEDIAS_SUCCESS,
  GET_MEDIAS_FAIL,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_FAIL,
} from '../constants'

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      }
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        products: [],
        loading: false,
      }
    case GET_SINGLE_PRODUCT_START:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          loading: true,
        },
      }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          data: action.payload,
          loading: false,
        },
      }
    case GET_SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          data: null,
          loading: false,
        },
      }
    case GET_MEDIAS_SUCCESS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          medias: action.payload,
        },
      }
    case GET_MEDIAS_FAIL:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          medias: [],
        },
      }
    case GET_IMAGE_SUCCESS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          imageUrl: action.payload,
        },
      }
    case GET_IMAGE_FAIL:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          imageUrl: '',
        },
      }
    default:
      return state
  }
}
