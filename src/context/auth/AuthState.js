import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../constants'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    error: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load User
  const loadUser = () => {
    // normally we have a get user api to check token
    // so I implemented this way -> only if token exists
    const token = localStorage.getItem('token')

    if (token) {
      dispatch({ type: USER_LOADED })
    } else {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Login User
  const login = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      dispatch({ type: LOGIN_START })
      console.log('before req')
      const res = await axios.post('/admin/api/login_check', user, config)
      console.log('after req')
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
  }

  // Logout User
  const logout = () => dispatch({ type: LOGOUT })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        logout,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
